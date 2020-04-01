/* eslint react/prop-types: 0 */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionGetCurrencyRates } from '../store/currency/action';
import { useInterval } from '../customHooks/useInterval';
import RatesTable from '../components/ratesTable';
import LineChartComponent from '../components/lineChartComponent';

const DELAY = 2000;
const COUNT_INTERVAL = 5;

const Homepage = () => {
  const [updateRates, setUpdateRates] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const dispatch = useDispatch();

  useInterval(
    () => {
      if (updateRates < COUNT_INTERVAL - 1) {
        setUpdateRates(updateRates + 1);
      } else {
        setIsRunning(!isRunning);
      }
    },
    isRunning ? DELAY : null
  );

  useEffect(() => {
    dispatch(actionGetCurrencyRates());
  }, [dispatch, updateRates]);

  return (
    <div className="container">
      <div>
        <span>Delay: </span>
        <span>{DELAY}</span>
      </div>
      <div>
        <span>Count interval: </span>
        <span>{COUNT_INTERVAL}</span>
      </div>
      <div>
        <LineChartComponent />
        <RatesTable />
      </div>
    </div>
  );
};
export default Homepage;
