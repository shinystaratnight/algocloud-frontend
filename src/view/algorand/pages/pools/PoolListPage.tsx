import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/algorand/pools/poolsActions';
import PoolsTable from 'src/view/algorand/pages/pools/PoolsTable';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';


const PoolListPage = () => {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(actions.doFetch());
  }, [dispatch]);
  
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
        <PoolsTable />
      </ContentWrapper>
    </>
  )
}

export default PoolListPage;
