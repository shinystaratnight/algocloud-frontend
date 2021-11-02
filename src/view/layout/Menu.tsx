import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import authSelectors from 'src/modules/auth/authSelectors';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import actions from 'src/modules/layout/layoutActions';
import layoutSelectors from 'src/modules/layout/layoutSelectors';
import MenuWrapper from 'src/view/layout/styles/MenuWrapper';
import menus from 'src/view/menus';
import selectors from 'src/modules/auth/authSelectors';

function Menu(props) {
  const dispatch = useDispatch();

  const logoUrl = useSelector(selectors.selectLogoUrl);

  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );
  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );
  const menuVisible = useSelector(
    layoutSelectors.selectMenuVisible,
  );

  const permissionChecker = new PermissionChecker(
    currentTenant,
    currentUser,
  );

  useLayoutEffect(() => {
    const toggleMenuOnResize = () => {
      window.innerWidth < 576
        ? dispatch(actions.doHideMenu())
        : dispatch(actions.doShowMenu());
    };

    toggleMenuOnResize();

    window.addEventListener('resize', toggleMenuOnResize);

    return () => {
      window.removeEventListener(
        'resize',
        toggleMenuOnResize,
      );
    };
  }, [dispatch]);

  const selectedKeys = () => {
    const url = props.url;

    const match = menus.find((option) => {
      if (option.exact) {
        return url === option.path;
      }

      return (
        url === option.path ||
        url.startsWith(option.path + '/')
      );
    });

    if (match) {
      return [match.path];
    }

    return [];
  };

  const match = (permission) => {
    return permissionChecker.match(permission);
  };

  const lockedForCurrentPlan = (permission) => {
    return permissionChecker.lockedForCurrentPlan(
      permission,
    );
  };

  return (
    <MenuWrapper
      style={{
        display: menuVisible ? 'block' : 'none',
      }}
    >
      <div className="menu-nav border-right">
      <a className="algocloud-navbar-brand" href="."><div className="algocloud-font"><strong>Algo</strong>Cloud</div><svg xmlns="http://www.w3.org/2000/svg" width="28" height="22" fill="currentColor" viewBox="-2 2 18 12" className="algocloud-logo"><path d="M8.5 4a4.002 4.002 0 0 0-3.8 2.745.5.5 0 1 1-.949-.313 5.002 5.002 0 0 1 9.654.595A3 3 0 0 1 13 13H.5a.5.5 0 0 1 0-1H13a2 2 0 0 0 .001-4h-.026a.5.5 0 0 1-.5-.445A4 4 0 0 0 8.5 4zM0 8.5A.5.5 0 0 1 .5 8h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"></path></svg></a>

        <ul className="menu-ul">
          {menus
            .filter((menu) =>
              match(menu.permissionRequired),
            )
            .map((menu) => (
              <li
                key={menu.path}
                className={`menu-li text-nowrap ${
                  selectedKeys().includes(menu.path)
                    ? 'active'
                    : ''
                }`}
              >
                <Link to={menu.path}>
                  <i
                    className={`menu-icon ${menu.icon}`}
                  ></i>{' '}
                  <span>{menu.label}</span>
                </Link>
              </li>
            ))}

          {menus
            .filter((menu) =>
              lockedForCurrentPlan(menu.permissionRequired),
            )
            .map((menu) => (
              <li
                key={menu.path}
                className={`menu-li text-nowrap`}
                style={{
                  cursor: 'auto',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  opacity: 0.5,
                }}
              >
                <div className="menu-li-locked">
                  <i
                    className={`menu-icon ${menu.icon}`}
                  ></i>{' '}
                  <span>{menu.label}</span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </MenuWrapper>
  );
}

export default Menu;
