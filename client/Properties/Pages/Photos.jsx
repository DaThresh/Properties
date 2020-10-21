import React, { useState, useRef, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

// Components
import SetPhotoOrder from '../../modals/Properties/SetPhotoOrder';

// Services
import { uploadPictures, removePictures } from '../../services/properties';
import { pushNotification } from '../../services/notifications';
import { openModal } from '../../services/modal';

// Utilities
import { apiError } from '../../utilities/apiError';

function Photos(props){
    const { property, setProperty } = props;
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
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
        let type = event.currentTarget.name, data = null;
        uploadPictures(property.id, type, files)
        .then(property => data = property)
        .catch(error => apiError(error))
        .finally(() => {
            data ? setProperty(data) : pushNotification('Error', 'Failed to upload photos', 'danger');
            setLoading(false);
        })
    }

    var deletePhoto = (event) => {
        if(deleting) return;
        setDeleting(true);
        let { type, index } = event.currentTarget.dataset;
        let data = null;
        removePictures(property.id, type, [property.images[type][Number(index)]])
        .then(property => data = property)
        .catch(error => apiError(error))
        .finally(() => {
            data ? setProperty(data) : pushNotification('Error', 'Failed to delete picture', 'danger');
            setDeleting(false);
        })
    }

    var orderModal = (event) => {
        event.preventDefault();
        let imageType = event.currentTarget.dataset.modal;
        openModal(<SetPhotoOrder property={property} setProperty={setProperty} type={imageType} srcs={property.images[imageType]} />);
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
                            <button className="button is-primary is-small" onClick={orderModal} data-modal="public">Change order</button>
                        </div>
                    </div>
                </div>
                <div className="container container-photo is-fluid">
                    <Images type="public" property={property} deletePhoto={deletePhoto} />
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
                            <button className="button is-primary is-small" onClick={orderModal} data-modal="private">Change order</button>
                        </div>
                    </div>
                </div>
                <div className="container container-photo is-fluid">
                    <Images type="private" property={property} deletePhoto={deletePhoto} />
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

function Images(props){
    const { property, type, deletePhoto } = props;

    return (
        <Fragment>
            {property.images[type].map((url, index) => {
                return (
                    <span className="img-container" key={index}>
                        <a className="delete is-medium" onClick={deletePhoto} data-type={type} data-index={index}></a>
                        <img src={url} />
                    </span>
                )
            })}
        </Fragment>
    )
}

export default Photos;