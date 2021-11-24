import actions from 'src/modules/superadmin/algochart/pairChart/pairChartActions';

const initialData = {
  loading: false,
  pairChartData: []
};

export default (state = initialData, { type, payload }) => {
  
  if (type === actions.FETCH_PAIR_PRICE_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.FETCH_PAIR_PRICE_SUCCESS) {
    return {
      ...state,
      loading: false,
      pairChartData: payload.data,
    };
  }

  if (type === actions.FETCH_PAIR_PRICE_ERROR) {
    return {
      ...state,
      loading: false
    };
  }

  return state;
};
