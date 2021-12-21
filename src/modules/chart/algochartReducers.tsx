import pairChart from 'src/modules/chart/pairChart/pairChartReducers';
import marketCapChart from 'src/modules/chart/marketCapChart/marketCapChartReducers';
import algoPriceChart from 'src/modules/chart/algoPriceChart/algoPriceChartReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  pairChart,
  marketCapChart,
  algoPriceChart
});
