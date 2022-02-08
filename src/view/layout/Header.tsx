import React, { useState } from 'react';
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
import { Link } from 'react-router-dom';
import DarkMode from 'src/view/algorand/components/DarkMode/DarkMode';



function Header(props) {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  const doToggleMenu = () => {
    let element = document.getElementById("main") || { style: { margin: "" } }
    let element2 = document.getElementById("stickyTop") || { style: { padding: "" } }
    let element3 = document.getElementById("stickyLogo") || { style: { display: "" } }
    toggle ? setToggle(false) : setToggle(true)
    if (toggle) {
      element.style["margin-left"] = ""
      element2.style["padding-left"] = ""
      element3.style["display"] = "none"
    }
    else {
      element.style["margin-left"] = "unset"
      element2.style["padding-left"] = ""
      element3.style["display"] = "flex"
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
    getHistory().push('/plan');
    // window.location.href = "http://localhost:3000/profile"
  };

  const doNavigateToPasswordChange = () => {
    getHistory().push('/password-change');
  };

  const doNavigateToTenants = () => {
    getHistory().push('/tenant');
  };

  return (
    <HeaderWrapper id="stickyTop" >
      <div id="stickyTop-2" className="navbar sticky-top">
      <button
        type="button"
        onClick={doToggleMenu}
        className="btn navbar-toggler-humburger-icon navbar-vertical-toggle"
      >
        <i className="fas fa-bars" />
      </button>


      <div className="last-child" style={{display: 'flex', alignItems: 'center'}}>
        <DarkMode />
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
                  size="medium"
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
              <Link to='/profile'>
                <button
                  className="dropdown-item"
                  type="button"
                >
                  <i className="fas fa-user" />{' '}
                  {i18n('auth.profile.title')}
                </button>
              </Link>
              <Link to="/password-change">
                <button
                  className="dropdown-item"
                  type="button"
                >
                  <i className="fas fa-lock" />{' '}
                  {i18n('auth.passwordChange.title')}
                </button>
              </Link>
              {!currentUserIsSuperadmin && ['multi', 'multi-with-subdomain'].includes(
                config.tenantMode,
              ) && (
                  <Link to="/tenant">
                    <button
                      className="dropdown-item"
                      type="button"
                    >
                      <i className="fas fa-th-large" />{' '}
                      {i18n('auth.tenants')}
                    </button>
                  </Link>
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
      </div>
    </HeaderWrapper>
  );
}

export default Header;
