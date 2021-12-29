import actions from 'src/modules/algorand/algoexplorer/algoPrice/algoPriceActions';

const initialData = {
  loading: false,
  algoPriceChartData: [],
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FETCH_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.FETCH_SUCCESS) {
    return {
      ...state,
      loading: false,
      algoPriceChartData: payload.data,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      loading: false
    };
  }

  return state;
};