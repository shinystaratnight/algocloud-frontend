import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import styled from 'styled-components';
// import PageTitle from 'src/view/shared/styles/PageTitle';
import AnalyticsCard from 'src/view/superadmin/analytics/AnalyticsCard';
import selectors from 'src/modules/algorand/statistics/statisticsSelectors';
import actions from 'src/modules/algorand/statistics/statisticsActions';
import StatisticsChart from './StatisticsChart';
import TopAssets from 'src/view/algorand/pages/overview/TopAssets';
import TopFavorites from 'src/view/algorand/pages/overview/TopFavorites';
import TopPools from 'src/view/algorand/pages/overview/TopPools';

const SectionTitle = styled.h5`
  margin-bottom: 24px;
  color: white;
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
        <SectionTitle>Top Favorites</SectionTitle>
        <TopFavorites />
      </ContentWrapper>
      <ContentWrapper>
        <SectionTitle>Top Assets</SectionTitle>
        <TopAssets />
      </ContentWrapper>
      <ContentWrapper>
        <SectionTitle>Top Pools</SectionTitle>
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
