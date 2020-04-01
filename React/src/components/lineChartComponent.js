import React from 'react';
import { useSelector } from 'react-redux';

import { Line } from 'react-chartjs-2';

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          max: 90,
          min: 60,
          stepSize: 1,
        },
      },
    ],
  },
};

const LineChartComponent = () => {
  const { currencyRates } = useSelector(state => state.currency);

  let usd = [];
  let eur = [];
  let date = [];

  currencyRates.map(elem => {
    usd.push(elem.usd);
    eur.push(elem.eur);
    date.push([elem.currentDate]);
  });

  let data = {
    labels: date,
    datasets: [
      {
        label: 'USD',
        fill: false,
        lineTension: 0.2,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: '#ffa500',
        data: usd,
      },
      {
        label: 'EUR',
        fill: false,
        lineTension: 0.2,
        borderColor: 'rgba(75,192,192,1)',
        pointRadius: 3,
        data: eur,
      },
    ],
  };

  return (
    <div className="component__container">
      <h3>Line Chart currency rates</h3>
      <Line data={data} options={options} />
    </div>
  );
};
export default LineChartComponent;
