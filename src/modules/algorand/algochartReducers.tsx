import pairChart from 'src/modules/algorand/pairChart/pairChartReducers';
import marketCapChart from 'src/modules/algorand/marketCapChart/marketCapChartReducers';
import algoPriceChart from 'src/modules/algorand/algoPriceChart/algoPriceChartReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  pairChart,
  marketCapChart,
  algoPriceChart
});
