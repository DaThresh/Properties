import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';

// Services
import { createProperty } from '../services/properties';
import { pushNotification } from '../services/notifications';
import { closeModal, adjustSize } from '../services/modal';

// Utilities
import { capitalize } from '../utilities/format';
import { apiError } from '../utilities/apiError';

function SetProperty(props){
    const [address, setAddress] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [lotWidth, setLotWidth] = useState('');
    const [lotDepth, setLotDepth] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const setFunctions = {setAddress, setZipcode, setLotWidth, setLotDepth, setPurchaseDate};

    useEffect(() => {
        adjustSize(true);
    }, []);

    var submit = (event) => {
        event.preventDefault();
        if(submitting) return;
        setSubmitting(true);
        let success = false;
        createProperty(address, zipcode, lotWidth, lotDepth, purchaseDate)
        .then(() => success = true)
        .catch(error => apiError(error))
        .finally(() => {
            if(!success) pushNotification('Error', 'Failed to create property', 'danger');
            closeModal(success);
        })
    }

    var handleChange = (event) => {
        let setFunction = 'set' + capitalize(event?.currentTarget?.name ?? 'purchaseDate');
        if(setFunctions[setFunction]) setFunctions[setFunction](event?.currentTarget?.value ?? event);
    }

    var datePreset = (event) => {
        let date = new Date();
        date.setHours(0); date.setMinutes(0); date.setSeconds(0); date.setMilliseconds(0);
        if(event.currentTarget.name === 'yesterday') date.setDate(date.getDate() - 1);
        setPurchaseDate(date);
    }

    return (
        <span id="SetProperty">
            <h4 className="title is-4 has-text-centered">Create Property</h4>
            <form autoComplete="off" onSubmit={submit}>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Address</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" name="address" value={address} onChange={handleChange} placeholder="6839 Coronado Ave" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Zipcode</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="number" name="zipcode" value={zipcode} onChange={handleChange} placeholder="75214" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Lot Width</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="number" name="lotWidth" value={lotWidth} onChange={handleChange} placeholder="55" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Lot Depth</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="number" name="lotDepth" value={lotDepth} onChange={handleChange} placeholder="142" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Purchase Date</label>
                    </div>
                    <div className="field-body">
                        <div className="field is-grouped">
                            <div className="control">
                                <DatePicker className="date-picker" name="purchaseDate" value={purchaseDate} onChange={handleChange} clearIcon={null} minDetail="year" />
                            </div>
                            <div className="control">
                                <button className="button is-info" type="button" name="today" onClick={datePreset}>Today</button>
                            </div>
                            <div className="control">
                                <button className="button is-info" type="button" name="yesterday" onClick={datePreset}>Yesterday</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <div className="control has-text-centered">
                        <button className={'button is-primary' + (submitting ? ' is-loading' : '')} onClick={submit}>Submit</button>
                    </div>
                </div>
            </form>
        </span>
    )
}

export default SetProperty;