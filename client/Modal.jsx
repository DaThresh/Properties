import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

// Components
import SetContact from './modals/SetContact';

// Services
import { subscribe, unsubscribe, closeModal } from './services/modal';

function Modal(props){
    const [modal, setModal] = useState(null);
    const [modalProps, setModalProps] = useState({});
    const modals = {SetContact};
    var Component = modals[modal];

    var receiveModalUpdate = (data) => {
        if(data.event !== 'open') return;
        setModalProps(data.props);
        setModal(data.component);
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
                    {modal ? <Component {...modalProps} /> : null}
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
        </div>
    )
}

export default hot(Modal);