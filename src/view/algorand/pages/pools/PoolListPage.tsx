import React from 'react'
import { i18n } from 'src/i18n';
import PoolsTable from 'src/view/algorand/pages/pools/PoolsTable';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';


const PoolListPage = () => {
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
