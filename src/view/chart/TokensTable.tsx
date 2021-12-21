import React, { useEffect, useState } from 'react';
import { getPairs, getTokens } from './api';
import { i18n } from 'src/i18n';
import Pagination from 'src/view/shared/table/Pagination';
import Spinner from 'src/view/shared/Spinner';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import { formatNumber } from './Utils';
import { StyledTokenView, StyledPriceChangeView } from './styled';
import { IncreaseIcon, DecreaseIcon } from './components/Icons';

export const TokenView = ({ name, unit_name }) => {
  return (
    <StyledTokenView>
      <img src="https://app.tinyman.org/static/media/icon.37675b59.svg" alt="symbol" />
      <div className="info">
        <p className="name">{name}</p>
        <p className="unit">${unit_name}</p>
      </div>
    </StyledTokenView>
  )
};

export const PriceChangeView = ({ price_change }) => {
  const priceChange = parseFloat(price_change);
  return (
    <StyledPriceChangeView className={priceChange >= 0 ? 'increase' : 'decrease'}>
      <span>{priceChange.toFixed(2)}%</span>
      {priceChange >= 0 ? <IncreaseIcon /> : <DecreaseIcon />}
    </StyledPriceChangeView>
  )
};

export const TokensTable = () => {
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      const tokens = await getTokens();
      setLoading(false);
      setTokens(tokens);
    }, 10000);
  });

  return (
    <div className="pairs-table">
      <TableWrapper>
        <div className="table-responsive">
          <table className="table table-striped mt-2">
            <thead className="thead">
              <tr>
                <TableColumnHeader
                  name='token'
                  label='TOKEN'
                />
                <TableColumnHeader
                  name='tvl'
                  label='TVL'
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
                  name='price_change'
                  label='PRICE CHANGE'
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
              {!loading && !tokens && (
                <tr>
                  <td colSpan={100}>
                    <div className="d-flex justify-content-center">
                      {i18n('table.noData')}
                    </div>
                  </td>
                </tr>
              )}
              {!loading && tokens && tokens.map((token) => (
                <tr key={token.id}>
                  <td><TokenView name={token.name} unit_name={token.unit_name} /></td>
                  <td>{formatNumber(token.liquidity_in_usd)}</td>
                  <td>{formatNumber(token.last_day_volume_in_usd)}</td>
                  <td>{formatNumber(token.last_day_volume_in_usd)}</td>
                  <td><PriceChangeView price_change={token.last_day_price_change} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableWrapper>
    </div>
  );
}