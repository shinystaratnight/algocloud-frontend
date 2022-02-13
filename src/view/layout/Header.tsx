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
     <div className="dropdown app-dropdown">
       
          <button 
            className="app-dropdown user-dropdown"
            id="navbarDropdownMenu" role="button" data-hide-on-body-scroll="data-hide-on-body-scroll" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true"
            data-toggle="dropdown">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" fill="currentColor" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 276.167 276.167" >
<g>
	<g>
		<path d="M33.144,2.471C15.336,2.471,0.85,16.958,0.85,34.765s14.48,32.293,32.294,32.293s32.294-14.486,32.294-32.293    S50.951,2.471,33.144,2.471z"></path>
		<path d="M137.663,2.471c-17.807,0-32.294,14.487-32.294,32.294s14.487,32.293,32.294,32.293c17.808,0,32.297-14.486,32.297-32.293    S155.477,2.471,137.663,2.471z"></path>
		<path d="M243.873,67.059c17.804,0,32.294-14.486,32.294-32.293S261.689,2.471,243.873,2.471s-32.294,14.487-32.294,32.294    S226.068,67.059,243.873,67.059z"></path>
		<path d="M32.3,170.539c17.807,0,32.297-14.483,32.297-32.293c0-17.811-14.49-32.297-32.297-32.297S0,120.436,0,138.246    C0,156.056,14.493,170.539,32.3,170.539z"></path>
		<path d="M136.819,170.539c17.804,0,32.294-14.483,32.294-32.293c0-17.811-14.478-32.297-32.294-32.297    c-17.813,0-32.294,14.486-32.294,32.297C104.525,156.056,119.012,170.539,136.819,170.539z"></path>
		<path d="M243.038,170.539c17.811,0,32.294-14.483,32.294-32.293c0-17.811-14.483-32.297-32.294-32.297    s-32.306,14.486-32.306,32.297C210.732,156.056,225.222,170.539,243.038,170.539z"></path>
		<path d="M33.039,209.108c-17.807,0-32.3,14.483-32.3,32.294c0,17.804,14.493,32.293,32.3,32.293s32.293-14.482,32.293-32.293    S50.846,209.108,33.039,209.108z"></path>
		<path d="M137.564,209.108c-17.808,0-32.3,14.483-32.3,32.294c0,17.804,14.487,32.293,32.3,32.293    c17.804,0,32.293-14.482,32.293-32.293S155.368,209.108,137.564,209.108z"></path>
		<path d="M243.771,209.108c-17.804,0-32.294,14.483-32.294,32.294c0,17.804,14.49,32.293,32.294,32.293    c17.811,0,32.294-14.482,32.294-32.293S261.575,209.108,243.771,209.108z"></path>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
</button> 
            <div id="app-dropdown" className="dropdown-menu dropdown-menu-end dropdown-menu-card" aria-labelledby="navbarDropdownMenu" data-bs-popper="none">
                  <div className="card shadow-none">
                    <div className="scrollbar-overlay navbar-dropdown-dots os-host os-theme-dark os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-transition os-host-overflow os-host-overflow-y" style={{overflow: 'scroll !important', overflowY: 'scroll'}}><div className="os-resize-observer-host observed"><div className="os-resize-observer" ></div></div><div className="os-size-auto-observer observed" ><div className="os-resize-observer"></div></div><div className="os-content-glue" ></div><div className="os-padding"><div className="os-viewport os-viewport-native-scrollbars-invisible" ><div className="os-content" >
                      <div className="card-body px-3">
                        <div className="row text-center gx-0 gy-0">
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="/profile" target="_blank">
                              <div className="avatar avatar-2xl"> <Avatar
                  size="large"
                  src={userAvatar || undefined}
                  alt="avatar"
                  className="rounded-circle"
                /></div>
                              <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Account</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="https://algorand.com/" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/algorand-logo.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Algorand</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="https://mailbluster.com/" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/mailbluster.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Mailbluster</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/google.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Google</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/spotify.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Spotify</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/steam.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Steam</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/github-light.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Github</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/discord.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Discord</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/xbox.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">xbox</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/trello.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Kanban</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/hp.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Hp</p>
                            </a></div>
                          <div className="col-12">
                            <hr className="my-3 mx-n3 bg-200"/>
                          </div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/linkedin.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Linkedin</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/twitter.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Twitter</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/facebook.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Facebook</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/instagram.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Instagram</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/pinterest.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Pinterest</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/slack.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Slack</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/deviantart.png" alt="" width="40" height="40"/>
                              <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Deviantart</p>
                            </a></div>
                          <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="../../app/events/event-detail.html" target="_blank">
                              <div className="avatar avatar-2xl">
                                <div className="avatar-name rounded-circle bg-soft-primary text-primary"><span className="fs-2">E</span></div>
                              </div>
                              <p className="mb-0 fw-medium  text-truncate fs--2">Events</p>
                            </a></div>
                          <div className="col-12"><a className="btn btn-outline-primary btn-sm mt-4" href="#!">Show more</a></div>
                        </div>
                      </div>
                    </div></div></div><div className="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden"><div className="os-scrollbar-track os-scrollbar-track-off"><div className="os-scrollbar-handle" ></div></div></div><div className="os-scrollbar os-scrollbar-vertical os-scrollbar-auto-hidden"><div className="os-scrollbar-track os-scrollbar-track-off"><div className="os-scrollbar-handle" ></div></div></div><div className="os-scrollbar-corner"></div></div>
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
            <div className="bg-white dark__bg-1000 rounded-2 py-2 m-25">
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
