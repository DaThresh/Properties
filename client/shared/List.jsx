import React, { useState, useEffect, useRef, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
library.add(faSort, faSortUp, faSortDown);

// Components
import Pagination from './Pagination';

// Services
import { pushNotification } from '../services/notifications';
import { subscribe as modalSubscribe, unsubscribe as modalUnsubscribe } from '../services/modal';
import { fetchingUpdate, subscribe as listSubscribe, unsubscribe as listUnsubscribe } from '../services/list';
import { getReferenceData } from '../services/reference';

// Utilities
import { apiError } from '../utilities/apiError';

function List(props){
    const { tableHeaders, fetchFunction, fetchCountFunction, displayRow } = props;
    const pageSize = getReferenceData('settings').pageSize;
    const [sorts, setSorts] = useState({});
    const [fetching, setFetching] = useState(false);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(pageSize);
    const firstRender = useRef(true);
    let pageCount = Math.ceil(count / pageSize);

    useEffect(() => {
        fetch(firstRender.current);
        if(firstRender.current) firstRender.current = false;
    }, [page, sorts]);

    useEffect(() => {
        fetchingUpdate(fetching);
    }, [fetching]);

    useEffect(() => {
        modalSubscribe(receiveModalUpdate);
        listSubscribe(receiveListUpdate);
        return () => {
            modalUnsubscribe(receiveModalUpdate);
            listUnsubscribe(receiveListUpdate);
        }
    })

    var receiveModalUpdate = (data) => {
        if(data.event === 'close' && data.actionTaken) fetch();
    }

    var receiveListUpdate = (data) => {
        if(data.event === 'fetch') fetch(data.fetchCount);
    }

    var fetch = (fetchCount = false) => {
        if(fetching) return;
        setFetching(true);
        var newItems, newCount;
        fetchFunction(pageSize * (page - 1), pageSize, {}, sorts)
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

    var changePage = (event) => {
        let num = Number(event.currentTarget.dataset.number);
        if(num !== NaN) setPage(num);
    }

    var changeSorts = (event) => {
        var sortName = event.currentTarget.dataset.sort;
        let obj = {};
        if(!sorts[sortName]) obj[sortName] = 1;
        else if(sorts[sortName] === 1) obj[sortName] = -1;
        setSorts(obj);
    }

    var sortIcon = (sort) => {
        if(!sorts[sort]) return 'sort';
        return sorts[sort] === 1 ? 'sort-down' : 'sort-up';
    }

    return (
        <Fragment>
            <div className="container is-fluid is-sectioned">
                <table className="table is-hoverable is-bordered is-fullwidth">
                    <thead>
                        <tr className="is-left">
                            {tableHeaders.map((header, index) => 
                                <th key={index}>{header.name} {header.sort ? <FontAwesomeIcon onClick={changeSorts} icon={sortIcon(header.sort)} data-sort={header.sort} /> : null}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => displayRow(item))}
                    </tbody>
                </table>
            </div>
            {pageCount > 1 ? <Pagination {...{page, pageCount, changePage}} /> : null}
        </Fragment>
    )
}

export default List;