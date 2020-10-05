import React from 'react';

function Photos(props){
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
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13].map(num => Photo())}
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
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13].map(num => Photo())}
                </div>
            </div>
        </div>
    )
}

function Photo(){
    return (
        <figure className="image is-128x128">
            <img src="https://bulma.io/images/placeholders/256x256.png" />
        </figure>
    )
}

export default Photos;