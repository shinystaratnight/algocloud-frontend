import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/algorand/statistics/statisticsActions';
import statisticsSelectors from 'src/modules/algorand/statistics/statisticsSelectors';
import poolsSelectors from 'src/modules/algorand/pools/poolsSelectors';
import { formatNumber, formatPercent } from 'src/modules/algorand/utils';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';

function PoolsTable() {

  const loading = useSelector(poolsSelectors.selectLoading);
  const pools = useSelector(poolsSelectors.selectPools);

  return (
    <div className="pools-table">
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
                    <h6>{pool.assetOneUnitName}-{pool.assetTwoUnitName}</h6>
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
      </TableWrapper>
    </div>
  )
}

export default PoolsTable;
