import React, { useState, useEffect } from 'react';
import { differenceInDays } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Components
import SetProperty from './modals/SetProperty';

// Services
import { getProperties, updatePropertyStatus } from './services/properties';
import { pushNotification } from './services/notifications';
import { openModal, subscribe, unsubscribe } from './services/modal';
import { getReferenceData } from './services/reference';

// Utilities
import { apiError } from './utilities/apiError';

function Properties(props){
    const statuses = getReferenceData('statuses', 'array');
    const [properties, setProperties] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(10);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    var newProperty = () => openModal(<SetProperty />);

    var receiveModalUpdate = (data) => {
        if(data.event === 'close' && data.actionTaken) fetch();
    }

    useEffect(() => {
        fetch()
    }, [page]);

    useEffect(() => {
        subscribe(receiveModalUpdate);
        return () => unsubscribe(receiveModalUpdate);
    })

    var fetch = () => {
        getProperties(10 * (page - 1))
        .then(data => {
            setProperties(data.properties);
            setTotal(data.total);
        })
        .catch(error => {
            apiError(error);
            pushNotification('Error', 'Failed to load properties', 'danger');
        })
    }

    var updateStatus = (event) => {
        if(updatingStatus) return;
        setUpdatingStatus(true);
        let property = properties.find(property => property._id === event.currentTarget.dataset.property);
        let status = event.currentTarget.dataset.status;
        let success = false;
        updatePropertyStatus(property._id, status)
        .then(() => success = true)
        .catch(error => apiError(error))
        .finally(() => {
            if(!success) pushNotification('Error', 'Failed to progress status', 'danger');
            else{
                pushNotification('Success', 'Promoted ' + property.address + ' to ' + status, 'info', {duration: 7.5 * 1000});
                fetch();
            }
            setUpdatingStatus(false);
        })
    }

    var statusTag = (property) => {
        var status = property.status;
        if(statuses.length === 0) return status;
        let index = statuses.findIndex(data => data.name === status);
        let statusObj = statuses[index];
        if(index + 1 !== statuses.length) var nextObj = statuses[index + 1];
        return (
            <div className="tags has-addons">
                <span className={'tag is-' + statusObj.color}>{statusObj.name}</span>
                {typeof nextObj !== 'undefined' ?
                    <span className="tag has-tooltip" onClick={updateStatus} data-property={property._id} data-status={nextObj.name}>
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

    return (
        <span id="Properties">
            <div className="container is-fluid is-sectioned">
                <button onClick={newProperty} className="button is-primary">New Property</button>
            </div>
            <div className="container is-fluid is-sectioned">
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
                                    <td>{statusTag(property)}</td>
                                    <td>{differenceInDays(new Date, new Date(property.purchaseDate))}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="container is-fluid is-sectioned">
                <nav className="pagination is-small" role="navigation" aria-label="pagination">
                    {page > 1 ? 
                        <a className="pagination-previous">Previous</a>
                    : null }
                    {total > page * 10 ?
                        <a className="pagination-next">Next</a>
                    : null }
                    <ul className="pagination-list">
                        <li><a className="pagination-link">1</a></li>
                    </ul>
                </nav>
            </div>
        </span>
    )
}

export default Properties;