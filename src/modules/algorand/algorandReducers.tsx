import statistics from 'src/modules/algorand/statistics/statisticsReducers'
import assets from 'src/modules/algorand/assets/assetsReducers';
import pools from 'src/modules/algorand/pools/poolsReducers';
import favorites from 'src/modules/algorand/favorites/favoritesReducers';
import algoPrice from 'src/modules/algorand/algoexplorer/algoPrice/algoPriceReducers';
import marketCap from 'src/modules/algorand/algoexplorer/marketCap/marketCapReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  statistics,
  assets,
  pools,
  favorites,
  algoPrice,
  marketCap,
});
