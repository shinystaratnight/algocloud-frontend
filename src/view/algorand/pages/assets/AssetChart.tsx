import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Area, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, BarChart, Bar } from 'recharts'
import { darken } from 'polished'
import { useMedia, usePrevious } from 'react-use'
import styled from 'styled-components'
import { Activity } from 'react-feather'

import { TIME_FRAME, ASSET_CHART_VIEW, DATA_FREQUENCY } from 'src/modules/algorand/constants'
import { toK, toNiceDate, toNiceDateYear, formattedNum, getTimeframe } from 'src/modules/algorand/utils'
import Spinner from 'src/view/shared/Spinner'
import CandleStickChart from 'src/view/algorand/components/CandleStickChart'
import selectors from 'src/modules/algorand/assets/assetsSelectors'
import { ChartWindowWrapper, ChartWrapper, OptionButton, OptionButtonContainer, OptionButtonWrapper, RowBetween } from 'src/view/algorand/styled'

const AssetChart = ({ color }) => {

  // settings for the window and candle width
  const [chartFilter, setChartFilter] = useState(ASSET_CHART_VIEW.LIQUIDITY)
  const [frequency, setFrequency] = useState(DATA_FREQUENCY.HOUR)
  const [timeWindow, setTimeWindow] = useState(TIME_FRAME.WEEK)
  const prevWindow = usePrevious(timeWindow)

  const textColor = 'white';

  // let chartData = useTokenChartData(address)
  let chartData: any = useSelector(selectors.selectDailyAssetData);


  // hourly and daily price data based on the current time window
  // const hourlyWeek = useTokenPriceData(address, timeframeOptions.WEEK, 3600)
  // const hourlyMonth = useTokenPriceData(address, timeframeOptions.MONTH, 3600)
  // const hourlyAll = useTokenPriceData(address, timeframeOptions.ALL_TIME, 3600)
  // const dailyWeek = useTokenPriceData(address, timeframeOptions.WEEK, 86400)
  // const dailyMonth = useTokenPriceData(address, timeframeOptions.MONTH, 86400)
  // const dailyAll = useTokenPriceData(address, timeframeOptions.ALL_TIME, 86400)
  const priceData = useSelector(selectors.selectHourlyPrices)

  const below1080 = useMedia('(max-width: 1080px)')
  const below600 = useMedia('(max-width: 600px)')

  // let utcStartTime = getTimeframe(timeWindow)
  // const domain = [dataMin => (dataMin > utcStartTime ? dataMin : utcStartTime), 'dataMax']
  const aspect = below1080 ? 60 / 32 : below600 ? 60 / 42 : 60 / 22


  // update the width on a window resize
  const ref = useRef<HTMLElement>()
  const isClient = typeof window === 'object'
  // const [width, setWidth] = useState(ref?.current?.container?.clientWidth)
  const [width, setWidth] = useState(ref?.current?.clientWidth)
  const [height, setHeight] = useState(ref?.current?.clientHeight)

  useEffect(() => {
    if (!isClient) {
      return
    }
    function handleResize() {
      setWidth(ref?.current?.clientWidth ?? width)
      setHeight(ref?.current?.clientHeight ?? height)
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [isClient, width]) // Empty array ensures that effect is only run on mount and unmount

  return (
    <ChartWindowWrapper>
      <RowBetween
        mb={
          chartFilter === ASSET_CHART_VIEW.LIQUIDITY ||
          chartFilter === ASSET_CHART_VIEW.VOLUME ||
          chartFilter === ASSET_CHART_VIEW.PRICE
            ? 40
            : 0
        }
        align="flex-start"
      >
        <OptionButtonContainer>
          <OptionButton
            onClick={() => setChartFilter(ASSET_CHART_VIEW.LIQUIDITY)}
          >
            Liquidity
          </OptionButton>
          <OptionButton
            onClick={() => setChartFilter(ASSET_CHART_VIEW.VOLUME)}
          >
            Volume
          </OptionButton>
          <OptionButton
            onClick={() => setChartFilter(ASSET_CHART_VIEW.PRICE)}
          >
            Price
          </OptionButton>

          {/* <OptionButtonWrapper right="100px">
            <OptionButtonContainer>
              <OptionButton
              >
                1W
              </OptionButton>
              <OptionButton
              >
                1M
              </OptionButton>
              <OptionButton
              >
                ALL
              </OptionButton>
            </OptionButtonContainer>
          </OptionButtonWrapper>
          */}
        </OptionButtonContainer>
      </RowBetween>
      
      {chartFilter === ASSET_CHART_VIEW.PRICE && chartData && (
        <ResponsiveContainer aspect={aspect} ref={ref}>
          <CandleStickChart data={priceData} width={width} height={height} base={null} />
        </ResponsiveContainer>
      )}

      {chartFilter === ASSET_CHART_VIEW.VOLUME && chartData && (
        <ResponsiveContainer aspect={aspect}>
          <BarChart margin={{ top: 30, right: 10, bottom: 6, left: 10 }} barCategoryGap={1} data={chartData}>
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
              dataKey={'lastDayVolume'}
              fill={color}
              opacity={'0.5'}
              yAxisId={0}
              stroke={color}
            />
          </BarChart>
        </ResponsiveContainer>
      )}

      {chartFilter === ASSET_CHART_VIEW.LIQUIDITY && chartData && (
        <ResponsiveContainer aspect={aspect}>
          <AreaChart margin={{ top: 30, right: 10, bottom: 6, left: 0 }} barCategoryGap={1} data={chartData}>
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

export default AssetChart
