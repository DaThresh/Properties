import React from 'react';

// Components
import List from './shared/List';

// Services
import { getUsers, getUsersCount } from './services/users';

function Users(){
    var displayRow = (user) => {
        return (
            <tr key={user.id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
            </tr>
        )
    }

    return (
        <List tableHeaders={['Name', 'Email', 'Role']} fetchFunction={getUsers} fetchCountFunction={getUsersCount} displayRow={displayRow} />
    )
}

export default Users;