import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import actions from 'src/modules/algorand/statistics/statisticsActions';
import selectors from 'src/modules/algorand/statistics/statisticsSelectors';
import OverviewChart from './OverviewChart';
import TopFavorites from 'src/view/algorand/pages/overview/TopFavorites';
import { SectionTitleBar, SectionTitle } from 'src/view/algorand/styled';
import PoolsTable from 'src/view/algorand/pages/table/PoolsTable';
import AssetsTable from 'src/view/algorand/pages/table/AssetsTable';


function OverviewPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.doFetch());
  }, [dispatch]);

  const loading = useSelector(selectors.selectLoading);
  const pools = useSelector(selectors.selectTopPools);
  const assets = useSelector(selectors.selectTopAssets);

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('algorand.menu')],
        ]}
      />

      <OverviewChart />

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
        <AssetsTable loading={loading} assets={assets} />
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
        <PoolsTable loading={loading} pools={pools} />
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
