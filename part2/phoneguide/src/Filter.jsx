

const Filter = ({onChange}) =>{
    const changeHandler = (event) =>{
        //setFilter(event.target.value);
        onChange(event.target.value);
    }


    return (
        <>
        <label>Filter shown with: </label>
        <input type="text" onChange={changeHandler} />
        </>
        
        
    )
}

export default Filter;