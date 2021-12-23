import React from 'react'
import { i18n } from 'src/i18n';
import FavoritesTable from 'src/view/algorand/pages/favorites/FavoritesTable';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';


const FavoriteListPage = () => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('algorand.menu'), '/algorand'],
          ['Favorites']
        ]}
      />

      <ContentWrapper>
        <PageTitle>Favorites</PageTitle>
        <FavoritesTable />
      </ContentWrapper>
    </>
  )
}

export default FavoriteListPage;
