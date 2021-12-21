import actions from 'src/modules/chart/marketCapChart/marketCapChartActions';

const initialData = {
  loading: false,
  marketCapChartData: []
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
      marketCapChartData: payload.data,
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
