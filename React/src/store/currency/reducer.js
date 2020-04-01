import * as types from './actionTypes';

const initialState = {
  currencyRates: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_RATES: {
      return {
        ...state,
        currencyRates: action.currencyRates,
      };
    }
    default:
      return state;
  }
};
