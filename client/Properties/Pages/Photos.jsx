import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

// Services
import { uploadPictures } from '../../services/properties';
import { pushNotification } from '../../services/notifications';

// Utilities
import { apiError } from '../../utilities/apiError';

function Photos(props){
    const { property, fetch } = props;
    const [loading, setLoading] = useState(false);
    const publicInput = useRef(null);
    const privateInput = useRef(null);
    const inputs = {publicInput, privateInput};

    var clickInput = (event) => {
        let type = event.currentTarget.dataset.input, inputName = type + 'Input';
        inputs[inputName].current.click();
    }

    var uploadFiles = (event) => {
        event.preventDefault();
        if(loading) return;
        setLoading(true);
        const files = event.currentTarget.files;
        let type = event.currentTarget.name, success = false;
        uploadPictures(property.id, type, files)
        .then(() => success = true)
        .catch(error => apiError(error))
        .finally(() => {
            if(!success) pushNotification('Error', 'Failed to upload photos', 'danger');
            if(success) fetch();
            setLoading(false);
        })
    }

    return (
        <div className="box">
            <div className="container is-fluid is-sectioned">
                <div className="level mb-2">
                    <div className="level-left">
                        <div className="level-item">
                            <h3 className="title is-4">Public Photos</h3>
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <button className="button is-primary is-small">Change order</button>
                        </div>
                    </div>
                </div>
                <div className="container container-photo is-fluid">
                    {property.images.public.map((src, index) => <img key={index} src={src} />)}
                    <Upload type="public" inputs={inputs} clickInput={clickInput} uploadFiles={uploadFiles} />
                </div>
            </div>
            <div className="container is-fluid is-sectioned">
                <div className="level mb-2">
                    <div className="level-left">
                        <div className="level-item">
                            <h3 className="title is-4">Interal Photos</h3>
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <button className="button is-primary is-small">Change order</button>
                        </div>
                    </div>
                </div>
                <div className="container container-photo is-fluid">
                    {property.images.private.map((src, index) => <img key={index} src={src} />)}
                    <Upload type="private" inputs={inputs} clickInput={clickInput} uploadFiles={uploadFiles} />
                </div>
            </div>
        </div>
    )
}

function Upload(props){
    const { type, inputs, clickInput, uploadFiles } = props;

    return (
        <div className="upload has-text-centered" onClick={clickInput} data-input={type}>
            <div className="hero">
                <div className="hero-body">
                    <input className="is-hidden" type="file" ref={inputs[type + 'Input']} name={type} onChange={uploadFiles} accept="image/png image/jpeg" multiple />
                    <span className="icon mb-1">
                        <FontAwesomeIcon icon={faUpload} />
                    </span>
                    <p className="mt-1">Upload more...</p>
                </div>
            </div>
        </div>
    )
}

export default Photos;