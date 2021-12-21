import actions from 'src/modules/algorand/algoPriceChart/algoPriceChartActions';

const initialData = {
  loading: false,
  assetsData: []
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
      assetsData: payload.data,
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
