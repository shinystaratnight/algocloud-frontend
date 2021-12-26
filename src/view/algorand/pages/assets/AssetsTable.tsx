import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import assetsSelectors from 'src/modules/algorand/assets/assetsSelectors';
import { formatNumber, formatPercent } from 'src/modules/algorand/utils';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';

function AssetsTable() {

  const loading = useSelector(assetsSelectors.selectLoading);
  const assets = useSelector(assetsSelectors.selectAssets);

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
                      <h6>{asset.name}</h6>
                      {asset.assetId}
                    </Link>
                  </td>
                  <td><b>{asset.unitName}</b></td>
                  <td>{formatNumber(asset.liquidity)}</td>
                  <td>{formatNumber(asset.lastDayVolume)}</td>
                  <td>{formatNumber(asset.price)}</td>
                  <td>{formatPercent(asset.lastDayPriceChange)}</td>
                  <td><a href='#'><b>Favorite</b></a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableWrapper>
    </div>
  )
}

export default AssetsTable;
