import { createSelector } from 'reselect';

const selectRaw = (state) => state.algorand.favorites;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const selectFavoriteList = createSelector(
  [selectRaw],
  (raw) => raw.list,
);

const selectTopFavorites = createSelector(
  [selectRaw],
  (raw) => raw.top,
);

const favoritesSelectors = {
  selectLoading,
  selectFavoriteList,
  selectTopFavorites,
  selectRaw,
};

export default favoritesSelectors;
