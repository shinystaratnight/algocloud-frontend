import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import FavoritesTable from 'src/view/algorand/pages/table/AssetsTable';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import selectors from 'src/modules/algorand/favorites/favoritesSelectors';
import actions from 'src/modules/algorand/favorites/favoritesActions';
import assetsActions from 'src/modules/algorand/assets/assetsActions';


const FavoriteListPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(assetsActions.doFetch());
    dispatch(actions.doFetch());
  }, [dispatch])

  const loading = useSelector(selectors.selectLoading);
  const favorites = useSelector(selectors.selectTopFavorites);
  
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
        <FavoritesTable loading={loading} assets={favorites} showcase={false} />
      </ContentWrapper>
    </>
  )
}

export default FavoriteListPage;