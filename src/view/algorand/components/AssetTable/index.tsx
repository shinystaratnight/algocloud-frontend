import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import { formatNumber, formatPercent } from 'src/modules/algorand/utils';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';
import Spinner from 'src/view/shared/Spinner';

function AssetTable(props) {
  const {
    loading,
    assets,
    favoriteIds,
    showcaseId,
    togglePermission,
    showcasePermission,
    toggleFavorite,
    setShowcase,
  } = props;

  return (
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
                {togglePermission && (
                  <button
                    className="btn btn-link"
                    onClick={() =>
                      toggleFavorite(asset.assetId)
                    }
                  >
                    <b>{favoriteIds.includes(asset.assetId) ? 'Unfavorite' : 'Favorite'}</b>
                  </button>
                )}
              </td>
              <td>
                {showcasePermission && (
                  <button
                    className="btn btn-link"
                    onClick={() =>
                      setShowcase(asset.assetId)
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
  )
}

export default AssetTable;
