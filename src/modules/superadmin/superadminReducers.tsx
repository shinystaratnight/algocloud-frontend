import user from 'src/modules/superadmin/user/userReducers';
import tenant from 'src/modules/superadmin/tenant/tenantReducers';
import analytics from 'src/modules/superadmin/analytics/analyticsReducers';
import algochart from 'src/modules/superadmin/algochart/algochartReducers';
import settings from 'src/modules/superadmin/settings/settingsReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  user,
  tenant,
  analytics,
  settings,
  algochart
});
