import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/algorand/pools/poolsActions';
import PoolChart from 'src/view/algorand/pages/pools/PoolChart';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';


const PoolDetailPage = () => {
  const match = useRouteMatch();

  const dispatch = useDispatch();
  const address = match.params.address;
  
  useEffect(() => {
    dispatch(actions.doFetchHistory(address));
  }, [dispatch]);
  
  const backgroundColor = '#FAAB14';
  const priceUSD = 100;

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
        <PageTitle>Pool</PageTitle>
        <PoolChart
          address={address}
          color={backgroundColor}
          base={72}
        />
      </ContentWrapper>
    </>
  )
}

export default PoolDetailPage;
