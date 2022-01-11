import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import { formatNumber, formatPercent } from 'src/modules/algorand/utils';
import actions from 'src/modules/algorand/favorites/favoritesActions';
import statisticsActions from 'src/modules/algorand/statistics/statisticsActions';
import algorandSelectors from 'src/modules/algorand/algorandSelectors';
import overviewSelectors from 'src/modules/algorand/overview/overviewSelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';

function AssetsTable(props) {

  const dispatch = useDispatch();
  const [assetIdToToggle, setAssetIdToToggle] = useState(null);
  const [assetIdToShowcase, setAssetIdToShowcase] = useState(null);

  const {
    loading,
    assets,
    favorites,
    showcaseId,
  } = props;
  
  const hasPermissionToToggle = useSelector(
    algorandSelectors.selectPermissionToToggle
  );

  const hasPermissionToShowcase = useSelector(
    algorandSelectors.selectPermissionToShowcase
  );

  const doToggle = (assetId) => {
    setAssetIdToToggle(null);
    dispatch(actions.doToggle(assetId));
  };

  const setShowcase = (assetId) => {
    setAssetIdToShowcase(null);
    dispatch(statisticsActions.setShowcase(assetId));
  };
  
  return (
    <div className="assets-table">
      <TableWrapper>
        <div className="table-responsive">
          <table className="table table-striped mt-2">
            <thead className="thead">
              <tr>
                <TableColumnHeader
                  name='name'
                  label='NAME'
                />
                <TableColumnHeader
                  name='symbol'
                  label='SYMBOL'
                />
                <TableColumnHeader
                  name='liquidity'
                  label='LIQUIDITY'
                />
                <TableColumnHeader
                  name='volumn24h'
                  label='VOLUME[24H]'
                />
                <TableColumnHeader
                  name='price'
                  label='PRICE'
                />
                <TableColumnHeader
                  name='change'
                  label='PRICE CHANGE[24H]'
                />
                <TableColumnHeader
                  name='favorite'
                  label='FAVORITE'
                />
                <TableColumnHeader
                  name='showcase'
                  label='SHOWCASE'
                />
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={100}>
                    <Spinner />
                  </td>
                </tr>
              )}
              {!loading && !assets.length && (
                <tr>
                  <td colSpan={100}>
                    <div className="d-flex justify-content-center">
                      {i18n('table.noData')}
                    </div>
                  </td>
                </tr>
              )}
              {!loading && (assets.length > 0) && assets.map((asset) => (
                <tr key={asset.id}>
                  <td>
                    <Link to={`/algorand/assets/${asset.assetId}`}>
                      <h6>{asset.name}</h6> ({asset.assetId})
                    </Link>
                  </td>
                  <td><b>{asset.unitName}</b></td>
                  <td>{formatNumber(asset.liquidity)}</td>
                  <td>{formatNumber(asset.lastDayVolume)}</td>
                  <td>{formatNumber(asset.price)}</td>
                  <td>{formatPercent(asset.lastDayPriceChange)}</td>
                  <td>
                    {hasPermissionToToggle && (
                      <button
                        className="btn btn-link"
                        onClick={() =>
                          setAssetIdToToggle(asset.assetId)
                        }
                      >
                        <b>{favorites.includes(asset.assetId) ? 'Unfavorite' : 'Favorite'}</b>
                      </button>
                    )}
                  </td>
                  <td>
                    {hasPermissionToShowcase && (
                      <button
                        className="btn btn-link"
                        onClick={() =>
                          setAssetIdToShowcase(asset.assetId)
                        }
                      >
                        <b>{asset.assetId === showcaseId ? 'Currently Set' : 'Set As Main'}</b>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableWrapper>

      {(assetIdToToggle !== null) && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doToggle(assetIdToToggle)}
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
