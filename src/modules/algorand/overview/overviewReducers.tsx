import actions from 'src/modules/algorand/overview/overviewActions';

const initialData = {
  loading: false,
  showcase: {},
  stats: {
    daily: [] as Array<any>,
    weekly: [] as Array<any>,
  },
  favorite: {
    rows: [] as Array<any>,
    count: 0,
    pagination: {
      current: 0,
      pageSize: 5,
    },
    sorter: {},
  },
  asset: {
    rows: [] as Array<any>,
    count: 0,
    pagination: {
      current: 0,
      pageSize: 10,
    },
    sorter: {},
  },
  pool: {
    rows: [] as Array<any>,
    count: 0,
    pagination: {
      current: 0,
      pageSize: 10,
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

    const favorite = {
      ...state.favorite,
      rows: payload.favorites
    };

    const asset = {
      ...state.asset,
      rows: payload.assets,
    };

    const pool = {
      ...state.pool,
      rows: payload.pools,
    };

    return {
      loading: false,
      showcase: payload.showcase,
      favorite,
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
