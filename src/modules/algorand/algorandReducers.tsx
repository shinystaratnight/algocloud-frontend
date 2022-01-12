import { combineReducers } from 'redux';
import overview from 'src/modules/algorand/overview/overviewReducers';
import global from 'src/modules/algorand/global/globalReducers';
import asset from 'src/modules/algorand/asset/assetReducers';
import favorite from 'src/modules/algorand/favorite/favoriteReducers';

export default combineReducers({
  overview,
  global,
  favorite,
  asset,
});
