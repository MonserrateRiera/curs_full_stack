const Part = (props) =>{
    console.log(props);
    return (
        <div>
            {props.part.name} {props.part.exercises}
        </div>
    )
}

export default Part;