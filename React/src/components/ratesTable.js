import React from 'react';
import { useSelector } from 'react-redux';

const RatesTable = () => {
  const { currencyRates } = useSelector(state => state.currency);

  return (
    <div className="component__container component__table">
      <h3>Currency rates table</h3>
      <table className="table__item">
        <tr>
          <th>№</th>
          <th>Request Date</th>
          <th>Currency Rates Date</th>
          <th>USD</th>
          <th>EUR</th>
        </tr>
        {currencyRates.map((elem, index) => {
          return (
            <tr key={`table-${index}`}>
              <td>{index + 1}</td>
              <td>{elem.currentDate}</td>
              <td>{elem.lastUpdateRatesDate}</td>
              <td>{elem.usd}</td>
              <td>{elem.eur}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
export default RatesTable;
