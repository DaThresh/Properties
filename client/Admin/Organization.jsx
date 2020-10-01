import React, { useState, useEffect, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

// Components
import NotFound from '../NotFound';
import SetUser from '../modals/SetUser';

// Services
import { getOrganization } from '../services/organizations';
import { getUsers } from '../services/users';
import { openModal, subscribe, unsubscribe } from '../services/modal';

// Utilities
import { apiError } from '../utilities/apiError';

function Organization(props){
    const { organizationId } = useParams();
    const [loading, setLoading] = useState(false);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [organization, setOrganization] = useState({});
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch();
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [organization]);

    useEffect(() => {
        subscribe(handleModalEvent);
        return () => unsubscribe(handleModalEvent);
    }, []);

    var handleModalEvent = (data) => {
        if(data.event === 'close' && data.actionTaken) fetch();
    }

    var fetch = () => {
        if(loading) return;
        setLoading(true);
        getOrganization(organizationId)
        .then(organization => setOrganization(organization))
        .catch(error => apiError(error))
        .finally(() => setLoading(false));
    }

    var fetchUsers = () => {
        if(loadingUsers) return;
        setLoadingUsers(true);
        getUsers(0, 25, {organization: organizationId})
        .then(users => setUsers(users))
        .catch(error => apiError(error))
        .finally(() => setLoadingUsers(false));
    }

    var addModal = () => openModal(<SetUser organization={organizationId} />)

    let page = (
        <Fragment>
            <div className="container is-fluid is-sectioned">
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <h2 className="title is-2">{organization.name}</h2>
                        </div>
                        <div className="level-item">
                            <FontAwesomeIcon icon={faSyncAlt} spin={loading} onClick={fetch} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="columns mt-2">
                <div className="column is-4">
                    <div className="box">
                        <div className="level mb-0">
                            <div className="level-left">
                                <div className="level-item">
                                    <h4 className="title is-4 mb-1">Users</h4>
                                </div>
                            </div>
                            <div className="level-right">
                                <div className="level-item">
                                    <FontAwesomeIcon icon={faPlus} onClick={addModal} />
                                </div>
                            </div>
                        </div>
                        <ul>
                            {users.map(user => <li key={user.id}>{user.fullName}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    )

    let isEmpty = Object.keys(organization).length === 0;
    if(!isEmpty) return page;
    else return loading ? 'Loading' : <NotFound />
}

export default Organization;