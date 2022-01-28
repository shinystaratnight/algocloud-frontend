import React from 'react';
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
    hasRows,
    sorter,
    doChangeSort,
    setToogleId,
    setShowcaseId,
  } = props;

  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped mt-2">
        <thead className="thead">
          <tr>
            <TableColumnHeader
              onSort={doChangeSort}
              hasRows={hasRows}
              sorter={sorter}
              name='name'
              label='NAME'
            />
            <TableColumnHeader
              onSort={doChangeSort}
              hasRows={hasRows}
              sorter={sorter}
              name='unitName'
              label='SYMBOL'
            />
            <TableColumnHeader
              onSort={doChangeSort}
              hasRows={hasRows}
              sorter={sorter}
              name='marketCap'
              label='MARKET CAP'
            />
            <TableColumnHeader
              onSort={doChangeSort}
              hasRows={hasRows}
              sorter={sorter}
              name='liquidity'
              label='LIQUIDITY'
            />
            <TableColumnHeader
              onSort={doChangeSort}
              hasRows={hasRows}
              sorter={sorter}
              name='lastDayVolume'
              label='VOLUME[24H]'
            />
            <TableColumnHeader
              onSort={doChangeSort}
              hasRows={hasRows}
              sorter={sorter}
              name='price'
              label='PRICE'
            />
            <TableColumnHeader
              onSort={doChangeSort}
              hasRows={hasRows}
              sorter={sorter}
              name='lastDayPriceChange'
              label='24H %'
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
                  <img src={asset.assetId === 0 ? '/assets/asa-list/ALGO/icon.png' : `https://algoexplorer.io/images/assets/big/light/${asset.assetId}.png`} style={{ width: 25, marginRight: 10, objectFit: 'contain', float: 'left' }}></img>
                  <h6 className='table-algo-title'>{asset.name}</h6>
                </Link>
              </td>
              <td><b>{asset.unitName}</b></td>
              <td>{formatNumber(asset.marketCap)}</td>
              <td>{formatNumber(asset.liquidity)}</td>
              <td>{formatNumber(asset.lastDayVolume)}</td>
              <td>{formatNumber(asset.price)}</td>
              <td>{formatPercent(asset.lastDayPriceChange)}</td>
              <td>
                {togglePermission && (
                  <button
                    className="btn btn-link"
                    onClick={() =>
                      setToogleId(asset.assetId)
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
                    disabled={asset.assetId === showcaseId}
                    onClick={() =>
                      setShowcaseId(asset.assetId)
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
  );
}

export default AssetTable;