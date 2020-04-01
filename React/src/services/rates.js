import { get } from '../helper/requestHelper';

export const getCurrencyRates = currency => {
  return get(`latest?base=${currency}`);
};
