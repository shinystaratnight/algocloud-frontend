import SuperadminService from 'src/modules/superadmin/superadminService';
import selectors from 'src/modules/superadmin/tenant/list/tenantListSelectors';
import Errors from 'src/modules/shared/error/errors';
import TenantService from 'src/modules/tenant/tenantService';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';
import authActions from 'src/modules/auth/authActions';

const prefix = 'SUPERADMIN_TENANT';

const tenantActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  doReset: () => async (dispatch) => {
    dispatch({
      type: tenantActions.RESETED,
    });

    dispatch(tenantActions.doFetch());
  },

  doChangePagination: (pagination) => async (
    dispatch,
    getState,
  ) => {
    dispatch({
      type: tenantActions.PAGINATION_CHANGED,
      payload: pagination,
    });

    dispatch(tenantActions.doFetchCurrentFilter());
  },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: tenantActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(tenantActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter: () => async (
    dispatch,
    getState,
  ) => {
    const filter = selectors.selectFilter(getState());
    const rawFilter = selectors.selectRawFilter(getState());
    dispatch(tenantActions.doFetch(filter, rawFilter, true));
  },

  doFetch: (filter?, rawFilter?, keepPagination = false) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: tenantActions.FETCH_STARTED,
        payload: { filter, rawFilter, keepPagination },
      });

      const response = await SuperadminService.fetchTenants(
        filter,
        selectors.selectOrderBy(getState()),
        selectors.selectLimit(getState()),
        selectors.selectOffset(getState()),
      );

      dispatch({
        type: tenantActions.FETCH_SUCCESS,
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: tenantActions.FETCH_ERROR,
      });
    }
  },
};

export default tenantActions;