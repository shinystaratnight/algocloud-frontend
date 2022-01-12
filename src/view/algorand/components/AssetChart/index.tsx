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
import { ASSET_CHART_VIEW } from 'src/modules/algorand/constants';
import CandleStickChart from 'src/view/algorand/components/CandleStickChart';
import {
  ChartWindowWrapper,
  OptionButton,
  OptionButtonContainer,
  RowBetween
} from 'src/view/algorand/styled';

const AssetChart = (props) => {
  const {
    color,
    assetData,
    priceData,
  } = props;

  const [chartFilter, setChartFilter] = useState(ASSET_CHART_VIEW.LIQUIDITY);
  
  const below1080 = useMedia('(max-width: 1080px)');
  const below600 = useMedia('(max-width: 600px)');
  const aspect = below1080 ? 60 / 32 : below600 ? 60 / 42 : 60 / 22;
  
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
        <OptionButtonContainer>
          <OptionButton
            active={chartFilter === ASSET_CHART_VIEW.LIQUIDITY}
            onClick={() => setChartFilter(ASSET_CHART_VIEW.LIQUIDITY)}
          >
            Liquidity
          </OptionButton>
          <OptionButton
            active={chartFilter === ASSET_CHART_VIEW.VOLUME}
            onClick={() => setChartFilter(ASSET_CHART_VIEW.VOLUME)}
          >
            Volume
          </OptionButton>
          <OptionButton
            active={chartFilter === ASSET_CHART_VIEW.PRICE}
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
      
      {chartFilter === ASSET_CHART_VIEW.PRICE && assetData && (
        <ResponsiveContainer aspect={aspect} ref={ref}>
          <CandleStickChart
            data={priceData}
            width={width}
            base={null}
            paddingTop='0'
            valueFormatter={(val) => val.toFixed(4)}
          />
        </ResponsiveContainer>
      )}

      {chartFilter === ASSET_CHART_VIEW.VOLUME && assetData && (
        <ResponsiveContainer aspect={aspect}>
          <BarChart margin={{ top: 30, right: 10, bottom: 6, left: 10 }} barCategoryGap={1} data={assetData}>
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
              tickFormatter={tick => '$' + toK(tick)}
              tickLine={false}
              orientation="right"
              interval="preserveEnd"
              minTickGap={80}
              yAxisId={0}
              tick={{ fill: 'var(--algocloud-body-bg-2)' }}
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

      {chartFilter === ASSET_CHART_VIEW.LIQUIDITY && assetData && (
        <ResponsiveContainer aspect={aspect}>
          <AreaChart margin={{ top: 30, right: 10, bottom: 6, left: 0 }} barCategoryGap={1} data={assetData}>
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
    </ChartWindowWrapper>
  );
}

export default AssetChart;
