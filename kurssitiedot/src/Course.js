import React from "react"

const Course = (props) => {
    console.log(props)

    const allParts = props.course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
    const totalAmount = props.course.parts.reduce((sum, parts) => sum + parts.exercises, 0)

    return (
        <div>
            <h1>{props.course.name}</h1>
            {allParts}
            <p>Yhteensä osia on {totalAmount}</p>
        </div>
    )
}

export default Course