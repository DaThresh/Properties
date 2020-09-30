import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Services
import { getOrganization } from '../services/organizations';

// Utilities
import { apiError } from '../utilities/apiError';

function Organization(props){
    const { organizationId } = useParams();
    const [organization, setOrganization] = useState({});

    useEffect(() => {
        getOrganization(organizationId)
        .then(organization => setOrganization(organization))
        .catch(error => apiError(error));
    }, []);

    return (
        <div className="container is-fluid is-sectioned">
            working!
        </div>
    )
}

export default Organization;