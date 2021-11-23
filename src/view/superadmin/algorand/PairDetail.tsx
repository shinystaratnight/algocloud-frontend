import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import actions from 'src/modules/superadmin/algochart/pairChart/pairChartActions';
import AnalyticsCard from 'src/view/superadmin/analytics/AnalyticsCard';
import selectors from 'src/modules/superadmin/algochart/pairChart/pairChartSelectors';
import { PairsTable } from './PairsTable';
import { TokensTable } from './TokensTable';
import { TransactionsTable } from './TransactionsTable';
import { FlexContainer, StyledCardWrapper, StyledStatCard } from './styled';
import { formatNumber } from './Utils';
import { getIconURL, SymbolIcon } from './components/Icons';

const StatCard = ({name, value}) => {
  return (
    <ContentWrapper>
      <StyledStatCard>
        <p className="name">{name}</p>
        <p className="value">{formatNumber(value)}</p>
      </StyledStatCard>
    </ContentWrapper>
  );
}

function PairDetailPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [pair, setPair] = useState<any>(null);

  const loading = useSelector(selectors.selectLoading);
  const pairChartData = useSelector(selectors.selectPairChartData)
  console.log(pairChartData);
  useEffect(() => {
    setPair(history.location.state);
  }, [history]);

  useEffect(() => {
    if (pair) {
      const {asset_1: {id: from}, asset_2: {id: to}} = pair;
      dispatch(actions.doFetch({from, to}));
    }
  }, [dispatch, pair])

  return (
    <React.Fragment>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          ['Algochart', '/superadmin/algochart'],
          ['Pair']
        ]}
      />
      
        {!pair && <>
          Pair is invalid
        </>}
        {pair && <>
          <br/>
          <FlexContainer gap='20px'>
            <SymbolIcon name={pair.asset_1.unit_name} />
            <SymbolIcon name={pair.asset_2.unit_name} />
            <span><a href={pair.liquidity_asset.url} target="_blank" style={{fontSize: '20px', color: 'white'}}>{pair.liquidity_asset.name}</a></span>
          </FlexContainer>
          <StyledCardWrapper>
            <StatCard name='Total Liquidity' value={pair.liquidity_in_usd} />
            <StatCard name='Volume (24hrs)' value={pair.last_day_volume_in_usd} />
            <StatCard name='Fees (24hrs)' value={pair.last_day_fees_in_usd} />
          </StyledCardWrapper>
          <ContentWrapper>
            Graph
          </ContentWrapper>
        </>}
    </React.Fragment>
  )
}

export default PairDetailPage;