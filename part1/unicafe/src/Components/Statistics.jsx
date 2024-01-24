import StatisticLine from "./StatisticLine";

const Statistics = ({good =0, neutral = 0, bad = 0}) =>{

    const total = good + neutral + bad;
    let average = (good-bad)/total;
    let positive = good/total;
    if(total ===0 ){
        return (
            <div>
                
                 <h1>Statistics</h1>
                 <p>No feedback given</p>
            </div>
           
        )
    }
    return (
        <div>
            <h1>Statistics</h1>
            <table>
                <tbody>
                <StatisticLine text = {"Good"} counter = {good} />
                <StatisticLine text = {"Neutral"} counter = {neutral} />
                <StatisticLine text = {"Bad"} counter = {bad} />
                <StatisticLine text = {"Total"} counter = {total} />
                <StatisticLine text = {"Average"} counter = {average} />
                <StatisticLine text = {"Positive"} counter = {positive} /> 
                </tbody>
            </table>
        </div>
    );
}

export default Statistics
;