import { createSelector } from 'reselect';

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


const assetsSelectors = {
  selectLoading,
  selectAssets,
  selectDailyPrices,
  selectHourlyPrices,
  selectDailyAssetData,
  selectTopPools,
  selectRaw,
};

export default assetsSelectors;
