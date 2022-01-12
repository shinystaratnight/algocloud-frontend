import { combineReducers } from 'redux';
import overview from 'src/modules/algorand/overview/overviewReducers';
import global from 'src/modules/algorand/global/globalReducers';
import asset from 'src/modules/algorand/asset/assetReducers';
import assets from 'src/modules/algorand/assets/assetsReducers';
import pools from 'src/modules/algorand/pools/poolsReducers';
import favorites from 'src/modules/algorand/favorites/favoritesReducers';

export default combineReducers({
  overview,
  global,
  asset,
  // statistics,
  // assets,
  // pools,
  // favorites,
});
