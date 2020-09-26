import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faHome, faInfoCircle, faUserFriends, faWallet } from '@fortawesome/free-solid-svg-icons';

// Components
import General from './Pages/General';
import Financials from './Pages/Financials';
import Dates from './Pages/Dates';
import People from './Pages/People';
const components = {General, Financials, Dates, People};

// Services
import { getProperty } from '../services/properties';
import { getReferenceData } from '../services/reference';

// Utilities
import { apiError } from '../utilities/apiError';

function Property(props){
    const statuses = getReferenceData('statuses', 'array');
    const { propertyId } = useParams();
    const [property, setProperty] = useState({});
    const [page, setPage] = useState(null);

    useEffect(() => {
        getProperty(propertyId)
        .then(property => setProperty(property))
        .catch(error => apiError(error));
    }, []);

    var statusColor = (status) => {
        let statusObj = statuses.find(obj => obj.name === status);
        return statusObj?.color ?? '';
    }

    var changePage = (event) => {
        let Component = components[event.currentTarget.dataset.page];
        setPage(<Component property={property} />);
    }

    return (
        <span id="Property">
            <div className="container is-fluid is-sectioned">
                <div className="columns">
                    <div className="column is-4">
                        <div className="box">
                            <FontAwesomeIcon icon={faHome} size="10x" />
                        </div>
                        <nav className={'panel is-' + statusColor(property.status)}>
                            <p className="panel-heading">
                                {property.address}
                            </p>
                            <a className="panel-block" onClick={changePage} data-page="General">
                                <span className="panel-icon">
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                </span>
                                General
                            </a>
                            <a className="panel-block" onClick={changePage} data-page="Financials">
                                <span className="panel-icon">
                                    <FontAwesomeIcon icon={faWallet} />
                                </span>
                                Financials
                            </a>
                            <a className="panel-block" onClick={changePage} data-page="Dates">
                                <span className="panel-icon">
                                    <FontAwesomeIcon icon={faCalendar} />
                                </span>
                                Dates
                            </a>
                            <a className="panel-block" onClick={changePage} data-page="People">
                                <span className="panel-icon">
                                    <FontAwesomeIcon icon={faUserFriends} />
                                </span>
                                People
                            </a>
                        </nav>
                    </div>
                    <div className="column">
                        {page}
                    </div>
                </div>
            </div>
        </span>
    )
}

export default Property;