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

const assetsSelectors = {
  selectLoading,
  selectAssets,
  selectRaw,
};

export default assetsSelectors;
