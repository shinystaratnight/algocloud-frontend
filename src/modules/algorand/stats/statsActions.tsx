import Errors from 'src/modules/shared/error/errors';
import AlgorandService from 'src/modules/algorand/algorandService';

const prefix = 'ALGORAND_STATISTICS';

const statsActions = {

  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,


  doFetch: () => async (dispatch) => {
    try {
      dispatch({
        type: statsActions.FETCH_STARTED,
      });

      const data = await AlgorandService.getAlgorandStats();
      
      dispatch({
        type: statsActions.FETCH_SUCCESS,
        payload: { data, },
      });

    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: statsActions.FETCH_ERROR,
      });
    }
  },
};

export default statsActions;
