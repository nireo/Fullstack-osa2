import React, {useState,useEffect} from "react"
import axios from "axios"

const Country = (props) => {
    const [tempature, setTempature] = useState(0)
    const [windspeed, setWindSpeed] = useState(0)

    const hook = () => {
        axios
            .get(`https://api.apixu.com/v1/current.json?key=500d2b0ea15e4362805154226191105&q=${props.filteredSearch[0].capital}`)
            .then(response => {
                setTempature(response.data.current.temp_c)
                console.log(tempature)
                setWindSpeed(response.data.current.wind_kph)
            })
    }
    useEffect(hook, [])
    const allLanguages = props.filteredSearch[0].languages.map(language => <li key={language.name}>{language.name}</li>)
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
            <div>Temperature in {props.filteredSearch[0].capital} is {tempature} celcius</div>
            <div>Winspeed in {props.filteredSearch[0].capital} is {windspeed} kph</div>
        </div>
    )
}

export default Country