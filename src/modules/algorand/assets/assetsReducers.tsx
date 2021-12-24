import actions from 'src/modules/algorand/assets/assetsActions';

const initialData = {
  loading: false,
  assets: [],
  hourlyPrices: [],
  dailyPrices: [],
  dailyAssetData: [],
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
      ...(payload.data),
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
