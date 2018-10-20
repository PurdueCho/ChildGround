import React  from 'react';

// Dumb component
function Score ({quite, safety, traffic}) {
    return (
        <div className ="Score">
            {quite}, {safety}, {traffic}
        </div>
    )
}


export default Score