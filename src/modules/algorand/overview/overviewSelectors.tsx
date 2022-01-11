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
  (raw) => raw.asset.favorites,
);

const selectFavoriteIds = createSelector([selectRaw], (raw) => {
  const favorites = raw.asset.favorites;
  return favorites.map(({ assetId }) => assetId);
});

const selectShowcase = createSelector(
  [selectRaw],
  (raw) => raw.asset.showcase,
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
  selectRaw,
};

export default overviewSelectors;
