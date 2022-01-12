import { createSelector } from 'reselect';
import favoritesSelectors from 'src/modules/algorand/favorites/favoritesSelectors';

const selectRaw = (state) => state.algorand.assets;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const selectUnfilteredAssets = createSelector(
  [selectRaw],
  (raw) => raw.list,
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

const selectAssets = createSelector(
  [
    selectUnfilteredAssets,
    favoritesSelectors.selectFavoriteList,
  ],
  (assets, favorites) => {
    return assets.map(asset => {
      if (favorites.includes(asset.assetId)) asset.favorite = 1;
      else asset.favorite = 0;

      return asset;
    })
  }
);

const selectAssetDetail = createSelector(
  [selectRaw],
  (raw) => raw.show,
);


const assetsSelectors = {
  selectLoading,
  selectDailyPrices,
  selectHourlyPrices,
  selectDailyAssetData,
  selectTopPools,
  selectAssets,
  selectAssetDetail,
  selectRaw,
};

export default assetsSelectors;
