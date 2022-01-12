import { createSelector } from 'reselect';

const selectRaw = (state) => state.algorand.asset.show;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const selectData = createSelector(
  [selectRaw],
  (raw) => raw.data,
);

const selectAssetName = createSelector(
  [selectRaw],
  (raw) => raw.data.name,
);

const selectDailyAssetData = createSelector(
  [selectRaw],
  (raw) => raw.dailyAssetData,
);

const selectHourlyPrices = createSelector(
  [selectRaw],
  (raw) => raw.hourlyPrices,
);

const selectPools = createSelector(
  [selectRaw],
  (raw) => raw.pool.rows,
);

const selectCount = createSelector(
  [selectRaw],
  (raw) => raw.pool.count,
);

const selectPagination = createSelector(
  [selectRaw, selectCount],
  (raw, count) => {
    return {
      ...raw.pool.pagination,
      total: count,
    };
  },
);

const selectOrderBy = createSelector([selectRaw], (raw) => {
  const sorter = raw.pool.sorter;

  if (!sorter.field) {
    return 'id';
  }

  let direction =
    sorter.order === 'descend' ? 'DESC' : 'ASC';

  return `"${sorter.field}" ${direction}`;
});

const selectLimit = createSelector(
  [selectRaw],
  (raw) => raw.pool.pagination.pageSize,
);

const selectOffset = createSelector([selectRaw], (raw) => {
  const pagination = raw.pool.pagination;
  const current = pagination.current || 1;
  return (current - 1) * pagination.pageSize;
});

const selectHasRows = createSelector(
  [selectCount],
  (count) => count > 0,
);

const selectSorter = createSelector(
  [selectRaw],
  (raw) => raw.pool.sorter,
);

const assetShowSelectors = {
  selectLoading,
  selectData,
  selectAssetName,
  selectDailyAssetData,
  selectHourlyPrices,
  selectPools,
  selectPagination,
  selectOrderBy,
  selectLimit,
  selectOffset,
  selectHasRows,
  selectSorter,
  selectRaw,
};

export default assetShowSelectors;
