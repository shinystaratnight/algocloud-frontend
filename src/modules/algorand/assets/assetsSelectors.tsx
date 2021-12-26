import { createSelector } from 'reselect';
import favoritesSelectors from 'src/modules/algorand/favorites/favoritesSelectors';

const selectRaw = (state) => state.algorand.assets;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const selectAssets = createSelector(
  [selectRaw],
  (raw) => raw.assets,
);

const selectDailyPrices = createSelector(
  [selectRaw],
  (raw) => raw.dailyPrices,
);

const selectHourlyPrices = createSelector(
  [selectRaw],
  (raw) => raw.hourlyPrices,
);

const selectDailyAssetData = createSelector(
  [selectRaw],
  (raw) => raw.dailyAssetData,
);

const selectTopPools = createSelector(
  [selectRaw],
  (raw) => raw.topPools,
);

const selectAllAssets = createSelector(
  [
    selectAssets,
    favoritesSelectors.selectFavoriteList,
  ],
  (assets, favorites) => {
    return assets.map(asset => {
      if (favorites.includes(asset.assetId)) asset.status = 1;
      else asset.status = 0;
      return asset;
    })
  }
);


const assetsSelectors = {
  selectLoading,
  selectAssets,
  selectDailyPrices,
  selectHourlyPrices,
  selectDailyAssetData,
  selectTopPools,
  selectAllAssets,
  selectRaw,
};

export default assetsSelectors;
