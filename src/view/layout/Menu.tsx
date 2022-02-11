import React, { useLayoutEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import authSelectors from 'src/modules/auth/authSelectors';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import actions from 'src/modules/layout/layoutActions';
import layoutSelectors from 'src/modules/layout/layoutSelectors';
import layoutActions from 'src/modules/layout/layoutActions';
import MenuWrapper from 'src/view/layout/styles/MenuWrapper';
import menus from 'src/view/menus';
import selectors from 'src/modules/auth/authSelectors';

function Menu(props) {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  const doToggleMenu = () => {
    let element1 = document.getElementById("body") || { style: { overflow: "" } }
    let element2 = document.getElementById("menu-nav") || { style: { position: "" } }
    toggle ? setToggle(false) : setToggle(true)
    if (toggle) {
      element1.style["overflow"] = "scroll"
      element2.style["position"] = "inherit"
    }
    else {
      element1.style["overflow"] = ""
      element2.style["position"] = "inherit"
    }
    dispatch(layoutActions.doToggleMenu());
  };

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
      <div id="menu-nav" className="menu-nav">
      
        <div className="algocloud-fixed">
        <header className="hamburger__content__header">
      <h2 className="fs-l fw-bold flex-1 break-word lh-tight">algocloud</h2>
      <button
        type="button"
        onClick={doToggleMenu}
        className="c-btn c-btn--icon-alone js-hamburger-trigger shrink-0" aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="crayons-icon c-btn__icon"><title>Close</title><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636l4.95 4.95z"></path></svg>
      </button>
    </header>

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
      </div>
    </MenuWrapper>
  );
}

export default Menu;
