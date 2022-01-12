import { combineReducers } from 'redux';
import overview from 'src/modules/algorand/overview/overviewReducers';
import global from 'src/modules/algorand/global/globalReducers';
import asset from 'src/modules/algorand/asset/assetReducers';

export default combineReducers({
  overview,
  global,
  asset,
});
