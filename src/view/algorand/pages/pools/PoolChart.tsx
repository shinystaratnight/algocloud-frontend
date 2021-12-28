import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Area, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, BarChart, Bar } from 'recharts'
import { darken } from 'polished'
import { useMedia, usePrevious } from 'react-use'

import { TIME_FRAME, POOL_CHART_VIEW, DATA_FREQUENCY } from 'src/modules/algorand/constants'
import { toK, toNiceDate, toNiceDateYear, formattedNum } from 'src/modules/algorand/utils'
import CandleStickChart from 'src/view/algorand/components/CandleStickChart'
import selectors from 'src/modules/algorand/pools/poolsSelectors'
import {
  ChartWindowWrapper,
  OptionButton,
  OptionButtonContainer,
  RowBetween
} from 'src/view/algorand/styled'

const PoolChart = ({ color }) => {

  // settings for the window and candle width
  const [chartFilter, setChartFilter] = useState(POOL_CHART_VIEW.LIQUIDITY)
  const [frequency, setFrequency] = useState(DATA_FREQUENCY.HOUR)
  const [timeWindow, setTimeWindow] = useState(TIME_FRAME.WEEK)
  const prevWindow = usePrevious(timeWindow)

  const loading = useSelector(selectors.selectLoading);
  const detail = useSelector(selectors.selectPoolDetail);

  const textColor = 'white';

  // let chartData = useTokenChartData(address)
  let chartData: any = useSelector(selectors.selectDailyPoolData);

  const rateOneData = useSelector(selectors.selectHourlyOneRates);
  const rateTwoData = useSelector(selectors.selectHourlyTwoRates);

  const below1080 = useMedia('(max-width: 1080px)')
  const below600 = useMedia('(max-width: 600px)')

  // let utcStartTime = getTimeframe(timeWindow)
  // const domain = [dataMin => (dataMin > utcStartTime ? dataMin : utcStartTime), 'dataMax']
  const aspect = below1080 ? 60 / 32 : below600 ? 60 / 42 : 60 / 22

  // update the width on a window resize
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
  }, [isClient, width]) // Empty array ensures that effect is only run on mount and unmount

  return (
    <ChartWindowWrapper>
      <RowBetween
        mb={
          chartFilter === POOL_CHART_VIEW.LIQUIDITY ||
          chartFilter === POOL_CHART_VIEW.VOLUME ||
          chartFilter === POOL_CHART_VIEW.RATE_ONE ||
          chartFilter === POOL_CHART_VIEW.RATE_TWO
            ? 40
            : 0
        }
        align="flex-start"
      >
        <OptionButtonContainer>
          <OptionButton
            onClick={() => setChartFilter(POOL_CHART_VIEW.LIQUIDITY)}
          >
            Liquidity
          </OptionButton>
          <OptionButton
            onClick={() => setChartFilter(POOL_CHART_VIEW.VOLUME)}
          >
            Volume
          </OptionButton>
          <OptionButton
            onClick={() => setChartFilter(POOL_CHART_VIEW.RATE_ONE)}
          >
            {loading ? '' : `${detail['assetOneUnitName']}/${detail['assetTwoUnitName']}`}
          </OptionButton>

          <OptionButton
            onClick={() => setChartFilter(POOL_CHART_VIEW.RATE_TWO)}
          >
            {loading ? '' : `${detail['assetTwoUnitName']}/${detail['assetOneUnitName']}`}
          </OptionButton>
        </OptionButtonContainer>
      </RowBetween>
      
      {chartFilter === POOL_CHART_VIEW.RATE_ONE && rateOneData && (
        <ResponsiveContainer aspect={aspect} ref={ref}>
          <CandleStickChart
            data={rateOneData}
            width={width}
            base={null}
            paddingTop='0'
            valueFormatter={(val) => val.toFixed(4)}
          />
        </ResponsiveContainer>
      )}

      {chartFilter === POOL_CHART_VIEW.RATE_TWO && rateTwoData && (
        <ResponsiveContainer aspect={aspect} ref={ref}>
          <CandleStickChart
            data={rateTwoData}
            width={width}
            base={null}
            paddingTop='0'
            valueFormatter={(val) => val.toFixed(4)}
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
              tick={{ fill: textColor }}
              type={'number'}
              domain={['dataMin', 'dataMax']}
            />
            <YAxis
              type="number"
              axisLine={false}
              tickMargin={16}
              tickFormatter={tick => '$' + toK(tick)}
              tickLine={false}
              orientation="right"
              interval="preserveEnd"
              minTickGap={80}
              yAxisId={0}
              tick={{ fill: textColor }}
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
              tick={{ fill: '#1ff' }}
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
              tick={{ fill: textColor }}
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
    </ChartWindowWrapper>
  )
}

export default PoolChart
