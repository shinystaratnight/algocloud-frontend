import actions from 'src/modules/algorand/statistics/statisticsActions';

const initialData = {
  loading: false,
  dailyData: [],
  weeklyData: [],
  topFavorites: [],
  topPools: [],
  topAssets: [],
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
