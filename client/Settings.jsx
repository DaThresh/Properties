import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faUpload } from '@fortawesome/free-solid-svg-icons';

// Services
import { getReferenceData, updateReferenceData } from './services/reference';
import { changeSettings } from './services/account';
import { uploadProfilePhoto } from './services/organizations';
import { pushNotification } from './services/notifications';

// Utilities
import { apiError } from './utilities/apiError';

function Settings(){
    const settings = getReferenceData('settings');
    const [loadingUser, setLoadingUser] = useState(false);
    const [loadingOrganization, setLoadingOrganization] = useState(false);
    const [pageSize, setPageSize] = useState(settings.pageSize);
    const [file, setFile] = useState(null);
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
    
    var submitUser = (event) => {
        event.preventDefault();
        if(loadingUser) return;
        setLoadingUser(true);
        let success = false, settings = ['pageSize'], values = [pageSize];
        changeSettings(settings, values)
        .then(() => success = true)
        .catch(error => apiError(error))
        .finally(() => {
            if(!success) pushNotification('Error', 'Failed to update settings', 'danger');
            if(success) updateReferenceData(settings, values);
            setLoadingUser(false);
        })
    }

    var submitOrganization = (event) => {
        event.preventDefault();
        if(loadingOrganization) return;
        setLoadingOrganization(true);
        let success = null;
        uploadProfilePhoto(file)
        .then(url => success = url)
        .catch(error => apiError(error))
        .finally(() => {
            if(!success) pushNotification('Error', 'Failed to upload organization profile photo', 'danger');
            if(success){
                let imageElements = document.getElementsByClassName('organization-logo');
                imageElements.forEach(element => element.src = success);
            }
            setLoadingOrganization(false);
        })
    }

    var incrementPageSize = () => setPageSize(current => {return current < 50 ? current + 1 : current});
    var decrementPageSize = () => setPageSize(current => {return current > 5 ? current - 1 : current});

    var handleMouseDown = (event) => setMouseDown(event.currentTarget.dataset.up === "true");
    var handleMouseUp = () => setMouseDown(null);

    var setFileInfo = (event) => setFile(event.currentTarget.files[0]);

    return (
        <div className="container is-fluid is-sectioned">
            <div className="columns">
                <div className="column is-4">
                    <div className="box">
                        <form onSubmit={submitUser}>
                            <h2 className="title is-4 has-text-centered">User Settings</h2>
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
                                    <button className={'button is-primary' + (loadingUser ? ' is-loading' : '')} type="submit">Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="column is-4">
                    <div className="box">
                        <form onSubmit={submitOrganization}>
                            <h2 className="title is-4 has-text-centered">Organization Settings</h2>
                            <div className="columns is-vcentered">
                                <div className="column is-narrow">
                                    <label className="label">Picture</label>
                                </div>
                                <div className="column">
                                    <div className="field">
                                        <div className="file is-right">
                                            <label className="file-label" style={{width: '100%'}}>
                                                <input className="file-input" type="file" name="profilePicture" accept="image/png, image/jpeg" onChange={setFileInfo} />
                                                <span className="file-cta">
                                                    <span className="file-icon">
                                                        <FontAwesomeIcon icon={faUpload} />
                                                    </span>
                                                    <span className="file-label">
                                                        Upload
                                                    </span>
                                                </span>
                                                <span className="file-name" style={{width: '100%'}}>
                                                    {file?.name}
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control has-text-centered">
                                    <button className={'button is-primary' + (loadingOrganization ? ' is-loading' : '')} type="submit">Update</button>
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