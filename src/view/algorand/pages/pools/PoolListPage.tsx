import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/algorand/pools/poolsActions';
import selectors from 'src/modules/algorand/pools/poolsSelectors';
import PoolsTable from 'src/view/algorand/pages/overview/table/PoolsTable';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';


const PoolListPage = () => {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(actions.doFetch());
  }, [dispatch]);

  const loading = useSelector(selectors.selectLoading);
  const pools = useSelector(selectors.selectPools);
  
  return (
    <>
    <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('algorand.menu'), '/algorand'],
          ['Pools']
        ]}
      />

      <ContentWrapper>
        <PageTitle>Pools</PageTitle>
        <PoolsTable loading={loading} pools={pools} />
      </ContentWrapper>
    </>
  )
}

export default PoolListPage;
