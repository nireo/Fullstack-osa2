import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios"
import Country from "./Country"


const App = () => {
	const [ countries, setCountries ] = useState([])
	const [ newSearch, setSearch ] = useState("")

	const hook = () => {
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				setCountries(response.data)
			})
	}

	useEffect(hook, [])

	const handleSearch = (event) => {
		setSearch(event.target.value)
	}

	const filteredSearch = newSearch ? countries.filter(person => 
		person.name.toLowerCase().includes(newSearch.toLowerCase())) : countries

	const allAvailable = filteredSearch.map((country, index) =>
		<div>{country.name} <button onClick={() => setSearch(country.name)}>show</button>
	</div>)

	if (filteredSearch.length > 10) {
		return (
		<div> 
			<div>find country < input value={newSearch} onChange={handleSearch}/></div>
			<div>too many entries to show</div>
		</div >)	
	}
	if (filteredSearch.length === 1) {
		return (
			<div>
				<div>find country < input value={newSearch} onChange={handleSearch} /></div>
				<Country filteredSearch={filteredSearch} />
			</div>
		)
	}
    return (
		<div>
			<div>find country <input value={newSearch} onChange={handleSearch} /></div>
			{allAvailable}
		</div>	
	)
}

export default App;
