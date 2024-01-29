import Country from "./Country"
import { useState } from "react";
const CountryList = ({ countries }) => {

    const [selectedCountry, setSelectedCountry] = useState(countries[0])

    const onselect = (event) =>{
        const index = event.target.value;
        console.log(index);
        setSelectedCountry(countries[index]);
    }

    if(countries.length > 10){
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }else if(countries.length === 0){
        return (
            <div>
                <p>No countries found</p>
            </div>
        )
    }else if(countries.length===1){
        return(
            <div>
                <Country country={selectedCountry}/>
            </div>
        )
    }else{
        return (
            <div>
                {countries.map((country, index) => 
                    <p key={index}>{country.name.common}
                        <button value={index} onClick={onselect}>Show</button>
                    </p>
                )}
                 {selectedCountry && <Country country={selectedCountry} />}
            </div>
        )
    }
}

export default CountryList;