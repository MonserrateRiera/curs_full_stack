import PersonDetails from "./PersonDetails";

const PersonList = ({persons}) => {
    console.log(persons);
    if(persons.length === 0){
        return (
            <h2>There isnt no numbers yet.</h2>
        )
    }
    return(
        <>
            {persons.map(person =>
                <PersonDetails key={person.name} name={person.name} number={person.number}/>
            )}
        </>
    )
}
export default PersonList;