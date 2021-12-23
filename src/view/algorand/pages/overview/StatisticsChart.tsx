import React, { useEffect, useState, useRef } from 'react';
import { ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import actions from 'src/modules/algorand/statistics/statisticsActions';
import selectors from 'src/modules/algorand/statistics/statisticsSelectors';
import { formattedNum } from 'src/modules/algorand/utils';
import TradingViewChart from 'src/view/algorand/components/TradingViewChart';
// import CandleStickChart from '../components/CandleChart';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.column ? 'column' : 'row'};
  align-items: center;
  gap: ${(props) => props.gap ? props.gap : '5px'};
`;

const OptionButton = styled.div`
  font-weight: 500;
  width: fit-content;
  white-space: nowrap;
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #44c4e2;
`
const TextWrapper = styled(Text)`
  color: ${({ color, theme }) => theme[color]};
`

export const CHART_TYPES = {
  BAR: 'BAR',
  AREA: 'AREA'
};

function StatisticsChart() {
  const dispatch = useDispatch();
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const [width1, setWidth1] = useState(0);
  const [width2, setWidth2] = useState(0);

  const [volumeWindow, setVolumeWindow] = useState('daily');


  const dailyData = useSelector(selectors.selectDailyData);
  const weeklyData = useSelector(selectors.selectWeeklyData);

  useEffect(() => {
    if (ref1.current) {
      const current: any = ref1.current;
      setWidth1(current.clientWidth);
    }
    if (ref2.current) {
      const current: any = ref2.current;
      setWidth2(current.clientWidth);
    }
  }, [ref1, ref2])

  useEffect(() => {
    dispatch(actions.doFetch());
  }, [dispatch])

  function valueFormatter(val) {
    return (
      `<div style="font-size: 16px; margin: 4px 0px; color: white;">ALGO / USD </div>` +
      formattedNum(val)
    )
  }
  return (
    <FlexContainer gap="20px">
      <ContentWrapper>
        {dailyData &&
          <ResponsiveContainer aspect={60 / 28} ref={ref1}>
            <TradingViewChart
              data={dailyData}
              base={0}
              title="Liquidity"
              field="totalLiquidity"
              width={width1}
              type='area'
            />
          </ResponsiveContainer>}
      </ContentWrapper>
      <ContentWrapper>
        {dailyData &&
          <ResponsiveContainer aspect={60 / 28}>
            <TradingViewChart
              data={volumeWindow === 'weekly' ? weeklyData : dailyData}
              base={0}
              title={volumeWindow === 'weekly' ? 'Volume (Week)' : 'Volume (Last Day)'}
              field={volumeWindow === 'weekly' ? 'lastWeekVolume' : 'lastDayVolume'}
              width={width2}
              type={CHART_TYPES.BAR}
              timeField={volumeWindow === 'weekly' ? 'week' : 'createdDate'}
              useWeekly={volumeWindow === 'weekly'}
            />
          </ResponsiveContainer>
        }
        {/* <div className="row" style={{ bottom: '70px', position: 'absolute', left: '20px', zIndex: 10 }}>
          <OptionButton
            active={volumeWindow !== 'weekly'}
            onClick={() => setVolumeWindow('daily')}
          >
            <h3>D</h3>
          </OptionButton>
        </div> */}
      </ContentWrapper>
    </FlexContainer>
  )
}

export default StatisticsChart;