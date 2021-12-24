import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Area, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, BarChart, Bar } from 'recharts'
import styled from 'styled-components'
import { darken } from 'polished'
import { useMedia, usePrevious } from 'react-use'
import { Activity } from 'react-feather'

import { timeframeOptions } from 'src/modules/algorand/contants'
import { toK, toNiceDate, toNiceDateYear, formattedNum, getTimeframe } from 'src/modules/algorand/utils'
// import { useTokenChartData, useTokenPriceData } from '../../contexts/TokenData'
import CandleStickChart from 'src/view/algorand/components/CandleStickChart'
import actions from 'src/modules/algorand/assets/assetsActions'
import Spinner from 'src/view/shared/Spinner'

const ChartWrapper = styled.div`
  height: 100%;
  min-height: 300px;

  @media screen and (max-width: 600px) {
    min-height: 200px;
  }
`

const CHART_VIEW = {
  VOLUME: 'Volume',
  LIQUIDITY: 'Liquidity',
  PRICE: 'Price',
  // LINE_PRICE: 'Price (Line)'
}

const DATA_FREQUENCY = {
  DAY: 'DAY',
  HOUR: 'HOUR',
  // LINE: 'LINE'
}

const AssetChart = ({ assetId, color, base }) => {


  // settings for the window and candle width
  const [chartFilter, setChartFilter] = useState(CHART_VIEW.PRICE)
  const [frequency, setFrequency] = useState(DATA_FREQUENCY.HOUR)

  const textColor = 'white';

  // reset view on new address
  const assetIdPrev = usePrevious(assetId)
  useEffect(() => {
    if (assetId !== assetIdPrev && assetIdPrev) {
      setChartFilter(CHART_VIEW.LIQUIDITY)
    }
  }, [assetId, assetIdPrev])

  // let chartData = useTokenChartData(address)
  let chartData: any = [];

  const [timeWindow, setTimeWindow] = useState(timeframeOptions.WEEK)
  const prevWindow = usePrevious(timeWindow)

  // hourly and daily price data based on the current time window
  // const hourlyWeek = useTokenPriceData(address, timeframeOptions.WEEK, 3600)
  // const hourlyMonth = useTokenPriceData(address, timeframeOptions.MONTH, 3600)
  // const hourlyAll = useTokenPriceData(address, timeframeOptions.ALL_TIME, 3600)
  // const dailyWeek = useTokenPriceData(address, timeframeOptions.WEEK, 86400)
  // const dailyMonth = useTokenPriceData(address, timeframeOptions.MONTH, 86400)
  // const dailyAll = useTokenPriceData(address, timeframeOptions.ALL_TIME, 86400)

  const hourlyWeek = []
  const hourlyMonth = []
  const hourlyAll = []
  const dailyWeek = []
  const dailyMonth = []
  const dailyAll = []

  const priceData =
    timeWindow === timeframeOptions.MONTH
      ? // monthly selected
        frequency === DATA_FREQUENCY.DAY
        ? dailyMonth
        : hourlyMonth
      : // weekly selected
      timeWindow === timeframeOptions.WEEK
      ? frequency === DATA_FREQUENCY.DAY
        ? dailyWeek
        : hourlyWeek
      : // all time selected
      frequency === DATA_FREQUENCY.DAY
      ? dailyAll
      : hourlyAll

  // switch to hourly data when switched to week window
  useEffect(() => {
    if (timeWindow === timeframeOptions.WEEK && prevWindow && prevWindow !== timeframeOptions.WEEK) {
      setFrequency(DATA_FREQUENCY.HOUR)
    }
  }, [prevWindow, timeWindow])

  // switch to daily data if switche to month or all time view
  useEffect(() => {
    if (timeWindow === timeframeOptions.MONTH && prevWindow && prevWindow !== timeframeOptions.MONTH) {
      setFrequency(DATA_FREQUENCY.DAY)
    }
    if (timeWindow === timeframeOptions.ALL_TIME && prevWindow && prevWindow !== timeframeOptions.ALL_TIME) {
      setFrequency(DATA_FREQUENCY.DAY)
    }
  }, [prevWindow, timeWindow])

  const below1080 = useMedia('(max-width: 1080px)')
  const below600 = useMedia('(max-width: 600px)')

  let utcStartTime = getTimeframe(timeWindow)
  const domain = [dataMin => (dataMin > utcStartTime ? dataMin : utcStartTime), 'dataMax']
  const aspect = below1080 ? 60 / 32 : below600 ? 60 / 42 : 60 / 22

  chartData = chartData?.filter(entry => entry.date >= utcStartTime)

  // update the width on a window resize
  const ref = useRef<HTMLElement>()
  const isClient = typeof window === 'object'
  // const [width, setWidth] = useState(ref?.current?.container?.clientWidth)
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
    <ChartWrapper>
     
      {chartFilter === CHART_VIEW.LIQUIDITY && chartData && (
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
              tick={{ fill: textColor }}
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
              dataKey={'totalLiquidityUSD'}
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
      {chartFilter === CHART_VIEW.PRICE ? (
        <ResponsiveContainer aspect={aspect} ref={ref}>
          <CandleStickChart data={priceData} width={width} base={base} />
        </ResponsiveContainer>
      ) : (
        <Spinner />
      )}

      {chartFilter === CHART_VIEW.VOLUME && (
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
              name={'Volume'}
              dataKey={'dailyVolumeUSD'}
              fill={color}
              opacity={'0.4'}
              yAxisId={0}
              stroke={color}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartWrapper>
  )
}

export default AssetChart
