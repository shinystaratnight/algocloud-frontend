import React, { useEffect, useState, useRef } from 'react';
import { ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';

import selectors from 'src/modules/algorand/overview/overviewSelectors';
import { CHART_TYPES } from 'src/modules/algorand/constants';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import TradingViewChart from 'src/view/algorand/components/TradingViewChart';
import {
  FlexContainer,
  ChartWindowWrapper,
} from 'src/view/algorand/styled';


function ShowcaseChart() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const [width1, setWidth1] = useState(0);
  const [width2, setWidth2] = useState(0);

  const showcase = useSelector(selectors.selectShowcase);
  const dailyData = useSelector(selectors.selectDailyData);

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
    <FlexContainer gap="20px" className="showcase-row">
      <ContentWrapper className=" card bg-box rounded">
        <ResponsiveContainer aspect={60 / 28} ref={ref1}>
          <TradingViewChart
            data={dailyData}
            base={0}
            title={`${showcase.unitName} Liquidity`}
            field="liquidity"
            width={width1}
            type='area'
            utc={true}
            timeField='date'
          />
        </ResponsiveContainer>
      </ContentWrapper>

      <ChartWindowWrapper className=" card bg-box rounded">
        <ResponsiveContainer aspect={60 / 28}>
          <TradingViewChart
            data={dailyData}
            base={0}
            title={`${showcase.unitName} Volume (24hr)`}
            field={'lastDayVolume'}
            width={width2}
            type={CHART_TYPES.BAR}
            timeField='date'
            useWeekly={false}
            utc={true}
          />
        </ResponsiveContainer>
      </ChartWindowWrapper>
    </FlexContainer>
  )
}

export default ShowcaseChart;
