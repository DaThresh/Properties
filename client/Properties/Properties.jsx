import React, { useState, useEffect } from 'react';
import { differenceInDays } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// Components
import SetProperty from '../modals/SetProperty';
import Pagination from '../shared/Pagination';

// Services
import { getProperties, getPropertiesCount, updatePropertyStatus } from '../services/properties';
import { pushNotification } from '../services/notifications';
import { openModal, subscribe, unsubscribe } from '../services/modal';
import { getReferenceData } from '../services/reference';

// Utilities
import { apiError } from '../utilities/apiError';

function Properties(props){
    const statuses = getReferenceData('statuses', 'array');
    const [fetching, setFetching] = useState(false);
    const [properties, setProperties] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(10);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    let pageCount = Math.ceil(count / 10);

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
        if(fetching) return;
        setFetching(true);
        var properties, count;
        getProperties(10 * (page - 1), 10)
        .then(data => {
            properties = data;
            return getPropertiesCount()
        })
        .then(data => count = data)
        .then(() => {
            setProperties(properties);
            setCount(count);
        })
        .catch(error => {
            apiError(error);
            pushNotification('Error', 'Failed to load properties', 'danger');
        })
        .finally(() => setFetching(false));
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

    var changePage = (event) => {
        let num = Number(event.currentTarget.dataset.number);
        if(num !== NaN) setPage(num);
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
                            <th>City</th>
                            <th>Status</th>
                            <th>Days Held</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map(property => {
                            return (
                                <tr key={property._id}>
                                    <td><Link to={'/properties/' + property.id}>{property.address}</Link></td>
                                    <td>{property.city}</td>
                                    <td>{statusTag(property)}</td>
                                    <td>{differenceInDays(new Date, new Date(property.purchaseDate))}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {pageCount > 1 ? <Pagination {...{page, pageCount, changePage}} /> : null}
        </span>
    )
}

export default Properties;