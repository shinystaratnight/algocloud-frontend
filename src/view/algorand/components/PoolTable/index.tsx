import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import { formatNumber } from 'src/modules/algorand/utils';
import Spinner from 'src/view/shared/Spinner';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';
import { images } from 'src/images/images';

function PoolTable(props) {
  const {
    loading,
    pools,
    hasRows,
    sorter,
    doChangeSort,
  } = props;

  return (
    <div className="table-responsive " id='pool-table'>
      <table className="table-hover table table-striped mt-2">
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
              name='lastWeekVolume'
              label='VOLUME[7D]'
            />
            <TableColumnHeader
              onSort={doChangeSort}
              hasRows={hasRows}
              sorter={sorter}
              name='lastDayFees'
              label='FEES[24H]'
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
          {!loading && !pools.length && (
            <tr>
              <td colSpan={100}>
                <div className="d-flex justify-content-center">
                  {i18n('table.noData')}
                </div>
              </td>
            </tr>
          )}
          {!loading && (pools.length > 0) && pools.map((pool) => {            
            let image1 = pool.assetOneId === 0 ? '/assets/asa-list/ALGO/icon.png' : `https://algoexplorer.io/images/assets/big/light/${pool.assetOneId}.png`;
            for (let i = 0; i < images.length; i++) {
              const img = images[i];
              let id = parseInt(img.split('-')[1]);
              if (id == pool.assetOneId) {
                image1 = `/assets/asa-list/${img}/icon.png`;
                break;
              }
            }
            let image2 = pool.assetTwoId === 0 ? '/assets/asa-list/ALGO/icon.png' : `https://algoexplorer.io/images/assets/big/light/${pool.assetTwoId}.png`;
            for (let i = 0; i < images.length; i++) {
              const img = images[i];
              let id = parseInt(img.split('-')[1]);
              if (id == pool.assetTwoId) {
                image2 = `/assets/asa-list/${img}/icon.png`;
                break;
              }
            }
            return (
              <tr key={pool.id}>
                <td>
                  <Link to={`/algorand/pools/${pool.address}`}>
                    <img className="pool-token-1 token" src={image1} style={{ width: 25, marginRight: 10, objectFit: 'contain', float: 'left' }}></img>
                    <img className="pool-token-2 token" src={image2} style={{ width: 25, marginRight: 10, objectFit: 'contain', float: 'left' }}></img>
                    <td><h6 className="pools-ticker">{pool.assetOneUnitName}-{pool.assetTwoUnitName}</h6></td>
                  </Link>
                </td>
                <td>{formatNumber(pool.liquidity)}</td>
                <td>{formatNumber(pool.lastDayVolume)}</td>
                <td>{formatNumber(pool.lastWeekVolume)}</td>
                <td>{formatNumber(pool.lastDayFees)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PoolTable;
