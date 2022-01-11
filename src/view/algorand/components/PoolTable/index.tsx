import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import { formatNumber } from 'src/modules/algorand/utils';
import Spinner from 'src/view/shared/Spinner';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';

function PoolTable(props) {
  const {
    loading,
    pools,
    hasRows,
    sorter,
    doChangeSort,
  } = props;
  
  return (
    <div className="table-responsive ">
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
          {!loading && (pools.length > 0) && pools.map((pool) => (
            <tr key={pool.id}>
              <td>
                <Link to={`/algorand/pools/${pool.address}`}>
                  <h6>{pool.assetOneUnitName}-{pool.assetTwoUnitName}</h6>
                </Link>
              </td>
              <td>{formatNumber(pool.liquidity)}</td>
              <td>{formatNumber(pool.lastDayVolume)}</td>
              <td>{formatNumber(pool.lastWeekVolume)}</td>
              <td>{formatNumber(pool.lastDayFees)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PoolTable;
