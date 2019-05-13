import React, { useState, useEffect } from 'react'
import Person from "./Persons"
import personService from './services/persons'
import Error from './services/error'
import Success from './services/success'

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState()
    const [ exclusion, setExclusion ] = useState('')
    const [ errorMessage, setErrorMessage ] = useState(null)
    const [ successMessage, setSuccessMessage ] = useState(null)
    
    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()

        // object entry for person entries
        const personObject = { name: newName, number: newNumber }

        // check if user entered entry already exists in db
        const alreadyFound = persons.find(persons => persons.name === newName)

        if (alreadyFound) {
            // confirm if user wants to replace the number of an already existing entry
            const wantToReplace = window.confirm(`${newName} löytyy jo, haluatko korvata nykyisen?`)

            // code under executes if user agreed to replacing person
            if (wantToReplace) {
                personService.update(alreadyFound.id, personObject).then(response => {
                    console.log(response)
                    setPersons(persons.filter(p => p.name !== personObject.name)
                    .concat(response))
                    setNewName('')
                    setNewNumber('')
                })
            }
        } else {
            personService
                .create(personObject).then(returnedNote => {
                // add person to db.json
                setPersons(persons.concat(returnedNote))

                // clear up input fields
                setNewName('')
                setNewNumber('')

                // display add message
                setSuccessMessage(`${personObject.name} on lisätty`)
                setTimeout(() => {
                    setSuccessMessage(null)
                }, 3000)
            })
        }
    }

    const handleRemove = (id) => {
        // collect users selected object for deletion
        const deletedPerson = persons.find(person => person.id === id)

        // confirm deletion
        const accepted = window.confirm(`remove ${deletedPerson.name} are you sure?`)

        // code under executes if user agreed to deleting person entry
        if (accepted) {
            personService.remove(id).then(r => {
                console.log(r)
                setPersons(persons.filter(person => person.id !== id))
            }).catch(err => { // if promise cannot be filled properly
                setErrorMessage(`henkilö '${newName}' on jo poistettu palvelimelta`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 3000)
                setPersons(persons.filter(person => person.id !==id))
            })
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleExclusion = (event) => {
        setExclusion(event.target.value)
    }

    const filteredSearch = exclusion ? persons.filter(person => person.name.toLowerCase().includes(exclusion.toLowerCase())) : persons

    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <Error message={errorMessage} />
            <Success message={successMessage}/>
            
            <form>
                <div>
                    <form>
                        <div>rajaa näytettäviä <input value={exclusion} onChange={handleExclusion}/></div>
                    </form>
                    <h2>Lisää uusi</h2>
                    <form onSubmit={addPerson}>
                        <div>nimi: <input value={newName} onChange={handleNameChange} /></div>
                        <div>numero: <input value={newNumber} onChange={handleNumberChange}/></div>
                        <button type="submit">lisää</button>
                    </form>
                </div>
            </form>
            <h2>Numerot</h2>
            <div>
                <Person persons={filteredSearch} remove={handleRemove} />
            </div>
        </div>
    )
}

export default App