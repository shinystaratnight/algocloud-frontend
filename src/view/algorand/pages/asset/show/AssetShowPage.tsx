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
import { images } from 'src/images/images';

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
  let image = asset['assetId'] === 0 ? '/assets/asa-list/ALGO/icon.png' : `https://algoexplorer.io/images/assets/big/light/${asset['assetId']}.png`;
  for (let i = 0; i < images?.length; i++) {
    const img = images[i];
    let id = parseInt(img.split('-')[1]);
    if (id == asset['assetId']) {
      image = `/assets/asa-list/${img}/icon.png`;
      break;
    }
  }
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
      <div className='row' style={{ paddingTop: 20 }}>
        <div className='col-sm-12 flex-row' style={{display: 'flex', alignItems: 'center'}}>
          <img src={image} style={{ width: 25, marginRight: 10, objectFit: 'contain', float: 'left', marginBottom: 8 }}></img>
          <h3 style={{ marginRight: 20 }}>{asset['unitName']}</h3>
          <h5 className='text-info' style={{ marginRight: 20 }}>{priceData.length > 0 ? formattedNum(priceData[priceData.length - 1]['close'], true) : formattedNum(0)}</h5>
          <h6 className={(parseFloat(formatPercent(asset['lastDayPriceChange'], 3)) < 0) ? 'text-danger' : 'text-success'}>{formatPercent(asset['lastDayPriceChange'], 2)}</h6>
        </div>
      </div>
      <div className='row'>
        <div className="col-lg-4 col-sm-12 d-flex flex-column justify-content-between">
          <ContentWrapper style={{ flex: 1 }} className="card-hover">
            <h6>Liqudity</h6>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h5 className='text-info'>{formattedNum(asset['liquidity'], true)}</h5>
              <h6 className={(parseFloat(formatPercent(asset['lastDayLiquidityChange'], 6)) < 0) ? 'text-danger' : 'text-success'}>{formatPercent(asset['lastDayLiquidityChange'], 2)}</h6>
            </div>
          </ContentWrapper>
          <ContentWrapper style={{ flex: 1 }} className="card-hover">
            <h6>Volume (24hrs)</h6>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h5 className='text-info'>{formattedNum(asset['lastDayVolume'], true)}</h5>
              <h6 className={(parseFloat(formatPercent(asset['lastDayVolumeChange'], 6)) < 0) ? 'text-danger' : 'text-success'}>{formatPercent(asset['lastDayVolumeChange'], 2)}</h6>
            </div>
          </ContentWrapper>
          <ContentWrapper style={{ flex: 1 }} className="card-hover">
            <h6>Price</h6>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h5 className='text-info'>{priceData.length > 0 ? formattedNum(priceData[priceData.length - 1]['close'], true) : formattedNum(0)}</h5>
              <h6 className={(parseFloat(formatPercent(asset['lastDayPriceChange'], 3)) < 0) ? 'text-danger' : 'text-success'}>{formatPercent(asset['lastDayPriceChange'], 2)}</h6>
            </div>
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
