import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import { formatNumber } from 'src/modules/algorand/utils';
import Spinner from 'src/view/shared/Spinner';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';

function PoolTable(props) {
  const {
    loading,
    pools
  } = props;
  
  return (
    <div className="table-responsive ">
      <table className="table-hover table table-striped mt-2">
        <thead className="thead">
          <tr>
            <TableColumnHeader
              name='name'
              label='NAME'
            />
            <TableColumnHeader
              name='liquidity'
              label='LIQUIDITY'
            />
            <TableColumnHeader
              name='volume24h'
              label='VOLUME[24H]'
            />
            <TableColumnHeader
              name='volume7d'
              label='VOLUME[7D]'
            />
            <TableColumnHeader
              name='fees'
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
