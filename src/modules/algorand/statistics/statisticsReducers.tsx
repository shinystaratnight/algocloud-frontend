import actions from 'src/modules/algorand/statistics/statisticsActions';

const initialData = {
  loading: false,
  dailyData: [],
  weeklyData: [],
  topFavorites: [],
  topAssets: [],
  topPools: [],
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
      dailyData: payload.data.dailyData,
      weeklyData: payload.data.weeklyData,
      topFavorites: payload.data.topFavorites,
      topAssets: payload.data.topAssets,
      topPools: payload.data.topPools,
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
