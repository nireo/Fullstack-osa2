import React, { useState, useEffect } from 'react'
import Persons from "./Persons"
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
    
    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.find(persons => persons.name === newName)) {
            console.log(newName)
            alert(`${newName} löytyy jo`)
            setNewName('')
        } else {
            const personObject = {
                name: newName,
                number: newNumber
            }

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
                <Persons persons={filteredSearch} />
            </div>
        </div>
    )
}

export default App