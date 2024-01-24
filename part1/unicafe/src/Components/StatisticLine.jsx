const StatisticLine = ({text, counter}) => {
    let sufix = '';
    if(text === 'Positive'){
        sufix = '%';
    }
    return (
        <tr>
            <td>{text}</td>
            <td>{counter + ' '+ sufix}</td>
        </tr>
    );
}

export default StatisticLine;