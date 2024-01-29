import Weather from "./Weather";

const Country = ({ country }) => {
    const name = country.name.common;
    const capital = country.capital[0];
    const population = country.population;
    const languages = country.languages;
    return(
        <div>
            <h1>{name}</h1>
            <p>Capital: {capital}</p>
            <p>Population {population}</p>
            <h2>Languages</h2>
            <ul>
            {Object.entries(languages).map(([key, value], index) => 
                    <li key={index}>{value}</li>
                )}
            </ul>
            <img src={country.flags.png} alt="flag" width="200" height="100"></img>
            <Weather capital={capital} capitalInfo = {country.capitalInfo}/>
        </div>
    )

}

export default Country;