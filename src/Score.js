import React  from 'react';

// Dumb component

function Score ({c_quite, c_safety, c_traffic, quite, safety, traffic, result}) {
    return (
        <div className ="contaioner">
            <div className ="c_Scores">
                <h1>Current Quite Score: {c_quite}</h1>
                <h1>Current Safety Score: {c_safety}</h1>
                <h1>Current Traffic Score: {c_traffic}</h1>
            </div>
            <div className="Scores">
                <h1>Quite Score: {quite}</h1>
                <h1>Safety Score: {safety}</h1>
                <h1>Traffic Score: {traffic}</h1>
            </div>
            <div className="Result">
                <h1>Result: {result}</h1>
            </div>
            <button><a href="http://localhost:3000/">Go Back</a></button>
        </div>
    )
}

export default Score