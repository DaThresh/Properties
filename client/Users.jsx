import React from 'react';

// Components
import List from './shared/List';

// Services
import { getUsers, getUsersCount } from './services/users';

const tableHeaders = [
    {name: 'Name', sort: 'firstName'},
    {name: 'Email', sort: 'email'},
    {name: 'Role', sort: 'role'},
]

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
        <List tableHeaders={tableHeaders} fetchFunction={getUsers} fetchCountFunction={getUsersCount} displayRow={displayRow} />
    )
}

export default Users;