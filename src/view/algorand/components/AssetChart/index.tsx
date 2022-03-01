import React, { useState, useRef, useEffect } from 'react';
import { darken } from 'polished';
import { useMedia } from 'react-use';
import {
  ResponsiveContainer,
  AreaChart,
  BarChart,
  Bar,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

import {
  toK,
  toNiceDate,
  toNiceDateYear,
  formattedNum,
} from 'src/modules/algorand/utils';
import { ASSET_CHART_VIEW, ASSET_CHART_VIEW_DURATION, ASSET_CHART_VIEW_FRAME, CHART_TYPES } from 'src/modules/algorand/constants';
import CandleStickChart from 'src/view/algorand/components/CandleStickChart';
import {
  ChartWindowWrapper,
  Divider,
  OptionButton,
  OptionButtonBottomContainer,
  OptionButtonContainer,
  OptionButtonWrapper,
  RowBetween
} from 'src/view/algorand/styled';
import TradingViewChart from 'src/view/algorand/components/TradingViewChart';
import selectors from 'src/modules/algorand/asset/show/assetShowSelectors';
import { useSelector } from 'react-redux';

const AssetChart = (props) => {
  const {
    color,
    __,
    _,
  } = props;

  const [chartFilter, setChartFilter] = useState(ASSET_CHART_VIEW.LIQUIDITY);
  const [frame, setFrame] = useState(ASSET_CHART_VIEW_FRAME.HOURLY);
  const [duration, setDuration] = useState(ASSET_CHART_VIEW_DURATION.THREEDAY)

  const below2000 = useMedia('(max-width: 2000px)');
  const below1080 = useMedia('(max-width: 1080px)');
  const below600 = useMedia('(max-width: 600px)');
  const aspect = below2000 ? 58 / 32 : below1080 ? 60 / 32 : below600 ? 60 / 42 : 60 / 22;

  // const textColor = 'var(--algocloud-body-bg-2)';
  const ref = useRef<HTMLElement>();
  const isClient = typeof window === 'object';
  const [width, setWidth] = useState(ref?.current?.clientWidth);

  useEffect(() => {
    if (!isClient) {
      return;
    }
    function handleResize() {
      setWidth(ref?.current?.clientWidth ?? width);
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isClient, width]);

  const priceData = useSelector(frame === ASSET_CHART_VIEW_FRAME.DAILY ? selectors.selectDailyPrices : selectors.selectHourlyPrices);
  const assetData = useSelector(frame === ASSET_CHART_VIEW_FRAME.DAILY ? selectors.selectDailyAssetData : selectors.selectHourlyAssetData);

  const handleChangeDuration = (d: string) => {
    setDuration(d);
  }


  return (
    <ChartWindowWrapper className="card-hover">
      <RowBetween
        mb={
          chartFilter === ASSET_CHART_VIEW.LIQUIDITY ||
            chartFilter === ASSET_CHART_VIEW.VOLUME ||
            chartFilter === ASSET_CHART_VIEW.PRICE ? 40 : 0
        }
        align="flex-start"
      >
        
      </RowBetween>

      {chartFilter === ASSET_CHART_VIEW.PRICE && priceData && (
        <ResponsiveContainer aspect={aspect} ref={ref}>
          <CandleStickChart
            data={priceData}
            width={width}
            base={0}
            paddingTop='0'
            valueFormatter={(val) => val?.toFixed(4)}
            duration={duration}
          />
        </ResponsiveContainer>
      )}

      {chartFilter === ASSET_CHART_VIEW.VOLUME && assetData && (
        <ResponsiveContainer aspect={aspect}>
          <TradingViewChart
            data={assetData}
            base={0}
            field={'lastDayVolume'}
            width={width}
            type={CHART_TYPES.BAR}
            timeField='date'
            useWeekly={false}
            utc={true}
            duration={duration}
          />
        </ResponsiveContainer>
      )}
      {chartFilter === ASSET_CHART_VIEW.LIQUIDITY && assetData && (
        <ResponsiveContainer aspect={aspect}>
          <TradingViewChart
            data={assetData}
            base={0}
            field={'liquidity'}
            width={width}
            type={'area'}
            timeField='date'
            useWeekly={false}
            utc={true}
            duration={duration}
          />
        </ResponsiveContainer>
      )}
      {chartFilter === ASSET_CHART_VIEW.MARKETCAP && assetData && (
        <ResponsiveContainer aspect={aspect}>
          <TradingViewChart
            data={assetData}
            base={0}
            field={'marketCap'}
            width={width}
            type={CHART_TYPES.AREA}
            timeField='date'
            useWeekly={false}
            utc={true}
            duration={duration}
          />
        </ResponsiveContainer>
      )}
      
      <OptionButtonBottomContainer className="chart-rack" >
      <OptionButtonContainer className="chart-buttons" style={{textIndent: "0px"}}>
          <OptionButton className="chart-button" 
            active={chartFilter === ASSET_CHART_VIEW.LIQUIDITY}
            onClick={() => {
              setChartFilter(ASSET_CHART_VIEW.LIQUIDITY);
              setFrame(ASSET_CHART_VIEW_FRAME.HOURLY);
              setDuration(ASSET_CHART_VIEW_DURATION.WEEK);
            }}
          >
            Liquidity
          </OptionButton>
          <OptionButton className="chart-button" 
            active={chartFilter === ASSET_CHART_VIEW.VOLUME}
            onClick={() => {
              setChartFilter(ASSET_CHART_VIEW.VOLUME);
              setFrame(ASSET_CHART_VIEW_FRAME.HOURLY);
              setDuration(ASSET_CHART_VIEW_DURATION.THREEDAY);
            }}
          >
            Volume
          </OptionButton>
          <OptionButton className="chart-button" 
            active={chartFilter === ASSET_CHART_VIEW.PRICE}
            onClick={() => {
              setChartFilter(ASSET_CHART_VIEW.PRICE);
              setFrame(ASSET_CHART_VIEW_FRAME.HOURLY);
              setDuration(ASSET_CHART_VIEW_DURATION.THREEDAY);
            }}
          >
            Price
          </OptionButton>
          <OptionButton className="chart-button" 
            active={chartFilter === ASSET_CHART_VIEW.MARKETCAP}
            onClick={() => {
              setChartFilter(ASSET_CHART_VIEW.MARKETCAP);
              setFrame(ASSET_CHART_VIEW_FRAME.HOURLY);
              setDuration(ASSET_CHART_VIEW_DURATION.THREEDAY);
            }}
          >
            Market Cap
          </OptionButton>

         

        </OptionButtonContainer>
        
            
            <OptionButtonContainer className="time-buttons" style={{textIndent: "0px"}}>
            <Divider width='1px' backgroundColor="black" />
            
            <OptionButton className="time-button" 
                active={frame === ASSET_CHART_VIEW_FRAME.HOURLY}
                onClick={() => setFrame(ASSET_CHART_VIEW_FRAME.HOURLY)}
              >
                1H
              </OptionButton>
              <OptionButton className="time-button" 
                active={frame === ASSET_CHART_VIEW_FRAME.DAILY}
                onClick={() => setFrame(ASSET_CHART_VIEW_FRAME.DAILY)}
              >
                1D
              </OptionButton>

              <Divider width='1px' />


              <OptionButton className="time-button" 
                active={duration === ASSET_CHART_VIEW_DURATION.THREEDAY}
                onClick={() => handleChangeDuration(ASSET_CHART_VIEW_DURATION.THREEDAY)}
              >
                3D
              </OptionButton>
              <OptionButton className="time-button" 
                active={duration === ASSET_CHART_VIEW_DURATION.WEEK}
                onClick={() => handleChangeDuration(ASSET_CHART_VIEW_DURATION.WEEK)}
              >
                1W
              </OptionButton>
              <OptionButton className="time-button" 
                active={duration === ASSET_CHART_VIEW_DURATION.MONTH}
                onClick={() => handleChangeDuration(ASSET_CHART_VIEW_DURATION.MONTH)}
              >
                1M
              </OptionButton>
              <OptionButton className="time-button" 
                active={duration === ASSET_CHART_VIEW_DURATION.ALL}
                onClick={() => handleChangeDuration(ASSET_CHART_VIEW_DURATION.ALL)}
              >
                ALL
              </OptionButton>
              

              
           
           
            </OptionButtonContainer>
            <OptionButtonContainer>
            </OptionButtonContainer>
            

      </OptionButtonBottomContainer>
    </ChartWindowWrapper>
  );
}

export default AssetChart;
