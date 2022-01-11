import { combineReducers } from 'redux';

import list from 'src/modules/algorand/asset/list/assetListReducers';
import view from 'src/modules/algorand/asset/view/assetViewReducers';

export default combineReducers({
  list,
  view,
});
