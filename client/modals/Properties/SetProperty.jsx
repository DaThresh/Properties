import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';

// Components
import HorizontalField from '../../shared/Forms/HorizontalField';

// Services
import { createProperty } from '../../services/properties';
import { pushNotification } from '../../services/notifications';
import { closeModal, adjustSize } from '../../services/modal';

// Utilities
import { capitalize } from '../../utilities/format';
import { apiError } from '../../utilities/apiError';

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
                <HorizontalField name="address" type="text" label="Address" handleChange={handleChange} value={address} placeholder="6839 Coronado Ave" attributes={{required: true}} />
                <HorizontalField name="zipcode" type="number" label="Zipcode" handleChange={handleChange} value={zipcode} placeholder="75214" attributes={{required: true}} />
                <HorizontalField name="lotWidth" type="number" label="Lot Width" handleChange={handleChange} value={lotWidth} placeholder="55" />
                <HorizontalField name="lotDepth" type="number" label="Lot Depth" handleChange={handleChange} value={lotDepth} placeholder="142" />
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Purchase Date</label>
                    </div>
                    <div className="field-body">
                        <div className="field is-grouped">
                            <div className="control">
                                <DatePicker className="date-picker" name="purchaseDate" value={purchaseDate} onChange={handleChange} clearIcon={null} minDetail="year" required={true} />
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
                        <button className={'button is-primary' + (submitting ? ' is-loading' : '')} type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </span>
    )
}

export default SetProperty;