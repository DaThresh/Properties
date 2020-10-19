import React, { useState, useEffect, useRef, Fragment } from 'react';

// Services
import { adjustSize, closeModal } from '../../services/modal';
import { reorderPictures } from '../../services/properties';
import { pushNotification } from '../../services/notifications';

// Utilities
import { apiError } from '../../utilities/apiError';

function SetPhotoOrder(props){
    const { property, setProperty, srcs, type } = props;
    const [loading, setLoading] = useState(false);
    const srcsRef = useRef([...srcs]);
    const dragging = useRef(null);

    useEffect(() => {
        adjustSize(false);
    }, []);

    var submit = (event) => {
        if(loading) return;
        setLoading(true);
        var data = null;
        reorderPictures(property.id, type, srcsRef.current)
        .then(property => data = property)
        .catch(error => apiError(error))
        .finally(() => {
            data ? setProperty(data) : pushNotification('Error', 'Failed to update picture order', 'danger');
            closeModal(Boolean(data));
        })
    }

    var dragStart = (event) => {
        event.currentTarget.classList.add('dragging');
        dragging.current = event.currentTarget;
    }

    var dragEnd = (event) => {
        event.currentTarget.classList.remove('dragging');
        dragging.current = null;
    }

    var dragOver = (event) => {
        event.preventDefault();
        const target = event.target;
        if(!target.classList.contains('draggable')) return;
        if(dragging.current.isSameNode(target)) return;
        const halfwayX = target.x + target.width / 2;
        const sibling = event.pageX > halfwayX ? target.nextSibling : target;
        event.currentTarget.insertBefore(dragging.current, sibling);
        // Correct SRCs Ref Order
        const movingSrc = srcsRef.current.find(src => dragging.current.currentSrc.endsWith(src));
        const siblingSrc = srcsRef.current.find(src => sibling?.currentSrc?.endsWith(src));
        var arr = srcsRef.current;
        arr.splice(arr.indexOf(movingSrc), 1);
        siblingSrc ? arr.splice(arr.indexOf(siblingSrc), 0, movingSrc) : arr.push(movingSrc);
        srcsRef.current = arr;
    }

    return (
        <Fragment>
            <h2 className="title has-text-centered is-2">Drag and Drop images to Change Order</h2>
            <div className="draggable-container has-text-centered" onDragOver={dragOver}>
                {srcs.map((src, index) => <img key={index} src={src} className="draggable" onDragStart={dragStart} onDragEnd={dragEnd} />)}
            </div>
            <div className="field">
                <div className="control has-text-centered">
                    <button className={'button is-primary' + (loading ? ' is-loading' : '')} onClick={submit}>Submit</button>
                </div>
            </div>
        </Fragment>
    )
}

export default SetPhotoOrder;