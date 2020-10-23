import React, { Fragment } from 'react';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

// SCSS
import sizes from '../../sass/sizeJS.scss';

function People(props){
    const isDesktop = useMediaQuery({ minWidth: sizes.desktop });

    const buildBox = (
        <Fragment>
            <h5 className="title is-5 has-text-centered">Build</h5>
            <Person field="Builder" name="Andrew Thresher" business="Thresher Inc." />
            <Person field="Architect" name="Bob Builder" business="Bob the Builder Corp" />
            <Person field="Mason" name="Jacob Blake" business="Jacob's Field Industries LLC" />
        </Fragment>
    )
    const sellBox = (
        <Fragment>
            <h5 className="title is-5 has-text-centered">Sell</h5>
        </Fragment>
    )
    const otherBox = (
        <Fragment>
            <h5 className="title is-5 has-text-centered">Other</h5>
        </Fragment>
    )

    return (
        <Fragment>
            {isDesktop ? 
                <div className="box">
                    <div className="columns">
                        <div className="column">
                            {buildBox}
                        </div>
                        <div className="column">
                            {sellBox}
                        </div>
                        <div className="column">
                            {otherBox}
                        </div>
                    </div>
                </div>
            : 
                <Fragment>
                    <div className="box">
                        {buildBox}
                    </div>
                    <div className="box">
                        {sellBox}
                    </div>
                    <div className="box">
                        {otherBox}
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

function Person(props){
    const { field, name, business } = props;

    var showBusiness = (event) => event.currentTarget.innerText = business;
    var showName = (event) => event.currentTarget.innerText = name;

    return (
        <div className="field has-addons has-addons-centered">
            <div className="level" style={{width: '100%'}}>
                <div className="level-left">
                    <div className="level-item">
                        <h6 className="title is-6">{field}</h6>
                    </div>
                </div>
                <div className="level-item" onMouseOver={showBusiness} onMouseOut={showName}>
                    {name}
                </div>
                <div className="level-right">
                    <div className="level-item">
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default People;