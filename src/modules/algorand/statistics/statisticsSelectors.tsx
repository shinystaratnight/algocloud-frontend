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

const selectUnfilteredTopAssets = createSelector(
  [selectRaw],
  (raw) => raw.topAssets,
  );
  
const selectShowcaseId = createSelector(
  [selectRaw],
  (raw) => raw.showcaseId,
);

const selectTopAssets = createSelector(
  [
    selectUnfilteredTopAssets,
    favoritesSelectors.selectFavoriteList,
    selectShowcaseId,
  ],
  (assets, favorites, showcaseId) => {
    return assets.map(asset => {
      if (favorites.includes(asset.assetId)) asset.favorite = 1;
      else asset.favorite = 0;
      
      if (asset.assetId === showcaseId) asset.showcase = 1;
      else asset.showcase = 0;
      return asset;
    });
  }
);

const selectTopPools = createSelector(
  [selectRaw],
  (raw) => raw.topPools,
);

const selectShowcase = createSelector(
  [selectRaw],
  (raw) => raw.showcaseData,
);

const selectShowcaseName = createSelector(
  [selectRaw],
  (raw) => raw.showcaseName,
)

const statisticsSelectors = {
  selectLoading,
  selectDailyData,
  selectWeeklyData,
  selectTopAssets,
  selectTopPools,
  selectShowcase,
  selectShowcaseId,
  selectShowcaseName,
  selectRaw,
};

export default statisticsSelectors;
