import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/algorand/statistics/statisticsActions';
import selectors from 'src/modules/algorand/statistics/statisticsSelectors';
import { formatNumber, formatPercent } from 'src/modules/algorand/utils';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';

function TopFavorites() {

  const loading = useSelector(selectors.selectLoading);
  const topFavorites = useSelector(selectors.selectTopFavorites);

  return (
    <div className="top-favorite-table">
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
                  name='action'
                  label='ACTION'
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
              {!loading && !topFavorites.length && (
                <tr>
                  <td colSpan={100}>
                    <div className="d-flex justify-content-center">
                      {i18n('table.noData')}
                    </div>
                  </td>
                </tr>
              )}
              {!loading && (topFavorites.length > 0) && topFavorites.map((asset) => (
                <tr key={asset.id}>
                  <td>
                    <h6>{asset.name}</h6>
                    {asset.assetId}
                  </td>
                  <td><b>{asset.unitName}</b></td>
                  <td>{formatNumber(asset.liquidity)}</td>
                  <td>{formatNumber(asset.lastDayVolume)}</td>
                  <td>{formatNumber(asset.price)}</td>
                  <td>{formatPercent(asset.lastDayPriceChange)}</td>
                  <td><a href='#'><b>Unfavorite</b></a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableWrapper>
    </div>
  )
}

export default TopFavorites;
