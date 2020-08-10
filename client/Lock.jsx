import React from 'react';
import { hot } from 'react-hot-loader/root';

function Lock(props){
    return (
        <section className="hero is-primary is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="card">
                        <header clasName="card-header">
                            <p className="card-header-title">
                                testing
                            </p>
                        </header>
                        <div className="card-content">
                            content here
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default hot(Lock);