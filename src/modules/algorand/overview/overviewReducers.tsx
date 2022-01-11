import actions from 'src/modules/algorand/overview/overviewActions';

const INITIAL_PAGE_SIZE = 100;

const initialData = {
  loading: false,
  stats: {
    daily: [] as Array<any>,
    weekly: [] as Array<any>,
  },
  asset: {
    rows: [] as Array<any>,
    count: 0,
    pagination: {
      current: 1,
      pageSize: INITIAL_PAGE_SIZE,
    },
    sorter: {},
    favorites: [] as Array<any>,
    showcase: {},
  },
  pool: {
    rows: [] as Array<any>,
    count: 0,
    pagination: {
      current: 1,
      pageSize: INITIAL_PAGE_SIZE,
    },
    sorter: {},
  },
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FETCH_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.FETCH_SUCCESS) {
    const stats = {
      daily: payload.dailyData,
      weekly: payload.weeklyData,
    };

    const asset = {
      ...(state.asset),
      rows: payload.assets,
      favorites: payload.favorites,
      showcase: payload.showcase,
    };

    const pool = {
      ...(state.pool),
      rows: payload.pools,
    };

    return {
      loading: false,
      stats,
      asset,
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
