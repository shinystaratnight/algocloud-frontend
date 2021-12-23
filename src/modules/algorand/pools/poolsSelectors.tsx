import { createSelector } from 'reselect';

const selectRaw = (state) => state.algorand.pools;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const selectPools = createSelector(
  [selectRaw],
  (raw) => raw.pools,
);

const poolsSelectors = {
  selectLoading,
  selectPools,
  selectRaw,
};

export default poolsSelectors;
