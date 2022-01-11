import actions from 'src/modules/algorand/asset/list/assetListActions';

const initialData = {
  loading: false,
  list: [],
  show: {
    'name': '',
    'unitName': '',
    'price': '',
    'liquidity': '',
    'lastDayVolume': '',
    'lastDayPriceChange': '',
  },
  hourlyPrices: [],
  dailyPrices: [],
  dailyAssetData: [],
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
