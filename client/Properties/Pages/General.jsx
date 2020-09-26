import React from 'react';

function General(props){
    const { property } = props;

    return (
        <div className="box">
            <div className="columns">
                <div className="column">
                    Is publicly visible: {JSON.stringify(property.publicVisible)}
                </div>
            </div>
        </div>
    )
}

export default General;