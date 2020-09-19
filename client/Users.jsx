import React, { useState, useEffect } from 'react';

// Services
import { getUsers } from './services/users';
import { pushNotification } from './services/notifications';

// Utilities
import { apiError } from './utilities/apiError';

function Users(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
        .then(users => setUsers(users))
        .catch(error => {
            apiError(error);
            pushNotification('Error', 'Failed to load users', 'danger');
        });
    }, []);

    return (
        <div>Users</div>
    )
}

export default Users;