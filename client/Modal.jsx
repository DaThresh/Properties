import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

// Services
import { subscribe, unsubscribe, closeModal } from './services/modal';

function Modal(props){
    const [modal, setModal] = useState(null);

    var receiveModalUpdate = (data) => {
        if(data.event === 'open') setModal(data.component);
        if(data.event === 'close') setModal(null);
    }

    useEffect(() => {
        subscribe(receiveModalUpdate);
        return () => unsubscribe(receiveModalUpdate);
    })

    return (
        <div className="modal">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box">
                    {modal}
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
        </div>
    )
}

export default hot(Modal);