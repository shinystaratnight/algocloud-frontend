import React, { useState, useRef, useEffect } from 'react';
import { darken } from 'polished';
import { useMedia } from 'react-use';
import {
  ResponsiveContainer,
} from 'recharts';

import { ASSET_CHART_VIEW } from 'src/modules/algorand/constants';
import {
  ChartWindowWrapper,
  Divider,
  OptionButton,
  OptionButtonBottomContainer,
  OptionButtonContainer,
  OptionButtonWrapper,
  RowBetween
} from 'src/view/algorand/styled';
import OverviewContent from 'src/view/overview/OverviewContent';

const OverviewAssetCard = (props) => {
  const {
    color,
    data,
    title = ''
  } = props;

  const togglePosition = JSON.parse(localStorage.getItem(data.assetId));

  const [chartFilter, setChartFilter] = useState(togglePosition === null ? ASSET_CHART_VIEW.LIQUIDITY : togglePosition.chartFilter);

  const below2000 = useMedia('(max-width: 2000px)');
  const below1080 = useMedia('(max-width: 1080px)');
  const below600 = useMedia('(max-width: 600px)');
  const aspect = below2000 ? 60 / 50 : below1080 ? 60 / 32 : below600 ? 60 / 42 : 60 / 22;

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
          chartFilter === ASSET_CHART_VIEW.VOLUME
        }
        align="flex-start"
      >

      </RowBetween>

      {chartFilter === ASSET_CHART_VIEW.VOLUME && data && (
        <ResponsiveContainer aspect={aspect}>
          <OverviewContent
            data={data}
            base={0}
            field={'lastDayVolume'}
            width={width}
            assetId={title}
          />
        </ResponsiveContainer>
      )}
      {chartFilter === ASSET_CHART_VIEW.LIQUIDITY && data && (
        <ResponsiveContainer aspect={aspect}>
          <OverviewContent
            data={data}
            base={0}
            field={'liquidity'}
            width={width}
            assetId={title}
          />
        </ResponsiveContainer>
      )}
      {chartFilter === ASSET_CHART_VIEW.MARKETCAP && data && (
        <ResponsiveContainer aspect={aspect}>
          <OverviewContent
            data={data}
            base={0}
            field={'marketCap'}
            width={width}
            assetId={title}
          />
        </ResponsiveContainer>
      )}
      <div style={{ height: '60px' }}></div>
      <OptionButtonBottomContainer className="chart-rack" >
        <OptionButtonContainer className="chart-buttons" style={{ textIndent: "0px" }}>
          <OptionButton className="chart-button"
            active={chartFilter === ASSET_CHART_VIEW.LIQUIDITY}
            onClick={() => {
              setChartFilter(ASSET_CHART_VIEW.LIQUIDITY);
              let togglePosition = {
                chartFilter: ASSET_CHART_VIEW.LIQUIDITY,
              };
              localStorage.setItem(data.assetId, JSON.stringify(togglePosition));
            }}
          >
            Liquidity
          </OptionButton>
          <OptionButton className="chart-button"
            active={chartFilter === ASSET_CHART_VIEW.VOLUME}
            onClick={() => {
              setChartFilter(ASSET_CHART_VIEW.VOLUME);
              let togglePosition = {
                chartFilter: ASSET_CHART_VIEW.VOLUME,
              };
              localStorage.setItem(data.assetId, JSON.stringify(togglePosition));
            }}
          >
            Volume
          </OptionButton>
          <OptionButton className="chart-button"
            active={chartFilter === ASSET_CHART_VIEW.MARKETCAP}
            onClick={() => {
              setChartFilter(ASSET_CHART_VIEW.MARKETCAP);
              let togglePosition = {
                chartFilter: ASSET_CHART_VIEW.MARKETCAP,
              };
              localStorage.setItem(data.assetId, JSON.stringify(togglePosition));
            }}
          >
            Market Cap
          </OptionButton>
        </OptionButtonContainer>
      </OptionButtonBottomContainer>
    </ChartWindowWrapper>
  );
}

export default OverviewAssetCard;
