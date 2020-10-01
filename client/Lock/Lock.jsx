import React, { useState } from 'react';

// Components
import Login from './Login';
import AccessCode from './AccessCode';
import Setup from './Setup';
const components = {Login, AccessCode, Setup};

function Lock(){
    var changePage = (event) => {
        if(loading) return;
        let Component = components[event?.currentTarget?.dataset?.page ?? event];
        setPage(<Component loading={loading} setLoading={setLoading} changePage={changePage} />);
    }

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(<Login loading={loading} setLoading={setLoading} changePage={changePage} />);

    return (
        <section className="hero is-primary is-fullheight">
            <div className="hero-body">
                {page}
            </div>
        </section>
    )
}

export default Lock;