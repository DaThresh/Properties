import React from 'react';

function Pagination(props){
    var {page, pageCount, changePage} = props;

    return (
        <div className="container is-fluid is-sectioned">
            <nav className="pagination is-small" role="navigation" aria-label="pagination">
                {page > 1 ? <a className="pagination-previous" onClick={changePage} data-number={page - 1}>Previous</a> : null }
                {page < pageCount ? <a className="pagination-next" onClick={changePage} data-number={page + 1}>Next</a> : null }
                {pageCount > 1 ? 
                    <ul className="pagination-list">
                        {page >= 3 ?
                            <span>
                                <li><a className="pagination-link" onClick={changePage} data-number={1}>1</a></li>
                                <li><span className="pagination-ellipsis">&hellip;</span></li>
                            </span>
                        : null }
                        {page > 1 ? <li><a className="pagination-link" onClick={changePage} data-number={page - 1}>{page - 1}</a></li> : null }
                        <li><a className="pagination-link is-current">{page}</a></li>
                        {page < pageCount ? <li><a className="pagination-link" onClick={changePage} data-number={page + 1}>{page + 1}</a></li> : null }
                    </ul>
                : null }
                {pageCount >= page + 3 ?
                    <span>
                        <li><span className="pagination-ellipsis">&hellip;</span></li>
                        <li><a className="pagination-link" onClick={changePage} data-number={pageCount}>{pageCount}</a></li>
                    </span>
                : null }
            </nav>
        </div>
    )
}

export default Pagination;