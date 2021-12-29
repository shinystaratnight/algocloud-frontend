import React, { useEffect, useState, useRef } from 'react';
import { ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';

import selectors from 'src/modules/algorand/statistics/statisticsSelectors';
import { CHART_TYPES } from 'src/modules/algorand/constants';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import TradingViewChart from 'src/view/algorand/components/TradingViewChart';
import {
  FlexContainer,
  ChartWindowWrapper,
  OptionButton,
  OptionButtonWrapper,
  OptionButtonContainer,
} from 'src/view/algorand/styled';


function OverviewChart() {
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

      <ChartWindowWrapper>
        {dailyData && weeklyData &&
          <ResponsiveContainer aspect={60 / 28}>
            <TradingViewChart
              data={volumeWindow === 'weekly' ? weeklyData : dailyData}
              base={0}
              title={volumeWindow === 'weekly' ? 'Volume (Week)' : 'Volume (24hr)'}
              field={volumeWindow === 'weekly' ? 'lastWeekVolume' : 'lastDayVolume'}
              width={width2}
              type={CHART_TYPES.BAR}
              timeField={volumeWindow === 'weekly' ? 'week' : 'createdDate'}
              useWeekly={volumeWindow === 'weekly'}
            />
          </ResponsiveContainer>
        }
        <OptionButtonWrapper right="40px">
          <OptionButtonContainer>
            <OptionButton
              width='50px'
              active={volumeWindow !== 'weekly'}
              onClick={() => setVolumeWindow('daily')}
            >
              D
            </OptionButton>
            <OptionButton
              width='50px'
              active={volumeWindow !== 'daily'}
              onClick={() => setVolumeWindow('weekly')}
            >
              W
            </OptionButton>
          </OptionButtonContainer>
        </OptionButtonWrapper>
      </ChartWindowWrapper>
    </FlexContainer>
  )
}

export default OverviewChart;
