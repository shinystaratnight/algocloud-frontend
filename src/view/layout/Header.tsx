import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import authActions from 'src/modules/auth/authActions';
import authSelectors from 'src/modules/auth/authSelectors';
import layoutActions from 'src/modules/layout/layoutActions';
import { getHistory } from 'src/modules/store';
import I18nSelect from 'src/view/layout/I18nSelect';
import HeaderWrapper from 'src/view/layout/styles/HeaderWrapper';
import Avatar from 'src/view/shared/Avatar';
import config from 'src/config';



function Header(props) {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  const doToggleMenu = () => {
    let element = document.getElementById("main") || { style: { margin: "" } }
    let element2 = document.getElementById("stickyTop") || { style: { padding: "" } }
    toggle ? setToggle(false) : setToggle(true)
    if (toggle) {
      element.style["margin-left"] = ""
      element2.style["padding-left"] = ""
    }
    else {
      element.style["margin-left"] = "unset"
      element2.style["padding-left"] = "1rem"
    }
    dispatch(layoutActions.doToggleMenu());
  };

  const userText = useSelector(
    authSelectors.selectCurrentUserNameOrEmailPrefix,
  );
  const userAvatar = useSelector(
    authSelectors.selectCurrentUserAvatar,
  );
  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );
  const currentUserIsSuperadmin = useSelector(
    authSelectors.selectCurrentUserSuperadmin,
  );

  const doSignout = () => {
    dispatch(authActions.doSignout());
  };

  const doNavigateToProfile = () => {
    getHistory().push('/profile');
  };

  const doNavigateToPasswordChange = () => {
    getHistory().push('/password-change');
  };

  const doNavigateToTenants = () => {
    getHistory().push('/tenant');
  };

  return (
    <HeaderWrapper id="stickyTop" className="navbar sticky-top">
      <button
        type="button"
        onClick={doToggleMenu}
        className="btn navbar-toggler-humburger-icon navbar-vertical-toggle"
      >
        <i className="fas fa-bars" />
      </button>
      <a className="algocloud-navbar-brand-1" href="."><div className="algocloud-font"><strong>Algo</strong>Cloud</div><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="-2 2 18 12" className="algocloud-logo"><path d="M8.5 4a4.002 4.002 0 0 0-3.8 2.745.5.5 0 1 1-.949-.313 5.002 5.002 0 0 1 9.654.595A3 3 0 0 1 13 13H.5a.5.5 0 0 1 0-1H13a2 2 0 0 0 .001-4h-.026a.5.5 0 0 1-.5-.445A4 4 0 0 0 8.5 4zM0 8.5A.5.5 0 0 1 .5 8h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"></path></svg></a>


      <div>
        <span className="i18n-select">
          <I18nSelect />
        </span>

        <div className="dropdown">
          <span
            className="user-dropdown"
            data-toggle="dropdown"
          >
            <div className="user-dropdown-content">
              <span className="user-dropdown-avatar">
                <Avatar
                  size="small"
                  src={userAvatar || undefined}
                  alt="avatar"
                />
              </span>
              <span className="user-dropdown-text">
                <span>{userText}</span>{' '}
                {!currentUserIsSuperadmin && ['multi', 'multi-with-subdomain'].includes(
                  config.tenantMode,
                ) && (
                  <span className="user-dropdown-text-tenant">
                    {currentTenant && currentTenant.name}
                  </span>
                )}
                {currentUserIsSuperadmin && (
                  <span className="user-dropdown-text-superadmin">
                    {i18n('roles.superadmin.label')}
                  </span>
                )}
              </span>
            </div>
          </span>
          <div className="dropdown-menu dropdown-menu-right">
          <div className="bg-white dark__bg-1000 rounded-2 py-2">
            <button
              onClick={doNavigateToProfile}
              className="dropdown-item"
              type="button"
            >
              <i className="fas fa-user" />{' '}
              {i18n('auth.profile.title')}
            </button>
            <button
              onClick={doNavigateToPasswordChange}
              className="dropdown-item"
              type="button"
            >
              <i className="fas fa-lock" />{' '}
              {i18n('auth.passwordChange.title')}
            </button>
            {!currentUserIsSuperadmin && ['multi', 'multi-with-subdomain'].includes(
              config.tenantMode,
            ) && (
              <button
                onClick={doNavigateToTenants}
                className="dropdown-item"
                type="button"
              >
                <i className="fas fa-th-large" />{' '}
                {i18n('auth.tenants')}
              </button>
            )}
            {config.apiDocumentationUrl && (
              <a
                href={config.apiDocumentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <button
                  className="dropdown-item"
                  type="button"
                >
                  <i className="fas fa-code" />{' '}
                  {i18n('api.menu')}
                </button>
              </a>
            )}
            <button
              onClick={doSignout}
              className="dropdown-item"
              type="button"
            >
              <i className="fas fa-sign-out-alt" />{' '}
              {i18n('auth.signout')}
            </button>
          </div>
         </div>
        </div>
      </div>
    </HeaderWrapper>
  );
}

export default Header;
