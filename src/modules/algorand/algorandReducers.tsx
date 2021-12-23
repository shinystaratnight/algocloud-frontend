import statistics from 'src/modules/algorand/statistics/statisticsReducers'
import assets from 'src/modules/algorand/asset/assetsReducers';
import pools from 'src/modules/algorand/pool/poolsReducers';
import favorites from 'src/modules/algorand/favorite/favoritesReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  statistics,
  assets,
  pools,
  favorites,
});
