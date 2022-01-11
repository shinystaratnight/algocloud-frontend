import Errors from 'src/modules/shared/error/errors';
import AlgorandService from 'src/modules/algorand/algorandService';
import selectors from 'src/modules/algorand/overview/overviewSelectors';

const prefix = 'ALGORAND_OVERVIEW';

const overviewActions = {

  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,


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
};

export default overviewActions;
