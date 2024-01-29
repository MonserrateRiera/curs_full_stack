import PersonDetails from "./PersonDetails";

const PersonList = ({persons, onDelete}) => {
    console.log(persons);
    const handleDelete = (event) =>{
        onDelete(event.target.value);
    }

    if(persons.length === 0){
        return (
            <h2>There isnt no numbers yet.</h2>
        )
    }
    return(
        <>
            {persons.map(person =>
                <div key={person.id}>
                    <PersonDetails name={person.name} number={person.number}/>
                    <button onClick={handleDelete} value={person.id}>delete</button>
                </div>
                
            )}
        </>
    )
}
export default PersonList;