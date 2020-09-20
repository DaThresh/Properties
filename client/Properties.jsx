import React, { useState, useEffect } from 'react';
import { differenceInDays } from 'date-fns';

// Components
import SetProperty from './modals/SetProperty';

// Services
import { getProperties } from './services/properties';
import { pushNotification } from './services/notifications';
import { openModal, subscribe, unsubscribe } from './services/modal';

// Utilities
import { apiError } from './utilities/apiError';

function Properties(props){
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

    return (
        <div>
            <button onClick={newProperty} className="button is-primary">New Property</button>
            <table className="table is-hoverable is-bordered is-fullwidth">
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Days Held</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map(property => {
                        return (
                            <tr>
                                <td>{property.address}</td>
                                <td>{property.status}</td>
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