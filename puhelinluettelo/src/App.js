import React, { useState } from 'react'
import Persons from "./Persons"

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState()
    const [exclusion, setExclusion] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.find(persons => persons.name === newName)) {
            alert(`${newName} löytyy jo`)
            setNewName('')
        } else {
            setPersons(persons.concat({ name: newName, number: newNumber }))
            setNewName('')
            setNewNumber('')
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
                <div>
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