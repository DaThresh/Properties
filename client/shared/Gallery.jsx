import React, { useState, useEffect } from 'react';

// Services
import { getReferenceData } from '../services/reference';
import { pushNotification } from '../services/notifications';

// Utilities
import { apiError } from '../utilities/apiError';

function Gallery(props){
    const { fetchFunction, fetchCountFunction, displayGallery } = props;
    const pageSize = getReferenceData('settings').pageSize;
    const [fetching, setFetching] = useState(false);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(pageSize);

    useEffect(() => {
        fetch(true);
    }, []);

    var fetch = (fetchCount = false) => {
        if(fetching) return;
        setFetching(true);
        var newItems, newCount;
        fetchFunction(pageSize * (page - 1), pageSize)
        .then(data => {
            newItems = data;
            return fetchCount ? fetchCountFunction() : count;
        })
        .then(data => newCount = data)
        .then(() => {
            setItems(newItems);
            setCount(newCount);
        })
        .catch(error => {
            apiError(error);
            pushNotification('Error', 'Error loading list data', 'danger');
        })
        .finally(() => setFetching(false));
    }

    return (
        <div className="container is-fluid is-sectioned">
            <div className="columns is-multiline">
                {items.map(item => displayGallery(item))}
            </div>
        </div>
    )
}

export default Gallery;