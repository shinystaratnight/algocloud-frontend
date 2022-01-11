import Errors from 'src/modules/shared/error/errors';
import AlgorandService from 'src/modules/algorand/algorandService';
import selectors from 'src/modules/algorand/overview/overviewSelectors';

const prefix = 'ALGORAND_OVERVIEW';

const overviewActions = {

  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,
  FAVORITE_SORTER_CHANGED: `${prefix}_FAVORITE_SORTER_CHANGED`,
  FAVORITE_PAGINATION_CHANGED: `${prefix}_FAVORITE_PAGINATION_CHANGED`,
  ASSET_SORTER_CHANGED: `${prefix}_ASSET_SORTER_CHANGED`,
  ASSET_PAGINATION_CHANGED: `${prefix}_ASSET_PAGINATION_CHANGED`,
  POOL_SORTER_CHANGED: `${prefix}_POOL_SORTER_CHANGED`,
  POOL_PAGINATION_CHANGED: `${prefix}_POOL_PAGINATION_CHANGED`,


  doFetch: () => async (dispatch, getState) => {
    try {
      dispatch({
        type: overviewActions.FETCH_STARTED,
      });

      const data = await AlgorandService.getAlgorandOverview(
        selectors.selectFavoriteFilter(getState()),
        selectors.selectAssetFilter(getState()),
        selectors.selectPoolFilter(getState()),
      );

      dispatch({
        type: overviewActions.FETCH_SUCCESS,
        payload: data,
      });

    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: overviewActions.FETCH_ERROR,
      });
    }
  },

  doFavorite: (assetId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: overviewActions.FETCH_STARTED,
      });

      await AlgorandService.putAlgorandFavorite(assetId);

      const data = await AlgorandService.getAlgorandOverview(
        selectors.selectFavoriteFilter(getState()),
        selectors.selectAssetFilter(getState()),
        selectors.selectPoolFilter(getState()),
      );

      dispatch({
        type: overviewActions.FETCH_SUCCESS,
        payload: data,
      });

    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: overviewActions.FETCH_ERROR,
      });
    }
  },

  doShowcase: (assetId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: overviewActions.FETCH_STARTED,
      });

      await AlgorandService.putAlgorandShowcase(assetId);

      const data = await AlgorandService.getAlgorandOverview(
        selectors.selectFavoriteFilter(getState()),
        selectors.selectAssetFilter(getState()),
        selectors.selectPoolFilter(getState()),
      );

      dispatch({
        type: overviewActions.FETCH_SUCCESS,
        payload: data,
      });

    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: overviewActions.FETCH_ERROR,
      });
    }
  },

  doChangeFavoriteSort: (sorter) => async (dispatch) => {
    dispatch({
      type: overviewActions.FAVORITE_SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(overviewActions.doFetch());
  },

  doChangeFavoritePagination: (pagination) => async (dispatch) => {
    dispatch({
      type: overviewActions.FAVORITE_PAGINATION_CHANGED,
      payload: pagination,
    });

    dispatch(overviewActions.doFetch());
  },

  doChangeAssetSort: (sorter) => async (dispatch) => {
    dispatch({
      type: overviewActions.ASSET_SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(overviewActions.doFetch());
  },

  doChangeAssetPagination: (pagination) => async (dispatch) => {
    dispatch({
      type: overviewActions.ASSET_PAGINATION_CHANGED,
      payload: pagination,
    });

    dispatch(overviewActions.doFetch());
  },

  doChangePoolSort: (sorter) => async (dispatch) => {
    dispatch({
      type: overviewActions.POOL_SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(overviewActions.doFetch());
  },

  doChangePoolPagination: (pagination) => async (dispatch) => {
    dispatch({
      type: overviewActions.POOL_PAGINATION_CHANGED,
      payload: pagination,
    });

    dispatch(overviewActions.doFetch());
  },
};

export default overviewActions;
