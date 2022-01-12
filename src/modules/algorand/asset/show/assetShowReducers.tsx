import actions from 'src/modules/algorand/assets/assetsActions';

const initialData = {
  loading: false,
  data: {},
  hourlyPrices: [],
  dailyPrices: [],
  dailyAssetData: [],
  pool: {
    rows: [] as Array<any>,
    count: 0,
    pagination: {
      current: 0,
      pageSize: 10,
    },
    sorter: {},
  }
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
