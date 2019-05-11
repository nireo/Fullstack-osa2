import React, { useState, useEffect } from 'react'
import Persons from "./Persons"
import axios from "axios"

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState()
    const [exclusion, setExclusion] = useState('')

    const hook = () => {
        console.log('effect')
        axios
        .get('http://localhost:3001/persons')
        .then(response => {
            console.log('promise fulfilled')
            console.log(response.data)
            setPersons(response.data)
        })
    }

    useEffect(hook, [])
    console.log(hook)

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.find(persons => persons.name === newName)) {
            console.log(newName)
            alert(`${newName} löytyy jo`)
            setNewName('')
        } else {
            console.log(newNumber)
            setPersons(persons.concat({ name: newName, number: newNumber }))
            setNewName('')
            setNewNumber('')
        }
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const handleExclusion = (event) => {
        console.log(event.target.value)
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