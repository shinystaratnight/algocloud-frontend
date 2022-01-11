import Errors from 'src/modules/shared/error/errors';
import AlgorandService from 'src/modules/algorand/algorandService';

const prefix = 'ALGORAND_OVERVIEW';

const overviewActions = {

  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,


  doFetch: () => async (dispatch) => {
    try {
      dispatch({
        type: overviewActions.FETCH_STARTED,
      });

      const favoriteFilter = {};
      const assetFilter = {};
      const poolFilter = {};
      
      const data = await AlgorandService.getAlgorandOverview(
        favoriteFilter,
        assetFilter,
        poolFilter,
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
