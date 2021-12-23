import Errors from 'src/modules/shared/error/errors';
import AlgorandService from 'src/modules/algorand/algorandService';

const prefix = 'ALGORAND_ASSETS';

const assetsActions = {

  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,


  doFetch: () => async (dispatch) => {
    try {
      dispatch({
        type: assetsActions.FETCH_STARTED,
      });

      const data = await AlgorandService.getAlgorandStats();
      
      dispatch({
        type: assetsActions.FETCH_SUCCESS,
        payload: { data },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: assetsActions.FETCH_ERROR,
      });
    }
  },
};

export default assetsActions;
