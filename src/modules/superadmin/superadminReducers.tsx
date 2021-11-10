import user from 'src/modules/superadmin/user/userReducers';
import tenant from 'src/modules/superadmin/tenant/tenantReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  user,
  tenant,
});
