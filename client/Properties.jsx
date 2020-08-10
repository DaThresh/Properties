import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';

// Services
import { getProperties } from './services/properties';

// Utilities
import { apiError } from './utilities/apiError';

function Properties(props){
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        getProperties()
        .then(properties => setProperties(properties))
        .catch(error => apiError(error));
    });

    return (
        <div>
            properties
        </div>
    )
}

export default hot(Properties);