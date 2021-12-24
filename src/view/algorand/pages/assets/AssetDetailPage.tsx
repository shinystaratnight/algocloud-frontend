import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/algorand/assets/assetsActions';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import AssetChart from 'src/view/algorand/pages/assets/AssetChart1';


const AssetDetailPage = () => {
  const match = useRouteMatch();

  const dispatch = useDispatch();
  const assetId = match.params.assetId;
  
  useEffect(() => {
    dispatch(actions.doFetchHistory(assetId));
  }, [dispatch]);
  
  const backgroundColor = '#FAAB14';
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
        <PageTitle>Assets</PageTitle>
        <AssetChart
          assetId={assetId}
          color={backgroundColor}
          base={1.51}
        />
      </ContentWrapper>
    </>
  )
}

export default AssetDetailPage;
