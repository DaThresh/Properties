import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCamera, faHome, faInfoCircle, faUserFriends, faWallet } from '@fortawesome/free-solid-svg-icons';

// Components
import General from './Pages/General';
import Financials from './Pages/Financials';
import Dates from './Pages/Dates';
import People from './Pages/People';
import Photos from './Pages/Photos';
const components = {General, Financials, Dates, People, Photos};

// Services
import { getProperty } from '../services/properties';
import { getReferenceData } from '../services/reference';

// Utilities
import { apiError } from '../utilities/apiError';

function Property(props){
    const statuses = getReferenceData('statuses');
    const { propertyId } = useParams();
    const [property, setProperty] = useState({});
    const [page, setPage] = useState(null);
    const pageName = useRef('');

    useEffect(() => {
        fetch();
    }, []);

    useEffect(() => {
        if(pageName.current === '') return;
        let Component = components[pageName.current];
        setPage(<Component property={property} fetch={fetch} />);
    }, [property]);

    var fetch = () => {
        getProperty(propertyId)
        .then(property => setProperty(property))
        .catch(error => apiError(error));
    }

    var statusColor = (status) => {
        let statusObj = statuses.find(obj => obj.value === status);
        return statusObj?.color ?? '';
    }

    var changePage = (event) => {
        pageName.current = event.currentTarget.dataset.page;
        let Component = components[event.currentTarget.dataset.page];
        setPage(<Component property={property} fetch={fetch} />);
    }

    return (
        <div className="container is-fluid is-sectioned">
            <div className="columns">
                <div className="column is-4 is-3-desktop">
                    <div className="box has-text-centered">
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
                        <a className="panel-block" onClick={changePage} data-page="Photos">
                            <span className="panel-icon">
                                <FontAwesomeIcon icon={faCamera} />
                            </span>
                            Photos
                        </a>
                    </nav>
                </div>
                <div className="column is-8 is-9-desktop">
                    {page}
                </div>
            </div>
        </div>
    )
}

export default Property;