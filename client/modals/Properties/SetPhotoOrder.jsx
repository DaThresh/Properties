import React, { useEffect, useRef, Fragment } from 'react';

// Services
import { adjustSize } from '../../services/modal';

function SetPhotoOrder(props){
    const { srcs, type } = props;
    const srcsRef = useRef([...srcs]);
    const dragging = useRef(null);

    useEffect(() => {
        adjustSize(false);
    }, []);

    var submit = (event) => {
        console.log('Submitting...');
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
                    <button className="button is-primary" onClick={submit}>Submit</button>
                </div>
            </div>
        </Fragment>
    )
}

export default SetPhotoOrder;