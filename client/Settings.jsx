import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Services
import { getReferenceData, updateReferenceData } from './services/reference';
import { changeSettings } from './services/account';
import { pushNotification } from './services/notifications';

// Utilities
import { apiError } from './utilities/apiError';

function Settings(){
    const settings = getReferenceData('settings');
    const [loading, setLoading] = useState(false);
    const [pageSize, setPageSize] = useState(settings.pageSize);
    const [mouseDown, setMouseDown] = useState(null);

    useEffect(() => {
        if(mouseDown === null) return;
        var delay = 600;
        var timeout = setTimeout(handleStep, delay);
        
        function handleStep(){
            setPageSize(current => {
                if(mouseDown && current < 50) return current + 1;
                else if(!mouseDown && current > 5) return current - 1;
                else return current;
            })
            if(delay > 150) delay -= 100;
            timeout = setTimeout(handleStep, delay);
        }

        return () => clearTimeout(timeout);
    }, [mouseDown]);
    
    var submit = (event) => {
        event.preventDefault();
        if(loading) return;
        setLoading(true);
        let success = false, settings = ['pageSize'], values = [pageSize];
        changeSettings(settings, values)
        .then(() => success = true)
        .catch(error => apiError(error))
        .finally(() => {
            if(!success) pushNotification('Error', 'Failed to update settings', 'danger');
            if(success) updateReferenceData(settings, values);
            setLoading(false);
        })
    }

    var incrementPageSize = () => setPageSize(current => {return current < 50 ? current + 1 : current});
    var decrementPageSize = () => setPageSize(current => {return current > 5 ? current - 1 : current});

    var handleMouseDown = (event) => setMouseDown(event.currentTarget.dataset.up === "true");
    var handleMouseUp = () => setMouseDown(null);

    return (
        <div className="container is-fluid is-sectioned">
            <div className="columns">
                <div className="column is-4">
                    <div className="box">
                        <form onSubmit={submit}>
                            <h2 className="title is-4 has-text-centered">List Settings</h2>
                            <div className="columns is-vcentered">
                                <div className="column is-narrow">
                                    <label className="label">Page Size</label>
                                </div>
                                <div className="column">
                                    <div className="field has-addons has-addons-centered">
                                        <span className="control" style={{zIndex: 1}}>
                                            <button type="button" className="button" onClick={decrementPageSize} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} data-up="false">
                                                <FontAwesomeIcon icon={faChevronLeft} />
                                            </button>
                                        </span>
                                        <span className="control">
                                            <input className="input has-text-centered input-addon-border" type="text" name="pageSize" value={pageSize} onChange={() => {}} />
                                        </span>
                                        <span className="control">
                                            <button type="button" className="button" onClick={incrementPageSize} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} data-up="true">
                                                <FontAwesomeIcon icon={faChevronRight} />
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control has-text-centered">
                                    <button className={'button is-primary' + (loading ? ' is-loading' : '')} type="submit">Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;