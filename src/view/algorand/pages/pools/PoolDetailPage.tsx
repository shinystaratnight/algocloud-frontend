import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { i18n } from 'src/i18n';
import actions from 'src/modules/algorand/pools/poolsActions';
import selectors from 'src/modules/algorand/pools/poolsSelectors';
import PoolChart from 'src/view/algorand/pages/pools/PoolChart';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { formattedNum } from 'src/modules/algorand/utils';


const PoolDetailPage = () => {
  const match = useRouteMatch();

  const dispatch = useDispatch();
  const address = match.params.address;
  const loading = useSelector(selectors.selectLoading);
  const detail = useSelector(selectors.selectPoolDetail);
  
  useEffect(() => {
    dispatch(actions.doFetchHistory(address));
  }, [dispatch, address]);
  
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('algorand.menu'), '/algorand'],
          ['Pools', '/algorand/pools'],
          [`Pool-${address}`]
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {loading && 'Assets'}
          {!loading && `Pool (${detail['assetOneUnitName']}-${detail['assetTwoUnitName']})`}
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
            <h6>Volume (7days)</h6>
            <h5 className='text-info'>{formattedNum(detail['lastWeekVolume'], true)}</h5>
          </ContentWrapper>
          {/* <ContentWrapper style={{flex: 1}}>
            <h6>{`${detail['assetOneReserves']} ${detail['assetOneUnitName']}`}</h6>
            <h5>{`${detail['assetTwoReserves']} ${detail['assetTwoUnitName']}`}</h6>
          </ContentWrapper> */}
        </div>
        <div className="col-lg-8 col-sm-12">
        <PoolChart
          color='#687dfd'
        />
        </div>
      </div>
    </>
  )
}

export default PoolDetailPage;
