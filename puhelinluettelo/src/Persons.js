import React from "react"

const Persons = (props) => {

    const allPeople = props.persons.map(person => <div>{person.name} {person.number} <button onClick={() => props.remove(person.id)}>poista</button></div>)
    return (
        <div>{allPeople}</div>
    )
}


export default Persons