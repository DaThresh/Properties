import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive } from '@fortawesome/free-solid-svg-icons';

function NotFound(props){
    return (
        <div className="container is-fluid is-sectioned has-text-centered">
            <h1 className="title is-1 is-spaced">
                Page not found
            </h1>
            <h2 className="subtitle is-1">
                <FontAwesomeIcon icon={faArchive} />
            </h2>
        </div>
    )
}

export default NotFound;