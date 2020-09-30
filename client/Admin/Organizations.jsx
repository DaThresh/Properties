import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// Components
import List from '../shared/List';

// Services
import { getOrganizations, getOrganizationsCount } from '../services/organizations';

// Utilities
import { capitalize } from '../utilities/format';

function Organizations(props){
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

            </div>
            <List tableHeaders={['Name', 'Active', 'Actions']} fetchFunction={getOrganizations} fetchCountFunction={getOrganizationsCount} displayRow={displayRow} />
        </Fragment>
    )
}

export default Organizations;