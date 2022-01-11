import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/algorand/favorites/favoritesActions';
import algorandSelectors from 'src/modules/algorand/algorandSelectors';
import selectors from 'src/modules/algorand/overview/overviewSelectors';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Pagination from 'src/view/shared/table/Pagination';
import AssetTable from 'src/view/algorand/components/AssetTable';

function AssetsTable({ assets }) {

  const dispatch = useDispatch();
  const [assetIdToToggle, setAssetIdToToggle] = useState(null);
  const [assetIdToShowcase, setAssetIdToShowcase] = useState(null);

  const hasPermissionToToggle = useSelector(
    algorandSelectors.selectPermissionToToggle
  );

  const hasPermissionToShowcase = useSelector(
    algorandSelectors.selectPermissionToShowcase
  );
  
  const loading = useSelector(
    selectors.selectLoading,
  );

  const assetPagination = useSelector(
    selectors.selectAssetPagination,
  );

  const favoriteIds = useSelector(
    selectors.selectFavoriteIds,
  );

  const showcaseId = useSelector(
    selectors.selectShowcaseId,
  )
  
  const toggleFavorite = (assetId) => {
    setAssetIdToToggle(null);
    dispatch(actions.doToggle(assetId));
  };

  const setShowcase = (assetId) => {
    setAssetIdToShowcase(null);
    // dispatch(statisticsActions.setShowcase(assetId));
  };

  const doAssetPagination = (pagination) => {};
  
  return (
    <div className="assets-table">
      <TableWrapper>
        <AssetTable
          loading={loading}
          assets={assets}
          favoriteIds={favoriteIds}
          showcaseId={showcaseId}
          togglePermission={hasPermissionToToggle}
          showcasePermission={hasPermissionToShowcase}
          toggleFavorite={toggleFavorite}
          setShowcase={setShowcase}
        />

        <Pagination
          onChange={doAssetPagination}
          disabled={loading}
          pagination={assetPagination}
        />
      </TableWrapper>

      {(assetIdToToggle !== null) && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => toggleFavorite(assetIdToToggle)}
          onClose={() => setAssetIdToToggle(null)}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}

      {(assetIdToShowcase !== null) && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => setShowcase(assetIdToShowcase)}
          onClose={() => setAssetIdToShowcase(null)}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </div>
  )
}

export default AssetsTable;
