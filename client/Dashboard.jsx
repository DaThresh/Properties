import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import Chart from 'react-apexcharts';

// Services
import { getProperties } from './services/properties';
import { getReferenceData } from './services/reference';

// Utilities
import { apiError } from './utilities/apiError';

// SCSS
import colors from './sass/colorsJS.scss';

function Dashboard(){
    const statuses = getReferenceData('statuses');
    const [properties, setProperties] = useState([]);
    const [pieSeries, setPieSeries] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        let arr = [];
        statuses.forEach(status => arr.push(0));
        properties.forEach(property => {
            let index = statuses.findIndex(status => status.value === property.status);
            arr[index] += 1;
        })
        setPieSeries(arr);
    }, [properties]);

    var getData = () => {
        getProperties(0,10000)
        .then(properties => setProperties(properties))
        .catch(error => apiError(error));
    }

    const pieChartOptions = {
        labels: statuses.map(status => status.name),
        colors: statuses.map(status => colors[status.color]),
        legend: {
            position: 'bottom',
            onItemClick: {
                toggleDataSeries: false,
            },
        },
    }

    return (
        <div className="container is-fluid is-sectioned">
            <div className="columns">
                <div className="column is-4">
                    <div className="box has-text-centered">
                        <h2 className="title is-2">Property Status</h2>
                        <Chart type="pie" series={pieSeries} options={pieChartOptions} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;