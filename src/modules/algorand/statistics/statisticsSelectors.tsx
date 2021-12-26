import { createSelector } from 'reselect';
import favoritesSelectors from 'src/modules/algorand/favorites/favoritesSelectors';

const selectRaw = (state) => state.algorand.statistics;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const selectDailyData = createSelector(
  [selectRaw],
  (raw) => raw.dailyData,
);

const selectWeeklyData = createSelector(
  [selectRaw],
  (raw) => raw.weeklyData,
);

const selectTopAssetsNoStatus = createSelector(
  [selectRaw],
  (raw) => raw.topAssets,
);

const selectTopAssets = createSelector(
  [
    selectTopAssetsNoStatus,
    favoritesSelectors.selectFavoriteList,
  ],
  (assets, favorites) => {
    return assets.map(asset => {
      if (asset.assetId in favorites) asset.status = 1;
      else asset.status = 0;
      return asset;
    });
  }
)

const selectTopPools = createSelector(
  [selectRaw],
  (raw) => raw.topPools,
);

const statisticsSelectors = {
  selectLoading,
  selectDailyData,
  selectWeeklyData,
  selectTopAssets,
  selectTopPools,
  selectRaw,
};

export default statisticsSelectors;
