import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import actions from 'src/modules/algorand/statistics/statisticsActions';
import favoritesActions from 'src/modules/algorand/favorites/favoritesActions';
import selectors from 'src/modules/algorand/statistics/statisticsSelectors';
import favoritesSelectors from 'src/modules/algorand/favorites/favoritesSelectors';
import OverviewChart from './OverviewChart';
import PoolsTable from 'src/view/algorand/pages/table/PoolsTable';
import AssetsTable from 'src/view/algorand/pages/table/AssetsTable';
import {
  SectionTitleBar,
  SectionTitle,
  AlgoexplorerSection
} from 'src/view/algorand/styled';


function OverviewPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.doFetch());
    dispatch(favoritesActions.doFetch());
  }, [dispatch]);

  const loading = useSelector(selectors.selectLoading);
  const pools = useSelector(selectors.selectTopPools);
  const assets = useSelector(selectors.selectTopAssets);

  const favLoading = useSelector(favoritesSelectors.selectLoading);
  const favorites = useSelector(favoritesSelectors.selectTopFavorites);

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('algorand.menu')],
        ]}
      />

      <AlgoexplorerSection>
        You want to check Market Cap and Algo Prices?<Link to="/algorand/algoexplorer">Click Here...</Link>
      </AlgoexplorerSection>

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
        <AssetsTable loading={favLoading} assets={favorites} />
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
