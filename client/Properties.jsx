import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { getProperties } from './services/properties';

function Properties(props){
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        getProperties()
        .then(properties => setProperties(properties))
    });

    return (
        <div>
            properties
        </div>
    )
}

export default hot(Properties);