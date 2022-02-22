import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import Content from 'src/view/auth/styles/Content';
import Logo from 'src/view/auth/styles/Logo';
import OtherActions from 'src/view/auth/styles/OtherActions';
import Wrapper from 'src/view/auth/styles/Wrapper';
import I18nFlags from 'src/view/layout/I18nFlags';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Typed from 'react-typed';
import SocialButtons from 'src/view/auth/styles/SocialButtons';
import config from 'src/config';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Message from 'src/view/shared/message';
const schema = yup.object().shape({
email: yupFormSchemas.string(i18n('user.fields.email'), {
required: true,
}),
password: yupFormSchemas.string(
i18n('user.fields.password'),
{
required: true,
},
),
rememberMe: yupFormSchemas.boolean(
i18n('user.fields.rememberMe'),
),
});
const videoSource = "/assets/video.mp4";
function LandingPage() {
const location = useLocation();
const dispatch = useDispatch();
const loading = useSelector(selectors.selectLoading);
const { socialErrorCode } = queryString.parse(
location.search,
);
const externalErrorMessage = useSelector(
selectors.selectErrorMessage,
);
const backgroundImageUrl = useSelector(
selectors.selectBackgroundImageUrl,
);
const logoUrl = useSelector(selectors.selectLogoUrl);
useEffect(() => {
dispatch(actions.doClearErrorMessage());
}, [dispatch]);
useEffect(() => {
if (socialErrorCode) {
if (socialErrorCode === 'generic') {
Message.error(i18n('errors.defaultErrorMessage'));
} else {
Message.error(
i18n(`auth.social.errors.${socialErrorCode}`),
);
}
}
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
const [initialValues] = useState({
email: '',
password: '',
rememberMe: true,
});
const form = useForm({
resolver: yupResolver(schema),
mode: 'onSubmit',
defaultValues: initialValues,
});
const onSubmit = ({ email, password, rememberMe }) => {
dispatch(
actions.doSigninWithEmailAndPassword(
email,
password,
rememberMe,
),
);
};
return (
<Wrapper className="main-signin">
         <main className="main" id="main">
         <nav className="navbar navbar-standard navbar-expand-lg fixed-top navbar-dark navbar-glass-shadow" data-navbar-darken-on-scroll="data-navbar-darken-on-scroll" >
               <div className="container">
                  <a className="algocloud-font dark__text-white-2 navbar-brand" href="/">algocloud</a><button type="button" aria-label="Toggle navigation" className="navbar-toggler collapsed"><span className="navbar-toggler-icon"></span></button>
                  <div className="scrollbar navbar-collapse collapse">
                     <div className="navbar-nav">
                        <div className="dropdown">
                           <a className="nav-link fw-semi-bold dropdown-toggle" id="react-aria3374201582-20" aria-expanded="false" href="/landing#!">Dashboard</a>
                           <div aria-labelledby="react-aria3374201582-20" data-bs-popper="static" className="dropdown-menu-card mt-0 dropdown-menu">
                              <div className="shadow-none dark__bg-1000 card">
                                 <div className="scrollbar max-h-dropdown p-0 py-2 card-body"><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="/">Default</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="/dashboard/analytics">Analytics</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="/dashboard/crm">CRM</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="/dashboard/e-commerce">E Commerce</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="/dashboard/project-management">Management</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="/dashboard/saas">SaaS</a></div>
                              </div>
                           </div>
                        </div> 
                        <div className="dropdown">
                           <a className="nav-link fw-semi-bold dropdown-toggle" id="react-aria3374201582-22" aria-expanded="false" href="/landing#!">App</a>
                           <div aria-labelledby="react-aria3374201582-22" data-bs-popper="static" className="dropdown-menu-card mt-0 dropdown-menu">
                              <div className="shadow-none dark__bg-1000 navbar-card-app card">
                                 <div className="scrollbar max-h-dropdown card-body">
                                    <img src="/assets/img/nav-icons/authentication-corner.f8e7f312.png" alt="" className="img-dropdown" width="130"/>
                                    <div className="row">
                                       <div className="col-md-5">
                                          <div className="flex-column navbar-nav">
                                             <a className="fw-medium py-1 link-600 nav-link" href="/app/calendar">Calendar</a><a className="fw-medium py-1 link-600 nav-link" href="/app/chat">Chat</a><a className="fw-medium py-1 link-600 nav-link" href="/app/kanban">Kanban</a>
                                             <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">Email</p>
                                             <a className="fw-medium py-1 link-600 nav-link" href="/email/inbox">Inbox</a><a className="fw-medium py-1 link-600 nav-link" href="/email/email-detail">Email detail</a><a className="fw-medium py-1 link-600 nav-link" href="/email/compose">Compose</a>
                                             <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">Events</p>
                                             <a className="fw-medium py-1 link-600 nav-link" href="/events/create-an-event">Create an event</a><a className="fw-medium py-1 link-600 nav-link" href="/events/event-detail">Event detail</a><a className="fw-medium py-1 link-600 nav-link" href="/events/event-list">Event list</a>
                                             <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">Social</p>
                                             <a className="fw-medium py-1 link-600 nav-link" href="/social/feed">Feed</a><a className="fw-medium py-1 link-600 nav-link" href="/social/activity-log">Activity log</a><a className="fw-medium py-1 link-600 nav-link" href="/social/notifications">Notifications</a><a className="fw-medium py-1 link-600 nav-link" href="/social/followers">Followers</a>
                                          </div>
                                       </div>
                                       <div className="col-md-5">
                                          <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">E Commerce</p>
                                          <a className="fw-medium py-1 link-600 nav-link" href="/e-commerce/product/product-list">Product list</a><a className="fw-medium py-1 link-600 nav-link" href="/e-commerce/product/product-grid">Product grid</a><a className="fw-medium py-1 link-600 nav-link" href="/e-commerce/product/product-details">Product details</a><a className="fw-medium py-1 link-600 nav-link" href="/e-commerce/orders/order-list">Order list</a><a className="fw-medium py-1 link-600 nav-link" href="/e-commerce/orders/order-details">Order details</a><a className="fw-medium py-1 link-600 nav-link" href="/e-commerce/customers">Customers</a><a className="fw-medium py-1 link-600 nav-link" href="/e-commerce/customer-details">Customer details</a><a className="fw-medium py-1 link-600 nav-link" href="/e-commerce/shopping-cart">Shopping cart</a><a className="fw-medium py-1 link-600 nav-link" href="/e-commerce/checkout">Checkout</a><a className="fw-medium py-1 link-600 nav-link" href="/e-commerce/billing">Billing</a><a className="fw-medium py-1 link-600 nav-link" href="/e-commerce/invoice">Invoice</a>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="dropdown">
                           <a className="nav-link fw-semi-bold dropdown-toggle" id="react-aria3374201582-24" aria-expanded="false" href="/landing#!">Pages</a>
                           <div aria-labelledby="react-aria3374201582-24" data-bs-popper="static" className="dropdown-menu-card mt-0 dropdown-menu">
                              <div className="shadow-none dark__bg-1000 navbar-card-pages card">
                                 <div className="scrollbar max-h-dropdown card-body">
                                    <img src="/assets/img/nav-icons/authentication-corner.f8e7f312.png" alt="" className="img-dropdown" width="130"/>
                                    <div className="row">
                                       <div className="col-xxl-3 col-6">
                                          <div className="flex-column navbar-nav">
                                             <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">Simple Auth</p>
                                             <a className="fw-medium py-1 link-600 nav-link" href="/authentication/simple/login">Login</a><a className="fw-medium py-1 link-600 nav-link" href="/authentication/simple/logout">Logout</a><a className="fw-medium py-1 link-600 nav-link" href="/authentication/simple/register">Register</a><a className="fw-medium py-1 link-600 nav-link" href="/authentication/simple/forgot-password">Forgot password</a><a className="fw-medium py-1 link-600 nav-link" href="/authentication/simple/confirm-mail">Confirm mail</a><a className="fw-medium py-1 link-600 nav-link" href="/authentication/simple/reset-password">Reset password</a><a className="fw-medium py-1 link-600 nav-link" href="/authentication/simple/lock-screen">Lock screen</a>
                                          </div>
                                       </div>
                                       <div className="col-xxl-3 col-6">
                                          <div className="flex-column navbar-nav">
                                             <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">Card Auth</p>
                                             <a className="fw-medium py-1 link-600 nav-link" href="/authentication/card/login">Login</a><a className="fw-medium py-1 link-600 nav-link" href="/authentication/card/logout">Logout</a><a className="fw-medium py-1 link-600 nav-link" href="/authentication/card/register">Register</a><a className="fw-medium py-1 link-600 nav-link" href="/authentication/card/forgot-password">Forgot password</a><a className="fw-medium py-1 link-600 nav-link" href="/authentication/card/confirm-mail">Confirm mail</a><a className="fw-medium py-1 link-600 nav-link" href="/authentication/card/reset-password">Reset password</a><a className="fw-medium py-1 link-600 nav-link" href="/authentication/card/lock-screen">Lock screen</a>
                                          </div>
                                       </div>
                                       <div className="col-xxl-3 col-6">
                                          <div className="flex-column navbar-nav">
                                             <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">Split Auth</p>
                                             <a className="fw-medium py-1 link-600 nav-link" href="/authentication/split/login">Login</a><a className="fw-medium py-1 link-600 nav-link" href="/authentication/split/logout">Logout</a><a className="fw-medium py-1 link-600 nav-link" href="/authentication/split/register">Register</a><a className="fw-medium py-1 link-600 nav-link" href="/authentication/split/forgot-password">Forgot password</a><a className="fw-medium py-1 link-600 nav-link" href="/authentication/split/confirm-mail">Confirm mail</a><a className="fw-medium py-1 link-600 nav-link" href="/authentication/split/reset-password">Reset password</a><a className="fw-medium py-1 link-600 nav-link" href="/authentication/split/lock-screen">Lock screen</a>
                                          </div>
                                       </div>
                                       <div className="col-xxl-3 col-6">
                                          <div className="flex-column navbar-nav">
                                             <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">Other Auth</p>
                                             <a className="fw-medium py-1 link-600 nav-link" href="/authentication/wizard">Wizard</a><a className="fw-medium py-1 link-600 nav-link" href="/authentication-modal">Modal</a>
                                             <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">Miscellaneous</p>
                                             <a className="fw-medium py-1 link-600 nav-link" href="/miscellaneous/associations">Associations</a><a className="fw-medium py-1 link-600 nav-link" href="/miscellaneous/invite-people">Invite people</a><a className="fw-medium py-1 link-600 nav-link" href="/miscellaneous/privacy-policy">Privacy policy</a>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="row">
                                       <div className="col-xxl-3 col-6">
                                          <div className="flex-column navbar-nav">
                                             <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">User</p>
                                             <a className="fw-medium py-1 link-600 nav-link" href="/user/profile">Profile</a><a className="fw-medium py-1 link-600 nav-link" href="/user/settings">Settings</a>
                                          </div>
                                       </div>
                                       <div className="col-xxl-3 col-6">
                                          <div className="flex-column navbar-nav">
                                             <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">Pricing</p>
                                             <a className="fw-medium py-1 link-600 nav-link" href="/pricing/pricing-default">Pricing default</a><a className="fw-medium py-1 link-600 nav-link" href="/pricing/pricing-alt">Pricing alt</a>
                                          </div>
                                       </div>
                                       <div className="col-xxl-3 col-6">
                                          <div className="flex-column navbar-nav">
                                             <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">Errors</p>
                                             <a className="fw-medium py-1 link-600 nav-link" href="/errors/404">404</a><a className="fw-medium py-1 link-600 nav-link" href="/errors/500">500</a>
                                          </div>
                                       </div>
                                       <div className="col-xxl-3 col-6">
                                          <div className="flex-column navbar-nav">
                                             <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">Others</p>
                                             <a className="fw-medium py-1 link-600 nav-link" href="/pages/starter">Starter</a><a className="fw-medium py-1 link-600 nav-link" href="/landing">Landing</a>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="dropdown">
                           <a className="nav-link fw-semi-bold dropdown-toggle" id="react-aria3374201582-26" aria-expanded="false" href="/landing#!">Modules</a>
                           <div aria-labelledby="react-aria3374201582-26" data-bs-popper="static" className="dropdown-menu-card mt-0 dropdown-menu">
                              <div className="shadow-none dark__bg-1000 navbar-card-components card">
                                 <div className="scrollbar max-h-dropdown card-body">
                                    <img src="/assets/img/nav-icons/authentication-corner.f8e7f312.png" alt="" className="img-dropdown" width="130"/>
                                    <div className="row">
                                       <div className="col-xxl-3 col-6">
                                          <div className="flex-column navbar-nav">
                                             <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">Components</p>
                                             <a className="fw-medium py-1 link-600 nav-link" href="/components/alerts">Alerts</a><a className="fw-medium py-1 link-600 nav-link" href="/components/accordion">Accordion</a><a className="fw-medium py-1 link-600 nav-link" href="/components/animated-icons">Animated icons</a><a className="fw-medium py-1 link-600 nav-link" href="/components/background">Background</a><a className="fw-medium py-1 link-600 nav-link" href="/components/badges">Badges</a><a className="fw-medium py-1 link-600 nav-link" href="/components/breadcrumb">Breadcrumbs</a><a className="fw-medium py-1 link-600 nav-link" href="/components/buttons">Buttons</a><a className="fw-medium py-1 link-600 nav-link" href="/components/calendar">Calendar</a><a className="fw-medium py-1 link-600 nav-link" href="/components/cards">Cards</a><a className="fw-medium py-1 link-600 nav-link" href="/components/carousel/bootstrap">Bootstrap</a><a className="fw-medium py-1 link-600 nav-link" href="/components/carousel/slick">Slick</a>
                                          </div>
                                       </div>
                                       <div className="col-xxl-3 col-6">
                                          <div className="flex-column mt-4 navbar-nav"><a className="fw-medium py-1 link-600 nav-link" href="/components/collapse">Collapse</a><a className="fw-medium py-1 link-600 nav-link" href="/components/cookie-notice">Cookie notice</a><a className="fw-medium py-1 link-600 nav-link" href="/components/countup">Countup</a><a className="fw-medium py-1 link-600 nav-link" href="/components/draggable">Draggable</a><a className="fw-medium py-1 link-600 nav-link" href="/components/dropdowns">Dropdowns</a><a className="fw-medium py-1 link-600 nav-link" href="/components/list-group">List group</a><a className="fw-medium py-1 link-600 nav-link" href="/components/modals">Modals</a><a className="fw-medium py-1 link-600 nav-link" href="/components/offcanvas">Offcanvas</a><a className="fw-medium py-1 link-600 nav-link" href="/components/navs-and-tabs/navs">Navs</a><a className="fw-medium py-1 link-600 nav-link" href="/components/navs-and-tabs/navbar">Navbar</a><a className="fw-medium py-1 link-600 nav-link" href="/components/navs-and-tabs/vertical-navbar">Vertical navbar</a></div>
                                       </div>
                                       <div className="col-xxl-3 col-6">
                                          <div className="flex-column mt-xxl-4 navbar-nav"><a className="fw-medium py-1 link-600 nav-link" href="/components/navs-and-tabs/top-navbar">Top navbar</a><a className="fw-medium py-1 link-600 nav-link" href="/components/navs-and-tabs/combo-navbar">Combo navbar</a><a className="fw-medium py-1 link-600 nav-link" href="/components/navs-and-tabs/tabs">Tabs</a><a className="fw-medium py-1 link-600 nav-link" href="/components/pictures/avatar">Avatar</a><a className="fw-medium py-1 link-600 nav-link" href="/components/pictures/images">Images</a><a className="fw-medium py-1 link-600 nav-link" href="/components/pictures/figures">Figures</a><a className="fw-medium py-1 link-600 nav-link" href="/components/pictures/hoverbox">Hoverbox</a><a className="fw-medium py-1 link-600 nav-link" href="/components/pictures/lightbox">Lightbox</a><a className="fw-medium py-1 link-600 nav-link" href="/components/progress-bar">Progress Bar</a><a className="fw-medium py-1 link-600 nav-link" href="/components/pagination">Pagination</a><a className="fw-medium py-1 link-600 nav-link" href="/components/placeholder">Placeholder</a></div>
                                       </div>
                                       <div className="col-xxl-3 col-6">
                                          <div className="flex-column mt-xxl-4 navbar-nav"><a className="fw-medium py-1 link-600 nav-link" href="/components/popovers">Popovers</a><a className="fw-medium py-1 link-600 nav-link" href="/components/scrollspy">Scrollspy</a><a className="fw-medium py-1 link-600 nav-link" href="/components/search">Search</a><a className="fw-medium py-1 link-600 nav-link" href="/components/spinners">Spinners</a><a className="fw-medium py-1 link-600 nav-link" href="/components/toasts">Toasts</a><a className="fw-medium py-1 link-600 nav-link" href="/components/tooltips">Tooltips</a><a className="fw-medium py-1 link-600 nav-link" href="/components/treeview">Treeview</a><a className="fw-medium py-1 link-600 nav-link" href="/components/typed-text">Typed text</a><a className="fw-medium py-1 link-600 nav-link" href="/components/videos/embed">Embed</a><a className="fw-medium py-1 link-600 nav-link" href="/components/videos/react-player">React Player</a></div>
                                       </div>
                                    </div>
                                    <div className="row">
                                       <div className="col-xxl-3 col-6">
                                          <div className="flex-column navbar-nav">
                                             <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">Forms</p>
                                             <a className="fw-medium py-1 link-600 nav-link" href="/forms/basic/form-control">Form control</a><a className="fw-medium py-1 link-600 nav-link" href="/forms/basic/input-group">Input group</a><a className="fw-medium py-1 link-600 nav-link" href="/forms/basic/select">Select</a><a className="fw-medium py-1 link-600 nav-link" href="/forms/basic/checks">Checks</a><a className="fw-medium py-1 link-600 nav-link" href="/forms/basic/range">Range</a><a className="fw-medium py-1 link-600 nav-link" href="/forms/basic/layout">Layout</a><a className="fw-medium py-1 link-600 nav-link" href="/forms/advance/advance-select">Advance select</a><a className="fw-medium py-1 link-600 nav-link" href="/forms/advance/date-picker">Date picker</a><a className="fw-medium py-1 link-600 nav-link" href="/forms/advance/editor">Editor</a><a className="fw-medium py-1 link-600 nav-link" href="/forms/advance/emoji-button">Emoji button</a><a className="fw-medium py-1 link-600 nav-link" href="/forms/advance/file-uploader">File uploader</a><a className="fw-medium py-1 link-600 nav-link" href="/forms/advance/rating">Rating</a><a className="fw-medium py-1 link-600 nav-link" href="/forms/floating-labels">Floating labels</a><a className="fw-medium py-1 link-600 nav-link" href="/forms/wizard">Wizard</a><a className="fw-medium py-1 link-600 nav-link" href="/forms/validation">Validation</a>
                                          </div>
                                       </div>
                                       <div className="col-xxl-3 col-6">
                                          <div className="flex-column navbar-nav">
                                             <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">Tabels</p>
                                             <a className="fw-medium py-1 link-600 nav-link" href="/tables/basic-tables">Basic tables</a><a className="fw-medium py-1 link-600 nav-link" href="/tables/advance-tables">Advance tables</a>
                                             <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">Charts</p>
                                             <a className="fw-medium py-1 link-600 nav-link" href="/charts/chartjs">Chartjs</a>
                                             <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">ECharts</p>
                                             <a className="fw-medium py-1 link-600 nav-link" href="/charts/echarts/how-to-use">How to use</a><a className="fw-medium py-1 link-600 nav-link" href="/charts/echarts/line-charts">Line charts</a><a className="fw-medium py-1 link-600 nav-link" href="/charts/echarts/bar-charts">Bar charts</a><a className="fw-medium py-1 link-600 nav-link" href="/charts/echarts/candlestick-charts">Candlestick charts</a><a className="fw-medium py-1 link-600 nav-link" href="/charts/echarts/geo-map">Geo map</a><a className="fw-medium py-1 link-600 nav-link" href="/charts/echarts/scatter-charts">Scatter charts</a><a className="fw-medium py-1 link-600 nav-link" href="/charts/echarts/pie-charts">Pie charts</a><a className="fw-medium py-1 link-600 nav-link" href="/charts/echarts/radar-charts">Radar charts</a><a className="fw-medium py-1 link-600 nav-link" href="/charts/echarts/heatmap-charts">Heatmap charts</a>
                                          </div>
                                       </div>
                                       <div className="col-xxl-3 col-6">
                                          <div className="flex-column navbar-nav">
                                             <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">Utilities</p>
                                             <a className="fw-medium py-1 link-600 nav-link" href="/utilities/borders">Borders</a><a className="fw-medium py-1 link-600 nav-link" href="/utilities/colors">Colors</a><a className="fw-medium py-1 link-600 nav-link" href="/utilities/colored-links">Colored links</a><a className="fw-medium py-1 link-600 nav-link" href="/utilities/display">Display</a><a className="fw-medium py-1 link-600 nav-link" href="/utilities/flex">Flex</a><a className="fw-medium py-1 link-600 nav-link" href="/utilities/float">Float</a><a className="fw-medium py-1 link-600 nav-link" href="/utilities/grid">Grid</a><a className="fw-medium py-1 link-600 nav-link" href="/utilities/scroll-bar">Scroll Bar</a><a className="fw-medium py-1 link-600 nav-link" href="/utilities/position">Position</a><a className="fw-medium py-1 link-600 nav-link" href="/utilities/spacing">Spacing</a><a className="fw-medium py-1 link-600 nav-link" href="/utilities/sizing">Sizing</a><a className="fw-medium py-1 link-600 nav-link" href="/utilities/stretched-link">Stretched link</a><a className="fw-medium py-1 link-600 nav-link" href="/utilities/text-truncation">Text truncation</a><a className="fw-medium py-1 link-600 nav-link" href="/utilities/typography">Typography</a><a className="fw-medium py-1 link-600 nav-link" href="/utilities/vertical-align">Vertical align</a><a className="fw-medium py-1 link-600 nav-link" href="/utilities/visibility">Visibility</a>
                                          </div>
                                       </div>
                                       <div className="col-xxl-3 col-6">
                                          <div className="flex-column navbar-nav">
                                             <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">Icons</p>
                                             <a className="fw-medium py-1 link-600 nav-link" href="/icons/font-awesome">Font awesome</a><a className="fw-medium py-1 link-600 nav-link" href="/icons/react-icons">React icons</a>
                                             <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">Maps</p>
                                             <a className="fw-medium py-1 link-600 nav-link" href="/maps/google-map">Google map</a><a className="fw-medium py-1 link-600 nav-link" href="/maps/leaflet-map">Leaflet map</a>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="dropdown">
                           <a className="nav-link fw-semi-bold dropdown-toggle" id="react-aria3374201582-28" aria-expanded="false" href="/landing#!">Documentation</a>
                           <div aria-labelledby="react-aria3374201582-28" data-bs-popper="static" className="dropdown-menu-card mt-0 dropdown-menu">
                              <div className="shadow-none dark__bg-1000 card">
                                 <div className="scrollbar max-h-dropdown p-0 py-2 card-body"><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="/documentation/getting-started">Getting started</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="/documentation/configuration">Configuration</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="/documentation/styling">Styling</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="/documentation/dark-mode">Dark mode</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="/documentation/plugin">Plugin</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="/documentation/design-file">Design file</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="/changelog">Changelog</a></div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="ms-auto navbar-nav">
                        <div className="nav-item">
                        <button className="nav-link c-pill crayons-tooltip__activator" type="button" aria-disabled="false">
                              <div>
                                 <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chart-pie" className="svg-inline--fa fa-chart-pie fa-w-17 d-none d-lg-inline-block" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 544 512" id="dashboardTooltip">
                                    <path fill="currentColor" d="M527.79 288H290.5l158.03 158.03c6.04 6.04 15.98 6.53 22.19.68 38.7-36.46 65.32-85.61 73.13-140.86 1.34-9.46-6.51-17.85-16.06-17.85zm-15.83-64.8C503.72 103.74 408.26 8.28 288.8.04 279.68-.59 272 7.1 272 16.24V240h223.77c9.14 0 16.82-7.68 16.19-16.8zM224 288V50.71c0-9.55-8.39-17.4-17.84-16.06C86.99 51.49-4.1 155.6.14 280.37 4.5 408.51 114.83 513.59 243.03 511.98c50.4-.63 96.97-16.87 135.26-44.03 7.9-5.6 8.42-17.23 1.57-24.08L224 288z"></path>
                                 </svg>
                              </div>
                              <span data-testid="tooltip" className="crayons-tooltip__content">Dashboard</span> 
                           </button>
                        </div>
                        <div className="nav-item">
                        <button className="nav-link c-pill crayons-tooltip__activator" type="button" aria-disabled="false">
                              <div>
                                 <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="book" className="svg-inline--fa fa-book fa-w-14 d-none d-lg-inline-block" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="documentationTooltip">
                                    <path fill="currentColor" d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"></path>
                                 </svg>
                              </div>
                              <span data-testid="tooltip" className="crayons-tooltip__content">Documentation</span>
                           </button>
                        </div>
                        
         <li className="nav-item dropdown">
         <a className="nav-link dropdown-toggle" id="navbarDropdownLogin" role="button"  aria-haspopup="true" 
         
         data-bs-toggle="dropdown" 
         data-hide-on-body-scroll="data-hide-on-body-scroll"
         aria-expanded="true"
         data-toggle="dropdown" >Login</a>
                               <div className="dropdown-menu dropdown-menu-end dropdown-menu-card " aria-labelledby="navbarDropdownNotification">
                  <div className="navbar-card-login shadow-none card">
                  <Content style={{ padding: '0px'}}>
            <Logo className="login-header">
             <a className="font-sans-serif fw-bolder fs-4 z-index-1 position-relative link-light light" href="."></a>
          {logoUrl ? ( 
            <img 
              src={logoUrl}
              width="240px"
              alt={i18n('app.title')}
            /> 
          ) : (
            <img className="login-header-img" alt="AlgoCloud" title="AlgoCloud" src="/assets/brand-assets/logo.svg"/>
          )}
        </Logo>

                     
                     <div className="fs--1 fw-normal p-4 card-body"><div className="d-flex justify-content-between align-items-center mb-2"><h5>Log in</h5>
                     <p className="fs--1 text-600 mb-0" style={{display: "flex"}}>or <OtherActions style={{marginTop: "0px",marginLeft: ".5rem" }}>
              <Link style={{color: "var(--link-brand-color)", marginTop: "0px"}}
                
                to="/auth/signup"
              >
                {i18n('auth.createAnAccount')}
              </Link>
            </OtherActions></p></div>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-3">  <InputFormItem  
              name="email"
              placeholder={i18n('user.fields.email')}
              autoComplete="email"
              autoFocus
              externalErrorMessage={externalErrorMessage}
            /></div>
                     <div className="mb-3">                  
                     <InputFormItem
              name="password"
              placeholder={i18n('user.fields.password')}
              autoComplete="password"
              type="password"
            /></div><div className="justify-content-between align-items-center row"><div className="col-auto">
               <div className="form-check mb-0">                
                    <input
                  className={"form-check-input"}

                  type={"checkbox"}
                  id={'rememberMe'}
                  name={'rememberMe'}
                  ref={form.register}
                />                <label
                className="form-check-label mb-0"
                htmlFor={'rememberMe'}
                style={{ paddingLeft: '0px !important' }}
              >
                {i18n('user.fields.rememberMe')}
              </label></div>
                        </div>
                        <div className="col-auto">
                        <Link
                  style={{color: "var(--link-brand-color)", marginTop: "0px", paddingLeft: "0px"}}
                  className="fs--1"
                  to="/auth/forgot-password" 
                >
                  {i18n('auth.forgotPassword')}
                </Link>
                </div></div><div>            
                        <div className="mb-3">            
                        <button
              className="btn btn-primary d-block w-100 mt-3"
              type="submit"
              disabled={loading}
            >
              <ButtonIcon loading={loading} />{' '}
              {i18n('auth.signin')}
            </button></div></div>
                        <div className="w-100 position-relative text-center mt-4"><hr className="text-300"/><div className="divider-content-center">or log in with</div></div><div className="mb-0">
                           <div className="row">
                        <SocialButtons className="mt-0">
        <div className="row g-2 mt-2 w-100">
        <div className="col-sm-6">
              <a className="btn-outline-facebook mt-2 w-100 btn btn-sm"
                href={`${config.backendUrl}/auth/social/facebook`}
              >
 <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-square" className="svg-inline--fa fa-facebook-square fa-w-14 me-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{transformOrigin: "0.4375em 0.5em"}}><g transform="translate(224 256)"><g transform="translate(0, 0)  scale(1.5, 1.5)  rotate(0 0 0)"><path fill="currentColor" d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" transform="translate(-224 -256)"></path></g></g></svg> facebook
              </a>
              </div>
              <div className="col-sm-6">
              <a className="btn-outline-google-plus mt-2 w-100 btn btn-sm"
                href={`${config.backendUrl}/auth/social/google`}
              >
 <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-plus-g" className="svg-inline--fa fa-google-plus-g fa-w-20 me-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style={{transformOrigin: "0.625em 0.5em"}}><g transform="translate(320 256)"><g transform="translate(0, 0)  scale(1.5, 1.5)  rotate(0 0 0)"><path fill="currentColor" d="M386.061 228.496c1.834 9.692 3.143 19.384 3.143 31.956C389.204 370.205 315.599 448 204.8 448c-106.084 0-192-85.915-192-192s85.916-192 192-192c51.864 0 95.083 18.859 128.611 50.292l-52.126 50.03c-14.145-13.621-39.028-29.599-76.485-29.599-65.484 0-118.92 54.221-118.92 121.277 0 67.056 53.436 121.277 118.92 121.277 75.961 0 104.513-54.745 108.965-82.773H204.8v-66.009h181.261zm185.406 6.437V179.2h-56.001v55.733h-55.733v56.001h55.733v55.733h56.001v-55.733H627.2v-56.001h-55.733z" transform="translate(-320 -256)"></path></g></g></svg> google
              </a>
              </div>
              </div> 
            </SocialButtons> 
           </div></div>

            </form>
            <div className=""><I18nFlags className="built-by-flags"/></div>
          
        </FormProvider>
                     </div>
                     </Content>
                        <div className="nav-item dropdown">                                  
                        
                        
                     </div>
                  </div></div> 
 
                  </li>
                  <li className="nav-item"><a className="nav-link" href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal">Register</a></li>

                  </div>
                  </div>
                 
                  </div> 
                  
            </nav>
            <section className="py-0 overflow-hidden light" id="banner">
               <div className="bg-holder overlay" style={{backgroundImage: "url(/assets/light-bg-01.png)", backgroundPosition: "centerBottom"}}></div>
               <div className="container">
                  <div className="justify-content-center align-items-center pt-8 pb-lg-9 pt-lg-9 pb-xl-0 row">
                     <div className="pb-7 pb-xl-9 text-center text-xl-start col-xl-4 col-lg-8 col-md-11">
                        <a role="button" href="/landing#!" className="mb-4 fs--1 border-2 rounded-pill btn btn-outline-danger"><span className="me-2" role="img" aria-label="Gift">🎁</span>Become a pro</a>
                        <h1 className="text-white-2 fw-light">
            Bring
            <Typed
              strings={['design', 'beauty', 'elegance', 'perfection']}
              typeSpeed={40}
              backSpeed={50}
              className="fw-bold ps-2"
              loop
            />
                        <br />
            to your webapp
          </h1>
                        <p className="lead text-white-2 opacity-75">With the power of AlgoCloud, you can now focus only on functionaries for your digital products, while leaving the UI design on us!</p>
                        <a role="button" href="/landing#!" className="border-2 rounded-pill mt-4 fs-0 py-2 btn btn-outline-light btn-lg">
                           Start building with the AlgoCloud
                           <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" className="svg-inline--fa fa-play fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" 
                           style={{transformOrigin: '0.75em 0.5625em'}}>
                              <g transform="translate(224 256)">
                                 <g transform="translate(160, 32)  scale(0.625, 0.625)  rotate(0 0 0)">
                                    <path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" transform="translate(-224 -256)"></path>
                                 </g>
                              </g>
                           </svg>
                        </a>
                     </div>
                     <div className="align-self-end mt-4 mt-xl-0 col-xl-7 offset-xl-1"><a className="img-landing-banner" href="/"><img className="img-fluid" src="/assets/img/nav-icons/generic/dashboard-alt.png" alt=""/></a></div>
                  </div>
               </div>
            </section>
            <section className="bg-light py-3 shadow-sm">
               <div className="container">
                  <div className="flex-center row">
                     <div className="my-1 my-sm-3 px-card col-sm-auto col-3">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATIAAABkCAYAAAAFZrybAAAACXBIWXMAAC4jAAAuIwF4pT92AAAKamlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTExLTAzVDEyOjM3OjAzKzA2OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0xMS0wM1QxNTowNDoxNCswNjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0xMS0wM1QxNTowNDoxNCswNjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3ZmJhZmUxOC05YmY2LTQ0OGUtYjRmYi0yMzUwMzdlMDg4MTAiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpkZGE2ODI1Ny0zMjU1LTE1NGItYjEwYS1iYWI1ODgzY2M5ODQiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplYzNhMjU2YS0zZjgyLTQ1YjYtODI1MS04OGMwYmUyZTUzNWMiPiA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8cmRmOkJhZz4gPHJkZjpsaT54bXAuZGlkOjBGRThGRkFDM0U0NTExRTQ4MEY3QTdGNTlBNTM3Q0QyPC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDpDQzNFNDU4QkU5OTkxMUUzOUU0RkNCMjAyQUMxMzUzNTwvcmRmOmxpPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmVjM2EyNTZhLTNmODItNDViNi04MjUxLTg4YzBiZTJlNTM1YyIgc3RFdnQ6d2hlbj0iMjAxOS0xMS0wM1QxMjozNzowMyswNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmNhOWZkYzhhLTU4NWMtNGEzZi1iOTgxLWZiZDg5NGU0N2ZmZiIgc3RFdnQ6d2hlbj0iMjAxOS0xMS0wM1QxNTowMzoxMSswNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmZjYzViNzc2LTcxMmUtNDliYi05ZDNkLTk5ZDk2ZjkxNzc2ZCIgc3RFdnQ6d2hlbj0iMjAxOS0xMS0wM1QxNTowNDoxNCswNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjdmYmFmZTE4LTliZjYtNDQ4ZS1iNGZiLTIzNTAzN2UwODgxMCIgc3RFdnQ6d2hlbj0iMjAxOS0xMS0wM1QxNTowNDoxNCswNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmZjYzViNzc2LTcxMmUtNDliYi05ZDNkLTk5ZDk2ZjkxNzc2ZCIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmMwMDc2ZDFlLWRlYzEtY2Q0MC1hMjA0LTNlZjA3YTEwMGUzZSIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmVjM2EyNTZhLTNmODItNDViNi04MjUxLTg4YzBiZTJlNTM1YyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6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" height="40" alt="Partner" className="landing-cta-img"/></div>
                     <div className="my-1 my-sm-3 px-card col-sm-auto col-3"><img src="/assets/img/nav-icons/11.e27dc6c9.png" height="45" alt="Partner" className="landing-cta-img"/></div>
                     <div className="my-1 my-sm-3 px-card col-sm-auto col-3"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASAAAABkCAYAAAAmPe1OAAAACXBIWXMAAC4jAAAuIwF4pT92AAAKamlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTExLTAzVDEyOjM3OjAzKzA2OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0xMS0wM1QxNTowNTo1NyswNjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0xMS0wM1QxNTowNTo1NyswNjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjZGUyMTIwZi1lYzJiLTQ4NDItODgwMC1lMmZlZTc3OTBkN2MiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo3ZWVjZGUyZi04MTJkLTk2NDUtYTM1Zi0zOGM0YTM1MjVmZTIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplYzNhMjU2YS0zZjgyLTQ1YjYtODI1MS04OGMwYmUyZTUzNWMiPiA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8cmRmOkJhZz4gPHJkZjpsaT54bXAuZGlkOjBGRThGRkFDM0U0NTExRTQ4MEY3QTdGNTlBNTM3Q0QyPC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDpDQzNFNDU4QkU5OTkxMUUzOUU0RkNCMjAyQUMxMzUzNTwvcmRmOmxpPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmVjM2EyNTZhLTNmODItNDViNi04MjUxLTg4YzBiZTJlNTM1YyIgc3RFdnQ6d2hlbj0iMjAxOS0xMS0wM1QxMjozNzowMyswNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmNhOWZkYzhhLTU4NWMtNGEzZi1iOTgxLWZiZDg5NGU0N2ZmZiIgc3RFdnQ6d2hlbj0iMjAxOS0xMS0wM1QxNTowMzoxMSswNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmFlYjQ1MmU2LWU2YzYtNGVlZS1hYjRjLTQyODkxNmNjMTdlOCIgc3RFdnQ6d2hlbj0iMjAxOS0xMS0wM1QxNTowNTo1NyswNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmNkZTIxMjBmLWVjMmItNDg0Mi04ODAwLWUyZmVlNzc5MGQ3YyIgc3RFdnQ6d2hlbj0iMjAxOS0xMS0wM1QxNTowNTo1NyswNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmFlYjQ1MmU2LWU2YzYtNGVlZS1hYjRjLTQyODkxNmNjMTdlOCIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmMwMDc2ZDFlLWRlYzEtY2Q0MC1hMjA0LTNlZjA3YTEwMGUzZSIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmVjM2EyNTZhLTNmODItNDViNi04MjUxLTg4YzBiZTJlNTM1YyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6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" height="30" alt="Partner" className="landing-cta-img"/></div>
                     <div className="my-1 my-sm-3 px-card col-sm-auto col-3"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXIAAABkCAYAAACb3Ls7AAAACXBIWXMAAC4jAAAuIwF4pT92AAAKamlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTExLTAzVDEyOjM3OjAzKzA2OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0xMS0wM1QxNTowNjozOCswNjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0xMS0wM1QxNTowNjozOCswNjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDphOGExZjdlZC00MWM4LTRlYzYtYjMxYy0yOThmZWZlYTY5YTgiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo0OWQ2NGVjOS01NGMwLWI1NDItODRmNy0yY2UwNjk1NGQxOTQiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplYzNhMjU2YS0zZjgyLTQ1YjYtODI1MS04OGMwYmUyZTUzNWMiPiA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8cmRmOkJhZz4gPHJkZjpsaT54bXAuZGlkOjBGRThGRkFDM0U0NTExRTQ4MEY3QTdGNTlBNTM3Q0QyPC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDpDQzNFNDU4QkU5OTkxMUUzOUU0RkNCMjAyQUMxMzUzNTwvcmRmOmxpPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmVjM2EyNTZhLTNmODItNDViNi04MjUxLTg4YzBiZTJlNTM1YyIgc3RFdnQ6d2hlbj0iMjAxOS0xMS0wM1QxMjozNzowMyswNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmNhOWZkYzhhLTU4NWMtNGEzZi1iOTgxLWZiZDg5NGU0N2ZmZiIgc3RFdnQ6d2hlbj0iMjAxOS0xMS0wM1QxNTowMzoxMSswNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmEzOGFhNTRlLTJiMmEtNDQ2NS1hMmQ1LTNkNzQyNWZjNWViZiIgc3RFdnQ6d2hlbj0iMjAxOS0xMS0wM1QxNTowNjozOCswNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmE4YTFmN2VkLTQxYzgtNGVjNi1iMzFjLTI5OGZlZmVhNjlhOCIgc3RFdnQ6d2hlbj0iMjAxOS0xMS0wM1QxNTowNjozOCswNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmEzOGFhNTRlLTJiMmEtNDQ2NS1hMmQ1LTNkNzQyNWZjNWViZiIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmMwMDc2ZDFlLWRlYzEtY2Q0MC1hMjA0LTNlZjA3YTEwMGUzZSIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmVjM2EyNTZhLTNmODItNDViNi04MjUxLTg4YzBiZTJlNTM1YyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6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" height="30" alt="Partner" className="landing-cta-img"/></div>
                     <div className="my-1 my-sm-3 px-card col-sm-auto col-3"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWkAAABkCAYAAABEksEkAAAACXBIWXMAAC4jAAAuIwF4pT92AAAKamlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTExLTAzVDEyOjM3OjAzKzA2OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0xMS0wM1QxNTowNzowNSswNjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0xMS0wM1QxNTowNzowNSswNjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDphNTA2YzdjMy1hZWFiLTQyNjktOTdmNC00NWE1ZmJkNDliOGMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpkZWRkMDQ2NC04YTA0LWQwNGMtYWExZC0wMDVjZDU3ZjZkYTUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplYzNhMjU2YS0zZjgyLTQ1YjYtODI1MS04OGMwYmUyZTUzNWMiPiA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8cmRmOkJhZz4gPHJkZjpsaT54bXAuZGlkOjBGRThGRkFDM0U0NTExRTQ4MEY3QTdGNTlBNTM3Q0QyPC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDpDQzNFNDU4QkU5OTkxMUUzOUU0RkNCMjAyQUMxMzUzNTwvcmRmOmxpPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmVjM2EyNTZhLTNmODItNDViNi04MjUxLTg4YzBiZTJlNTM1YyIgc3RFdnQ6d2hlbj0iMjAxOS0xMS0wM1QxMjozNzowMyswNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmNhOWZkYzhhLTU4NWMtNGEzZi1iOTgxLWZiZDg5NGU0N2ZmZiIgc3RFdnQ6d2hlbj0iMjAxOS0xMS0wM1QxNTowMzoxMSswNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmMxYjBmYTI3LTdmNjUtNGU0MC1hYTAyLWFjZWUyMGQ0OGE4ZiIgc3RFdnQ6d2hlbj0iMjAxOS0xMS0wM1QxNTowNzowNSswNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmE1MDZjN2MzLWFlYWItNDI2OS05N2Y0LTQ1YTVmYmQ0OWI4YyIgc3RFdnQ6d2hlbj0iMjAxOS0xMS0wM1QxNTowNzowNSswNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmMxYjBmYTI3LTdmNjUtNGU0MC1hYTAyLWFjZWUyMGQ0OGE4ZiIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmMwMDc2ZDFlLWRlYzEtY2Q0MC1hMjA0LTNlZjA3YTEwMGUzZSIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmVjM2EyNTZhLTNmODItNDViNi04MjUxLTg4YzBiZTJlNTM1YyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6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
                     bAeAe5zPM44tpWqe6c971HQmr2YeeFBYEeFx53EfDt7qaAUZgqHMFv1/Vhxfu/qfUlGsetW9h/dgzkRyxZRO4xNYpXiqQAOA1/ApwzniIPMLExjs+go8Dm0PQhnMPv3X/l07KWyumCzVNmlwmO0Ok4r+tCOR9X3No6tZvdjNb+3CmU3MobtEN+i+lDWRqawsfg3bILajt+u7go2MRzEzwezD1uVf5H8ZYmvYc99R0yP3qu014HPi2WeovMOjvPA/2Iz9FasO0XR2rVj2IQ2Svp1vYnOi9wsO+o4WtNXka1yXSmozkPdMmoMe1BfxUpU3oY1ayjb5XsM2zUdI71wfaeZwBTcPmAjdt2bKK+wL2I29mPYqt09KQQb5/+B7Q62Y82eWzGOTR4H6OCk2feDH7rmbewEviSW+Tz2ZXcbw8DNWC3dYWwHMcTsqnIGm5GvYg/mWcz54OkMCvxZi93zz9R+L8Vqhw8yO+HMYCaMa9jD/gFWfuBD9D02q2I11nFlJdbQYDlmFlmMXXcftvOcwq57ArvW87Xf3TDu12P3bBV2/8AWGPXz7IpJ03sl/bBY3iW6U0GD3djGB66f2Qf1OtWsFoJqOUv6TmeA2cYCM3TWAenBedJNE7005k+j33HJ8VTSd6Av41dlooyCaebfwxlko5uVkycx5sV4heCBT3PXyAAMgmBB4aWkh9H3OXuH9G7bQRAE8xYvJf2gg8xOlEENgiDoKB5KegizRys5z/zoohEEQZALDyW9y0HmiIPMIAiCrsdDSd8jljdFtXU6giAIuga1kt6KPg18lOqaSgZBEHQVaiXtEXa330FmEARBT6BU0jfVfpScpvN1OoIgCDqGUklH2F0QBIEYlZJeAmwRyapzmS4pcBIEQdApVEraI+yu1+p0BEEQyFEp6btFcpJEnY4gCBY8CiXtEXZ3BKs/GwRBsKBRKGmPsLtwGAZBEFBeSW9AH3Y3hq5dVBAEQU9Ttuj/DixtW9m5e49QVhAEQU/z/+ru7jXgXx5ZAAAAAElFTkSuQmCC" height="35" alt="Partner" className="landing-cta-img"/></div>
                     <div className="my-1 my-sm-3 px-card col-sm-auto col-3"><img src="/assets/img/nav-icons/10.34e97c41.png" height="40" alt="Partner" className="landing-cta-img"/></div>
                     <div className="my-1 my-sm-3 px-card col-sm-auto col-3"><img src="/assets/img/nav-icons/12.0c969b74.png" height="40" alt="Partner" className="landing-cta-img"/></div>
                  </div>
               </div>
            </section>
            <section className="">
               <div className="container">
                  <div className="justify-content-center text-center row">
                     <div className="col-xxl-6 col-xxl-6 col-xl-7 col-lg-8">
                        <h1 className="fs-2 fs-sm-4 fs-md-5">WebApp theme of the future</h1>
                        <p className="lead">Built on top of Bootstrap 5, super modular AlgoCloud provides you gorgeous design &amp; streamlined UX for your WebApp.</p>
                     </div>
                  </div>
                  <div className="flex-center mt-8 row">
                     <div className="ps-lg-6 col-xl-4 col-lg-5 col-md-6 order-md-0"><img src="/assets/iso-1.png" alt="" className="px-6 px-md-0 img-fluid"/></div>
                     <div className="mt-4 mt-md-0 col-xl-4 col-lg-5 col-md">
                        <h5 className="text-danger">
                           <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="lightbulb" className="svg-inline--fa fa-lightbulb fa-w-11 me-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                              <path fill="currentColor" d="M176 80c-52.94 0-96 43.06-96 96 0 8.84 7.16 16 16 16s16-7.16 16-16c0-35.3 28.72-64 64-64 8.84 0 16-7.16 16-16s-7.16-16-16-16zM96.06 459.17c0 3.15.93 6.22 2.68 8.84l24.51 36.84c2.97 4.46 7.97 7.14 13.32 7.14h78.85c5.36 0 10.36-2.68 13.32-7.14l24.51-36.84c1.74-2.62 2.67-5.7 2.68-8.84l.05-43.18H96.02l.04 43.18zM176 0C73.72 0 0 82.97 0 176c0 44.37 16.45 84.85 43.56 115.78 16.64 18.99 42.74 58.8 52.42 92.16v.06h48v-.12c-.01-4.77-.72-9.51-2.15-14.07-5.59-17.81-22.82-64.77-62.17-109.67-20.54-23.43-31.52-53.15-31.61-84.14-.2-73.64 59.67-128 127.95-128 70.58 0 128 57.42 128 128 0 30.97-11.24 60.85-31.65 84.14-39.11 44.61-56.42 91.47-62.1 109.46a47.507 47.507 0 0 0-2.22 14.3v.1h48v-.05c9.68-33.37 35.78-73.18 52.42-92.16C335.55 260.85 352 220.37 352 176 352 78.8 273.2 0 176 0z"></path>
                           </svg>
                           PLAN
                        </h5>
                        <h3>Blueprint &amp; design</h3>
                        <p>With AlgoCloud as your guide, now you have a fine-tuned state of the earth tool to make your wireframe a reality.</p>
                     </div>
                  </div>
                  <div className="flex-center mt-7 row">
                     <div className="pe-lg-6 col-xl-4 col-lg-5 col-md-6 order-md-2"><img src="/assets/iso-2.png" alt="" className="px-6 px-md-0 img-fluid"/></div>
                     <div className="mt-4 mt-md-0 col-xl-4 col-lg-5 col-md">
                        <h5 className="text-info">
                           <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="object-ungroup" className="svg-inline--fa fa-object-ungroup fa-w-18 me-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                              <path fill="currentColor" d="M564 224c6.627 0 12-5.373 12-12v-72c0-6.627-5.373-12-12-12h-72c-6.627 0-12 5.373-12 12v12h-88v-24h12c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12h-72c-6.627 0-12 5.373-12 12v12H96V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v72c0 6.627 5.373 12 12 12h12v160H12c-6.627 0-12 5.373-12 12v72c0 6.627 5.373 12 12 12h72c6.627 0 12-5.373 12-12v-12h88v24h-12c-6.627 0-12 5.373-12 12v72c0 6.627 5.373 12 12 12h72c6.627 0 12-5.373 12-12v-12h224v12c0 6.627 5.373 12 12 12h72c6.627 0 12-5.373 12-12v-72c0-6.627-5.373-12-12-12h-12V224h12zM352 64h32v32h-32V64zm0 256h32v32h-32v-32zM64 352H32v-32h32v32zm0-256H32V64h32v32zm32 216v-12c0-6.627-5.373-12-12-12H72V128h12c6.627 0 12-5.373 12-12v-12h224v12c0 6.627 5.373 12 12 12h12v160h-12c-6.627 0-12 5.373-12 12v12H96zm128 136h-32v-32h32v32zm280-64h-12c-6.627 0-12 5.373-12 12v12H256v-12c0-6.627-5.373-12-12-12h-12v-24h88v12c0 6.627 5.373 12 12 12h72c6.627 0 12-5.373 12-12v-72c0-6.627-5.373-12-12-12h-12v-88h88v12c0 6.627 5.373 12 12 12h12v160zm40 64h-32v-32h32v32zm0-256h-32v-32h32v32z"></path>
                           </svg>
                           BUILD
                        </h5>
                        <h3>38 Sets of components</h3>
                        <p>Build any UI effortlessly with AlgoCloud's robust set of layouts, 38 sets of built-in elements, carefully chosen colors, typography, and css helpers.</p>
                     </div>
                  </div>
                  <div className="flex-center mt-7 row">
                     <div className="ps-lg-6 col-xl-4 col-lg-5 col-md-6 order-md-0"><img src="/assets/iso-3.png" alt="" className="px-6 px-md-0 img-fluid"/></div>
                     <div className="mt-4 mt-md-0 col-xl-4 col-lg-5 col-md">
                        <h5 className="text-success">
                           <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="paper-plane" className="svg-inline--fa fa-paper-plane fa-w-16 me-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                              <path fill="currentColor" d="M440 6.5L24 246.4c-34.4 19.9-31.1 70.8 5.7 85.9L144 379.6V464c0 46.4 59.2 65.5 86.6 28.6l43.8-59.1 111.9 46.2c5.9 2.4 12.1 3.6 18.3 3.6 8.2 0 16.3-2.1 23.6-6.2 12.8-7.2 21.6-20 23.9-34.5l59.4-387.2c6.1-40.1-36.9-68.8-71.5-48.9zM192 464v-64.6l36.6 15.1L192 464zm212.6-28.7l-153.8-63.5L391 169.5c10.7-15.5-9.5-33.5-23.7-21.2L155.8 332.6 48 288 464 48l-59.4 387.3z"></path>
                           </svg>
                           DEPLOY
                        </h5>
                        <h3>Review and test</h3>
                        <p>From IE to iOS, rigorously tested and optimized AlgoCloud will give the near perfect finishing to your webapp; from the landing page to the logout screen.</p>
                     </div>
                  </div>
               </div>
            </section>
            <section className="bg-light text-center">
               <div className="container">
                  <div className="justify-content-center text-center row">
                     <div className="col-xxl-6 col-xxl-6 col-xl-7 col-lg-8">
                        <h1 className="fs-2 fs-sm-4 fs-md-5">Here's what's in it for you</h1>
                        <p className="lead">Things you will get right out of the box with AlgoCloud.</p>
                     </div>
                  </div>
                  <div className="mt-6 row">
                     <div className="col-lg-4">
                        <div className="card-span h-100 card">
                           <div className="card-span-img">
                           <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 256 256" fill="none">
<circle cx="128" cy="128" r="128" fill="black"/>
<path d="M182.09 183.16H163.405L151.27 138.02L125.18 183.165H104.32L144.645 113.285L138.155 89.0248L83.7799 183.18H62.9099L131.82 63.8198H150.09L158.09 93.4748H176.94L164.07 115.855L182.09 183.16Z" fill="white"/>
</svg>
                           </div>
                           <div className="pt-6 pb-4 card-body">
                              <h5 className="mb-2">Bootstrap 5.x</h5>
                              <p>Build your webapp with the world's most popular front-end component library along with AlgoCloud's 32 sets of carefully designed elements.</p>
                           </div>
                        </div>
                     </div>
                     <div className="mt-6 mt-lg-0 col-lg-4">
                        <div className="card-span h-100 card">
                           <div className="card-span-img">
                           <svg width="70" height="70" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="128" cy="128" r="128" fill="#2F3130"/>
<path d="M184.338 67.8871C184.6 64.7736 182.042 62.2324 178.918 62.2324H123.757C120.633 62.2324 118.1 64.7654 118.1 67.8899V120.221C118.1 123.346 115.567 125.879 112.443 125.879H66.0932C61.0385 125.879 58.5209 132.003 62.114 135.558L117.861 190.718C118.92 191.766 120.35 192.354 121.84 192.354H171.019C176.045 192.354 178.576 186.29 175.041 182.718L121.52 128.621C154.763 126.936 181.563 100.831 184.338 67.8871Z" fill="#2F3130"/>
<path d="M77 58C77 56.3431 78.3431 55 80 55H99C100.657 55 102 56.3431 102 58V90C102 93.866 105.134 97 109 97H147C150.866 97 154 93.866 154 90V58C154 56.3431 155.343 55 157 55H176C177.657 55 179 56.3431 179 58V197C179 198.657 177.657 200 176 200H157C155.343 200 154 198.657 154 197V132C154 128.134 150.866 125 147 125H109C105.134 125 102 128.134 102 132V197C102 198.657 100.657 200 99 200H80C78.3431 200 77 198.657 77 197V58Z" fill="white"/>
</svg>
                           

                           </div>
                           <div className="pt-6 pb-4 card-body">
                              <h5 className="mb-2">SCSS &amp; Javascript files</h5>
                              <p>With your purchased copy of AlgoCloud, you will get all the uncompressed &amp; documented SCSS and Javascript source code files.</p>
                           </div>
                        </div>
                     </div>
                     <div className="mt-6 mt-lg-0 col-lg-4">
                        <div className="card-span h-100 card">
                           <div className="card-span-img">
                           <svg xmlns="http://www.w3.org/2000/svg" width="70" className="tinyman-logo" height="70" viewBox="0 0 1024 1024" fill="none">
<path d="M0 243.931C0 158.547 0 115.855 16.6168 83.2427C31.2333 54.5562 54.5562 31.2333 83.2427 16.6168C115.855 0 158.547 0 243.931 0H780.069C865.453 0 908.145 0 940.757 16.6168C969.444 31.2333 992.767 54.5562 1007.38 83.2427C1024 115.855 1024 158.547 1024 243.931V780.069C1024 865.453 1024 908.145 1007.38 940.757C992.767 969.444 969.444 992.767 940.757 1007.38C908.145 1024 865.453 1024 780.069 1024H243.931C158.547 1024 115.855 1024 83.2427 1007.38C54.5562 992.767 31.2333 969.444 16.6168 940.757C0 908.145 0 865.453 0 780.069V243.931Z" fill="#F2FE67"></path>
<mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024">
<path d="M0 243.931C0 158.547 0 115.855 16.6168 83.2427C31.2333 54.5562 54.5562 31.2333 83.2427 16.6168C115.855 0 158.547 0 243.931 0H780.069C865.453 0 908.145 0 940.757 16.6168C969.444 31.2333 992.767 54.5562 1007.38 83.2427C1024 115.855 1024 158.547 1024 243.931V780.069C1024 865.453 1024 908.145 1007.38 940.757C992.767 969.444 969.444 992.767 940.757 1007.38C908.145 1024 865.453 1024 780.069 1024H243.931C158.547 1024 115.855 1024 83.2427 1007.38C54.5562 992.767 31.2333 969.444 16.6168 940.757C0 908.145 0 865.453 0 780.069V243.931Z" fill="#F2FE67"></path>
</mask>
<g mask="url(#mask0)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M484.991 -553.337C551.858 -583.055 629.781 -548.685 652.92 -479.267L715.958 -290.153C756.869 -254.624 780.472 -203.035 780.472 -148.67V319.892C780.472 362.006 746.332 396.145 704.219 396.145C702.972 396.145 701.732 396.115 700.499 396.056V597.878C700.499 628.524 722.475 654.759 752.647 660.132L780.487 665.09C812.76 670.837 836.267 698.9 836.267 731.681C836.267 739.681 834.851 747.461 832.213 754.706C832.435 756.067 832.548 757.435 832.548 758.811C832.548 809.142 681.834 849.942 495.918 849.942C310.003 849.942 159.289 809.142 159.289 758.811C159.289 716.265 266.98 680.53 412.591 670.492L415.818 236.558C377.863 199.574 354.932 147.339 356.85 90.0098L366.978 -212.718C367.554 -229.937 374.085 -246.423 385.458 -259.364L418.368 -296.813C420.005 -298.677 420.829 -301.118 420.656 -303.592L411.687 -431.394C408.036 -483.415 437.337 -532.157 484.991 -553.337ZM531.255 379.517V711.741C525.687 712.763 519.46 713.233 512.682 713.16C499.552 713.018 485.89 710.858 473.842 708.127C464.669 706.047 457.032 696.962 457.128 684.05L459.537 359.958C474.959 367.199 510.034 378.421 531.255 379.517ZM627.966 390.565C627.966 408.957 639.574 424.638 655.863 430.682V597.878C655.863 650.157 693.351 694.911 744.821 704.077L772.661 709.035C783.637 710.989 791.631 720.533 791.631 731.681C791.631 742.64 784.183 751.183 774.533 752.79C727.91 760.555 647.046 770.578 584.603 761.125C580.475 760.5 575.89 756.378 575.89 749.098V271.06C575.89 257.97 565.279 247.359 552.19 247.359C466.921 247.359 398.609 176.723 401.461 91.5024L411.589 -211.226C411.82 -218.119 414.434 -224.718 418.987 -229.899L451.897 -267.348C461.407 -278.17 466.19 -292.346 465.182 -306.717L456.213 -434.519C453.877 -467.806 472.627 -498.996 503.12 -512.548C545.907 -531.565 595.768 -509.572 610.575 -465.152L675.268 -271.072C676.823 -266.406 679.669 -262.277 683.476 -259.162C716.616 -232.047 735.836 -191.489 735.836 -148.67V319.892C735.836 337.354 721.68 351.509 704.219 351.509C686.757 351.509 672.602 337.354 672.602 319.892V-113.448H627.966V319.892L627.966 320.204V390.565Z" fill="black"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M530.946 379.532V711.756C525.379 712.778 519.152 713.249 512.373 713.175C499.244 713.033 485.582 710.874 473.533 708.142C464.361 706.063 456.724 696.977 456.82 684.066L459.229 359.973C474.651 367.214 509.726 378.436 530.946 379.532ZM627.658 390.58C627.658 408.972 639.266 424.653 655.555 430.697V597.893C655.555 650.172 693.043 694.926 744.513 704.092L772.353 709.05C783.329 711.005 791.323 720.548 791.323 731.696C791.323 742.655 783.875 751.198 774.225 752.805C727.602 760.571 646.737 770.594 584.295 761.14C580.167 760.515 575.582 756.394 575.582 749.113V271.075C575.582 257.985 564.971 247.374 551.882 247.374C466.613 247.374 398.301 176.739 401.153 91.5177L411.281 -211.21C411.512 -218.103 414.126 -224.703 418.679 -229.884L451.589 -267.333C461.098 -278.154 465.882 -292.331 464.874 -306.701L455.905 -434.504C453.569 -467.791 472.318 -498.98 502.812 -512.533C545.598 -531.549 595.46 -509.556 610.267 -465.137L674.96 -271.057C676.515 -266.391 679.361 -262.261 683.168 -259.147C716.308 -232.032 735.528 -191.474 735.528 -148.654V319.908C735.528 337.369 721.372 351.525 703.911 351.525C686.449 351.525 672.294 337.369 672.294 319.908V-113.433H627.658V319.908L627.658 320.22V390.58Z" fill="#F2FE67"></path>
</g>
</svg>
                           </div>
                           <div className="pt-6 pb-4 card-body">
                              <h5 className="mb-2">Gulp based workflow</h5>
                              <p>All the painful or time-consuming tasks in your development workflow such as compiling the SCSS or transpiring the JS are automated.</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <section className="text-center bg-200-2">
               <div className="container">
                  <div className="justify-content-center row">
                     <div className="col-xl-8 col-lg-9 col-10">
                        <div className="slick-slider slick-initialized" dir="ltr">
                           <button type="button" data-role="none" className="slick-arrow slick-prev" 
                           style={{display: "block"}}
                           > Previous</button>
                           <div className="slick-list">
                              <div className="slick-track" 
                              style={{
                               width: '100%', 
                              opacity: '1', 
                              transform: 'translate3d(-2064px, 0px, 0px)'
                              }}>
                                 <div data-index="-1"  className="slick-slide slick-cloned" aria-hidden="true" 
                                 style={{width: "688px"}}>
                                    <div>
                                       <div className="px-5 px-sm-6">
                                          <p className="fs-sm-1 fs-md-2 fst-italic text-dark">When I first saw AlgoCloud, I was totally blown away by the care taken in the interface. It felt like something that I'd really want to use and something I could see being a true modern replacement to the current className of Bootstrap themes.</p>
                                          <p className="fs-0 text-600">- Liam Martens, Designer</p>
                                          <img className="w-auto mx-auto" src="/assets/img/nav-icons/paypal.794b19f8.png" alt="" height="45"/>
                                       </div>
                                    </div>
                                 </div>
                                 <div data-index="0" className="slick-slide"  aria-hidden="true" 
                                 style={{outline: 'none', width: '688px'}}>
                                    <div>
                                       <div className="px-5 px-sm-6">
                                          <p className="fs-sm-1 fs-md-2 fst-italic text-dark">AlgoCloud is the best option if you are looking for a theme built with Bootstrap. On top of that, AlgoCloud's creators and support staff are very brilliant and attentive to users' needs.</p>
                                          <p className="fs-0 text-600">- Scott Tolinski, Web Developer</p>
                                          <img className="w-auto mx-auto" src="data:image/png;base64,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" alt="" height="45"/>
                                       </div>
                                    </div>
                                 </div>
                                 <div data-index="1" className="slick-slide"  aria-hidden="true" 
                                 style={{outline: 'none', width: '688px'}}>
                                    <div>
                                       <div className="px-5 px-sm-6">
                                          <p className="fs-sm-1 fs-md-2 fst-italic text-dark">We've become fanboys! Easy to change the modular design, great dashboard UI, enterprise-className support, fast loading time. What else do you want from a Bootstrap Theme?</p>
                                          <p className="fs-0 text-600">- Jeff Escalante, Developer</p>
                                          <img className="w-auto mx-auto" src="data:image/png;base64,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" alt="" height="30"/>
                                       </div>
                                    </div>
                                 </div>
                                 <div data-index="2" className="slick-slide slick-active slick-current"  aria-hidden="false" 
                                 style={{outline: 'none', width: '688px'}}>
                                    <div>
                                       <div className="px-5 px-sm-6">
                                          <p className="fs-sm-1 fs-md-2 fst-italic text-dark">When I first saw AlgoCloud, I was totally blown away by the care taken in the interface. It felt like something that I'd really want to use and something I could see being a true modern replacement to the current className of Bootstrap themes.</p>
                                          <p className="fs-0 text-600">- Liam Martens, Designer</p>
                                          <img className="w-auto mx-auto" src="/assets/img/nav-icons/paypal.794b19f8.png" alt="" height="45"/>
                                       </div>
                                    </div>
                                 </div>
                                 <div data-index="3"  className="slick-slide slick-cloned" aria-hidden="true" 
                                 style={{width: '688px'}}>
                                    <div>
                                       <div className="px-5 px-sm-6">
                                          <p className="fs-sm-1 fs-md-2 fst-italic text-dark">AlgoCloud is the best option if you are looking for a theme built with Bootstrap. On top of that, AlgoCloud's creators and support staff are very brilliant and attentive to users' needs.</p>
                                          <p className="fs-0 text-600">- Scott Tolinski, Web Developer</p>
                                          <img className="w-auto mx-auto" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARAAAABcCAMAAACRORqEAAAB3VBMVEUAAADBmVpAg/JvkP//nSNBhPJAhPJDhfZBg/FBhPJBhPNChfTiQjdBiP8+i/9AhPRBhfToQjXqQjTqQjRBhfNBhfRBhfNChPTmQzRCgu/rQTX5vAVCg/NAh/XrQTXoQjNAhfJChPT7vANBhfPqQjTqQjTpQjRChvT5uwXqQjT6uwToQjNBhPRBg/RBhPRBhPPqQjTqQjRBhfTqQjTqQjVBhvVBhfP/QjTpQjTqQjRAhfNBhPTqQjRBhPTqQjRBhfVBhPP/uQDqQjVAhPRBhPRBhPTqQjTpQjT7uwVBhfRChfRBhvTqQjX/uwU/gvJBhPPqQjTpQjTqQjRAhPTrQjTrQzTpQDHrQzP/vQDpQjRChPLqQjT5uwXpQjT7uwVBhfT6vARChfTqQjRDhvT7vARChPLwPjZAhPTpQjP6uwPpQjTqQTP6uwRBhPRBhfNBhfTpQjRChPP6vAT4uQb/uABBhPL7vAPqQjTqQzX6uwTqQzTqQzVEgPNChPT5uwXoQjT5uwX7uwT7vAXqQjT6vAT5vAX8vAX4vAZChfToQTP6vAT7vAXqQjT7vATqQzX6vAT7uwPoQzXpQTPpQzP7vQP5vAX/vABCg/RAhPT5uQX7vANChfTqQzX7vAU0qFMQJ1/kAAAAm3RSTlMAAfwCA/75Hwsm4F0IBwTqif75vJ2YUkQUEAz99hkZ/PWqo4RvSjgw+uro49vGv7qwoZFoYjQsBOffyqOUd3VlVwf07dfT0crJf3NJQxoUsaWPiTkzJyMeENbQxr2bjntyalhMTD0Q8e7hwLeupm9hT0A4KAznzquLZz0wFu/uzbmYkoRsYlgi8/G0iH9+fHZFK9tTQTIU8kswPoYXU5wAAAsnSURBVHja7ZxnVxtHFIbvgpAQBkSRaAZME810EMb03nsPNtjGgB3ciMG498Ql7rFTd5XfmiC8e2dmZ2cXJOcAyvMNzpyzq3dnbnnvSiAk3Zdy4Vx+Qn5L28X6OAhzHBeuxcgEET3uY6MQrjjO9cgcoipuREMYsjoWJRtxKSELDgN/q0DQTFXIQjIT0uHgEzJBsnJlU26lwIEnRIJINy7JVsg98JskNIKk58oWiSmCg01IBHF2y5bJPODHJhSCTD3kfnJXjMvOS8EX4CATAkFSc2SGnpr2okDdIaX72ty3GEGOwUEmeEF+yGSixICDCbhTnsxDo0fwgtTT6aW7PZ4XdAdeHRI9ghbkAdW3vLoeb1imHA49ghUkkqpOyx1gTPvvh0GPYAU5JxPUxIuTc9kh0CNIQerJvNoigZjRi3DwCUqQyHJSDzgSBCXIMfK8SHAkCEaQOCLDVETC0SAYQdpQj67D4f58W0EiiZbuEKSPby9IKlGAHJUDE5Qg11CQH+DIsH9BorHJbTwiGcaSIDYb8Ln4LSLIqcLW8b6GzsTOhr7x1ulTYIbt5oe8/tJif3Hp9tUPN23miXEooTImU45wNXrao/cqSIb3TvLpJEXpPH3l+bD+3mpklZxQzVzuN5coJCXN90HEn89K/SSPnv4KIorcr2Qk0+2kIqFYEOneeCd1b5PZQLOAzjGEhMJkRU9yIRhx84lfz9mbxn3GmMxgT4i2KkjhusKSNJlBhRCcSbVBCEirVvhUpwGP3/L8fPJ+4x+W/AhZz4LDkiCxzQqP0+TT8skaTgie4QbFiJP3QM+XUr8RpV9Aj6PRYArQZkGQ2e8UPkl1uKgdQ0gIipC6E4oxJ+qA5afjfmOO39VHD5csQizI/RLFkAJQaUFLGYKmVRFTADTn/WLOs3o8lPcvyKfLigDtYSXIKmNggGzCqLY/FDPq6P3hN+MnIHG65P0Lkn1SEXFi+Os6t6zStF9BptQIzpyXhr71vhLmsE6T6aWYCRr9Z/uZkFJMJpto5hWNrsaK8ltWBbHRua9zfXGi+kwSebdfg36TrOLZryApX+ud0wpBb+0c7DBX20sFdExxW9/7CbbvjsAOI3e3/QTfb4GGh4qiLU4pEGUHYywJUqsQnFmO3b3lOuKeb7OCuPclCKbrCTKjbEhYCn0mN+sEqCyRn3uFWL9CKvUMB0cykkOMBeIH7eaCpL1WNC4vS9xEPMzIfm2/ggwGVs0kKhpX1ujaJJk4qzOwyyaRYH6eB5L5J0Sq2VRdigVZo8zJ5B5TQe4oGt/NAckkbmobHVQr9yMIurBEQVbFNgixVUSBBrsQBdlVtnnpuEoUaLBLCqEHa2M5u0wEyehEPdKYtguP9Ab8yyBeJqgdko0R9XEssMTiVU9k78YK3CD9HcDSsY1bZAQCoBH+u5Pj6YgFqcVoOsu0ld7Hiso6Lbw9fp+CXKBLkKQZ0PMJ9SpgSpDil6BnEzPQh90ORha2GG6xIOsGpVBaK5UJZugL+YBPBJco2jXoU1TuAI9mDPGBv/v9Km+AxzPcQIG/87GA5FXUWXaRIGuJWrQndq9UWK3lXYz48XZq61sHt1YqXhKPBMscLsjYiZvaiSkeAR4vtQXHAxG30cS1aRIJsqGovEVXpO6xvienz2blnqef2BR6McMAH8w0XgBYwQwDfM5qKz5STfkrvmszJBLkraKiGjMzE691Hd54oUTvxYgHsAc0VyIqjgohBcCDXYEh5Efgc54KIlNmHUa0XSDIbS2k2gKJZSNZbwG0qtlnVda4DtaRXFR2WlRUjJyge9qKZgB46lcxcoL+0lY8pYaL54DPgrEgGOB6d/Lhe11Xk3jFa8NCz4WJNx4sU0QXdLcVlTTgk03VyFhozAOfESxTqKa8HfjkCgTRUkmydG88SWG4PDnLmqp4McsM0Fn3iqJiAz6xVJTBWtRofQfaiXiwBaMSt0CQEi3J9CosZ+piDZ+1HBNnedxXJqvUY8gUCXIKYzkZMo+DATYUhCqoV4GPRyiIAUmL06CnAhUZAIsMoYiB0Iy1eYaR2YqVPXVktoDPPOYhakMOAZ8mgSAGVsgvBWtmkxl7kcWQimVBAtPJfAI+09jNUJ3MptFsgupmLpha4RUCQXoVPYlVwzbzTyeXRe/1jZJ6oDP9MvBBO+09ALzzq7wAhG+nvaMemsco6wkEqVJYGp7PAR/Waai0kmkc2F2WQ4BlRWUR+IxTkr0gkiqfPEoyB74wClycosJsUqFZX44FIbky0hRpPg5u1Nllc5jEdNdiG/C5ncocx3QdwGPrkbbiJbUB5CJ+4SwS5DPlHjZ/AjOySDc71yzVpBNReEGVD7vGWuBRgKEs8Pf3XCMZ+RHdNAnfUTB09uJjRIKkJaIdUpsBFmiXCSqyxOclUBNiY8caiCd5V1wrYbrhJZ5tisyj27zE9JIR9aDnhrj9P0NUhRyyC3lZHLmVCsakumTkGpFEhFGkWmH6q1/9RlGE9dN2B99xRNjSh7lRl1WDSPFySqTkxDvsQY8rl0majDbJKK3cKEb5M4rg0BQQleHX9f1+jbuCA+PvxwGSikdiD0ylmYWIvW2JLr1IiztHid0ko2UySU4CT5L0Fmp0FkGW0V4ixRdI9BVRD3xCK8YzS4mc6K2ob+PnyBo1kfTTzDU1mZ8TJnM2sz8Wd296ktkkDma+YR9LiaYvm+rO0XmHiJRsNOpPG1eQZEldf5Yc9c8bvRBwVsLuCalwkHdebj6GWLtsNHWf1bY2u0mcMTKDvTzhxqozazTLuXosoRLV4DfiM0lkB/k+Ww1Yby+TzcMMaZsij96NqF3uu0fk6G4TH0g39V1ZhypHQqZwUMUbs45PS+pNNxN3nbjB7JEeeS8M8AIFktjX3Frb2tyXqJDUMoECOd7/7Pzd88/60Y1n7SMfPZBa8Ay2Xa9pjLI2ypSqaD+o+n1tbesi/X5ELxtZo8dky0Tp3SRpXDGjWiLX5/nNyJPo3BrEsHvtF8WEkll9U99il61x6Q+e5XFFEcJOsDqe+MU86WBMmCAEgdkGRcjraa4RtiBbodHJN4GqxHqwW3Lrql/Ezx3sHswPQhCYOSncH4weODq+JJuR2WLUAdomFGMmbfr1S35jlrT1SJvBFrbXGAqCZPcphvTOghGjGLa5RDU5wBiv0cZs8AKPlVKjV8xWgIevTOaQM2TtpbvJRIVPs7D9HT0XY7w7PE4QknEHExn97iOfrTeYfpHipXmjVntA/7x66nG6G8URBJleVzj03TO1TFPdLt7GrGxLB1Oynzfo7Jg0MGbkTSm7O96MiHrzhC6ZxHU9DlAQu8mLu8NVJ9h5nVeyZCP7BnO7IwgDujJ/KBqsYRueeKxe9sTjiWGb2fqPS9vFaj2yvfSxA8TEpbjVPdyV2x5H+aBdYEZa3W0tvJZUFczBHoh3TA2ltKcMTTniYI+cmh3eWN4Ynj0F1uh4+WXlxYuPmx1gjXTfxfaUHxwSa2qWgRXW7ns/L3sLs4/Q1x2M5kQV8D+UC+qG8CKyiP9vFw6ow4n0wbIobtpfJd6aDR98AUNmTBKdmMyw+UW+uGONxq8Q+aLw9ZFwgfjml+5URHcfwS/amuGMQO9hldEDPeaHYfTThB6ihaDa7SLC6cuH8CHdJSPd6q9URq42RRG+1YH/wblQcpFuNCs8+fmeSrrPO9g/JRZyTP2yyqPzVX1LRDbJQmIeQJgRL1TklhPCjkjBqekOQz3+5Q+XzOdaWCUYgvQaO297DEH44qjpYuYAlSlhll5Y4oZqynO+liM97htH5oeTgkJ6UO/z1T8I863xP/85/wBUcB1SKn6quwAAAABJRU5ErkJggg==" alt="" height="45"/>
                                       </div>
                                    </div>
                                 </div>
                                 <div data-index="4"  className="slick-slide slick-cloned" aria-hidden="true" 
                                 style={{width: '688px'}}>
                                    <div>
                                       <div className="px-5 px-sm-6">
                                          <p className="fs-sm-1 fs-md-2 fst-italic text-dark">We've become fanboys! Easy to change the modular design, great dashboard UI, enterprise-className support, fast loading time. What else do you want from a Bootstrap Theme?</p>
                                          <p className="fs-0 text-600">- Jeff Escalante, Developer</p>
                                          <img className="w-auto mx-auto" src="data:image/png;base64,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" alt="" height="30"/>
                                       </div>
                                    </div>
                                 </div>
                                 <div data-index="5"  className="slick-slide slick-cloned" aria-hidden="true" style={{width: '688px'}}>
                                    <div>
                                       <div className="px-5 px-sm-6">
                                          <p className="fs-sm-1 fs-md-2 fst-italic text-dark">When I first saw AlgoCloud, I was totally blown away by the care taken in the interface. It felt like something that I'd really want to use and something I could see being a true modern replacement to the current className of Bootstrap themes.</p>
                                          <p className="fs-0 text-600">- Liam Martens, Designer</p>
                                          <img className="w-auto mx-auto" src="/assets/img/nav-icons/paypal.794b19f8.png" alt="" height="45"/>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <button type="button" data-role="none" className="slick-arrow slick-next" 
                           style={{display: 'block'}}> Next</button>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <section className="light">
               <div className="bg-holder overlay"
               style={{backgroundImage: "url(/assets/bg-motherboard.png)", backgroundPosition: "centerTop"}}></div>
               <div className="container">
                  <div className="justify-content-center text-center row">
                     <div className="col-lg-8">
                        <p className="fs-3 fs-sm-4 text-white">Join our community of 20,000+ developers and content creators on their mission to build better sites and apps.</p>
                        <button type="button" className="border-2 rounded-pill mt-4 fs-0 py-2 btn btn-outline-light btn-lg">Start your webapp</button>
                     </div>
                  </div>
               </div>
            </section>
            <section className="bg-dark-2 pt-8 pb-4 light">
               <div className="container">
                  <div className="position-absolute btn-back-to-top cursor-pointer bg-dark-2">
                  <a className="text-600" href="#banner" data-bs-offset-top="0" data-scroll-to="#banner">
                     <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-up" className="svg-inline--fa fa-chevron-up fa-w-14 text-600" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{transformOrigin: '0.4375em 0.5em'}}>
                        <g transform="translate(224 256)">
                           <g transform="translate(0, 0)  scale(1, 1)  rotate(45 0 0)">
                              <path fill="currentColor" d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z" transform="translate(-224 -256)"></path>
                           </g>
                        </g>
                     </svg>
                  </a>
                  </div>
                  <div className="row">
                     <div className="col-lg-4">
                        <h5 className="text-uppercase text-white-2 opacity-85 mb-3">Our Mission</h5>
                        <p className="text-600">AlgoCloud enables front end developers to build custom streamlined user interfaces in a matter of hours, while it gives backend developers all the UI elements they need to develop their web app.And it's rich design can be easily integrated with backends whether your app is based on ruby on rails, laravel, express or any other server side system.</p>
                        <div className="icon-group mt-4">
                           <a className="icon-item bg-white text-facebook" href="#!">
                              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" className="svg-inline--fa fa-facebook-f fa-w-10 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                 <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                              </svg>
                           </a>
                           <a className="icon-item bg-white text-twitter" href="#!">
                              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" className="svg-inline--fa fa-twitter fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                 <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                              </svg>
                           </a>
                           <a className="icon-item bg-white text-google-plus" href="#!">
                              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-plus-g" className="svg-inline--fa fa-google-plus-g fa-w-20 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                 <path fill="currentColor" d="M386.061 228.496c1.834 9.692 3.143 19.384 3.143 31.956C389.204 370.205 315.599 448 204.8 448c-106.084 0-192-85.915-192-192s85.916-192 192-192c51.864 0 95.083 18.859 128.611 50.292l-52.126 50.03c-14.145-13.621-39.028-29.599-76.485-29.599-65.484 0-118.92 54.221-118.92 121.277 0 67.056 53.436 121.277 118.92 121.277 75.961 0 104.513-54.745 108.965-82.773H204.8v-66.009h181.261zm185.406 6.437V179.2h-56.001v55.733h-55.733v56.001h55.733v55.733h56.001v-55.733H627.2v-56.001h-55.733z"></path>
                              </svg>
                           </a>
                           <a className="icon-item bg-white text-linkedin" href="#!">
                              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin-in" className="svg-inline--fa fa-linkedin-in fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                 <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                              </svg>
                           </a>
                           <a className="icon-item bg-white text-700" href="#!">
                              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="medium-m" className="svg-inline--fa fa-medium-m fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                 <path fill="currentColor" d="M71.5 142.3c.6-5.9-1.7-11.8-6.1-15.8L20.3 72.1V64h140.2l108.4 237.7L364.2 64h133.7v8.1l-38.6 37c-3.3 2.5-5 6.7-4.3 10.8v272c-.7 4.1 1 8.3 4.3 10.8l37.7 37v8.1H307.3v-8.1l39.1-37.9c3.8-3.8 3.8-5 3.8-10.8V171.2L241.5 447.1h-14.7L100.4 171.2v184.9c-1.1 7.8 1.5 15.6 7 21.2l50.8 61.6v8.1h-144v-8L65 377.3c5.4-5.6 7.9-13.5 6.5-21.2V142.3z"></path>
                              </svg>
                           </a>
                        </div>
                     </div>
                     <div className="ps-lg-6 ps-xl-8 col">
                        <div className="mt-5 mt-lg-0 row">
                           <div className="col-md-3 col-6">
                              <h5 className="text-uppercase text-white-2 opacity-85 mb-3">Company</h5>
                              <ul className="list-unstyled">
                                 <li className="mb-1"><a className="text-600" href="/landing#!">About</a></li>
                                 <li className="mb-1"><a className="text-600" href="/landing#!">Contact</a></li>
                                 <li className="mb-1"><a className="text-600" href="/landing#!">Careers</a></li>
                                 <li className="mb-1"><a className="text-600" href="/landing#!">Blog</a></li>
                                 <li className="mb-1"><a className="text-600" href="/landing#!">Terms</a></li>
                                 <li className="mb-1"><a className="text-600" href="/landing#!">Privacy</a></li>
                                 <li className="mb-1"><a className="text-600" href="/landing#!">Imprint</a></li>
                              </ul>
                           </div>
                           <div className="col-md-3 col-6">
                              <h5 className="text-uppercase text-white-2 opacity-85 mb-3">Product</h5>
                              <ul className="list-unstyled">
                                 <li className="mb-1"><a className="text-600" href="/landing#!">Features</a></li>
                                 <li className="mb-1"><a className="text-600" href="/landing#!">Roadmap</a></li>
                                 <li className="mb-1"><a className="text-600" href="/landing#!">Changelog</a></li>
                                 <li className="mb-1"><a className="text-600" href="/landing#!">Pricing</a></li>
                                 <li className="mb-1"><a className="text-600" href="/landing#!">Docs</a></li>
                                 <li className="mb-1"><a className="text-600" href="/landing#!">System Status</a></li>
                                 <li className="mb-1"><a className="text-600" href="/landing#!">Agencies</a></li>
                                 <li className="mb-1"><a className="text-600" href="/landing#!">Enterprise</a></li>
                              </ul>
                           </div>
                           <div className="mt-5 mt-md-0 col">
                              <h5 className="text-uppercase text-white-2 opacity-85 mb-3">From the Blog</h5>
                              <ul className="list-unstyled">
                                 <li>
                                    <h5 className="fs-0 mb-0"><a className="text-600" href="/landing#!">Interactive graphs and charts</a></h5>
                                    <p className="text-600 opacity-50">Jan 15 • 8min read </p>
                                 </li>
                                 <li>
                                    <h5 className="fs-0 mb-0"><a className="text-600" href="/landing#!">Lifetime free updates</a></h5>
                                    <p className="text-600 opacity-50">Jan 5 • 3min read <span>★</span></p>
                                 </li>
                                 <li>
                                    <h5 className="fs-0 mb-0"><a className="text-600" href="/landing#!">Merry Christmas From us</a></h5>
                                    <p className="text-600 opacity-50">Dec 25 • 2min read </p>
                                 </li>
                                 <li>
                                    <h5 className="fs-0 mb-0"><a className="text-600" href="/landing#!">The AlgoCloud Experience</a></h5>
                                    <p className="text-600 opacity-50">Dec 23 • 10min read </p>
                                 </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <section className=" bg-dark-2 py-0 text-center fs--1 light">
               <hr className="my-0 border-600 opacity-25"/>
               <div className="container py-3">
                  <div className="justify-content-between row">
                     <div className="col-sm-auto col-12">
                        <p className="mb-0 text-600">Thank you for creating with AlgoCloud <span className="d-none d-sm-inline-block">| </span><br className="d-sm-none"/> 2022 © <a className="text-white-2 opacity-85" href="https://headline-inc.com" target="_blank" rel="noopener noreferrer">HEADLINE INC</a></p>
                     </div>
                     <div className="col-sm-auto col-12">
                        <p className="mb-0 text-600">v3.1.0</p>
                     </div>
                  </div>
               </div>
            </section>
         </main>
         <script src="assets/react-typed.js"></script>
  
</Wrapper>
);
}
export default LandingPage;