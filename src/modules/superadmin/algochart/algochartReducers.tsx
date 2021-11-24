import pairChart from 'src/modules/superadmin/algochart/pairChart/pairChartReducers';
import marketCapChart from 'src/modules/superadmin/algochart/marketCapChart/marketCapChartReducers';
import algoPriceChart from 'src/modules/superadmin/algochart/algoPriceChart/algoPriceChartReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  pairChart,
  marketCapChart,
  algoPriceChart
});
