import React, { useState, useEffect } from 'react';

// Services
import { getUsers } from './services/users';

// Utilities
import { apiError } from './utilities/apiError';

function Users(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
        .then(users => setUsers(users))
        .catch(error => apiError(error));
    }, []);

    return (
        <div>Users</div>
    )
}

export default Users;