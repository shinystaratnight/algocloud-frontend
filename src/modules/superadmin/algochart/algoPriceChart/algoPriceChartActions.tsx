import Errors from 'src/modules/shared/error/errors';
import { getAlgoPriceChartData } from 'src/view/superadmin/algorand/api';

const prefix = 'SUPERADMIN_ALGOPRICECHART';

const algoPriceChartActions = {

  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,


  doFetch: () => async (dispatch) => {
    try {
      dispatch({
        type: algoPriceChartActions.FETCH_STARTED,
      });

      const data = await getAlgoPriceChartData();
      
      dispatch({
        type: algoPriceChartActions.FETCH_SUCCESS,
        payload: {
          data
        },
      });

    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: algoPriceChartActions.FETCH_ERROR,
      });
    }
  },
};

export default algoPriceChartActions;
