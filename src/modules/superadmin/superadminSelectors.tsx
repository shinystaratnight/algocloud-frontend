import { createSelector } from 'reselect';
import authSelectors from 'src/modules/auth/authSelectors';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import Permissions from 'src/security/permissions';

const selectPermissionToUpdateUser = createSelector(
  [
    authSelectors.selectCurrentUser,
  ],
  (currentUser) =>
    new PermissionChecker(null, currentUser).match(
      Permissions.values.userUpdateBySuperadmin,
    ),
);



const superadminSelectors = {
  selectPermissionToUpdateUser,
};

export default superadminSelectors;
