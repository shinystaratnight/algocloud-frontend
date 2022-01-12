import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/algorand/asset/show/assetShowActions';
import selectors from 'src/modules/algorand/asset/show/assetShowSelectors';
import { formatPercent, formattedNum } from 'src/modules/algorand/utils';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import AssetChart from 'src/view/algorand/components/AssetChart';
import PoolsTable from 'src/view/algorand/pages/asset/show/PoolsTable';
import { SectionTitleBar, SectionTitle } from 'src/view/algorand/styled';

const AssetShowPage = () => {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const assetId = match.params.assetId;
  
  useEffect(() => {
    dispatch(actions.doReset());
    dispatch(actions.doFetch(assetId));
  }, [dispatch, assetId]);
  
  const asset = useSelector(selectors.selectAsset);
  const pools = useSelector(selectors.selectPools);
  const assetName = useSelector(selectors.selectAssetName);

  const assetData = useSelector(selectors.selectDailyAssetData);
  const priceData = useSelector(selectors.selectHourlyPrices);
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('algorand.menu'), '/algorand'],
          ['Assets', '/algorand/assets'],
          [`Asset-${assetName}`]
        ]}
      />
      
      <div className='row'>
        <div className="col-lg-4 col-sm-12 d-flex flex-column justify-content-between">
          <ContentWrapper style={{flex: 1}} className="card-hover">
            <h6>Liqudity</h6>
            <h5 className='text-info'>{formattedNum(asset['liquidity'], true)}</h5>
          </ContentWrapper>
          <ContentWrapper style={{flex: 1}} className="card-hover">
            <h6>Volume (24hrs)</h6>
            <h5 className='text-info'>{formattedNum(asset['lastDayVolume'], true)}</h5>
          </ContentWrapper>
          <ContentWrapper style={{flex: 1}} className="card-hover">
            <h6>Price Change (24hrs)</h6>
            <h5 className='text-info'>{formatPercent(asset['lastDayPriceChange'])}</h5>
          </ContentWrapper>
        </div>
        <div className="col-lg-8 col-sm-12">
          <AssetChart
            color='#687dfd'
            assetData={assetData}
            priceData={priceData}
          />
        </div>
      </div>

      <ContentWrapper className="card-hover">
        <SectionTitleBar>
          <SectionTitle>Top Pools</SectionTitle>
        </SectionTitleBar>
        <PoolsTable
          assetId={assetId}
          pools={pools}
        />
      </ContentWrapper>
    </>
  )
}

export default AssetShowPage;
