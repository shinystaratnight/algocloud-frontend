import React from 'react';
import { i18n } from 'src/i18n';
import DashboardBarChart from 'src/view/dashboard/DashboardBarChart';
import DashboardDoughnutChart from 'src/view/dashboard/DashboardDoughnutChart';
import DashboardHorizontalBarChart from 'src/view/dashboard/DashboardHorizontalBarChart';
import DashboardLineChart from 'src/view/dashboard/DashboardLineChart';
import DashboardMixChartOne from 'src/view/dashboard/DashboardMixChartOne';
import DashboardMixChartTwo from 'src/view/dashboard/DashboardMixChartTwo';
import DashboardPolarChart from 'src/view/dashboard/DashboardPolarChart';
import DashboardRadarChart from 'src/view/dashboard/DashboardRadarChart';

const DashboardPage = (props) => {
  return (
    <>
      <div
        style={{
          padding: 0,
        }}
      >
          <div className="mb-3 card"><div className="bg-holder bg-card"></div><div className="position-relative card-body"><div className="row"><div className="col-lg-8"><h6 className="text-600">Free for 30 days</h6><h2 className="mb-0">For teams of all sizes, in the cloud</h2><p className="mt-2">Get the power, control, and customization you need to manage your</p> <p className="d-none.d-md-block"> team’s and organization’s projects.</p><a className="btn btn-sm btn-link ps-0" href="/pricing/pricing-default#!">Have questions? Chat with us</a></div></div></div></div>
          <div className="bg-light my-3 card"><div className="p-3 card-body"><p className="fs--1 mb-0"><a href="/dashboard/saas#!">          
          <div
            style={{
              transformOrigin: "0.5em 0.5em",
              width: "20px",
              display: "inline-Block",
            }}
          >
          
          <svg className="svg-inline--fa fa-exchange-alt fa-w-16 me-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exchange-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><g transform="translate(256 256)"><g transform="translate(0, 0)  scale(1, 1)  rotate(90 0 0)"><path fill="currentColor" d="M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z" transform="translate(-256 -256)"></path></g></g></svg>              </div> A payout for <strong>$921.42 </strong> was deposited 13 days ago.</a> Your next deposit is expected on <strong>Tuesday, March 13.</strong></p></div></div> 
        <div className="row no-gutters">
          <div
            style={{
              paddingLeft: '12px',
              paddingRight: '12px',
              paddingBottom: '24px',
            }}
            className=""
          >
              <div className="g-3 mb-3 row"><div className="col-md-4 col-sm-6"><div className="overflow-hidden card" ><div className="bg-holder bg-card"></div><div className="position-relative card-body"><h6>Customers<div className="ms-2 badge badge-soft-warning rounded-pill">-0.23%</div></h6><div className="text-warning display-4 fs-4 mb-2 fw-normal font-sans-serif"><span>58.39k</span></div><a className="fw-semi-bold fs--1 text-nowrap" href="/e-commerce/customers">See all
              <div
            style={{
              transformOrigin: "0.5em 0.5em",
              width: "10px",
              display: "inline-Block",
            }}
          ><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" className="svg-inline--fa fa-angle-right fa-w-8 ms-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" ><g transform="translate(128 256)"><g transform="translate(0, 32)  scale(1, 1)  rotate(0 0 0)"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" transform="translate(-128 -256)"></path></g></g></svg></div></a></div></div></div><div className="col-md-4 col-sm-6"><div className="overflow-hidden card" ><div className="bg-holder bg-card"></div> <div className="position-relative card-body"><h6>Orders<div className="ms-2 badge badge-soft-info rounded-pill">0.0%</div></h6><div className="text-info display-4 fs-4 mb-2 fw-normal font-sans-serif"><span>23.43k</span></div><a className="fw-semi-bold fs--1 text-nowrap" href="/e-commerce/orders/order-list">All orders
                    <div
            style={{
              transformOrigin: "0.5em 0.5em",
              width: "10px",
              display: "inline-Block",
            }}
          ><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" className="svg-inline--fa fa-angle-right fa-w-8 ms-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" ><g transform="translate(128 256)"><g transform="translate(0, 32)  scale(1, 1)  rotate(0 0 0)"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" transform="translate(-128 -256)"></path></g></g></svg>
          </div></a></div></div></div><div className="col-md-4 col-sm-12"><div className="overflow-hidden card" ><div className="bg-holder bg-card" ></div><div className="position-relative card-body"><h6>Revenue<div className="ms-2 badge badge-soft-success rounded-pill">9.54%</div></h6><div className="display-4 fs-4 mb-2 fw-normal font-sans-serif"><span>$43,594</span></div><a className="fw-semi-bold fs--1 text-nowrap" href="/">Statistics
          <div
            style={{
              transformOrigin: "0.5em 0.5em",
              width: "10px",
              display: "inline-Block",
            }}
          >
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" className="svg-inline--fa fa-angle-right fa-w-8 ms-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" ><g transform="translate(128 256)"><g transform="translate(0, 32)  scale(1, 1)  rotate(0 0 0)"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" transform="translate(-128 -256)"></path></g></g></svg>
          </div>
          </a></div></div></div></div>
            
            
            <div className=" card bg-box p-2 rounded">
              <DashboardDoughnutChart />
            </div>
          </div>
          <div
            style={{
              paddingLeft: '12px',
              paddingRight: '12px',
              paddingBottom: '24px',
            }}
            className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4"
          >
            <div className="card bg-box p-2 rounded">
              <DashboardMixChartTwo />
            </div>
          </div>
          <div
            style={{
              paddingLeft: '12px',
              paddingRight: '12px',
              paddingBottom: '24px',
            }}
            className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4"
          >
            <div className="card bg-box p-2 rounded">
              <DashboardBarChart />
            </div>
          </div>

          <div
            style={{
              paddingLeft: '12px',
              paddingRight: '12px',
              paddingBottom: '24px',
            }}
            className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"
          >
            <div className="card bg-box p-2 rounded">
              <DashboardMixChartOne />
            </div>
          </div>

          <div
            style={{
              paddingLeft: '12px',
              paddingRight: '12px',
              paddingBottom: '24px',
            }}
            className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"
          >
            <div className="card bg-box p-2 rounded">
              <DashboardPolarChart />
            </div>
          </div>

          <div
            style={{
              paddingLeft: '12px',
              paddingRight: '12px',
              paddingBottom: '24px',
            }}
            className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4"
          >
            <div className=" card bg-box p-2 rounded">
              <DashboardHorizontalBarChart />
            </div>
          </div>
          <div
            style={{
              paddingLeft: '12px',
              paddingRight: '12px',
              paddingBottom: '24px',
            }}
            className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4"
          >
            <div className="card bg-box p-2 rounded">
              <DashboardLineChart />
            </div>
          </div>
          <div
            style={{
              paddingLeft: '12px',
              paddingRight: '12px',
              paddingBottom: '24px',
            }}
            className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4"
          >
            <div className=" card bg-box p-2 rounded">
              <DashboardRadarChart />
            </div>
          </div>
        </div>
        <p
          style={{
            marginTop: '16px',
            width: '100%',
            textAlign: 'center',
            color: '#bbbbbb',
          }}
        >
          {i18n('dashboard.message')}
        </p>
      </div>
    </>
  );
};

export default DashboardPage;
