const PersonDetails = ({name, number}) =>{

    return (
        <div>
            <p>
                <label>Name: </label> {name} <label> Number: </label> {number}
            </p>
        </div>
    )
}

export default PersonDetails;