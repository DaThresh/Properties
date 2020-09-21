import React, { useState, useEffect } from 'react';
import { differenceInDays } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Components
import SetProperty from './modals/SetProperty';

// Services
import { getProperties } from './services/properties';
import { pushNotification } from './services/notifications';
import { openModal, subscribe, unsubscribe } from './services/modal';
import { getReferenceData } from './services/reference';

// Utilities
import { apiError } from './utilities/apiError';

function Properties(props){
    const statuses = getReferenceData('statuses', 'array');
    const [properties, setProperties] = useState([]);

    var newProperty = () => openModal(<SetProperty />);

    var receiveModalUpdate = (data) => {
        if(data.event === 'close' && data.actionTaken) fetch();
    }

    useEffect(() => {
        fetch()
    }, []);

    useEffect(() => {
        subscribe(receiveModalUpdate);
        return () => unsubscribe(receiveModalUpdate);
    })

    var fetch = () => {
        getProperties()
        .then(properties => setProperties(properties))
        .catch(error => {
            apiError(error);
            pushNotification('Error', 'Failed to load properties', 'danger');
        })
    }

    var statusTag = (status) => {
        if(statuses.length === 0) return status;
        let statusObj = statuses.find(data => data.name === status);
        return (
            <div className="tags has-addons">
                <span className={'tag is-' + statusObj.color}>{status}</span>
                {statuses.indexOf(statusObj) < statuses.length - 1 ?
                    <span className="tag"><FontAwesomeIcon icon={faChevronRight} /></span>
                : null}
            </div>
        )
    }

    return (
        <div>
            <button onClick={newProperty} className="button is-primary">New Property</button>
            <table className="table is-hoverable is-bordered is-fullwidth">
                <thead>
                    <tr className="is-left">
                        <th>Address</th>
                        <th>Status</th>
                        <th>Days Held</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map(property => {
                        return (
                            <tr key={property._id}>
                                <td>{property.address}</td>
                                <td>{statusTag(property.status)}</td>
                                <td>{differenceInDays(new Date, new Date(property.purchaseDate))}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Properties;