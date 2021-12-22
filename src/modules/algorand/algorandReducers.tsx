import stats from 'src/modules/algorand/stats/statsReducers'
import assets from 'src/modules/algorand/assets/assetsReducers';
import pools from 'src/modules/algorand/pools/poolsReducers';
import favorites from 'src/modules/algorand/favorites/favoritesReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  stats,
  assets,
  pools,
  favorites,
});
