import Errors from 'src/modules/shared/error/errors';
import { getMarketCapChartData } from 'src/view/superadmin/algorand/api';

const prefix = 'SUPERADMIN_MARKETCAPCHART';

const marketCapChartActions = {

  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,


  doFetch: () => async (dispatch) => {
    try {
      dispatch({
        type: marketCapChartActions.FETCH_STARTED,
      });

      const data = await getMarketCapChartData();
      
      dispatch({
        type: marketCapChartActions.FETCH_SUCCESS,
        payload: {
          data
        },
      });

    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: marketCapChartActions.FETCH_ERROR,
      });
    }
  },
};

export default marketCapChartActions;
