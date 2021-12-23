import { createSelector } from 'reselect';

const selectRaw = (state) => state.algorand.favorites;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const selectFavorites = createSelector(
  [selectRaw],
  (raw) => raw.favorites,
);

const favoritesSelectors = {
  selectLoading,
  selectFavorites,
  selectRaw,
};

export default favoritesSelectors;
