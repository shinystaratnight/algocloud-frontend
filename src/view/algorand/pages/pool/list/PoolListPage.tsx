import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/algorand/asset/list/assetListActions';
import selectors from 'src/modules/algorand/asset/list/assetListSelectors';
import AssetsTable from 'src/view/algorand/pages/asset/list/AssetListTable';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

function AssetsListPage() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(actions.doFetch());
  }, [dispatch]);

  const assets = useSelector(selectors.selectAssets);

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('algorand.menu'), '/algorand'],
          ['Assets']
        ]}
      />

      <ContentWrapper className="card-hover">
        <PageTitle>Assets</PageTitle>
        <AssetsTable assets={assets} />
      </ContentWrapper>
    </>
  )
}

export default AssetsListPage;
