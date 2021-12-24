import Errors from 'src/modules/shared/error/errors';
import AlgorandService from 'src/modules/algorand/algorandService';
import assetsActions from 'src/modules/algorand/assets/assetsActions';
import poolsActions from 'src/modules/algorand/pools/poolsActions';

const prefix = 'ALGORAND_STATISTICS';

const statisticsActions = {

  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,


  doFetch: () => async (dispatch) => {
    try {
      dispatch({
        type: statisticsActions.FETCH_STARTED,
      });

      const data = await AlgorandService.getAlgorandStats();

      dispatch({
        type: statisticsActions.FETCH_SUCCESS,
        payload: { data },
      });

      dispatch({
        type: assetsActions.FETCH_SUCCESS,
        payload: { data: { 'assets': data.assets } },
      });

      dispatch({
        type: poolsActions.FETCH_SUCCESS,
        payload: { data: { 'pools': data.pools } },
      });

    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: statisticsActions.FETCH_ERROR,
      });
    }
  },
};

export default statisticsActions;
