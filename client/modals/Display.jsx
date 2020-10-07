import React, { Fragment } from 'react';

function Display(props){
    return (
        <Fragment>
            <h2 className="title is-2 has-text-centered">Hey you!</h2>
            <p className="subtitle is-4">{props.data}</p>
        </Fragment>
    )
}

export default Display;