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

import { POOL_CHART_VIEW, ASSET_CHART_VIEW_DURATION, ASSET_CHART_VIEW_FRAME, CHART_TYPES } from 'src/modules/algorand/constants';
import { toK, toNiceDate, toNiceDateYear, formattedNum } from 'src/modules/algorand/utils';
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

const PoolChart = (props) => {
  const {
    color,
    loading,
    pool,
    chartData,
    rateOneData,
    rateTwoData,
  } = props;

  const [chartFilter, setChartFilter] = useState(POOL_CHART_VIEW.LIQUIDITY);
  const [frame, setFrame] = useState(ASSET_CHART_VIEW_FRAME.HOURLY);
  const [duration, setDuration] = useState(ASSET_CHART_VIEW_DURATION.THREEDAY);

  const below2000 = useMedia('(max-width: 2000px)');
  const below1080 = useMedia('(max-width: 1080px)')
  const below600 = useMedia('(max-width: 600px)')

  const aspect = below2000 ? 58 / 28 : below1080 ? 60 / 32 : below600 ? 60 / 42 : 60 / 22;

  const ref = useRef<HTMLElement>()
  const isClient = typeof window === 'object'
  const [width, setWidth] = useState(ref?.current?.clientWidth)

  useEffect(() => {
    if (!isClient) {
      return
    }
    function handleResize() {
      setWidth(ref?.current?.clientWidth ?? width)
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [isClient, width]);

  const handleChangeDuration = (d: string) => {
    setDuration(d);
  }

  return (
    <ChartWindowWrapper className="card-hover-2">
      <RowBetween
        mb={
          chartFilter === POOL_CHART_VIEW.LIQUIDITY ||
            chartFilter === POOL_CHART_VIEW.VOLUME ||
            chartFilter === POOL_CHART_VIEW.RATE_ONE ||
            chartFilter === POOL_CHART_VIEW.RATE_TWO ? 40 : 0
        }
        align="flex-start"
      >
        <OptionButtonContainer>
          <OptionButton
            active={chartFilter === POOL_CHART_VIEW.LIQUIDITY}
            onClick={() => {
              setChartFilter(POOL_CHART_VIEW.LIQUIDITY);
              setFrame(ASSET_CHART_VIEW_FRAME.HOURLY);
              setDuration(ASSET_CHART_VIEW_DURATION.WEEK);
            }}
          >
            Liquidity
          </OptionButton>
          <OptionButton
            active={chartFilter === POOL_CHART_VIEW.VOLUME}
            onClick={() => {
              setChartFilter(POOL_CHART_VIEW.VOLUME);
              setFrame(ASSET_CHART_VIEW_FRAME.HOURLY);
              setDuration(ASSET_CHART_VIEW_DURATION.THREEDAY);
            }}
          >
            Volume
          </OptionButton>

          {!loading && (
            <OptionButton
              active={chartFilter === POOL_CHART_VIEW.RATE_ONE}
              onClick={() => {
                setChartFilter(POOL_CHART_VIEW.RATE_ONE);
                setFrame(ASSET_CHART_VIEW_FRAME.HOURLY);
                setDuration(ASSET_CHART_VIEW_DURATION.THREEDAY);
              }}
            >
              {`${pool['assetOneUnitName']}/${pool['assetTwoUnitName']}`}
            </OptionButton>
          )}

          {!loading && (
            <OptionButton
              active={chartFilter === POOL_CHART_VIEW.RATE_TWO}
              onClick={() => {
                setChartFilter(POOL_CHART_VIEW.RATE_TWO);
                setFrame(ASSET_CHART_VIEW_FRAME.HOURLY);
              setDuration(ASSET_CHART_VIEW_DURATION.THREEDAY);
              }}
            >
              {`${pool['assetTwoUnitName']}/${pool['assetOneUnitName']}`}
            </OptionButton>
          )}
        </OptionButtonContainer>
      </RowBetween>

      {chartFilter === POOL_CHART_VIEW.RATE_ONE && rateOneData && (
        <ResponsiveContainer aspect={aspect} ref={ref}>
          <CandleStickChart
            data={rateOneData}
            width={width}
            base={0}
            paddingTop='0'
            valueFormatter={(val) => val?.toFixed(4)}
            duration={duration}
          />
        </ResponsiveContainer>
      )}

      {chartFilter === POOL_CHART_VIEW.RATE_TWO && rateTwoData && (
        <ResponsiveContainer aspect={aspect} ref={ref}>
          <CandleStickChart
            data={rateTwoData}
            width={width}
            base={0}
            paddingTop='0'
            valueFormatter={(val) => val?.toFixed(4)}
            duration={duration}
          />
        </ResponsiveContainer>
      )}

      {chartFilter === POOL_CHART_VIEW.VOLUME && chartData && (
        <ResponsiveContainer aspect={aspect}>
          <BarChart margin={{ top: 0, right: 10, bottom: 6, left: 10 }} barCategoryGap={1} data={chartData}>
            <XAxis
              tickLine={false}
              axisLine={false}
              interval="preserveEnd"
              minTickGap={80}
              tickMargin={14}
              tickFormatter={tick => toNiceDate(tick)}
              dataKey="date"
              tick={{ fill: 'var(--algocloud-body-bg-2)' }}
              type={'number'}
              domain={['dataMin', 'dataMax']}
            />
            <YAxis
              type="number"
              axisLine={false}
              tickMargin={16}
              tick={{ fill: 'var(--algocloud-body-bg-2)' }}
              tickFormatter={tick => '$' + toK(tick)}
              tickLine={false}
              orientation="right"
              interval="preserveEnd"
              minTickGap={80}
              yAxisId={0}
            />
            <Tooltip
              cursor={{ fill: color, opacity: 0.1 }}
              formatter={val => formattedNum(val, true)}
              labelFormatter={label => toNiceDateYear(label)}
              labelStyle={{ paddingTop: 4 }}
              contentStyle={{
                padding: '10px 14px',
                borderRadius: 10,
                borderColor: color,
                color: 'black'
              }}
              wrapperStyle={{ top: -70, left: -10 }}
            />
            <Bar
              type="monotone"
              name={'Volume (24hr)'}
              dataKey={'lastDayVolume'}
              fill={color}
              opacity={'0.5'}
              yAxisId={0}
              stroke={color}
            />
          </BarChart>
        </ResponsiveContainer>
      )}

      {chartFilter === POOL_CHART_VIEW.LIQUIDITY && chartData && (
        <ResponsiveContainer aspect={aspect}>
          <AreaChart margin={{ top: 0, right: 10, bottom: 6, left: 0 }} barCategoryGap={1} data={chartData}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.35} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              tickLine={false}
              axisLine={false}
              interval="preserveEnd"
              tickMargin={16}
              minTickGap={120}
              tickFormatter={tick => toNiceDate(tick)}
              dataKey="date"
              tick={{ fill: 'var(--algocloud-body-bg-2)' }}
              type={'number'}
              domain={['dataMin', 'dataMax']}
            />
            <YAxis
              type="number"
              orientation="right"
              tickFormatter={tick => '$' + toK(tick)}
              axisLine={false}
              tickLine={false}
              interval="preserveEnd"
              minTickGap={80}
              yAxisId={0}
              tick={{ fill: 'var(--algocloud-body-bg-2)' }}
            />
            <Tooltip
              cursor={true}
              formatter={val => formattedNum(val, true)}
              labelFormatter={label => toNiceDateYear(label)}
              labelStyle={{ paddingTop: 4 }}
              contentStyle={{
                padding: '10px 14px',
                borderRadius: 10,
                borderColor: color,
                color: 'black'
              }}
              wrapperStyle={{ top: -70, left: -10 }}
            />
            <Area
              key={'other'}
              dataKey={'liquidity'}
              stackId="2"
              strokeWidth={2}
              dot={false}
              type="monotone"
              name={'Liquidity'}
              yAxisId={0}
              stroke={darken(0.12, color)}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
      <OptionButtonBottomContainer>
        <OptionButtonContainer>
          <OptionButtonWrapper right="180px">
            <OptionButtonContainer>
              <OptionButton
                active={frame === ASSET_CHART_VIEW_FRAME.DAILY}
                onClick={() => setFrame(ASSET_CHART_VIEW_FRAME.DAILY)}
              >
                1D
              </OptionButton>
              <OptionButton
                active={frame === ASSET_CHART_VIEW_FRAME.HOURLY}
                onClick={() => setFrame(ASSET_CHART_VIEW_FRAME.HOURLY)}
              >
                1H
              </OptionButton>
            </OptionButtonContainer>
          </OptionButtonWrapper>
          <Divider width='2px' />
          <OptionButtonWrapper className="align-right" right="10px">
            <OptionButtonContainer>
              <OptionButton
                active={duration === ASSET_CHART_VIEW_DURATION.THREEDAY}
                onClick={() => handleChangeDuration(ASSET_CHART_VIEW_DURATION.THREEDAY)}
              >
                3D
              </OptionButton>
              <OptionButton
                active={duration === ASSET_CHART_VIEW_DURATION.WEEK}
                onClick={() => handleChangeDuration(ASSET_CHART_VIEW_DURATION.WEEK)}
              >
                1W
              </OptionButton>
              <OptionButton
                active={duration === ASSET_CHART_VIEW_DURATION.MONTH}
                onClick={() => handleChangeDuration(ASSET_CHART_VIEW_DURATION.MONTH)}
              >
                1M
              </OptionButton>
              <OptionButton
                active={duration === ASSET_CHART_VIEW_DURATION.ALL}
                onClick={() => handleChangeDuration(ASSET_CHART_VIEW_DURATION.ALL)}
              >
                ALL
              </OptionButton>
            </OptionButtonContainer>
          </OptionButtonWrapper>
        </OptionButtonContainer>
      </OptionButtonBottomContainer>
    </ChartWindowWrapper>
  );
}

export default PoolChart;
