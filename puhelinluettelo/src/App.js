import React, { useState, useEffect } from 'react'
import Person from "./Persons"
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState()
    const [exclusion, setExclusion] = useState('')


    // =============== OLD REQUEST ===============
    // useEffect(() => {
    //     axios
    //         .get('http://localhost:3001/persons')
    //         .then(response => {
    //             console.log('promise fulfilled')
    //             setPersons(response.data)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }, [])
    // ===========================================
    
    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }
        const alreadyFound = persons.find(persons => persons.name === newName)

        if (alreadyFound) {
            console.log(newName)
            const wantToReplace = window.confirm(`${newName} löytyy jo, haluatko korvata nykyisen?`)
            if (wantToReplace) {
                personService.update(alreadyFound.id, personObject).then(response => {
                    console.log(response)
                    setPersons(persons.filter(p => p.name !== personObject.name).concat(response))
                    setNewName('')
                    setNewNumber('')
                })
            }
        } else {
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNumber('')
            personService
                .create(personObject).then(returnedNote => {
                    setPersons(persons.concat(returnedNote))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    const handleRemove = (id) => {
        const deletedPerson = persons.find(person => person.name === person)
        const accepted = window.confirm(`remove ${deletedPerson} are you sure?`)
        if (accepted) {
            personService.remove(id).then(response => {
                setPersons(persons.filter(p => p.id !== id))
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