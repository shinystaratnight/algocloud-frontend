import actions from 'src/modules/algorand/asset/show/assetShowActions';

const initialData = {
  loading: false,
  data: {
    'name': 'Asset',
    'unitName': 'Algorand',
    'price': 0,
    'liqudity': 0,
    'lastDayVolume': 0,
    'lastDayPriceChange': 0,
  },
  hourlyPrices: [] as Array<any>,
  dailyPrices: [] as Array<any>,
  dailyAssetData: [] as Array<any>,
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
    const pool = {
      ...state.pool,
      rows: payload.pools,
      count: payload.count,
    };

    return {
      ...state,
      loading: false,
      data: payload.data,
      hourlyPrices: payload.hourlyPrices,
      dailyPrices: payload.dailyPrices,
      dailyAssetData: payload.dailyAssetData,
      pool,
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
