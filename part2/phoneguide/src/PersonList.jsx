const PersonList = ({persons}) => {
    if(persons.length === 0){
        return (
            <h2>There isnt no numbers yet.</h2>
        )
    }
    return(
        <>
            {persons.map(person =>
                <p key={person.name}>{person.name}</p>
            )}
        </>
    )
}
export default PersonList;