import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router';
import { getPairs } from './api';
import { i18n } from 'src/i18n';
import Pagination from 'src/view/shared/table/Pagination';
import Spinner from 'src/view/shared/Spinner';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import { formatNumber } from './Utils';
import { StyledPairView } from './styled';
import { getIconURL } from './components/Icons';


export const PairView = ({pair, match}) => {
    const {asset_1: {name: name1, unit_name: symbol1}, asset_2: {name: name2, unit_name: symbol2}} = pair;
    return (
        <StyledPairView  to={{
            pathname: `${match}/pair`,
            state: pair
        }}>
            <img src={getIconURL(symbol1)} alt="symbol" />
            <img src={getIconURL(symbol2)} alt="symbol" />
            <span className="name">{name1}</span>
            <span>/</span>
            <span className="unit">{name2}</span>
        </StyledPairView>
    )   
};

export const PairsTable = () => {
    const [pairs, setPairs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        setTimeout(async () => {
            const pairs = await getPairs();
            setLoading(false);
            setPairs(pairs);
        }, 10000);
    })
    return (
        <div className="pairs-table">
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
                            name='tvl'
                            label='TVL'
                        />
                        <TableColumnHeader
                            name='volumn24h'
                            label='VOLUME[24H]'
                        />
                        <TableColumnHeader
                            name='volumn7d'
                            label='VOLUME[7D]'
                        />
                        <TableColumnHeader
                            name='fees24h'
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
                    {!loading && !pairs && (
                        <tr>
                        <td colSpan={100}>
                            <div className="d-flex justify-content-center">
                            {i18n('table.noData')}
                            </div>
                        </td>
                        </tr>
                    )}
                    {!loading && pairs && pairs.map((pair) => (
                        <tr key={pair.address}>
                            <td><PairView pair={pair} match={history.location.pathname} /></td>
                            <td>{formatNumber(pair.liquidity_in_usd)}</td>
                            <td>{formatNumber(pair.last_day_volume_in_usd)}</td>
                            <td>{formatNumber(pair.last_week_volume_in_usd)}</td>
                            <td>{formatNumber(pair.last_day_fees_in_usd)}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </TableWrapper>
        </div>
    );
}