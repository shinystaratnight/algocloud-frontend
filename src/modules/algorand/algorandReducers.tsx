import { combineReducers } from 'redux';

import overview from 'src/modules/algorand/overview/overviewReducers';
import asset from 'src/modules/algorand/asset/assetReducers';
import statistics from 'src/modules/algorand/statistics/statisticsReducers';
import assets from 'src/modules/algorand/assets/assetsReducers';
import pools from 'src/modules/algorand/pools/poolsReducers';
import favorites from 'src/modules/algorand/favorites/favoritesReducers';
import algoPrice from 'src/modules/algorand/algoexplorer/algoPrice/algoPriceReducers';
import marketCap from 'src/modules/algorand/algoexplorer/marketCap/marketCapReducers';

export default combineReducers({
  overview,
  asset,
  // statistics,
  // assets,
  // pools,
  // favorites,
  // algoPrice,
  // marketCap,
});
