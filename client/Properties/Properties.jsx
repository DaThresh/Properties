import React, { useState, Fragment } from 'react';
import { differenceInDays } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// Components
import List from '../shared/List';
import SetProperty from '../modals/Properties/SetProperty';

// Services
import { getProperties, getPropertiesCount, updatePropertyStatus } from '../services/properties';
import { pushNotification } from '../services/notifications';
import { openModal } from '../services/modal';
import { getReferenceData } from '../services/reference';
import { fetch } from '../services/list';

// Utilities
import { apiError } from '../utilities/apiError';

const tableHeaders = [
    {name: 'Address', sort: 'address'},
    {name: 'Status', sort: 'status'},
    {name: 'City'},
    {name: 'Days Held'},
]

function Properties(props){
    const statuses = getReferenceData('statuses');
    const [updatingStatus, setUpdatingStatus] = useState(false);

    var newProperty = () => openModal(<SetProperty />);

    var updateStatus = (event) => {
        if(updatingStatus) return;
        setUpdatingStatus(true);
        let { propertyId, address, nextStatus } = JSON.parse(event.currentTarget.dataset.property);
        let success = false;
        updatePropertyStatus(propertyId, nextStatus.value)
        .then(() => success = true)
        .catch(error => apiError(error))
        .finally(() => {
            if(!success) pushNotification('Error', 'Failed to progress status', 'danger');
            else pushNotification('Success', 'Promoted ' + address + ' to ' + nextStatus.name, 'info', {duration: 7.5 * 1000});
            setUpdatingStatus(false);
            fetch();
        })
    }

    var statusTag = (property) => {
        var status = property.status;
        let index = statuses.findIndex(data => data.value === status);
        let statusObj = statuses[index];
        if(index + 1 !== statuses.length) var nextObj = statuses[index + 1];
        return (
            <div className="tags has-addons">
                <span className={'tag is-' + statusObj.color}>{statusObj.name}</span>
                {typeof nextObj !== 'undefined' ?
                    <span className="tag has-tooltip" onClick={updateStatus} data-property={JSON.stringify({propertyId: property.id, address: property.address, nextStatus: nextObj})}>
                        <FontAwesomeIcon icon={faChevronRight} />
                        <span className="tooltip has-text-centered">
                            <p>Promote to</p>
                            <span className={'tag mb-0 is-' + nextObj.color}>{nextObj.name}</span>
                        </span>
                    </span>
                : null}
            </div>
        )
    }

    var displayRow = (property) => {
        return (
            <tr key={property.id}>
                <td><Link to={'/properties/'+ property.id}>{property.address}</Link></td>
                <td>{statusTag(property)}</td>
                <td>{property.city}</td>
                <td>{differenceInDays(new Date, new Date(property.purchaseDate))}</td>
            </tr>
        )
    }

    return (
        <Fragment>
            <div className="container is-fluid is-sectioned">
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <button onClick={newProperty} className="button is-primary is-small">New Property</button>
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <FontAwesomeIcon icon={faSyncAlt} onClick={fetch} />
                        </div>
                    </div>
                </div>
            </div>
            <List tableHeaders={tableHeaders} fetchFunction={getProperties} fetchCountFunction={getPropertiesCount} displayRow={displayRow} />
        </Fragment>
    )
}

export default Properties;