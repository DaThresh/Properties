import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// Components
import SetOrganization from '../modals/SetOrganization';
import List from '../shared/List';

// Services
import { getOrganizations, getOrganizationsCount } from '../services/organizations';
import { openModal } from '../services/modal';

// Utilities
import { capitalize } from '../utilities/format';

function Organizations(props){
    var createModal = () => openModal(<SetOrganization />);

    var displayRow = (organization) => {
        return (
            <tr key={organization.id}>
                <td><Link to={'/organizations/' + organization.id}>{organization.name}</Link></td>
                <td>{capitalize(JSON.stringify(organization.active))}</td>
                <td>Actions</td>
            </tr>
        )
    }

    return (
        <Fragment>
            <div className="container is-fluid is-sectioned">
                <button className="button is-primary" onClick={createModal}>Create Organization</button>
            </div>
            <List tableHeaders={['Name', 'Active', 'Actions']} fetchFunction={getOrganizations} fetchCountFunction={getOrganizationsCount} displayRow={displayRow} />
        </Fragment>
    )
}

export default Organizations;