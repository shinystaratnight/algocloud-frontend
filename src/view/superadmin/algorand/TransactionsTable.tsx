import React, {useEffect, useState} from 'react';
import { getPairs, getTokens, getTransactions } from './api';
import { i18n } from 'src/i18n';
import Pagination from 'src/view/shared/table/Pagination';
import Spinner from 'src/view/shared/Spinner';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import { formatNumber } from './Utils';
import { StyledAmountView } from './styled';
import {differenceInSeconds} from'date-fns';
import { getIconURL } from './components/Icons';

export const AmountView = ({name, amount, decimals}) => {
    return (
        <StyledAmountView>
            <img src={getIconURL(name)} alt="symbol" />
            <span>{formatNumber(parseFloat(amount)/Math.pow(10, parseInt(decimals)))}</span>
            <span>{name}</span>
        </StyledAmountView>
    )   
};

export const TransactionTitleView = ({symbol1, symbol2, tnx_type, tnx_group_id}) => {
    const tnxType = tnx_type === 'swap' ? 'Swap' : tnx_type === 'mint' ? 'Add' : 'Remove';
    return (
        <a href={`https://algoexplorer.io/tx/group/${tnx_group_id}`} style={{color: 'white'}} target="_blank"><span>{tnxType} {symbol1} to {symbol2}</span></a>
    )
};

export const TransactionsTable = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(async () => {
            const transactions = await getTransactions();
            setLoading(false);
            setTransactions(transactions);
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
                            name='transaction'
                            label='TRANSACTION'
                        />
                        <TableColumnHeader
                            name='total_value'
                            label='TOTAL VALUE'
                        />
                        <TableColumnHeader
                            name='amount_from'
                            label='AMOUNT'
                        />
                        <TableColumnHeader
                            name='amount_to'
                            label='AMOUNT_TO'
                        />
                        <TableColumnHeader
                            name='account'
                            label='ACCOUNT'
                        />
                        <TableColumnHeader
                            name='time'
                            label='TIME'
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
                    {!loading && !transactions && (
                        <tr>
                        <td colSpan={100}>
                            <div className="d-flex justify-content-center">
                            {i18n('table.noData')}
                            </div>
                        </td>
                        </tr>
                    )}
                    {!loading && transactions && transactions.map((tnx) => (
                        <tr key={tnx.id}>
                            <td><TransactionTitleView symbol1={tnx.pool.asset_2.unit_name} symbol2={tnx.pool.asset_1.unit_name} tnx_type={tnx.type} tnx_group_id={tnx.transaction_group_id} /></td>
                            <td>{tnx.bought_asset_amount_in_usd !== null ? formatNumber(tnx.bought_asset_amount_in_usd) : '-'}</td>
                            <td><AmountView name={tnx.pool.asset_2.unit_name} amount={tnx.sold_asset_amount} decimals={tnx.pool.asset_2.decimals}/></td>
                            <td><AmountView name={tnx.pool.asset_1.unit_name} amount={tnx.bought_asset_amount} decimals={tnx.pool.asset_1.decimals} /></td>
                            <td style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>{tnx.account.address}</td>
                            <td>{differenceInSeconds(new Date(), new Date(tnx.creation_datetime))} sec ago</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </TableWrapper>
        </div>
    );
}