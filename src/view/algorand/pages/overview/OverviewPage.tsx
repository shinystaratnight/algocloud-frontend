import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import styled from 'styled-components';
import actions from 'src/modules/algorand/statistics/statisticsActions';
import StatisticsChart from './StatisticsChart';
import TopAssets from 'src/view/algorand/pages/overview/TopAssets';
import TopFavorites from 'src/view/algorand/pages/overview/TopFavorites';
import TopPools from 'src/view/algorand/pages/overview/TopPools';

const SectionTitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 2rem;
`;

const SectionTitle = styled.h5`
  color: white;
  margin-bottom: 10px;
  a {
    color: white;
  }
`;

function OverviewPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.doFetch());
  }, [dispatch]);

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('algorand.menu')],
        ]}
      />

      <StatisticsChart />

      <ContentWrapper>
        <SectionTitleBar>
          <SectionTitle>Top Favorites</SectionTitle>
          <h6 className='m-0'>
            <Link
              className="btn btn-link"
              to={`/algorand/favorites`}
            >
              Sell All
            </Link>
          </h6>
        </SectionTitleBar>
        <TopFavorites />
      </ContentWrapper>
      <ContentWrapper>
        <SectionTitleBar>
          <SectionTitle>Top Assets</SectionTitle>
          <h6 className='m-0'>
            <Link
              className="btn btn-link"
              to={`/algorand/assets`}
            >
              Sell All
            </Link>
          </h6>
        </SectionTitleBar>
        <TopAssets />
      </ContentWrapper>
      <ContentWrapper>
        <SectionTitleBar>
          <SectionTitle>Top Pools</SectionTitle>
          <Link
            className="btn btn-link"
            to={`/algorand/pools`}
          >
            Sell All
          </Link>
        </SectionTitleBar>
        <TopPools />
      </ContentWrapper>
      {/* 
      <ContentWrapper>
        <PageTitle>Top Transactions</PageTitle>
        <TransactionsTable />
      </ContentWrapper> */}
    </>
  )
}

export default OverviewPage;
