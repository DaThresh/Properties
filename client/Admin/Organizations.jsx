import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// Components
import SetOrganization from '../modals/SetOrganization';
import List from '../shared/List';

// Services
import { getOrganizations, getOrganizationsCount, setOrganizationActive } from '../services/organizations';
import { openModal } from '../services/modal';
import { pushNotification } from '../services/notifications';
import { fetch } from '../services/list';

// Utilities
import { capitalize } from '../utilities/format';
import { apiError } from '../utilities/apiError';

const tableHeaders = [
    {name: 'Name', sort: 'name'},
    {name: 'Active', sort: 'active'},
    {name: 'Actions'},
]

function Organizations(props){
    var createModal = () => openModal(<SetOrganization />);

    var disableOrganization = (event) => {
        let organization = JSON.parse(event.currentTarget.dataset.organization);
        let success = false;
        setOrganizationActive(organization.id, false)
        .then(organization => success = true)
        .catch(error => apiError(error))
        .finally(() => {
            if(!success) pushNotification('Error', 'Failed to disable organization', 'danger');
            else fetch();
        })
    }

    var displayRow = (organization) => {
        return (
            <tr key={organization.id}>
                <td><Link to={'/organizations/' + organization.id}>{organization.name}</Link></td>
                <td>{capitalize(JSON.stringify(organization.active))}</td>
                <td>
                    <button className="button is-danger is-small" data-organization={JSON.stringify(organization)} onClick={disableOrganization}>Disable</button>
                </td>
            </tr>
        )
    }

    return (
        <Fragment>
            <div className="container is-fluid is-sectioned">
                <button className="button is-primary" onClick={createModal}>Create Organization</button>
            </div>
            <List tableHeaders={tableHeaders} fetchFunction={getOrganizations} fetchCountFunction={getOrganizationsCount} displayRow={displayRow} />
        </Fragment>
    )
}

export default Organizations;