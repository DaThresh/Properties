import React from 'react';
import { useParams } from 'react-router-dom';

function Property(props){
    const { propertyId } = useParams();

    return (
        <span id="Property">
            <div className="container is-fluid is-sectioned">
                testing
                {propertyId}
            </div>
        </span>
    )
}

export default Property;