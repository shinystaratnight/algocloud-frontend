import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import actions from 'src/modules/superadmin/analytics/analyticsActions';
import AnalyticsCard from 'src/view/superadmin/analytics/AnalyticsCard';
import selectors from 'src/modules/superadmin/analytics/analyticsSelectors';
import { PairsTable } from './PairsTable';
import { TokensTable } from './TokensTable';
import { TransactionsTable } from './TransactionsTable';
import GlobalChart from './GlobalChart';

function AlgorandPage() {
  const dispatch = useDispatch();

  const userCount = useSelector(
    selectors.selectUserCount
  );

  const tenantCount = useSelector(
    selectors.selectTenantCount
  );
  
  useEffect(() => {
    dispatch(actions.doFetch());
  }, [dispatch]);

  

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          ['algochart'],
        ]}
      />
      <GlobalChart />
      <ContentWrapper>
        <PageTitle>Top Pairs</PageTitle>
        <PairsTable />
      </ContentWrapper>
      <ContentWrapper>
        <PageTitle>Top Tokens</PageTitle>
        <TokensTable />
      </ContentWrapper>
      <ContentWrapper>
        <PageTitle>Top Transactions</PageTitle>
        <TransactionsTable />
      </ContentWrapper>
    </>
  )
}

export default AlgorandPage;