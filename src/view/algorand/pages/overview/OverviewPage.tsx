import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import selectors from 'src/modules/algorand/overview/overviewSelectors';
import ShowcaseChart from 'src/view/algorand/pages/overview/ShowcaseChart';
import PoolsTable from 'src/view/algorand/pages/table/PoolsTable';
import AssetsTable from 'src/view/algorand/pages/table/AssetsTable';
import {
  SectionTitleBar,
  SectionTitle,
  AlgoexplorerSection
} from 'src/view/algorand/styled';

import overviewActions from 'src/modules/algorand/overview/overviewActions';

function OverviewPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(overviewActions.doFetch());
  }, [dispatch]);

  const loading = useSelector(selectors.selectLoading);
  const assets = useSelector(selectors.selectAssets);
  const pools = useSelector(selectors.selectPools);
  const favorites = useSelector(selectors.selectFavorites);
  const favIds = useSelector(selectors.selectFavoriteIds);
  const showcase = useSelector(selectors.selectShowcase);

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

      <ShowcaseChart />

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
        <AssetsTable
          loading={loading}
          assets={favorites}
          favorites={favIds}
          showcaseId={showcase.assetId}
        />
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
        <AssetsTable
          loading={loading}
          assets={assets}
          favorites={favIds}
          showcaseId={showcase.assetId}
        />
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
        <PoolsTable
          loading={loading}
          pools={pools}
        />
      </ContentWrapper>
    </>
  )
}

export default OverviewPage;
