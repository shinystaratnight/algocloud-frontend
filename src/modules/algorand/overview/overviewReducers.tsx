import actions from 'src/modules/algorand/overview/overviewActions';

const initialData = {
  loading: false,
  showcase: {},
  favorites: [] as Array<any>,
  stats: {
    daily: [] as Array<any>,
    weekly: [] as Array<any>,
  },
  favorite: {
    rows: [] as Array<any>,
    count: 0,
    pagination: {
      current: 0,
      pageSize: 10,
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
  if (type === actions.RESET) {
    return initialData;
  }

  if (type === actions.FETCH_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.FAVORITE_SORTER_CHANGED) {
    const favorite = {
      ...state.favorite,
      sorter: payload,
    };

    return {
      ...state,
      favorite,
    };
  }

  if (type === actions.FAVORITE_PAGINATION_CHANGED) {
    const favorite = {
      ...state.favorite,
      pagination: payload,
    };

    return {
      ...state,
      favorite,
    };
  }

  if (type === actions.ASSET_SORTER_CHANGED) {
    const asset = {
      ...state.asset,
      sorter: payload,
    };

    return {
      ...state,
      asset,
    };
  }

  if (type === actions.ASSET_PAGINATION_CHANGED) {
    const asset = {
      ...state.asset,
      pagination: payload,
    };

    return {
      ...state,
      asset,
    };
  }

  if (type === actions.POOL_SORTER_CHANGED) {
    const pool = {
      ...state.pool,
      sorter: payload,
    };

    return {
      ...state,
      pool,
    };
  }

  if (type === actions.POOL_PAGINATION_CHANGED) {
    const pool = {
      ...state.pool,
      pagination: payload,
    };

    return {
      ...state,
      pool,
    };
  }

  if (type === actions.FETCH_SUCCESS) {
    const stats = {
      daily: payload.dailyData,
      weekly: payload.weeklyData,
    };

    const favorite = {
      ...state.favorite,
      count: payload.favoriteCount,
      rows: payload.favorites,
    };

    if (favorite.pagination.current === 0) {
      favorite.pagination.current = (payload.favoriteCount > 0) ? 1 : 0;
    }

    const asset = {
      ...state.asset,
      count: payload.assetCount,
      rows: payload.assets,
    };

    if (asset.pagination.current === 0) {
      asset.pagination.current = (payload.assetCount > 0) ? 1 : 0;
    }

    const pool = {
      ...state.pool,
      count: payload.poolCount,
      rows: payload.pools,
    };

    if (pool.pagination.current === 0) {
      pool.pagination.current = (payload.poolCount > 0) ? 1 : 0;
    }

    return {
      loading: false,
      showcase: payload.showcase,
      favorites: payload.favoriteIds,
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
