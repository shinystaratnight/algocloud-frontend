import { createSelector } from 'reselect';

const selectRaw = (state) => state.algorand.overview;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const selectDailyData = createSelector(
  [selectRaw],
  (raw) => raw.stats.daily,
);

const selectWeeklyData = createSelector(
  [selectRaw],
  (raw) => raw.stats.weekly,
);

const selectAssets = createSelector(
  [selectRaw],
  (raw) => raw.asset.rows,
);

const selectPools = createSelector(
  [selectRaw],
  (raw) => raw.pool.rows,
);

const selectFavorites = createSelector(
  [selectRaw],
  (raw) => raw.favorite.rows,
);

const selectFavoriteIds = createSelector(
  [selectFavorites],
  (favorites) => favorites.map(({ assetId }) => assetId)
);

const selectShowcase = createSelector(
  [selectRaw],
  (raw) => raw.showcase,
);

const selectShowcaseId = createSelector(
  [selectShowcase],
  (showcase) => showcase.assetId,
);

const selectAssetCount = createSelector(
  [selectRaw],
  (raw) => raw.asset.count,
);

const selectAssetPagination = createSelector(
  [selectRaw, selectAssetCount],
  (raw, count) => {
    return {
      ...raw.asset.pagination,
      total: count,
    };
  },
);

const selectPoolCount = createSelector(
  [selectRaw],
  (raw) => raw.pool.count,
);

const selectPoolPagination = createSelector(
  [selectRaw, selectPoolCount],
  (raw, count) => {
    return {
      ...raw.pool.pagination,
      total: count,
    };
  },
);

const overviewSelectors = {
  selectLoading,
  selectDailyData,
  selectWeeklyData,
  selectAssets,
  selectPools,
  selectFavorites,
  selectFavoriteIds,
  selectShowcase,
  selectShowcaseId,
  selectAssetPagination,
  selectPoolPagination,
  selectRaw,
};

export default overviewSelectors;
