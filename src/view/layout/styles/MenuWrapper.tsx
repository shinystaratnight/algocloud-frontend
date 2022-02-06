import styled from 'styled-components';

const MenuWrapper = styled.div`
  .menu-nav {
    inset: 0% auto 0% 0%;
    z-index: 10000;
    overflow: auto;
    width: 200px;
    height: 100%;
    flex-direction: column;
    background-color: var(--algocloud-card-bg-color);
  }

  @media (min-width: 576px){
    .menu-nav {
      position: fixed;
    
    }
    }

  .css-ksc7ic:hover {
    background-color: --algocloud-menu-li-hover;
    color: rgba(255, 255, 255, 0.89);
}

a:hover {
    color: #122ee2;
}
a, a:hover {
    text-decoration: none;
}

a.algocloud-navbar-brand {
  opacity: 100%;
  color: #fff!important;
  font-weight: 500!important;
  font-size: 1.4rem!important;
  left: 0px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.menu-li.active a {
  border-radius: 6px;
  background-color: var(--algocloud-menu-li-bg-active);
  color: var(--li-active);
}



.dSLQxa .menu-li a:focus, .dSLQxa .menu-li a:hover {
    -webkit-text-decoration: none;
    text-decoration: none;
}

.dSLQxa .menu-li a, .dSLQxa .menu-li .menu-li-locked {
    display: block;
    width: 100%;
    line-height: 40px;
    height: 40px;
    padding: 0 16px;
    padding-left: 24px;
    font-size: 14px;
    line-height: 40px;
    height: 40px;
    margin-top: 4px;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
}
.menu-li a .icon, .menu-li.active a .icon, .menu-li:hover a, .menu-li:hover a .icon {
    color: var(--li-hover)!important;
    background-color: var(--algocloud-menu-li-hover);
}

.menu-nav {
  inset: 0% auto 0% 0%;
  z-index: 10000;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: auto;
  width: 200px;
  height: 100%;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  background-color: var(--algocloud-card-bg-color);
  border-right-style: solid;
  border-width: 1px;
  border-color: var(--algocloud-menu-border-color) !important;
}

  .menu-logo {
    padding: 8px;
    width: 100%;
    text-align: center;
    height: 61px;
    font-weight: 500;
    font-size: 1.5em;
  }

  .algocloud-font {
    text-transform: lowercase;
}

  .menu-logo a {
    text-decoration: none;
  }

  .menu-ul {
    font-size: 13px;
    font-variant: tabular-nums;
    line-height: 1.5;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: none;
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
    line-height: 0;
    transition: background 0.3s, width 0.2s;
    zoom: 1;
    padding-left: 8px;
    padding-right: 8px;
  }

  .menu-li.active i {
    color: #687dfd;
  }

  a.algocloud-navbar-brand {
    opacity: 100%;
    color: var(--algocloud-brand-color) !important;
    font-weight: 500!important;
    font-size: 1.4rem!important;
    margin-left: 23px;
    min-height: 68px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
}



  .menu-li a,
  .menu-li .menu-li-locked {
    display: block;
    width: 100%;
    line-height: 40px;
    height: 40px;
    padding: 0 16px;
    color: var(--algocloud-body-color);
    font-weight: 600;
    border-radius: 6px;
    line-height: 40px;
    height: 40px;
    margin-top: 4px;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }

  .menu-li a .menu-icon,
  .menu-li > .menu-li-locked .menu-icon {
    margin-right: 10px;
  }

  .menu-li .menu-li-locked {
    cursor: default;
  }
`;

export default MenuWrapper;
