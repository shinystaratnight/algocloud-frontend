import actions from 'src/modules/chart/algoPriceChart/algoPriceChartActions';

const initialData = {
  loading: false,
  algoPriceChartData: []
};

export default (state = initialData, { type, payload }) => {
  console.log(actions)
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
