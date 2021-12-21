import Errors from 'src/modules/shared/error/errors';
import SuperadminService from 'src/modules/superadmin/superadminService';
import { getPairPrices } from 'src/view/chart/api';

const prefix = 'SUPERADMIN_ALGOCHART';

const algochartActions = {

  FETCH_PAIR_PRICE_STARTED: `${prefix}_FETCH_PAIR_PRICE_STARTED`,
  FETCH_PAIR_PRICE_SUCCESS: `${prefix}_FETCH_PAIR_PRICE_SUCCESS`,
  FETCH_PAIR_PRICE_ERROR: `${prefix}_FETCH_PAIR_PRICE_ERROR`,


  doFetch: ({from, to}) => async (dispatch) => {
    try {
      dispatch({
        type: algochartActions.FETCH_PAIR_PRICE_STARTED,
      });

      const candles = await getPairPrices(from, to);
      
      dispatch({
        type: algochartActions.FETCH_PAIR_PRICE_SUCCESS,
        payload: {
          data: candles
        },
      });

    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: algochartActions.FETCH_PAIR_PRICE_ERROR,
      });
    }
  },
};

export default algochartActions;
