import * as types from './actionTypes';
import { getCurrencyRates } from '../../services/rates';

const USD_RATES = 'USD';
const EUS_RATES = 'EUR';
const RUB_RATES = 'RUB';

export function actionGetCurrencyRates() {
  return (dispatch, getState) => {
    let { currencyRates } = getState().currency;
    Promise.all([
      getCurrencyRates(USD_RATES),
      getCurrencyRates(EUS_RATES),
    ]).then(([usd, eur]) => {
      let newRates = {
        currentDate: getCurrentTime(),
        lastUpdateRatesDate: usd.date,
        usd: usd.rates[RUB_RATES].toFixed(2),
        eur: eur.rates[RUB_RATES].toFixed(2),
      };
      currencyRates.push(newRates);
      return dispatch({ type: types.GET_RATES, currencyRates });
    });
  };
}

function getCurrentTime() {
  let today = new Date();

  function dateCorrect(value) {
    return value < 10 ? `0${value}` : value;
  }

  let day = dateCorrect(today.getDate());
  let month = dateCorrect(today.getMonth() + 1);
  let second = dateCorrect(today.getSeconds());
  let minutes = dateCorrect(today.getMinutes());
  let hour = dateCorrect(today.getHours());
  let date = `${today.getFullYear()}-${month}-${day}`;
  let time = `${hour}:${minutes}:${second}`;
  return `${date} ${time}`;
}
