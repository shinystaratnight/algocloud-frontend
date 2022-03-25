import { createSelector } from 'reselect';
import authSelectors from 'src/modules/auth/authSelectors';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import Permissions from 'src/security/permissions';

const selectPermissionToEdit = createSelector(
  [authSelectors.selectCurrentUser],
  (currentUser) =>
    currentUser.superadmin
);

const changeLogSelectors = {
  selectPermissionToEdit
};

export default changeLogSelectors;
