import React from "react"

const Country = (props) => {
    const allLanguages = props.filteredSearch[0].languages.map(language => <li>{language.name}</li>)
    return (
        <div>
            <h1>{props.filteredSearch[0].name}</h1>
            <div>capital {props.filteredSearch[0].capital}</div>
            <div>population {props.filteredSearch[0].population}</div>
            <h2>languages</h2>
            <ul>
                {allLanguages}
            </ul>
            <img src={props.filteredSearch[0].flag} width="100" height="100" ></img>
        </div>
    )
}

export default Country