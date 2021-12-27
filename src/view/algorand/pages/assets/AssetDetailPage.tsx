import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { i18n } from 'src/i18n';
import actions from 'src/modules/algorand/assets/assetsActions';
import selectors from 'src/modules/algorand/assets/assetsSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import AssetChart from 'src/view/algorand/pages/assets/AssetChart1';
import PoolsTable from 'src/view/algorand/pages/table/PoolsTable';
import { formatNumber } from 'src/modules/algorand/utils';
import {
  SectionTitleBar,
  SectionTitle,
  FlexContainer,
  AssetIndicator,
} from 'src/view/algorand/styled';


const AssetDetailPage = () => {
  const match = useRouteMatch();

  const dispatch = useDispatch();
  const assetId = match.params.assetId;
  
  useEffect(() => {
    dispatch(actions.doFetchHistory(assetId));
  }, [dispatch]);
  
  const loading = useSelector(selectors.selectLoading);
  const pools = useSelector(selectors.selectTopPools);
  const detail = useSelector(selectors.selectAssetDetail);

  const backgroundColor = '#8be1ea';
  const priceUSD = 100;

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('algorand.menu'), '/algorand'],
          ['Assets', '/algorand/assets'],
          [`Asset-${assetId}`]
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {loading && 'Assets'}
          {!loading && `${detail['name']} (${detail['unitName']}) ${formatNumber(detail['price'])}`}
        </PageTitle>
      </ContentWrapper>
      <FlexContainer>
        <AssetIndicator />
        {/* <div style={{width: '600px'}}>
          Hello
        </div> */}
        <ContentWrapper>
          <AssetChart
            assetId={assetId}
            color={backgroundColor}
            base={1.51}
          />
        </ContentWrapper>
      </FlexContainer>

      <ContentWrapper>
        <SectionTitleBar>
          <SectionTitle>Top Pools</SectionTitle>
        </SectionTitleBar>
        <PoolsTable loading={loading} pools={pools} />
      </ContentWrapper>
    </>
  )
}

export default AssetDetailPage;
