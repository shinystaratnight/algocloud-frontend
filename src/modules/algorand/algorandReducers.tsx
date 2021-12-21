import algo from 'src/modules/algorand/algo/algoReducers';
import assets from 'src/modules/algorand/assets/assetsReducers';
import pools from 'src/modules/algorand/pools/poolsReducers';
import favorites from 'src/modules/algorand/favorites/favoritesReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  algo,
  assets,
  pools,
  favorites,
});
