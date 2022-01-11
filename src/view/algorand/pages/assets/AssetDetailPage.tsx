import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { i18n } from 'src/i18n';
import actions from 'src/modules/algorand/assets/assetsActions';
import selectors from 'src/modules/algorand/assets/assetsSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import AssetChart from 'src/view/algorand/pages/assets/AssetChart';
import PoolsTable from 'src/view/algorand/pages/overview/table/PoolsTable';
import { formatNumber, formatPercent, formattedNum } from 'src/modules/algorand/utils';
import {
  SectionTitleBar,
  SectionTitle,
} from 'src/view/algorand/styled';


const AssetDetailPage = () => {
  const match = useRouteMatch();

  const dispatch = useDispatch();
  const assetId = match.params.assetId;
  
  useEffect(() => {
    dispatch(actions.doFetchHistory(assetId));
  }, [dispatch, assetId]);
  
  const loading = useSelector(selectors.selectLoading);
  const pools = useSelector(selectors.selectTopPools);
  const detail = useSelector(selectors.selectAssetDetail);

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
      
      <div className='row'>
        <div className="col-lg-4 col-sm-12 d-flex flex-column justify-content-between">
          <ContentWrapper style={{flex: 1}}>
            <h6>Liqudity</h6>
            <h5 className='text-info'>{formattedNum(detail['liquidity'], true)}</h5>
          </ContentWrapper>
          <ContentWrapper style={{flex: 1}}>
            <h6>Volume (24hrs)</h6>
            <h5 className='text-info'>{formattedNum(detail['lastDayVolume'], true)}</h5>
          </ContentWrapper>
          <ContentWrapper style={{flex: 1}}>
            <h6>Price Change (24hrs)</h6>
            <h5 className='text-info'>{formatPercent(detail['lastDayPriceChange'])}</h5>
          </ContentWrapper>
        </div>
        <div className="col-lg-8 col-sm-12">
          <AssetChart color='#8be1ea' />
        </div>
      </div>

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
