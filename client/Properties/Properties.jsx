import React, { useState } from 'react';
import { differenceInDays } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
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
                <td>{property.city}</td>
                <td>{statusTag(property)}</td>
                <td>{differenceInDays(new Date, new Date(property.purchaseDate))}</td>
            </tr>
        )
    }

    return (
        <span id="Properties">
            <div className="container is-fluid is-sectioned">
                <button onClick={newProperty} className="button is-primary">New Property</button>
            </div>
            <List tableHeaders={['Address', 'City', 'Status', 'Days Held']} fetchFunction={getProperties} fetchCountFunction={getPropertiesCount} displayRow={displayRow} />
        </span>
    )
}

export default Properties;