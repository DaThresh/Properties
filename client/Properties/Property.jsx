import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

function Property(props){
    const { propertyId } = useParams();

    useEffect(() => {

    }, []);

    return (
        <span id="Property">
            <div className="container is-fluid is-sectioned">
                <div className="columns">
                    <div className="column is-4">
                        <div className="box">
                            <FontAwesomeIcon icon={faHome} size="10x" />
                        </div>
                        <nav className="panel">
                            <p className="panel-heading">
                                
                            </p>
                        </nav>
                    </div>
                    <div className="column is-4">

                    </div>
                </div>
            </div>
        </span>
    )
}

export default Property;