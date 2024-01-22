const Total = ({parts}) =>{
    const [part1, part2, part3] = parts;
    const total = part1.exercises+part2.exercises+part3.exercises;
    return (
        <>
            <p>{total}</p>
        </>
    )
}

export default Total;