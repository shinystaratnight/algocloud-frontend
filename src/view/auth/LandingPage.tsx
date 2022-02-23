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
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%233c465c' viewBox='0 0 285.8 51.9'%3E%3Cpath d='M72.8 42.8v5c0 .3-.1.5-.2.7-.2.2-.4.3-.7.3H45c-.7 0-1.1-.4-1.1-1.1V4.3c0-.7.3-1.1.9-1.1h26.5c.5 0 .7.3.7 1v4.7c0 .8-.3 1.1-1 1.1H53c-.6 0-.9.3-.9.8v10.7c0 .6.2.9.7.9h12.5c.6 0 .9.3.9 1v5c0 .3-.1.4-.2.6-.1.1-.3.2-.6.2H52.8c-.5 0-.7.2-.7.7v11.4c0 .5.2.7.6.7h19.2c.5-.1.9.2.9.8zM244 3.2h-5.1c-.6 0-.9.3-.9 1v28c0 .3-.1.5-.2.6s-.3-.1-.6-.4L219.6 4c-.2-.3-.4-.5-.6-.7-.2-.1-.5-.2-.8-.2h-5.5c-.6 0-.9.4-.9 1.1v43.4c0 .7.3 1 1 1h4.8c.3 0 .6-.1.8-.3s.2-.4.2-.8V18.3c0-.2.1-.3.2-.3s.2.1.4.3L237.8 48c.2.3.4.5.6.6s.4.1.7.1h4.5c.3 0 .5-.1.7-.3s.3-.4.3-.7V4.1c.1-.6-.1-.9-.6-.9zm-41.6 0h-6.5c-.6 0-.9.4-.9 1.1v43.3c0 .4.1.7.2.8.2.2.5.3.9.3h5.7c.5 0 .8-.1 1-.3s.3-.6.3-1.1V4.2c.1-.7-.2-1-.7-1zm-14.5 38.7H170c-.4 0-.6-.2-.6-.7v-37c0-.7-.3-1-.8-1H162c-.6 0-.9.4-.9 1.1v43.3c0 .4.1.7.2.8.2.2.4.3.8.3h25.6c.3 0 .6-.1.7-.3.2-.2.2-.4.2-.7v-5c.2-.5-.1-.8-.7-.8zm-36-28.1c1.5 3.3 2.2 7.3 2.2 11.9 0 4.8-.8 9-2.4 12.4s-4 6.1-7.2 7.9-7.3 2.7-12.2 2.7h-10.6c-.7 0-1.1-.4-1.1-1.3v-43c0-.4.1-.7.3-.9s.5-.3.9-.3h8.7c1 0 1.8 0 2.3.1 4.9.1 9 1.1 12.2 2.9 3 1.8 5.4 4.4 6.9 7.6zm-6.3 12c0-3.9-.5-7-1.5-9.4-1-2.3-2.6-4-4.7-5.1s-4.8-1.6-8-1.6h-2c-.3 0-.5.3-.5.8v30.8c0 .5.2.7.7.7h1.4c3.3 0 6.1-.5 8.3-1.6s3.8-2.8 4.9-5.2c.8-2.2 1.4-5.4 1.4-9.4zm-31.3 21.4c.1.3.1.7 0 1s-.3.5-.6.5H107c-.5 0-.9-.3-1-.8l-3.2-9.9c0-.2-.1-.3-.2-.4s-.3-.1-.5-.1H87.9c-.3 0-.5.2-.6.5L84 48c0 .2-.1.4-.3.6-.2.1-.4.2-.7.2h-5.3c-.3 0-.5-.2-.7-.4-.1-.3-.1-.7 0-1.1l13.9-43c.1-.4.3-.7.5-.9s.5-.3.9-.3H99c.8 0 1.3.4 1.6 1.2l13.7 42.9zm-13.7-17.8l-5.3-16.3c-.1-.3-.2-.4-.4-.4-.1 0-.2.2-.4.5l-5.3 16.3c-.1.4-.1.6 0 .8.1.1.2.2.4.2h10.5c.2 0 .3-.1.4-.2.2-.2.3-.5.1-.9zm180.6 12.5H262c-.4 0-.6-.2-.6-.7V29.8c0-.5.2-.7.7-.7h12.6c.3 0 .5-.1.6-.2s.2-.3.2-.6v-5c0-.6-.3-1-.9-1h-12.5c-.5 0-.7-.3-.7-.9V10.8c0-.6.3-.8.9-.8h18.1c.7 0 1-.4 1-1.1V4.2c0-.6-.3-1-.7-1h-26.5c-.6 0-.9.4-.9 1.1v43.3c0 .8.4 1.1 1.1 1.1h26.8c.3 0 .6-.1.7-.3.2-.2.2-.4.2-.7v-5c0-.5-.3-.8-.9-.8zM35 3.2h-6.5c-.5 0-.8.4-.8.8v11.2c0 .7-.6 1.3-1.3 1.3H13.1c-.7 0-1.3-.6-1.3-1.3V4c0-.5-.4-.8-.8-.8H4.5c-.4 0-.8.4-.8.8v43.8c0 .5.4.8.8.8H11c.5 0 .8-.4.8-.8V26.3c0-.7.6-1.3 1.3-1.3h13.3c.7 0 1.3.6 1.3 1.3v21.6c0 .5.4.8.8.8H35c.5 0 .8-.4.8-.8V4.1c.1-.5-.3-.9-.8-.9z'/%3E%3C/svg%3E" height="40" alt="Partner" className="landing-cta-img"/></div>
                     <div className="my-1 my-sm-3 px-card col-sm-auto col-3">
                        <img src="data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 247.98162 45.86078'%3E%3Cpath d='M49.35,6.49941H38.9383l4.59117,8.95985H50.156a6.1369,6.1369,0,0,1,.00484,12.27379h-.34164l4.06032,7.9238a14.71263,14.71263,0,0,0,3.43662-1.59461,14.92732,14.92732,0,0,0,6.95427-12.62653h0A14.93742,14.93742,0,0,0,49.35,6.49869h-.00071Z' transform='translate(-4.27038 -4.4141)' fill='%233c465c'/%3E%3Cpolygon points='28.79 23.319 24.283 23.319 24.26 23.301 14.084 43.354 24.138 43.354 30.007 31.788 32.016 31.788 37.043 31.801 32.791 23.319 28.79 23.319' fill='%233c465c'/%3E%3Cpath d='M55.48929,44.80591,51.113,36.26533l-4.37215-8.53228L40.4511,15.45926,35.85994,6.49941h0A3.8319,3.8319,0,0,0,32.449,4.4141H27.53556a3.83321,3.83321,0,0,0-3.411,2.08455l-19.63,38.30651a2.03382,2.03382,0,0,0,1.81082,2.96119h7.025L27.44687,20.21946a2.86213,2.86213,0,0,1,5.0922,0l3.84962,7.51217,4.37011,8.52744,5.89677,11.50662h7.025a2.03379,2.03379,0,0,0,1.81006-2.9612l-.00138.00071Z' transform='translate(-4.27038 -4.4141)' fill='%233c465c'/%3E%3Cpath d='M76.34014,42.22312a1.23955,1.23955,0,0,1,0-.92481l10.956-30.4917a1.69547,1.69547,0,0,1,.396-.68212,1.11573,1.11573,0,0,1,.748-.19776h6.6001a1.31446,1.31446,0,0,1,1.31983.96777l10.86816,30.4917a1.15691,1.15691,0,0,1,0,.77051.522.522,0,0,1-.52832.418h-6.46777a.78568.78568,0,0,1-.83594-.61621L97.1082,35.53464a.7838.7838,0,0,0-.15429-.35156.52448.52448,0,0,0-.418-.13281H85.8001a.55258.55258,0,0,0-.57178.44043l-2.332,6.51171a.8617.8617,0,0,1-.28613.418,1.04108,1.04108,0,0,1-.63819.1543H76.91191A.59473.59473,0,0,1,76.34014,42.22312ZM94.73223,29.1987q.61522,0,.396-.748l-3.69629-10.2959c-.08789-.17627-.18359-.26416-.28564-.26416-.10352,0-.19824.103-.28613.3081l-3.74024,10.252q-.30834.74853.396.748Z' transform='translate(-4.27038 -4.4141)' fill='%233c465c'/%3E%3Cpath d='M117.96416,41.519a1.064,1.064,0,0,1-.26416.81347,1.36585,1.36585,0,0,1-.92432.24219h-4.66357q-.96827,0-.96826-.92383l.13183-30.88818q0-.835.70411-.83594H117.304q.65992,0,.66016.792Z' transform='translate(-4.27038 -4.4141)' fill='%233c465c'/%3E%3Cpath d='M147.06914,18.46286a.97581.97581,0,0,1,.24219.748v2.9917a1.13146,1.13146,0,0,1-.26367.85791.83078.83078,0,0,1-.74805.1543,10.16,10.16,0,0,0-1.12207-.11035,3.75055,3.75055,0,0,0-.94629.0664q-1.18653.17579-.87988,1.01172.08789.39624.24218.87988a3.63437,3.63437,0,0,1,.15332,1.1001,6.15372,6.15372,0,0,1-1.16552,3.62988,7.77041,7.77041,0,0,1-3.542,2.61817,15.68784,15.68784,0,0,1-5.896.96777,15.94326,15.94326,0,0,0-2.81592.19824,3.961,3.961,0,0,0-1.51807.52832.91463.91463,0,0,0-.46191.72559.8543.8543,0,0,0,.68213.81445,8.245,8.245,0,0,0,2.08984.33008l6.292.35156q4.48827.26367,6.55615,1.98047a5.4596,5.4596,0,0,1,2.06836,4.39942,6.33814,6.33814,0,0,1-3.16846,5.45605q-3.16773,2.1123-9.32812,2.11231-6.38013,0-9.5918-1.40821-3.2124-1.40918-3.21192-4.26758a3.08614,3.08614,0,0,1,1.188-2.50878,10.22807,10.22807,0,0,1,3.03614-1.62793q.57128-.21973,0-.4834a6.11937,6.11937,0,0,1-1.82618-1.29785,2.74133,2.74133,0,0,1-.72607-1.958,2.53544,2.53544,0,0,1,.57178-1.60645,6.10387,6.10387,0,0,1,1.54-1.34179,11.39437,11.39437,0,0,1,2.15625-1.05664.58525.58525,0,0,0,.3081-.24122q.08716-.1538-.22021-.28613a8.05872,8.05872,0,0,1-3.168-2.46387,5.77992,5.77992,0,0,1-1.1001-3.5205,6.21157,6.21157,0,0,1,2.83789-5.27979q2.83814-2.02368,8.29443-2.02392a14.63708,14.63708,0,0,1,4.17969.52783,7.94879,7.94879,0,0,1,2.86035,1.45215.96127.96127,0,0,0,.6377.19775.75717.75717,0,0,0,.55029-.28564,7.109,7.109,0,0,1,1.36377-1.27637,7.79513,7.79513,0,0,1,1.67188-.92383,4.25292,4.25292,0,0,1,1.54-.352A.91222.91222,0,0,1,147.06914,18.46286ZM129.84355,41.25437a4.02789,4.02789,0,0,0-1.67187.26465,3.48254,3.48254,0,0,0-1.32031.87988,1.88475,1.88475,0,0,0-.52783,1.31934,2.409,2.409,0,0,0,.748,1.76074,5.03263,5.03263,0,0,0,2.41992,1.14355,20.26924,20.26924,0,0,0,4.4878.39649,10.10636,10.10636,0,0,0,4.5542-.81446,2.52486,2.52486,0,0,0,1.562-2.30957,1.94906,1.94906,0,0,0-.85791-1.584,4.66889,4.66889,0,0,0-2.61817-.74805Zm6.666-12.29785a3.6157,3.6157,0,0,0,1.07813-2.66162,3.99187,3.99187,0,0,0-1.07813-2.88233,4.54779,4.54779,0,0,0-3.41016-1.12207,4.67894,4.67894,0,0,0-3.34375,1.12207,3.78944,3.78944,0,0,0-1.188,2.88233,3.44993,3.44993,0,0,0,1.188,2.66162,4.794,4.794,0,0,0,3.34375,1.07812A4.65909,4.65909,0,0,0,136.50957,28.95652Z' transform='translate(-4.27038 -4.4141)' fill='%233c465c'/%3E%3Cpath d='M153.9334,41.47507a10.90714,10.90714,0,0,1-4.15723-4.24609,12.556,12.556,0,0,1-1.49609-6.18164,12.88191,12.88191,0,0,1,1.54-6.40284,11.10736,11.10736,0,0,1,4.22363-4.29,12.92456,12.92456,0,0,1,12.27637.022,10.89,10.89,0,0,1,4.11328,4.312,13.16432,13.16432,0,0,1,1.47461,6.31494,12.6584,12.6584,0,0,1-1.4961,6.22559,10.92288,10.92288,0,0,1-4.1582,4.24609,13.09019,13.09019,0,0,1-12.32031,0Zm8.91015-3.80664a5.13825,5.13825,0,0,0,1.6504-2.57422,13.82521,13.82521,0,0,0,.5498-4.17969,14.14041,14.14041,0,0,0-.5498-4.29,5.27875,5.27875,0,0,0-1.6504-2.57374,4.63419,4.63419,0,0,0-5.43359,0,5.32852,5.32852,0,0,0-1.69434,2.57374,13.60226,13.60226,0,0,0-.57226,4.29,13.26292,13.26292,0,0,0,.57226,4.20215A5.1814,5.1814,0,0,0,157.41,37.66843a4.72841,4.72841,0,0,0,5.43359,0Z' transform='translate(-4.27038 -4.4141)' fill='%233c465c'/%3E%3Cpath d='M201.52031,25.56882a9.58919,9.58919,0,0,1-4.20215,3.36621,15.55242,15.55242,0,0,1-6.18164,1.14356h-6.60058a.42757.42757,0,0,0-.4834.48437v11q0,1.01222-1.14453,1.01172h-5.63184a.76553.76553,0,0,1-.92383-.87988V10.76267q0-.835.70411-.83594h13.20019a18.19683,18.19683,0,0,1,6.44531,1.1001,10.2049,10.2049,0,0,1,4.64258,3.34375,9.15241,9.15241,0,0,1,1.71582,5.72021A9.38516,9.38516,0,0,1,201.52031,25.56882Zm-7.04-8.14014a3.93047,3.93047,0,0,0-1.8916-1.47412,7.67324,7.67324,0,0,0-2.8164-.48388h-4.88379q-.83643,0-.83594.748v7.52393q0,.83643.61621.83594h5.41113a5.30621,5.30621,0,0,0,3.69629-1.23194,4.33371,4.33371,0,0,0,1.36426-3.38818A4.47023,4.47023,0,0,0,194.48027,17.42868Z' transform='translate(-4.27038 -4.4141)' fill='%233c465c'/%3E%3Cpath d='M215.75469,42.28855a9.80633,9.80633,0,0,1-3.89453.72656,7.35667,7.35667,0,0,1-5.25782-1.80469,6.0653,6.0653,0,0,1-1.91406-4.62011,6.52756,6.52756,0,0,1,1.54-4.31153,9.99145,9.99145,0,0,1,4.40039-2.88183,21.5671,21.5671,0,0,1,6.81934-1.12207l1.54-.13184a.92789.92789,0,0,0,.48437-.13184.51719.51719,0,0,0,.21973-.48437v-.92432a3.49529,3.49529,0,0,0-.96778-2.61767,3.8053,3.8053,0,0,0-2.77246-.94629,5.666,5.666,0,0,0-2.52929.59424,4.88966,4.88966,0,0,0-2.0459,2.04589.75148.75148,0,0,1-.3086.396,1.1867,1.1867,0,0,1-.66015,0l-4.39942-1.01221a.62877.62877,0,0,1-.374-.28564q-.11133-.19849.15332-.85791a7.28844,7.28844,0,0,1,3.80664-3.8501,15.80851,15.80851,0,0,1,6.666-1.25391,15.01847,15.01847,0,0,1,5.80761.92383,6.37254,6.37254,0,0,1,3.124,2.57373,7.4683,7.4683,0,0,1,.96777,3.8501V41.60691a1.21964,1.21964,0,0,1-.17578.748.81046.81046,0,0,1-.66016.21973h-4.53125a.71729.71729,0,0,1-.68261-.35156,2.1549,2.1549,0,0,1-.24219-.88086l-.08789-.96777q-.0879-.791-.96778-.044A10.97844,10.97844,0,0,1,215.75469,42.28855ZM219.032,31.44284l-1.23144.0879a11.1892,11.1892,0,0,0-2.28809.33007,8.69705,8.69705,0,0,0-2.06836.792,4.79869,4.79869,0,0,0-1.51758,1.27539,2.83593,2.83593,0,0,0-.59375,1.78222,2.5758,2.5758,0,0,0,.92383,2.08985,3.86459,3.86459,0,0,0,2.55176.7705,5.11364,5.11364,0,0,0,1.958-.35253A6.12069,6.12069,0,0,0,218.24,37.3823a6.23114,6.23114,0,0,0,1.05664-1.14356,2.06008,2.06008,0,0,0,.39551-1.18847V32.19089Q219.69219,31.44236,219.032,31.44284Z' transform='translate(-4.27038 -4.4141)' fill='%233c465c'/%3E%3Cpath d='M230.78008,49.70261a.67363.67363,0,0,1-.61524-.7041v-3.3877a.63018.63018,0,0,1,.26368-.48437,1.65855,1.65855,0,0,1,1.01171-.21973h2.99219a2.9631,2.9631,0,0,0,1.51758-.39648,3.54383,3.54383,0,0,0,1.10059-.96778,3.68375,3.68375,0,0,0,.59375-1.23144,1.63862,1.63862,0,0,0-.08789-1.18848l-8.44825-20.812a.749.749,0,0,1,.02246-.72607.72906.72906,0,0,1,.68164-.32959h5.54395a.99989.99989,0,0,1,.61621.19775.94993.94993,0,0,1,.35156.55029l4.88477,13.11182c.08789.26367.2041.40332.35156.418.14649.01465.27832-.13867.39649-.46192l4.83984-13.1123a2.01049,2.01049,0,0,1,.39551-.50586.82226.82226,0,0,1,.57226-.19775h3.78418a.63969.63969,0,0,1,.61621.32959.71075.71075,0,0,1,0,.68212l-9.0205,22.30811a19.30032,19.30032,0,0,1-1.91407,3.71777,7.98321,7.98321,0,0,1-2.17773,2.2002,7.467,7.467,0,0,1-2.70606,1.05566,19.6373,19.6373,0,0,1-3.58593.28614A10.51567,10.51567,0,0,1,230.78008,49.70261Z' transform='translate(-4.27038 -4.4141)' fill='%233c465c'/%3E%3C/svg%3E" height="40" alt="Partner" className="landing-cta-img"/></div>
                     <div className="my-1 my-sm-3 px-card col-sm-auto col-3">
                        <img src="data:image/svg+xml,%3Csvg id='svg' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 237.3905 38.41434'%3E%3Cpath d='M39.25256,24.81917l3.89287-2.07555-1.86479-5.59743-4.338.67183a15.31038,15.31038,0,0,0-1.93917-2.44566l1.63142-4.04528L31.61014,8.23849,28.74427,11.513a14.88927,14.88927,0,0,0-3.09163-.62905L24.31222,6.76556l-.16715.02572v6.93487a12.1395,12.1395,0,0,1,4.48467.84109,12.141,12.141,0,0,0-4.48467-.84006v-.001l-.001,0V6.79128l-5.66778.8398-.091,4.34211a15.1,15.1,0,0,0-2.7731,1.51267l-3.67409-2.2913L8.02332,15.6078,10.76276,19.014A15.1955,15.1955,0,0,0,9.6251,21.92953l-4.31937.61128-.1603,5.89735,4.33319.85557A14.94342,14.94342,0,0,0,10.467,32.2162L7.51982,35.49481l3.66439,4.62089,3.90973-2.14765a15.15261,15.15261,0,0,0,2.59781,1.58174l-.15235,4.445,5.78143,1.18508.82321-2.13085V38.10644a12.212,12.212,0,0,1-9.79161-4.99384,12.21589,12.21589,0,0,0,9.79264,4.992v4.94447l.7944-2.0488q.73-.03581,1.46809-.14442A14.70449,14.70449,0,0,0,27.93,40.55009L30.68323,44.066l5.187-2.80759-1.4434-4.2351a15.11292,15.11292,0,0,0,2.01133-2.27244l4.35587.92207,2.16853-5.48379-3.79609-2.3A15.17165,15.17165,0,0,0,39.25256,24.81917ZM14.59915,27.339a9.77,9.77,0,1,1,9.54592,8.2656A9.70031,9.70031,0,0,1,14.59915,27.339Zm15.94142,9.00325a12.12774,12.12774,0,0,0,5.28422-14.08749,12.12643,12.12643,0,0,1-5.28422,14.08749Z' transform='translate(-5.14543 -6.76556)' fill='%233c465c'/%3E%3Cpath d='M67.25176,15.46335a7.87493,7.87493,0,0,1,4.84472,7.582,8.26646,8.26646,0,0,1-1.25781,4.57325,8.00559,8.00559,0,0,1-3.58691,2.99121A13.39583,13.39583,0,0,1,61.76055,31.647h-4.794v6.5625H51.4583V14.40964H61.76055A13.23293,13.23293,0,0,1,67.25176,15.46335Zm-2.02344,10.625a3.72967,3.72967,0,0,0,1.292-3.043,3.7712,3.7712,0,0,0-1.292-3.07714,5.78573,5.78573,0,0,0-3.77393-1.07081H56.9666v8.26221h4.48779A5.78573,5.78573,0,0,0,65.22832,26.08835Z' transform='translate(-5.14543 -6.76556)' fill='%233c465c'/%3E%3Cpath d='M75.90459,16.51755a2.87867,2.87867,0,0,1,0-4.21631,3.36585,3.36585,0,0,1,2.37988-.84961,3.44906,3.44906,0,0,1,2.37989.81592,2.617,2.617,0,0,1,.918,2.04,2.888,2.888,0,0,1-.918,2.19287,3.32507,3.32507,0,0,1-2.37989.86719A3.36179,3.36179,0,0,1,75.90459,16.51755Zm-.272,3.3999h5.30371v18.292H75.63262Z' transform='translate(-5.14543 -6.76556)' fill='%233c465c'/%3E%3Cpath d='M101.31914,20.81833a8.43057,8.43057,0,0,1,3.28125,3.29834,9.95866,9.95866,0,0,1,1.18994,4.94629,9.95854,9.95854,0,0,1-1.18994,4.94727,8.41969,8.41969,0,0,1-3.28125,3.29785A9.32,9.32,0,0,1,96.678,38.48191,7.06074,7.06074,0,0,1,91.17021,36.271v8.53418H85.8665V19.91745h5.06592v2.10791A7.03425,7.03425,0,0,1,96.678,19.64548,9.32447,9.32447,0,0,1,101.31914,20.81833Zm-2.21,11.93408a5.13351,5.13351,0,0,0,1.30908-3.68945,5.13267,5.13267,0,0,0-1.30908-3.68847,4.76084,4.76084,0,0,0-6.69775,0A5.13057,5.13057,0,0,0,91.10234,29.063a5.13141,5.13141,0,0,0,1.30909,3.68945,4.76084,4.76084,0,0,0,6.69775,0Z' transform='translate(-5.14543 -6.76556)' fill='%233c465c'/%3E%3Cpath d='M127.14189,30.55906H113.30352a4.30873,4.30873,0,0,0,1.76806,2.68652,5.8567,5.8567,0,0,0,3.46826.98535,7.00457,7.00457,0,0,0,2.53272-.4248,6.13266,6.13266,0,0,0,2.05713-1.34278L125.952,35.5239q-2.58471,2.95752-7.54834,2.958a11.94033,11.94033,0,0,1-5.47412-1.207,8.85243,8.85243,0,0,1-3.67187-3.34961,9.22772,9.22772,0,0,1-1.292-4.86231,9.35332,9.35332,0,0,1,1.27491-4.84472,8.9347,8.9347,0,0,1,3.50244-3.36573,10.84262,10.84262,0,0,1,9.84277-.05127,8.44466,8.44466,0,0,1,3.417,3.31543,9.88522,9.88522,0,0,1,1.24122,5.01465Q127.244,29.23386,127.14189,30.55906Zm-12.41015-5.88184a4.34358,4.34358,0,0,0-1.4961,2.78809h9.01026a4.38944,4.38944,0,0,0-1.4961-2.771,4.4744,4.4744,0,0,0-2.99218-1.03662A4.56806,4.56806,0,0,0,114.73174,24.67722Z' transform='translate(-5.14543 -6.76556)' fill='%233c465c'/%3E%3Cpath d='M130.78008,12.98142h5.30371v25.228h-5.30371Z' transform='translate(-5.14543 -6.76556)' fill='%233c465c'/%3E%3Cpath d='M141.285,16.51755a2.87972,2.87972,0,0,1,0-4.21631,3.36749,3.36749,0,0,1,2.37988-.84961,3.45158,3.45158,0,0,1,2.38086.81592,2.6186,2.6186,0,0,1,.918,2.04,2.8897,2.8897,0,0,1-.918,2.19287,3.32744,3.32744,0,0,1-2.38086.86719A3.36343,3.36343,0,0,1,141.285,16.51755Zm-.27148,3.3999h5.30371v18.292h-5.30371Z' transform='translate(-5.14543 -6.76556)' fill='%233c465c'/%3E%3Cpath d='M167.85527,21.68552q2.0918,2.03979,2.0918,6.05127V38.20945h-5.30469V28.5532a4.76727,4.76727,0,0,0-.95215-3.24659,3.49046,3.49046,0,0,0-2.7539-1.07129,4.2203,4.2203,0,0,0-3.19531,1.24122,5.13656,5.13656,0,0,0-1.19043,3.689v9.04395h-5.30372v-18.292h5.06543v2.14209a7.04489,7.04489,0,0,1,2.61817-1.78515,9.128,9.128,0,0,1,3.43457-.62891A7.52732,7.52732,0,0,1,167.85527,21.68552Z' transform='translate(-5.14543 -6.76556)' fill='%233c465c'/%3E%3Cpath d='M192.76055,30.55906H178.92266a4.30744,4.30744,0,0,0,1.76855,2.68652,5.85409,5.85409,0,0,0,3.46777.98535,7.00731,7.00731,0,0,0,2.53321-.4248,6.13082,6.13082,0,0,0,2.05664-1.34278l2.82226,3.06055q-2.584,2.95752-7.54785,2.958a11.941,11.941,0,0,1-5.47461-1.207,8.84946,8.84946,0,0,1-3.67187-3.34961,9.22771,9.22771,0,0,1-1.292-4.86231,9.3443,9.3443,0,0,1,1.27539-4.84472,8.927,8.927,0,0,1,3.50195-3.36573,10.84262,10.84262,0,0,1,9.84277-.05127,8.44768,8.44768,0,0,1,3.417,3.31543,9.88522,9.88522,0,0,1,1.24122,5.01465Q192.86309,29.23386,192.76055,30.55906Zm-12.41016-5.88184a4.34253,4.34253,0,0,0-1.49512,2.78809H187.865a4.38722,4.38722,0,0,0-1.49609-2.771,4.47444,4.47444,0,0,0-2.99219-1.03662A4.5712,4.5712,0,0,0,180.35039,24.67722Z' transform='translate(-5.14543 -6.76556)' fill='%233c465c'/%3E%3Cpath d='M196.0584,26.51365h9.62207v4.24951H196.0584Z' transform='translate(-5.14543 -6.76556)' fill='%233c465c'/%3E%3Cpath d='M212.8709,35.79538q-2.83887-2.82129-2.83887-8.05859V14.40964h5.50781v13.124q0,6.39112,5.30371,6.39161a4.97333,4.97333,0,0,0,3.94434-1.54688,7.21345,7.21345,0,0,0,1.36035-4.84473v-13.124h5.43946V27.73679q0,5.23682-2.83887,8.05859-2.83887,2.82276-7.93848,2.82227Q215.70977,38.61765,212.8709,35.79538Z' transform='translate(-5.14543 -6.76556)' fill='%233c465c'/%3E%3Cpath d='M237.02812,14.40964h5.50782V38.20945h-5.50782Z' transform='translate(-5.14543 -6.76556)' fill='%233c465c'/%3E%3C/svg%3E" height="40" alt="Partner" className="landing-cta-img"/></div>
                     <div className="my-1 my-sm-3 px-card col-sm-auto col-3">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 123.87 51.945'%3E%3Cpath d='M19.702 49.672l-2.403-4.035H9.714l1.323-2.271h4.917l-3.572-5.998-7.277 12.304H1.908l9.217-15.347a2.14 2.14 0 0 1 .573-.662c.22-.162.485-.243.794-.243s.57.081.783.243a2.21 2.21 0 0 1 .562.662l9.239 15.347h-3.374zm6.108.277v-2.841h12.194c.761 0 1.346-.194 1.756-.582s.615-.902.615-1.544c0-.701-.205-1.227-.615-1.577s-.996-.526-1.756-.526h-7.473c-.761 0-1.451-.115-2.07-.347a4.49 4.49 0 0 1-1.566-.962c-.425-.41-.753-.899-.984-1.466s-.347-1.186-.347-1.857c0-.656.108-1.264.324-1.824a3.89 3.89 0 0 1 .962-1.443c.425-.403.951-.719 1.577-.951s1.342-.347 2.148-.347h11.679v2.842H30.576c-.657 0-1.164.175-1.521.526s-.537.839-.537 1.465.182 1.112.548 1.454.861.515 1.488.515h7.451c1.656 0 2.912.388 3.77 1.163s1.287 1.954 1.287 3.535c0 .686-.105 1.32-.313 1.902a4.11 4.11 0 0 1-.94 1.51c-.418.425-.944.757-1.577.996s-1.376.358-2.226.358H25.81zm24.903 0V36.524h-6.175v-2.842H59.73v2.842h-6.175v13.424h-2.841zm26.173.156l-4.151-4.557h-6.136v-2.527h6.836c1.038 0 1.82-.282 2.346-.846s.789-1.38.789-2.448-.274-1.861-.823-2.38-1.32-.778-2.312-.778h-8.934v13.536h-2.843v-16.4h11.776c.932 0 1.767.139 2.504.417s1.361.677 1.872 1.195a5.2 5.2 0 0 1 1.173 1.884c.271.737.406 1.564.406 2.482 0 1.369-.297 2.515-.891 3.44a4.98 4.98 0 0 1-2.493 1.997l4.94 4.986h-4.061zm27.771-.023v-2.841h12.194c.761 0 1.346-.194 1.756-.582s.615-.902.615-1.544c0-.701-.205-1.227-.615-1.577s-.996-.526-1.756-.526h-7.473c-.761 0-1.451-.115-2.07-.347a4.49 4.49 0 0 1-1.566-.962c-.425-.41-.753-.899-.984-1.466s-.347-1.186-.347-1.857c0-.656.108-1.264.324-1.824a3.89 3.89 0 0 1 .962-1.443c.425-.403.951-.719 1.577-.951s1.342-.347 2.148-.347h11.679v2.842h-11.679c-.657 0-1.164.175-1.521.526s-.537.839-.537 1.465.182 1.112.548 1.454.861.515 1.488.515h7.451c1.656 0 2.912.388 3.77 1.163s1.287 1.954 1.287 3.535c0 .686-.105 1.32-.313 1.902a4.11 4.11 0 0 1-.94 1.51c-.418.425-.944.757-1.577.996s-1.376.358-2.226.358h-12.194zm-13.849.007c-1.134 0-2.181-.213-3.143-.638s-1.798-1.007-2.506-1.745-1.26-1.614-1.655-2.629-.593-2.111-.593-3.289c0-1.193.198-2.282.593-3.267s.947-1.824 1.655-2.517 1.544-1.231 2.506-1.611 2.01-.571 3.143-.571h3.96c1.178 0 2.256.194 3.233.582a7.35 7.35 0 0 1 2.517 1.633 7.35 7.35 0 0 1 1.633 2.517c.388.977.582 2.055.582 3.233s-.198 2.275-.593 3.289-.947 1.891-1.656 2.629a7.79 7.79 0 0 1-2.517 1.745c-.969.425-2.036.638-3.199.638h-3.96zm3.96-2.841a5.17 5.17 0 0 0 2.058-.403 4.94 4.94 0 0 0 1.622-1.108 4.97 4.97 0 0 0 1.063-1.689 5.85 5.85 0 0 0 .38-2.126c0-.761-.127-1.465-.38-2.114a4.87 4.87 0 0 0-1.063-1.667c-.455-.463-.996-.824-1.622-1.085s-1.313-.392-2.058-.392h-3.96a5.16 5.16 0 0 0-2.025.392c-.619.261-1.152.623-1.6 1.085s-.798 1.015-1.052 1.656-.38 1.35-.38 2.125c0 .761.127 1.469.38 2.126a5.04 5.04 0 0 0 1.052 1.689c.448.47.981.839 1.6 1.108s1.294.403 2.025.403h3.96zm-57.361-20.93V2.134h4.225v19.96h16.267v4.225H37.407zm-8.948.014l-3.577-6.005H13.594l1.969-3.38h7.318l-5.316-8.926-10.83 18.311H1.977L15.694 3.493c.241-.415.525-.743.853-.984s.722-.361 1.181-.361.848.121 1.165.361.596.569.837.984l13.75 22.839h-5.021zm75.58-.085c-1.686 0-3.243-.316-4.674-.948s-2.673-1.497-3.726-2.595-1.874-2.4-2.461-3.909-.882-3.138-.882-4.89c0-1.774.294-3.393.882-4.857s1.408-2.711 2.461-3.743a11.06 11.06 0 0 1 3.726-2.395c1.431-.565 2.988-.848 4.674-.848h5.888c1.752 0 3.354.289 4.807.865s2.7 1.386 3.742 2.428 1.852 2.29 2.429 3.742.865 3.055.865 4.807-.294 3.382-.881 4.89-1.409 2.811-2.462 3.909-2.301 1.963-3.743 2.595-3.027.948-4.757.948h-5.888zm5.888-4.225c1.109 0 2.129-.2 3.06-.599s1.735-.948 2.412-1.647a7.39 7.39 0 0 0 1.58-2.512c.377-.976.566-2.029.566-3.16s-.189-2.179-.566-3.144-.904-1.791-1.58-2.478-1.48-1.225-2.412-1.613-1.952-.582-3.06-.582h-5.888c-1.087 0-2.09.194-3.01.582s-1.713.926-2.379 1.613-1.187 1.509-1.564 2.462-.566 2.007-.566 3.16c0 1.131.188 2.185.566 3.16a7.52 7.52 0 0 0 1.564 2.512 7.2 7.2 0 0 0 2.379 1.647c.92.399 1.924.599 3.01.599h5.888zM88.338 6.528l-.009-4.243h0 0l-3.725.005c-2.247-.002-8.949.006-10.864.003a13.22 13.22 0 0 0-2.937.312 12.77 12.77 0 0 0-1.781.555 10.93 10.93 0 0 0-3.678 2.39c-1.04 1.029-1.85 2.274-2.43 3.735s-.87 3.077-.87 4.847c0 1.749.29 3.375.87 4.88s1.39 2.805 2.43 3.901a11.46 11.46 0 0 0 3.678 2.59c1.412.631 2.95.946 4.614.946l14.644.021.01-14.1-14.838-.001-.001 3.596 10.72-.004.003 6.273-10.538-.002c-1.073 0-2.064-.199-2.972-.598s-1.691-.946-2.348-1.643-1.171-1.532-1.543-2.507-.558-2.025-.558-3.154c0-1.151.186-2.202.558-3.154s.887-1.77 1.543-2.457a6.99 6.99 0 0 1 2.348-1.61c.436-.186.893-.325 1.367-.422.049-.01.098-.018.147-.027a8.07 8.07 0 0 1 1.457-.132l14.702-.001z' fill='%233c465c'/%3E%3C/svg%3E" height="40" alt="Partner" className="landing-cta-img"/></div>
                     <div className="my-1 my-sm-3 px-card col-sm-auto col-3">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 241.809 39.67' fill='%233c465c'%3E%3Cpath d='M33.408 23.116L20.213.925c0-.15-.15-.15-.3-.3l-.45-.45h0a1.95 1.95 0 0 0-2.549.9L.121 33.462a.9.9 0 0 0 0 .9 1.5 1.5 0 0 0 1.499 1.05h3.749a1.35 1.35 0 0 0 1.499-.75L17.364 14.42l.3-.3.45-.45a1.35 1.35 0 0 1 1.649.3h.15l6.597 11.096a1.65 1.65 0 0 0 1.349.75h3.898a2.4 2.4 0 0 0 1.499-.75c.45-.6.45-.75.45-.9a3.6 3.6 0 0 0-.3-1.05zM53.8 17.569a10.35 10.35 0 0 0-7.347-3.149h-3.898a4.05 4.05 0 0 1-4.048-2.999 3.45 3.45 0 0 1 .75-3.149 3.6 3.6 0 0 1 2.849-1.499H52.75a1.65 1.65 0 0 0 1.649-.9l1.499-2.999a1.5 1.5 0 0 0-.15-1.799 1.35 1.35 0 0 0-1.499-1.05H40.155a6.9 6.9 0 0 0-5.698 2.999c-4.498 5.698-2.999 11.845.3 15.144a10.65 10.65 0 0 0 7.347 3.149h4.048a3.9 3.9 0 0 1 4.048 2.999 3.6 3.6 0 0 1-.9 2.999 3.9 3.9 0 0 1-2.849 1.499h-21.14c-.3.15-.6-.15-.75-.3l-3.898-6.747a1.8 1.8 0 0 0-3.299 0l-5.548 11.096a2.25 2.25 0 0 0 0 1.949 1.65 1.65 0 0 0 1.649.75h34.936a8.7 8.7 0 0 0 5.848-2.849c4.498-5.848 2.849-11.845-.45-15.144zm36.269 13.176h-6.531l-1.893-5.919h-9.463l-1.874 5.919h-6.494L73.5 4.137h7.106zm-9.797-10.52l-2.857-8.944a11.63 11.63 0 0 1-.445-2.394h-.148a10.17 10.17 0 0 1-.464 2.319l-2.894 9.018zm18.406 10.52h-5.863V2.615h5.863zm23.565-2.171q0 5.288-3.062 8.192-3.062 2.903-8.869 2.903c-2.085.091-4.164-.283-6.086-1.095v-4.936a11.66 11.66 0 0 0 5.919 1.707c1.681.106 3.335-.458 4.602-1.568 1.121-1.125 1.714-2.672 1.633-4.258v-1.503h-.074a6.55 6.55 0 0 1-5.919 3.191 7.12 7.12 0 0 1-5.771-2.561 10.38 10.38 0 0 1-2.134-6.865c-.148-2.756.694-5.474 2.375-7.664 1.529-1.868 3.84-2.918 6.253-2.839a5.77 5.77 0 0 1 5.195 2.672h.074v-2.208h5.863zm-5.789-6.958v-1.503a4.62 4.62 0 0 0-1.067-3.071 3.45 3.45 0 0 0-2.774-1.271 3.59 3.59 0 0 0-3.062 1.521 7.16 7.16 0 0 0-1.113 4.287 6.04 6.04 0 0 0 1.058 3.758 3.45 3.45 0 0 0 2.895 1.382c1.148.031 2.241-.49 2.941-1.401.791-1.067 1.188-2.375 1.123-3.701zm19.742 9.593a10.21 10.21 0 0 1-7.468-2.663 9.65 9.65 0 0 1-2.719-7.227 9.66 9.66 0 0 1 2.82-7.376 10.66 10.66 0 0 1 7.626-2.663 10.09 10.09 0 0 1 7.422 2.663 9.47 9.47 0 0 1 2.69 7.042 10.05 10.05 0 0 1-2.773 7.478 10.33 10.33 0 0 1-7.599 2.746zm.148-15.438a3.91 3.91 0 0 0-3.229 1.429 6.3 6.3 0 0 0-1.15 4.045q0 5.474 4.416 5.474 4.211 0 4.212-5.622 0-5.325-4.249-5.326zm13.378 13.953v-5.937c1.038.881 2.226 1.569 3.507 2.032 1.225.445 2.519.674 3.822.677a8.44 8.44 0 0 0 1.976-.204 4.58 4.58 0 0 0 1.41-.566 2.45 2.45 0 0 0 .845-.854 2.12 2.12 0 0 0 .278-1.066c.006-.5-.15-.988-.445-1.392-.336-.445-.747-.828-1.215-1.132a12.66 12.66 0 0 0-1.828-1.002q-1.058-.482-2.282-.983a11.64 11.64 0 0 1-4.647-3.173 6.92 6.92 0 0 1-1.531-4.527 7.21 7.21 0 0 1 .835-3.572 7.1 7.1 0 0 1 2.272-2.458c1.017-.668 2.145-1.149 3.331-1.419a17.13 17.13 0 0 1 4.008-.455 24.1 24.1 0 0 1 3.683.25 14.5 14.5 0 0 1 2.96.77v5.548a8.92 8.92 0 0 0-1.456-.816 11.62 11.62 0 0 0-1.624-.584 12.43 12.43 0 0 0-1.661-.343c-.519-.072-1.043-.109-1.567-.111a8.15 8.15 0 0 0-1.855.195 4.77 4.77 0 0 0-1.41.547 2.72 2.72 0 0 0-.891.844 1.99 1.99 0 0 0-.315 1.104c-.006.425.117.843.353 1.197a4.02 4.02 0 0 0 1.002 1.002 10.62 10.62 0 0 0 1.577.928q.927.455 2.097.937a23.33 23.33 0 0 1 2.866 1.419 10.17 10.17 0 0 1 2.181 1.698c.6.623 1.073 1.357 1.392 2.162a7.65 7.65 0 0 1 .482 2.83c.043 1.298-.247 2.586-.844 3.739-.55.993-1.337 1.835-2.292 2.449a9.93 9.93 0 0 1-3.368 1.345 19.5 19.5 0 0 1-4.054.408 22.55 22.55 0 0 1-4.165-.371c-1.189-.205-2.342-.579-3.424-1.113zm49.096-17.98l-5.474 19.001h-6.16l-2.802-11.133c-.193-.797-.299-1.612-.315-2.431h-.111a14.67 14.67 0 0 1-.371 2.357l-3.006 11.207h-6.086l-5.362-19.001h5.975l2.616 12.395a16.37 16.37 0 0 1 .278 2.115h.111a11.67 11.67 0 0 1 .334-2.189l3.266-12.321h5.585l2.932 12.395a19.92 19.92 0 0 1 .26 2.152h.13a21.18 21.18 0 0 1 .297-2.152l2.468-12.395zm18.592 19.001h-5.548v-2.728h-.074a6.19 6.19 0 0 1-5.659 3.191 5.92 5.92 0 0 1-4.351-1.567 5.62 5.62 0 0 1-1.587-4.185q0-5.53 6.55-6.383l5.158-.687q0-3.118-3.377-3.118a11.53 11.53 0 0 0-6.457 2.022v-4.416a14.49 14.49 0 0 1 3.35-1.113 17.63 17.63 0 0 1 3.868-.482q8.127 0 8.127 8.109zm-5.511-7.719v-1.28l-3.451.445q-2.858.371-2.857 2.579c-.019.623.235 1.223.695 1.643a2.68 2.68 0 0 0 1.884.64 3.47 3.47 0 0 0 2.69-1.142 4.12 4.12 0 0 0 1.039-2.885zm16.087 5.511h-.074v10.947h-5.863v-27.74h5.863v2.857h.074a7.46 7.46 0 0 1 11.81-.789 10.78 10.78 0 0 1 2.014 6.894c.137 2.739-.694 5.438-2.348 7.626a7.65 7.65 0 0 1-6.243 2.876c-2.094.1-4.085-.917-5.232-2.672zm-.167-7.793v1.522a4.83 4.83 0 0 0 1.039 3.21 3.38 3.38 0 0 0 2.728 1.243c1.233.051 2.407-.534 3.108-1.55a7.48 7.48 0 0 0 1.104-4.388q0-5.011-3.896-5.01a3.66 3.66 0 0 0-2.941 1.364c-.8 1.028-1.204 2.309-1.141 3.609z'/%3E%3C/svg%3E" height="40" alt="Partner" className="landing-cta-img"/></div>
                     <div className="my-1 my-sm-3 px-card col-sm-auto col-3">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:v='https://vecta.io/nano' viewBox='0 0 200.161 42.345' fill='%233c465c'%3E%3Cpath d='M52.142 10.275h1.92 1.905l1.41.03c2.7.06 4.92.55 6.66 1.47s3.025 2.185 3.855 3.795 1.245 3.525 1.245 5.745c0 2.281-.435 4.265-1.305 5.956s-2.19 2.99-3.96 3.899-3.985 1.365-6.645 1.365h-6.51c-.46 0-.69-.24-.69-.72v-20.91c0-.24.05-.405.15-.495s.27-.135.51-.135h1.455zm3.135 4.14v14.011c0 .28.13.42.39.42h.57c1.64 0 3.01-.245 4.11-.735a4.95 4.95 0 0 0 2.475-2.385c.55-1.1.825-2.56.825-4.38 0-1.76-.255-3.175-.765-4.245a4.83 4.83 0 0 0-2.34-2.355c-1.05-.5-2.385-.75-4.005-.75h-.96c-.2 0-.3.14-.3.42zm14.82 17.879c-.08-.159-.08-.369 0-.63l7.47-20.79c.08-.22.169-.375.27-.465s.27-.135.51-.135h4.5c.44 0 .74.22.9.66l7.41 20.791c.06.16.06.335 0 .524s-.18.285-.36.285h-4.41c-.3 0-.49-.14-.57-.42l-1.56-4.38a.54.54 0 0 0-.105-.24c-.05-.06-.146-.09-.285-.09h-7.32c-.2 0-.33.101-.39.3l-1.59 4.44c-.041.12-.105.215-.195.284s-.235.105-.435.105h-3.45c-.18 0-.31-.08-.39-.24zm12.54-8.88c.28 0 .37-.169.27-.51l-2.52-7.02c-.06-.12-.125-.18-.195-.18s-.135.07-.195.21l-2.55 6.99c-.14.341-.05.51.27.51h4.92zm14.28 8.055c-1.54-.909-2.725-2.214-3.555-3.914s-1.245-3.721-1.245-6.061c0-2.38.425-4.43 1.275-6.15s2.045-3.045 3.585-3.975 3.35-1.395 5.43-1.395 3.885.465 5.415 1.395 2.715 2.25 3.555 3.96 1.26 3.755 1.26 6.135c0 2.34-.416 4.361-1.245 6.06s-2.015 3.01-3.555 3.93-3.35 1.38-5.43 1.38c-2.12 0-3.95-.454-5.49-1.365zm9.09-4.109c.76-1.189 1.14-3.135 1.14-5.835 0-2.76-.385-4.765-1.155-6.015s-1.965-1.875-3.585-1.875c-1.64 0-2.85.63-3.63 1.89s-1.17 3.26-1.17 6c0 2.681.385 4.62 1.155 5.82s1.984 1.8 3.645 1.8c1.64 0 2.839-.595 3.6-1.785zm15.15-16.546c0-.16.049-.29.15-.39s.25-.15.45-.15h17.22c.22 0 .375.05.465.15a.56.56 0 0 1 .135.39v2.79c0 .3-.18.45-.54.45h-5.61c-.22 0-.33.1-.33.3v17.61c0 .381-.17.57-.51.57h-4.29c-.3 0-.45-.17-.45-.51v-17.58c0-.26-.11-.39-.33-.39h-5.79c-.38 0-.57-.15-.57-.45v-2.79zm20.805 20.97a7.44 7.44 0 0 1-2.835-2.895c-.68-1.23-1.02-2.635-1.02-4.215 0-1.66.35-3.115 1.05-4.366a7.56 7.56 0 0 1 2.88-2.925c1.22-.7 2.601-1.05 4.139-1.05 1.621 0 3.031.355 4.23 1.065s2.135 1.69 2.805 2.94 1.006 2.685 1.006 4.305c0 1.601-.342 3.015-1.021 4.245s-1.625 2.194-2.834 2.895-2.615 1.05-4.215 1.05c-1.58 0-2.975-.35-4.185-1.05zm6.075-2.595c.498-.39.873-.975 1.125-1.755s.375-1.729.375-2.851c0-1.18-.127-2.154-.375-2.925s-.627-1.354-1.125-1.755-1.121-.6-1.861-.6c-.719 0-1.333.2-1.843.6s-.896.985-1.156 1.755-.39 1.745-.39 2.925c0 1.141.13 2.096.39 2.865s.645 1.351 1.156 1.74 1.125.585 1.843.585c.74 0 1.359-.195 1.861-.585zm11.893 2.595c-1.211-.7-2.155-1.665-2.835-2.895s-1.021-2.635-1.021-4.215c0-1.66.35-3.115 1.051-4.366a7.56 7.56 0 0 1 2.88-2.925c1.22-.7 2.6-1.05 4.14-1.05 1.62 0 3.03.355 4.23 1.065a7.43 7.43 0 0 1 2.805 2.94c.67 1.25 1.005 2.685 1.005 4.305 0 1.601-.341 3.015-1.021 4.245a7.45 7.45 0 0 1-2.835 2.895c-1.21.701-2.614 1.05-4.215 1.05-1.58 0-2.975-.35-4.185-1.05zm6.075-2.595c.499-.39.874-.975 1.125-1.755s.375-1.729.375-2.851c0-1.18-.126-2.154-.375-2.925s-.626-1.354-1.125-1.755-1.121-.6-1.86-.6c-.72 0-1.335.2-1.845.6s-.896.985-1.155 1.755-.39 1.745-.39 2.925c0 1.141.13 2.096.39 2.865s.645 1.351 1.155 1.74 1.125.585 1.845.585c.739 0 1.359-.195 1.86-.585zm13.41 2.626c0 .26-.06.445-.18.555s-.33.165-.63.165h-3.181c-.439 0-.659-.21-.659-.63l.09-21.06c0-.38.159-.57.479-.57h3.63c.301 0 .45.18.45.54v21zm11.76-12.18c-.58-.32-1.29-.48-2.13-.48-.74 0-1.365.145-1.875.435s-.766.685-.766 1.185c0 .26.101.505.301.735s.659.435 1.38.615l3.45.841c1.659.38 2.839 1 3.54 1.859a4.44 4.44 0 0 1 1.05 2.88c0 1.08-.306 2-.915 2.761s-1.455 1.345-2.535 1.754-2.32.615-3.72.615c-1.78 0-3.29-.314-4.53-.944s-2.11-1.415-2.61-2.355c-.08-.14-.12-.274-.12-.404s.061-.226.181-.285l2.04-1.051c.199-.1.354-.145.465-.135s.205.065.285.165c.26.36.569.7.93 1.021s.81.575 1.35.765 1.22.275 2.04.255a5.43 5.43 0 0 0 1.516-.195c.45-.129.805-.319 1.064-.569s.391-.545.391-.885-.141-.635-.42-.886-.801-.465-1.561-.645l-3.09-.66c-1.5-.34-2.636-.875-3.405-1.605s-1.154-1.685-1.154-2.865c0-1.02.265-1.92.795-2.7s1.305-1.395 2.324-1.845 2.24-.675 3.66-.675c1.52 0 2.835.28 3.945.84s1.905 1.23 2.385 2.01c.08.12.14.245.18.375s-.029.245-.21.345l-2.159 1.05c-.141.06-.266.075-.375.045a.64.64 0 0 1-.315-.225c-.34-.44-.8-.82-1.38-1.14zM14.28 21.475c0 4.297 3.496 7.793 7.793 7.793s7.793-3.496 7.793-7.793a7.76 7.76 0 0 0-3.34-6.397v6.397a1.11 1.11 0 0 1-.496.926l-3.34 2.227c-.374.249-.861.249-1.235 0l-3.34-2.227a1.11 1.11 0 0 1-.496-.926v-6.397a7.76 7.76 0 0 0-3.34 6.397h0zm10.019 19v-9.23c-.716.163-1.462.25-2.227.25s-1.51-.087-2.227-.25v9.23h4.453zm15.926-23.421l-3.49-.857-.569-1.354 1.817-3.029c.263-.438.194-.999-.167-1.36l-4.723-4.723c-.361-.361-.922-.43-1.36-.167l-3.029 1.818-1.354-.569-.856-3.489c-.122-.498-.569-.848-1.081-.848h-6.68c-.513 0-.959.35-1.081.848l-.856 3.489-1.354.569-3.029-1.818c-.438-.263-.999-.194-1.36.167L6.33 10.454c-.361.361-.43.922-.167 1.36l1.817 3.029-.569 1.354-3.49.857c-.498.122-.848.569-.848 1.081v6.68c0 .513.35.959.848 1.081l3.49.857.569 1.354-1.817 3.029c-.263.438-.194.999.167 1.36l4.723 4.723c.361.361.922.43 1.36.167l3.029-1.818 1.354.569.824 3.359v-9.048c-3.296-1.642-5.566-5.048-5.566-8.974 0-2.031.607-3.989 1.756-5.661a10.03 10.03 0 0 1 4.505-3.627c.343-.139.733-.099 1.041.108a1.11 1.11 0 0 1 .492.924v7.661l2.227 1.484 2.227-1.484v-7.661c0-.37.184-.717.492-.924s.697-.247 1.041-.108a10.03 10.03 0 0 1 4.505 3.627c1.149 1.672 1.756 3.63 1.756 5.661 0 3.926-2.27 7.331-5.566 8.974v9.048l.824-3.359c.452-.165.905-.355 1.354-.569l3.029 1.818c.438.263.999.194 1.36-.167l4.723-4.723c.361-.361.43-.922.167-1.36l-1.817-3.029c.214-.449.404-.902.569-1.354l3.49-.857c.498-.122.848-.569.848-1.081v-6.68c0-.513-.35-.959-.848-1.081h0z'/%3E%3C/svg%3E" height="40" alt="Partner" className="landing-cta-img"/></div>
                     <div className="my-1 my-sm-3 px-card col-sm-auto col-3">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:v='https://vecta.io/nano' viewBox='0 0 128.161 42.2'%3E%3Cpath fill='%233c465c' d='M64.19 21.221c3.109-1.476 4.106-4.484 4.106-8.701 0-7.38-4.144-9.736-11.444-9.736h-8.277a.51.51 0 0 0-.508.512h0v35.659a.51.51 0 0 0 .51.511h5.607a.51.51 0 0 0 .508-.513V22.666h2.759a.51.51 0 0 1 .493.384l4.172 16.036a.51.51 0 0 0 .494.384h5.6c.047 0 .094-.007.139-.02.272-.078.429-.362.352-.634L63.908 21.81c-.063-.239.056-.489.282-.589zm-7.381-2.723v.002H54.69V7.361h2.476c3.831 0 4.867 1.809 4.867 5.523 0 3.938-1.397 5.614-5.225 5.614h0zm67.272 20.451c.005.283-.22.517-.503.522h-3.945a.51.51 0 0 1-.51-.501l-.434-20.415a.51.51 0 0 0-1.01-.091l-4.186 20.599a.51.51 0 0 1-.5.41h-3.178c-.242-.001-.451-.171-.5-.408l-4.267-20.708a.51.51 0 0 0-.599-.399.51.51 0 0 0-.409.492l-.398 20.52a.51.51 0 0 1-.51.503h-3.985c-.283-.001-.511-.232-.51-.515v-.007l.007-.435V3.303a.51.51 0 0 1 .509-.512h.609l.002-.004h5.977c.243.001.452.172.5.41l4.606 22.589a.51.51 0 0 0 .999.002l4.77-22.594a.51.51 0 0 1 .498-.405h1.037l-.001-.013h5.415a.51.51 0 0 1 .509.512v35.14l.01.52zM19.086 3.297v3.594a.51.51 0 0 1-.508.513h0-7.362a.51.51 0 0 0-.51.511v9.663a.51.51 0 0 0 .508.513h5.832a.51.51 0 0 1 .51.511v3.642a.51.51 0 0 1-.508.512h0-5.832a.51.51 0 0 0-.51.511v15.687a.51.51 0 0 1-.508.513H4.591a.51.51 0 0 1-.51-.511V3.299a.51.51 0 0 1 .509-.513h.002 13.985a.51.51 0 0 1 .51.511zm74.404 0v24.305c0 7.697-2.118 12.365-10.273 12.365-8.2 0-10.273-4.665-10.273-12.365V3.299a.51.51 0 0 1 .508-.513h5.469a.51.51 0 0 1 .51.511v25.075c0 3.488.406 6.61 3.786 6.61 3.423 0 3.831-3.125 3.831-6.61V3.299a.51.51 0 0 1 .508-.513h5.424a.51.51 0 0 1 .51.511h0zm-60.837-.919c-7.839 0-10.543 4.393-10.543 11.819v13.767h0c0 7.426 2.657 12 10.543 12 7.794 0 10.498-4.617 10.498-12V14.198c0-7.426-2.704-11.819-10.498-11.819h0zm3.738 27.171c0 3.034-.496 5.48-3.738 5.48-3.292 0-3.788-2.448-3.788-5.48V12.658c0-3.08.545-5.39 3.788-5.39s3.738 2.31 3.738 5.39V29.55z'/%3E%3C/svg%3E" height="40" alt="Partner" className="landing-cta-img"/></div>
                  </div>
               </div>
            </section>
            <section className="">
               <div className="container">
                  <div className="justify-content-center text-center row">
                     <div className="col-xxl-6 col-xxl-6 col-xl-7 col-lg-8">
                        <h1 className="fs-2 fs-sm-4 fs-md-5">The future is Web 4</h1>
                        <p className="lead">Built with a hybrid DeFi framework, AlgoCloud integrates the best of Web 2 with the promise of Web 3, offering an unparraled user experience. Multi-workspace, fully customizable, infinitely extendable.</p>
                     </div>
                  </div>
                  <div className="flex-center mt-8 row">
                     <div className="ps-lg-6 col-xl-4 col-lg-5 col-md-6 order-md-0"><img src="/assets/iso-1.png" alt="" className="px-6 px-md-0 img-fluid"/></div>
                     <div className="mt-4 mt-md-0 col-xl-4 col-lg-5 col-md">
                        <h5 className="text-danger">
                           <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="lightbulb" className="svg-inline--fa fa-lightbulb fa-w-11 me-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                              <path fill="currentColor" d="M176 80c-52.94 0-96 43.06-96 96 0 8.84 7.16 16 16 16s16-7.16 16-16c0-35.3 28.72-64 64-64 8.84 0 16-7.16 16-16s-7.16-16-16-16zM96.06 459.17c0 3.15.93 6.22 2.68 8.84l24.51 36.84c2.97 4.46 7.97 7.14 13.32 7.14h78.85c5.36 0 10.36-2.68 13.32-7.14l24.51-36.84c1.74-2.62 2.67-5.7 2.68-8.84l.05-43.18H96.02l.04 43.18zM176 0C73.72 0 0 82.97 0 176c0 44.37 16.45 84.85 43.56 115.78 16.64 18.99 42.74 58.8 52.42 92.16v.06h48v-.12c-.01-4.77-.72-9.51-2.15-14.07-5.59-17.81-22.82-64.77-62.17-109.67-20.54-23.43-31.52-53.15-31.61-84.14-.2-73.64 59.67-128 127.95-128 70.58 0 128 57.42 128 128 0 30.97-11.24 60.85-31.65 84.14-39.11 44.61-56.42 91.47-62.1 109.46a47.507 47.507 0 0 0-2.22 14.3v.1h48v-.05c9.68-33.37 35.78-73.18 52.42-92.16C335.55 260.85 352 220.37 352 176 352 78.8 273.2 0 176 0z"></path>
                           </svg>
                           ROUTING
                        </h5>
                        <h3>Data-first blueprint</h3>
                        <p>With AlgoCloud, we store terabytes of on-chain data that can be retrieved and analyzed at any time. Access to enterprise-grade analytics will give AlgoCloud users a major competitive advantage.</p>
                     </div>
                  </div>
                  <div className="flex-center mt-7 row">
                     <div className="pe-lg-6 col-xl-4 col-lg-5 col-md-6 order-md-2"><img src="/assets/iso-2.png" alt="" className="px-6 px-md-0 img-fluid"/></div>
                     <div className="mt-4 mt-md-0 col-xl-4 col-lg-5 col-md">
                        <h5 className="text-info">
                           <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="object-ungroup" className="svg-inline--fa fa-object-ungroup fa-w-18 me-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                              <path fill="currentColor" d="M564 224c6.627 0 12-5.373 12-12v-72c0-6.627-5.373-12-12-12h-72c-6.627 0-12 5.373-12 12v12h-88v-24h12c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12h-72c-6.627 0-12 5.373-12 12v12H96V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v72c0 6.627 5.373 12 12 12h12v160H12c-6.627 0-12 5.373-12 12v72c0 6.627 5.373 12 12 12h72c6.627 0 12-5.373 12-12v-12h88v24h-12c-6.627 0-12 5.373-12 12v72c0 6.627 5.373 12 12 12h72c6.627 0 12-5.373 12-12v-12h224v12c0 6.627 5.373 12 12 12h72c6.627 0 12-5.373 12-12v-72c0-6.627-5.373-12-12-12h-12V224h12zM352 64h32v32h-32V64zm0 256h32v32h-32v-32zM64 352H32v-32h32v32zm0-256H32V64h32v32zm32 216v-12c0-6.627-5.373-12-12-12H72V128h12c6.627 0 12-5.373 12-12v-12h224v12c0 6.627 5.373 12 12 12h12v160h-12c-6.627 0-12 5.373-12 12v12H96zm128 136h-32v-32h32v32zm280-64h-12c-6.627 0-12 5.373-12 12v12H256v-12c0-6.627-5.373-12-12-12h-12v-24h88v12c0 6.627 5.373 12 12 12h72c6.627 0 12-5.373 12-12v-72c0-6.627-5.373-12-12-12h-12v-88h88v12c0 6.627 5.373 12 12 12h12v160zm40 64h-32v-32h32v32zm0-256h-32v-32h32v32z"></path>
                           </svg>
                           INTEGRATION
                        </h5>
                        <h3>DeFi + Insights</h3>
                        <p>Web 3 plugins available on AlgoCloud integrate with our servers to deliver a personalized and highly customizable DeFi experience.</p>
                     </div>
                  </div>
                  <div className="flex-center mt-7 row">
                     <div className="ps-lg-6 col-xl-4 col-lg-5 col-md-6 order-md-0"><img src="/assets/iso-3.png" alt="" className="px-6 px-md-0 img-fluid"/></div>
                     <div className="mt-4 mt-md-0 col-xl-4 col-lg-5 col-md">
                        <h5 className="text-success">
                        <svg fill="currentColor" id="Layer_1" className="svg-inline--fa fa-w-18 me-2" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36.14555 31"><path d="M30.78478,18.14505c0-2.29786-1.90608-4.28125-4.56253-4.78125C25.604,9.74905,21.8829,7.04544,17.47978,7.04544a10.34473,10.34473,0,0,0-6.09287,1.95117,6.44341,6.44341,0,0,0-2.44465,3.21973c-2.81358.67675-4.76294,2.83789-4.76294,5.30859,0,3.04394,2.95819,5.52051,6.59387,5.52051H24.93331C28.16022,23.04544,30.78478,20.84719,30.78478,18.14505ZM24.93331,15.607a2.86139,2.86139,0,0,1,3.09483,2.53809,2.86069,2.86069,0,0,1-3.09483,2.53711H10.77319c-2.11673,0-3.83836-1.416-3.83836-3.15723a3.45043,3.45043,0,0,1,3.39429-3.13965l1.22631-.11621V13.21145a3.41875,3.41875,0,0,1,1.53375-2.35107l.09679-.07227a7.29449,7.29449,0,0,1,4.29608-1.3789,6.72382,6.72382,0,0,1,4.31089,1.48193,4.583,4.583,0,0,1,1.76262,3.53418V15.607Z" transform="translate(0.59101 0.45456)"></path><path d="M8.7373,28.18216H2.37686a.19882.19882,0,0,1-.21179-.18262v-5.4541A1.2928,1.2928,0,0,0,.78732,21.3638,1.293,1.293,0,0,0-.591,22.54544v5.4541a2.78431,2.78431,0,0,0,2.96787,2.5459H8.7373a1.1956,1.1956,0,1,0,0-2.36328Z" transform="translate(0.59101 0.45456)"></path><path d="M.78732,8.72708A1.2928,1.2928,0,0,0,2.16507,7.54544V2.09085a.19841.19841,0,0,1,.21179-.18164H8.7373A1.29284,1.29284,0,0,0,10.11505.72708,1.2928,1.2928,0,0,0,8.7373-.45456H2.37686A2.7846,2.7846,0,0,0-.591,2.09085V7.54544A1.293,1.293,0,0,0,.78732,8.72708Z" transform="translate(0.59101 0.45456)"></path><path d="M34.17565,21.3638a1.2928,1.2928,0,0,0-1.37775,1.18164v5.4541a.19882.19882,0,0,1-.21179.18262h-6.3593a1.19575,1.19575,0,1,0,0,2.36328h6.3593a2.78413,2.78413,0,0,0,2.96844-2.5459v-5.4541A1.29318,1.29318,0,0,0,34.17565,21.3638Z" transform="translate(0.59101 0.45456)"></path><path d="M32.58611-.45456h-6.3593A1.29317,1.29317,0,0,0,24.84792.72708a1.29321,1.29321,0,0,0,1.37889,1.18213h6.3593a.19841.19841,0,0,1,.21179.18164V7.54544a1.39469,1.39469,0,0,0,2.75665,0V2.09085A2.78443,2.78443,0,0,0,32.58611-.45456Z" transform="translate(0.59101 0.45456)"></path></svg>                           
                        SCALABILITY
                        </h5>
                        <h3>Crypto-native Cloud</h3>
                        <p>From IE to iOS, rigorously tested and optimized AlgoCloud will give the near perfect finishing to your webapp; from the landing page to the logout screen.</p>
                     </div>
                  </div>
               </div>
            </section>
            <section className="bg-light text-center">
               <div className="container">
                  <div className="justify-content-center text-center row">
                     <div className="col-xxl-6 col-xxl-6 col-xl-7 col-lg-8">
                        <h1 className="fs-2 fs-sm-4 fs-md-5">Here's what's waiting for you</h1>
                        <p className="lead">Things HDL holders will get right out of the box with AlgoCloud.</p>
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
                              <h5 className="mb-2">Algorand Hub</h5>
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
                              <h5 className="mb-2">HEADLINE DeFi</h5>
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
                              <h5 className="mb-2">TinyMan Analytics</h5>
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
                                          <img className="w-auto mx-auto" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAACjCAMAAABhcpAdAAABL1BMVEUAAAD5xcj+6+3709X83N/5vsL94+X2sLXsTFXsU13rVVb2qK360tLvaHH3r7TuY2j4ub382NvtX2XxgIb95+n5wMTyhYvzi5H6ys75vL/wc3n1nqPsUFn5xMjtW2LweH72pqr0k5j6z9LuZmr71tn84ePsV13vbXP6zM/xfILuaGz2q7DzkJX3s7fqSk3yh4zrT1L0mp71oqf0mJ74t7v3tbjjCRTkCxfjCBPhAADfAADkChXgAADkDBniBg7jBxDgAwXiBAjlFyDiAgrkDhriBQzeAADkBxHlKSrkEhzmISnpOUDrR1DrQUrmKi/iERPfAwPnKDHhAATkBA7gBwjiAQblHyLnIyvoMjjrQ0zjFRfmGiPhCgvoNTzqO0TnLjTjGhziDQ/pQ0blIyXoPj+wg/LMAAAANnRSTlMAKgQaDzgJVf77+WkX7VzxQxPzyQczwbImPt2F/C/313CgHu0XC/jkIdDqYqlP/rv8j3iWSUn9++w8AAAZZ0lEQVR42uyde1vTMBSHD2VMFOWiTBk4BwoDvKCoT5KmaZONNcoENuqG3AZO+f6fQfBue7oVyny09P13TZ6k5+V3eJZuA2NqfCDIUG4SemAUhgrYyKEMhDCYzw3EJJ9bAB8P84WBy6FQGBow/Gsejz9rvpAFH1P5ArLqXH4QYjKP3uOvG0OYHBpC1hFa/+CtH8AZPx3+eovXKn4OyHrRgO7kK6xyEBxJrbGwPW+y6kElFgfy4B78SXbYq1waTqUAf2DcblViQwKLnjheQ647qLKNLMSj5FaRopwuIQcIr7fZuu9ytP44+d0WXs8D0Z6Hkc/aMwNwXpuA7lwztTCDCL4X5vc2Px0RD94p+sU60cq8LLSZ983+QgszLtz1L3ppXzfQe7ebgXgccbQoujWOluQF1/iS+cE89OKBF3JzGrwEMPq2QZwA0hRPoDuvJXeRgUrcD+uEba6k68SBifqyX6xPDefSMJ0hX6+4oaUTF16/478VOyI4rSuVOFqAeGyIZnBipyloHjBmFXcwpCdmoQeZs02gNLZO5Xn2lq/TANU1/rjHHvO2YNXgwLIoAc78UcOt0lisi0CNsnvmG3o52MS0fR3DuCFiz2rz+nP4k5sfTMtGbrrYi9sK75tlpCjSrOQAY2JbSawmtstLvVrWvUMPLyfjiwbAtbe8ygJQh2+NQ1fGLSGt4EAlrocl1ju+RlksqohYm+YbdjkQZpKAWNyKOyvh9bt+sWrmG8L82GWxGVesYbNMkWqa60OAYRSbwmZBqOQfR6ErE22xhg21pOjMwjexiB9mSc+c6y0WJX5ouatYNiNxCBGLXA4WMy1ErNjT4mIF5r00sYiPLmJBbp9TgsBcsQxdGTUFOvAs7OZ/iIXA9O2Fi4ilUrH+J7FgkzcpwdArU10Da4y7eDWFmIUuYll660maWMkX6+5+A69/o34PujCyj5WfMOry7fluYhF1OJ2KlXyx5tscTyxHl6ALRe5itWRV1bxjdBWL8D0jbYWJFwtuey7BsPVWDkLJtxthu90ZhK5iVfnnJ2liJV+smR2OiyXqRQhl2lMEgzb5fegulq3UWJpYyRdr4oaW6LIdsWtACJMnwgrJuc8jPcSi0tzOpomVeLHgqWgxwhABRP0ZhDC3L3BrJL9v9BCL2Gb9WipW8sXK14SkDHlDSjXHDEAxjpRLCYY63WsPsVj1dOLJtBUmXqyFRbQujLqi9hBQcpRTXBq+MtVTLOry2mCaWIkXC655Al+4p2cAY/JW06syzJmyuAc+sRCsVmM2Tazki5XZ5S4eWbo0DwhT68JB3xx1+Fa+t1jMdvWjTJpYiRcLlg8FFkBUqn0sWYw54VmoMC29bEQQi0pRe5aKlXyxlnaEhZ9E8yIEGXinHYp2QtEZgCit8Kxlpq0w+WLBngo7iT4pQIA5pRhhBFk/35hExMLQNzJpYiVfrHsfuU0wgksHyJY0C6vODEQTi/IPL/9CYln9eYI0XInQJ0hpZLEsGpWzJ0j/cbEmTkK2KcUw+Fnd0ejFlhRtAxELpdy81f/EYm5UpNoPPvPePHRRyg4JQbo4h8odiigWc9zINOrL/7hY8FiUCYbN346Dj1KjiV+r6tOAiIXDPxl9F0sKU0REr037395ray5wPBLCWuj0Zj6iWNITkeGt4r8u1syOJthGq42OP1mWtjQlGFTvTkUWy+Y7L/vdCuX60UZEho+GZ8BX+unjPfTaveE2cVCPndoGzt674cFoYjnr7Y3IHA2P/OtiZW5rZqEn0fzYlyyLHYUL46oxiC6Wat7uc2IxczsDfWGWmZKyoPrqFkQFF8tifGsUzsO/LhbMCY+hkSU6T+B3stvCoZiChNdeRhfLkmZtob+JZYlj6A+vJS6Wt3gJYj1Llli5Xe5gf/XVVuPBHwKsHgqbYLzXj43oYrFTY0f6m1iWub0AfeGJTBMrqlhGUbeQ4pCzoQX4RWaTlzEBqfQ6s3AesVTzQba/YvWtFY6kYkUWC/KHguEHxmLu96p3BLPwc8XNwfOIRR1xsHSuVpiK9V+KlX0XEkUOX/klgLGo1ygmIPXUKmBihdMSq2liJV8s404HO4lmluRyBn4wWuOSoh1T1DLdxMIyjj+YSBMr8WKdronjBjh6EX5QFG7If0yHi8Y5xZK8MpomVvLFgmF1OhTB0u0fg5dOtEUwKN+ZgvOJRViT303FugJivfqIm0DVzyOpYl1R9JJyYwMwsbqjX2TSVph8sTKfNCUYHf7dGuMTlyEHNB9Xzy8W5Z9n0sRKvlhQFOWwjy5/2+1MSKYRxleMCyRW2RtLE+sKiDXyVqAn0Xaj+U2AjUbTRr1S7h24gFgWP1lIEyv5Yk0+0u8JApXiw5kAS/ucoa8z3c5dRKwq/ziTipV8sWC12ZJoZInDWQCj2FA2atYafw4XEctWzQdpK7wCYhV2tYt+Jrql7mdg4INAX6UOr+QvJJYleS2TJlbyxTKWeYuivdAkBZgRLYLAbOSLkKOJxU6j8GWaWMkXCwpEMAszq6WvGY+1SwmGcIfgYmJVW43rC2liJV+syU2FlYhQ6ZWmjz2GiWWvqXb2gmJRR1QKqVjJFwvmOhz/Uob3xLLeM4I/YzoHEcTCaZlzaSu8AmJNfOaUoKy13hMUS2wtRBULWRkvzaeJlXyxoCQUxR1gBIWq5i24uFhSV0bSxLoCYr3a0TY5D7Y+Ho8sFv5DBWliXQGxsiuakXPAJB+DGGIRi69MpGIlXyyYbioSHYs09ldjiUX5zlzaCq+AWF/Yu/umJII4DuDrQY+WhVIaJSmJFZIPpbd7u3fsXcetkCZ0gCKkKPX+X0PRONM/ew+xZ3Pc7fcPZhzHEeUz352D298ujDAi4WFRtpgTgqVa+qJsrBTAUt6yzj+4crWXQAwWYf2cbKzkwwLzVKcEhXKFDKd9sSIIq44H67KxUgDr3RFzjJCwoKsvK4KwjF73lYSVAljKju6GhAWp1swA0aUQ6cOsXAqTDwvMEZ3nin8qTlERhTW522tPNlYKYOXvmz0jHAl89RSIwkKG1X6VlY11A2v0IrGwwKcWDgWLOPgciMOCFDfvhGis+IwxujVYKjJ/vF6YX5ufX9v6+zD/O3+/XNubm1VY5RFGoQqrPVgWhXUzd6R6K7C+reQ2NnI+yZTjBouqn7+cDk9Ph54PQ7WgzCgsUOxaMAwItp2LAhassd3SLYyKtOtH94+/nvtkVFHiBUtVOy4OCFvMzyqstUaYtRBZ7nsQSWNRXH8ZfWMhleK2b7qsn40bLISoXxC18ZuZbSxlF4fggHB/PxJYKnL0wm3MeUe2fyx8ETtYKvENJBRXZhYWeH7dQ4EcbPYeRANLJWycEYbFieEfol2WYwcrKJ0ZbizwtM8QDLqWc1sHUcGC+lX1No48Qb5RD7XL+DVWomHlC7gT9O6TzTazkTWWpRX//yFNEtZ/hwW2bI0S/5LRuvdAVLBUyE4yQY0lYSUAVukS+38SDR3cz0cHq45bVdlYKYAFqroLfSW0W0sgOliGZR4rElYKYGWaOvWVhU+yU8JCXAP654xcClMAS3nVNg2fldAyi2BKWJ0Or7Lc7rpsrBTAAi8HfisZxI35aWFBgriTRY43ZGOlAFa+j/1eEr0IpoNFO0ejww7i3DN4/VQ2VgpggcffTah6BLmD9elgEdutPB66HAY9tixhpQHWvYbnnmhI2cON6WBBG+9sjTmHI5Ia216RS2EKYCmbjKoe6eFPYHpY5SVGIecz7fqebKwUwALVWhsRj1Nwzlamh1UAC7jHvcXhsWysNMBa2WaIeHyas6xMD6sC5pq4xnlh8LgkGysFsJ6NPWARja6C6WE9Ucr3eRIMPNiRsFIAa6fV82gst7snAGsxC9ZNlyOhix/IpTAgcPZh5bfZoeo1JvkyI9BYOVBqcv5+1WCNkmysxDdW9QobnifQ2wsCsDaAct+0DM4009bz/9lYJI6wEO34x2rP8K3JkxzrDvTeVlPIizQWqLY43zQs81KJtLGIf1rd+N2aTF1N9w1mmzO7S2eS1VPvnToQsdG+EKyNE8xRi/TBuwhhQar5R2eNmDUWcprnlUXfFB/uzeqG1T958r1d99n55SxNDys7eZ5ml3Dex2jvKGA/qqWQwuG3M780fjy8GytYBOGTrcAfndkt9pNkh7gG/bbV7OaFYO0MMORdFXwtRdZYSDs7yD7K+OVdNl47oQnF/YPkzm6YZL2twYDDUYVgzf1kkHdVUDsAq+md3TBprHuJhlUKmL4Gu25RCBao6DWOBRsvgxUU2bSZm1VjpmAld4zRJB+7PUT8p2iPckKw1q9NxLsq2FVyJDJYN09RwooLrJuzVn1i4FZVCNbqGFPCme73eT/bjGzwWhn8iYQVF1hrZ6ZKgob5nSsisJQlZhPO5bb2+sWZ66R38FqyYT3GTvDkUDgnAgt8cDTOdGaoj59fWLYcFZlIWM8uGAwc8OiaS4oIrMxRm8MBuldfR05HNlYiYb29No1AWA7rl0RgKUvM5fyWGq3XKVUlrATCUvo6VQOCCHWdeRFY4M61Tgjncxh7ct0gl8IEwno5CDPQj3RYJS8CSznCnhMpZWMlEFb+WLc4sLj/BBFYoHDtsaVVNlYiYd35riE1RJBlvhaC9eIU12VjpQZWvoB7RihZhO2WRWApY0wlrNTAevHDrMGQc95PP4nAAgWnDeVSmBZYy9hWw4U42gMhWAsjbMjGSgmsOe5uQn4MvfFIBJayqR/KxvrV3rl3pY2EcTiGSFvdqiCCgILgBbygViuZTCZkIsl4lxDDpQiC1O//GTZEW9d1YpXoukKe0z96tBzr5PH3vszNIRFrq6nnn4uKriNuxGLCSgWIXmINg1ihMSK/5ILHk5AbsXLnRPbEGgqx4lVdesHvsEf5GTdicWtEE71SOAxifUbW65+NZOjJkAuxmLhQAV5iDYFYaedDXw73zrRH3Ig1UkMaD7zEGnSx2GQTqSD/bERQwd/ciOUP6hUVeIk16GIt1ZyOP/P0D4syWfS7EItZaCLJK4UDL1a8ghx6aU0D9MjSD8fdiMUdw4LolcIBF8tHu7fKRjYqssNKtBBzIxYTNA3JS6wBF2vd3oZOs0Epl/ki/YGT7pIbseIdqHqJNdhi+TPkwmFWofQpdQh56udgY8ONWP4W9HqsARdr/ZjQD33J8JBhu4QqFq8Zp27EYoJY4T2xBlqsDFLyNFRsBq3PkgKgRpZw7HMj1m4V8l4pHGSxfDeEp4sFD6MMExfp2x5UVJp2I5Zvk3il8O3FWn4/sVZLDlNKBfuRZsdIgadGCWyFXIjFJJECvMR6Q7HyUhGfht5NLLYlFHh6VlTt9jyFjDwVZO65EWu8g2TeS6w3Fcu4SjPsO4k1UUIOvwqejN1e43EJaXuWgVQhsZALsXxWFHpivaVYYqF4uba1Go6k4uMTe6Pzs9m0L8BxyyGWZd9cLHbOxDSxRKCYEaaHf1KvSIC2Eo3O512IxURIhTLI/8ltM9bIhjjfSHRqIT4yuGJZXCALQagUZXX/uNZuXZ2OJSYzyenIt4WJveiIj3OQzL1YsyKi7bmzXktad6/NNRFPXdYx0Dc3Ys2oAiUK3ScWalOGivVz6Zm99fjG1nRsMfH57KpVPr5UxWYjNtBigWLlFkEQELTQdR1j06LZzKuXx+XW1dnnxGJseisSH3lNsdhpWKHWI7FCtn79mzZp0s0iiYALsbhTbInhPrHoYrHLS7PRTwu7kfBqbHLl89lJ/fzwZ7XTaJSumyaCULB/kok52GLl7Y8CAORCQbMoFnumGYaBhB4ICRAis3ldajQ6c+wrijVfJhqtgRIL6Gjk/rIQXaX+n8l+3IVYzAY21NdPrHzxMrkVm0yMbXZb7XNLpWuzN4JIQLCH9TcDY0XRtAIQj3AjPNhi3SHyNtI9vMSLwJJNUTA2EEKEtF5TrBRWQJ4ilor1ROh3zarR5zKBhtbciJVuQPfNOz3/kSBAYgF79DQqHIi8pN5ij6uFaE/GDYVYefBPHugmWajqkWZ+eUWxlrYJoN9WhEpTzG9OYZP+1OFNwIVYzA+o8G5LIfVCHEW7kAEQ+TtEh0EfIrH+hITxa5bCiENm8AXUYu4Jl6DosBIddiNWuAFV14lFAVg8/Ign1n8r1hgp0Af8oTGzDivRooZ+uBErew4l14lFoZdQnljvKFbO6ReLi7Dlf7j8ogF6LayOuBCL2Uaaa7GoeGK9q1iJpkOPozQfduU7DSTztB4fNZNuxApf6/yfSqEn1ocTizuGThcVtXMPm/wVSJ2V4IuozrkQa/SG8F5iDZpYbPjaYV+DTDLMQ+KokqeCKp9ciMWsQRl4iTVgYnF1qFAXAWW9Mc48JHuM6CvRRbjGuRBrt4RkEXiJNVBiTSjI4ZwzWQkwDwmtmYZEXVJEl1EXYs2cEJn3xBoosbgEcXguBn58ZjBacph9r6CUC7FCMVjkvVI4UGKtH9Hf6UkaLAcol8DrGt0sMhboXyxmoigA0UusQRIrRoqAJoqKmmH2BTuYYeebC7F8dahJwEuswRHre4vkqQB4GaDdJek0mVqAky7EYmMmlsBQJRZ4RF4eILFipuLwFZorDI0VqNFfAFvZ/sWym7dhKoWIlx6hirCdGxCx/F0oOiwTVunf40aDPkuu6qVVF2KxbajxH6MUrgNBlvLiv5CUF4gV2iYX2iMKRXi87kqsmgB4URT/B2JFOrrqUAk3WYZG2uEgoKjBrguxmEwTSR8nsfLgn8iyfCFjFGSei3+bYEhjP864wGclVh7c8s5inUGTnhOwFGHorCIF0GthJ+pCrE8/ofoxEiuOdV2H95BfzD2/FGb2649p1Wufo4wLsg1i6rqBFU27uLg4ODiwcvW+5FI2pb2ZWFMNp5ggmz6nSlB1WIk2zAzbv1hsF755jwV+8a+tk0dGI/wCsQyjUGrsV49r5+3WyU23u7k9NpYIBhd3mGfDjc4+Jjs772NdJVZbK8laxRAE1EP4ZT20QQhjbCqaLB+IvPqL386JrygWG9SxSnEkDzCKOI5JkFAvDuU1VAv0K5ZdCzH/pmKJdx5Z3P3sgrvd3kXSjL3g8YXDG6nd+M7C+ERuKjp6e1BvKRDgmPeGHY9spCLh6dVYZm0y8WVus9u9uWm1z63zI51O57ppKpZtSLBA8NHOf9AbH7X4KluTZ/fpS398gdScM3lccVqJNiZciLV+TvhXLoXiHfZPI5Bl+4xK0aJiGIINQghC3DQbSWbgYEPcUjo7P5qbWN+Jb0Qilm5fg1/mTs+u2uWfVcu0RqlkyWZiWzDBpgLhGU2sOUGRXiBWBFHPigK+CFdDT1xVKmgSoFoT5PoXa3mFgFdNLHCPfHErE4I2eg+syPz+cbl+9eNzcOVrlBkWWNYf8M2Ofp/Y2Y1MJzOTic8/rurl431eVrBu4XRKRwTguWLNn0DqUVFRRmCGcSSUMQ2VmnPwcq9fsWzNMRD7Sywe/O6ZJMn6o1oZVVAUXf/dXUMkGBX56LJ8crb9ZTKzupWKj+eiI+mAn7VhhhTWxh9Ij0Rz4/FUJBak9kAtYuqKIlsjrNoDbPdkkpNYKWzQniSQKvh0mXFmxmlZR4FhF2LlakjmwYsTa+lKl4/s83EHmokRujUJol6wXx9Va63u5lhwLbYa2d2ZmJqZn00vBbjl4TXpaVg/Rx2ZOa1QNJCA7KG1wBhrB7yM92kBxK0QOU9DQtcTT371K4E+mSmTTV/fYtnvCvoQK10mECFbJASVZqlTPWzXb7rbiUwyvLG7M/59ftbH+T2RXBHd2gon1xLb3Zt6+7DaKWm415UhgvZou+s6uiTSHqKM6k8/h+mSw5wTbmz0LxbzTTfyDkjmE2L1joZ3qrVy6/TLVyuZUgu5mXQgxHi8OqFAeia3kIqsWq3Zaatc63RopXCFmCAv3vJwpvN6lXmSbNthYU+DQRdiZe2bkl6aWP7VxWQkbrnEeS79p4S47N4nypgv/CTFyoUMHi0B8KSeZZ4mgQr0YCH1+f7F8idMQwI97madJLsNF2UNYx2eMA4Mcev9vyTZwEUBwttmTMeafDf9z5twkfkDqarTmejrZP9iMTtN48hyyUICsqZguw+3Z/Hyneok4/EhSO8tpKyGLLh90v7Zua4ghGDPMYT1wwXmD3Dbzmfy2f7F4qqwUMT2pCUSkIBLjep5/WZz5WsskorPMh4fiBCXnupNlSW/rmze1A8txRBZ+3OzEnY4Ey2hxvf+xWLmIMHY7sVr9bO5yeTWt4nRv/yMx4fGvzQ6Ho/EEj8+MX8kV4X0lWjcnGT7F2u3/fN0JRNOjY+mPZ2GkuWMw5loTTheookFLGyxFjnmCQKBUMhrxYeZT0Xcm+x+dFuQaKD4vVjg7nP2OzxVUlUNJ5YYDw9HlsoQYrMg9nSRJN5WDIDe+jUZC9yJdbd2d3sZoYIRggIiK55YHk/AblVNBSIBWWBFKwDRVoiXgNFZt69GQmrevku1WDTs/Slmszc/fr7hTWN6PIV/4+vkXKvWaZSapr2bxygWtUJBlotw+i6xLioCghbIkPfbPxKxjfGoz+vJPZ6B3xcd37DeR7b3ZePWIaFyQbrzDLNTJUiwhCp3E7HIzlSW83tNucfLYEN+Lju1E4kluuV9WRAI+cow38e6i5nIQm40G/CM8nDnVyA7mluIxBZbllih6KjXTHm8Kv7oCPM36qk1Ee+oN9cAAAAASUVORK5CYII=" alt="" height="30"/>
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
                                          <img className="w-auto mx-auto" src="data:image/png;base64,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" alt="" height="45"/>
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