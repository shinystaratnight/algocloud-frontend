import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/algorand/assets/assetsActions';
import AssetsTable from 'src/view/algorand/pages/assets/AssetsTable';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

function AssetsListPage() {
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
          ['Assets']
        ]}
      />

      <ContentWrapper>
        <PageTitle>Assets</PageTitle>
        <AssetsTable />
      </ContentWrapper>
    </>
  )
}

export default AssetsListPage;
