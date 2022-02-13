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
    let element1 = document.getElementById("main") || { style: { margin: "" } }
    let element2 = document.getElementById("menu-nav") || { style: { position: "", display: "block" } }
    let element3 = document.getElementById("body") || { style: { position: "" } }

    toggle ? setToggle(false) : setToggle(true)
    if  (window.innerWidth < 575)
    if (toggle) {
      element1.style["margin"] = ""
      element2.style["position"] = "fixed"
      element2.style["display"] = "block"
      element3.style["position"] = "relative"
    }
    else {
      element1.style["margin"] = "unset"
      element2.style["position"] = "fixed"
      element2.style["display"] = "block"
      element3.style["position"] = ""
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
      <a className="algocloud-navbar-brand" href="."><div className="algocloud-font ">AlgoCloud</div></a>


      <div className="last-child" style={{display: 'flex', alignItems: 'center'}}>
                <span className="i18n-select">
          <I18nSelect />
        </span>  
      <div className="nav-link show nine-dots app-dropdown-btn" id="navbarDropdownMenu" role="button" data-hide-on-body-scroll="data-hide-on-body-scroll" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">     <div className="dropdown app-dropdown">
          <span
            className="app-dropdown user-dropdown"
            data-toggle="dropdown"/>
            <div id="app-dropdown" className="dropdown-menu dropdown-menu-end dropdown-menu-card" aria-labelledby="navbarDropdownMenu" data-bs-popper="none">
                  <div className="card shadow-none">
                    <div className="scrollbar-overlay navbar-dropdown-dots os-host os-theme-dark os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-transition os-host-overflow os-host-overflow-y" style={{overflow: 'scroll !important', overflowY: 'scroll'}}><div className="os-resize-observer-host observed"><div className="os-resize-observer" ></div></div><div className="os-size-auto-observer observed" ><div className="os-resize-observer"></div></div><div className="os-content-glue" ></div><div className="os-padding"><div className="os-viewport os-viewport-native-scrollbars-invisible" ><div className="os-content" >
                      <div className="card-body px-3">
                        <div className="row text-center gx-0 gy-0">
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="../../pages/user/profile.html" target="_blank">
                              <div className="avatar avatar-2xl"> <img className="rounded-circle" src="../../assets/img/team/3.jpg" alt=""/></div>
                              <p className="mb-0 fw-medium text-800 text-truncate fs--2">Account</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="https://themewagon.com/" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/themewagon.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Themewagon</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="https://mailbluster.com/" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/mailbluster.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Mailbluster</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/google.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Google</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/spotify.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Spotify</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/steam.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Steam</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/github-light.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Github</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/discord.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Discord</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/xbox.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">xbox</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/trello.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Kanban</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/hp.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Hp</p>
                            </a></div>
                          <div className="col-12">
                            <hr className="my-3 mx-n3 bg-200"/>
                          </div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/linkedin.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Linkedin</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/twitter.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Twitter</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/facebook.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Facebook</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/instagram.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Instagram</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/pinterest.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Pinterest</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/slack.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Slack</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/deviantart.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Deviantart</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="../../app/events/event-detail.html" target="_blank">
                              <div className="avatar avatar-2xl">
                                <div className="avatar-name rounded-circle bg-soft-primary text-primary"><span className="fs-2">E</span></div>
                              </div>
                              <p className="mb-0 fw-medium text-800 text-truncate fs--2">Events</p>
                            </a></div>
                          <div className="col-12"><a className="btn btn-outline-primary btn-sm mt-4" href="#!">Show more</a></div>
                        </div>
                      </div>
                    </div></div></div><div className="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden"><div className="os-scrollbar-track os-scrollbar-track-off"><div className="os-scrollbar-handle" ></div></div></div><div className="os-scrollbar os-scrollbar-vertical os-scrollbar-auto-hidden"><div className="os-scrollbar-track os-scrollbar-track-off"><div className="os-scrollbar-handle" ></div></div></div><div className="os-scrollbar-corner"></div></div>
                  </div>
                </div>
            </div>
            </div>      
        <div className="avatar-dropdown dropdown">
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
              <DarkMode />
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
