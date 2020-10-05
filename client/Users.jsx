import React, { useEffect, useState, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

// Components
import List from './shared/List';
import SetUser from './modals/SetUser';

// Services
import { getUsers, getUsersCount } from './services/users';
import { subscribe, unsubscribe, fetch } from './services/list';
import { openModal } from './services/modal';

const tableHeaders = [
    {name: 'Name', sort: 'firstName'},
    {name: 'Email', sort: 'email'},
    {name: 'Role', sort: 'role'},
]

function Users(){
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        subscribe(receiveListUpdate);
        return () => unsubscribe(receiveListUpdate);
    })

    var receiveListUpdate = (data) => {
        if(data.event === 'fetch') setFetching(data.fetching);
    }

    var setUserModal = () => openModal(<SetUser />);

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
        <Fragment>
            <div className="container is-fluid is-sectioned">
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <button className="button is-primary is-small" onClick={setUserModal}>Create User</button>
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <FontAwesomeIcon icon={faSyncAlt} spin={fetching} onClick={() => fetch(true)} />
                        </div>
                    </div>
                </div>
            </div>
            <List tableHeaders={tableHeaders} fetchFunction={getUsers} fetchCountFunction={getUsersCount} displayRow={displayRow} />
        </Fragment>
    )
}

export default Users;