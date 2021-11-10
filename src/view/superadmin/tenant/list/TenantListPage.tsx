import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import authSelectors from 'src/modules/auth/authSelectors';
import TenantListFilter from 'src/view/superadmin/tenant/list/TenantListFilter';
import TenantListTable from 'src/view/superadmin/tenant/list/TenantListTable';
import TenantListToolbar from 'src/view/superadmin/tenant/list/TenantListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { i18n } from 'src/i18n';

function TenantListPage(props) {

  return (
    <>
      <ContentWrapper style={{ marginTop: '0px' }}>
        <PageTitle>{i18n('tenant.list.title')}</PageTitle>

        <TenantListToolbar />
        <TenantListFilter />
        <TenantListTable />
      </ContentWrapper>
    </>
  );
}

export default TenantListPage;
