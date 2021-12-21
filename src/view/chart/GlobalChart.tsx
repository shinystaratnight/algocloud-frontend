import React, { useEffect, useState, useRef } from 'react';
import { ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import marketCapActions from 'src/modules/chart/marketCapChart/marketCapChartActions';
import algoPriceActions from 'src/modules/chart/algoPriceChart/algoPriceChartActions';
import marketCapSelectors from 'src/modules/chart/marketCapChart/marketCapChartSelectors';
import algoPriceSelectors from 'src/modules/chart/algoPriceChart/algoPriceChartSelectors';
import TradingViewChart from './components/TradingviewChart';
import CandleStickChart from './components/CandleChart';
import { formattedNum } from './Utils';
import { FlexContainer } from './styled';

function GlobalChart() {
  const dispatch = useDispatch();
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const [width1, setWidth1] = useState(0);
  const [width2, setWidth2] = useState(0);

  const mcLoading = useSelector(marketCapSelectors.selectLoading);
  const globalChartData = useSelector(marketCapSelectors.selectMarketCapChartData)
  const algoPriceChartData = useSelector(algoPriceSelectors.selectAlgoPriceChartData)

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
    dispatch(marketCapActions.doFetch());
    dispatch(algoPriceActions.doFetch());
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
        {globalChartData &&
          <ResponsiveContainer aspect={60 / 28} ref={ref1}>
            <TradingViewChart
              data={globalChartData}
              base={0}
              baseChange={0}
              title="MarketCap"
              field="market-cap"
              width={width1}
              type='area'
            />
          </ResponsiveContainer>}
      </ContentWrapper>
      <ContentWrapper>
        {algoPriceChartData &&
          <ResponsiveContainer aspect={60 / 28} ref={ref2}>
            <CandleStickChart
              data={algoPriceChartData}
              base={0}
              margin={false}
              width={width2}
              valueFormatter={valueFormatter}
            />
          </ResponsiveContainer>}
      </ContentWrapper>
    </FlexContainer>
  )
}

export default GlobalChart;