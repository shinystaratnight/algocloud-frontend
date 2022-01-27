import React, { useState, useEffect, useRef } from 'react';
import { BusinessDay, createChart, IChartApi } from 'lightweight-charts';
import { usePrevious } from 'react-use';
import { Play } from 'react-feather';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { formattedNum } from 'src/modules/algorand/utils';
import { CHART_TYPES } from 'src/modules/algorand/constants';
import { GraphWrapper, IconWrapper } from 'src/view/algorand/styled';

dayjs.extend(utc);

const HEIGHT = 300;

const TradingViewChart = ({
  type = CHART_TYPES.BAR,
  data,
  base,
  field,
  title = '',
  width,
  utc = false,
  timeField = 'createdDate',
  useWeekly = false
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [chartCreated, setChartCreated] = useState<IChartApi | null>(null);
  const dataPrev = usePrevious(data);

  const formattedData = data?.map(entry => {
    return {
      time: utc ? dayjs.unix(entry[timeField]).utc().format('YYYY-MM-DD') : entry[timeField],
      value: parseFloat(entry[field])
    };
  });

  const topScale = type === CHART_TYPES.AREA ? 0.32 : 0.2;
  let rootb = document.getElementById("root")!;
  let styleb = window.getComputedStyle(rootb);
  let textColor = styleb.getPropertyValue('--algocloud-body-bg-2');

  useEffect(() => {
    if (data !== dataPrev && chartCreated) {
      let tooltip = document.getElementById('tooltip-id' + type);
      let node = document.getElementById('tradchart-id' + type);
      if (node && tooltip) {
        node.removeChild(tooltip);
      }
      chartCreated.resize(0, 0);
      setChartCreated(null);
    }
  }, [chartCreated, data, dataPrev, type]);

  useEffect(() => {
    if (!chartCreated && formattedData) {
      if (!ref.current) return;

      var chart = createChart(ref.current, {
        width: width,
        height: HEIGHT,
        layout: {
          backgroundColor: 'transparent',
          textColor: textColor
        },
        rightPriceScale: {
          scaleMargins: {
            top: topScale,
            bottom: 0
          },
          borderVisible: false
        },
        timeScale: {
          borderVisible: false
        },
        grid: {
          horzLines: {
            color: 'rgba(197, 203, 206, 0.5)',
            visible: false
          },
          vertLines: {
            color: 'rgba(197, 203, 206, 0.5)',
            visible: false
          }
        },
        crosshair: {
          horzLine: {
            visible: false,
            labelVisible: false
          },
          vertLine: {
            visible: true,
            style: 0,
            width: 2,
            color: 'rgba(32, 38, 46, 0.1)',
            labelVisible: false
          }
        },
        localization: {
          priceFormatter: val => formattedNum(val, true)
        }
      });

      var series =
        type === CHART_TYPES.BAR
          ? chart.addHistogramSeries({
            color: '#687dfd',
            priceFormat: {
              type: 'volume'
            },
            scaleMargins: {
              top: topScale,
              bottom: 0
            },
            // lineColor: '#687dfd',
            // lineWidth: 3
          }) :
          type === CHART_TYPES.AREA ?
          chart.addBaselineSeries({
            // topColor: '#d7829c',
            // bottomColor: 'rgba(112, 82, 64, 0)',
            // lineColor: '#d7829c',
            // lineWidth: 3
          }) :
          chart.addAreaSeries({
            topColor: '#687dfd',
            bottomColor: 'rgba(112, 82, 64, 0)',
            lineColor: '#687dfd',
            lineWidth: 3
          });

      series.setData(formattedData);
      var toolTip = document.createElement('div');
      toolTip.setAttribute('id', 'tooltip-id' + type);
      toolTip.className = 'three-line-legend';
      if (ref.current)
        ref.current.appendChild(toolTip);
      toolTip.style.display = 'block';
      toolTip.style.fontWeight = '500';
      toolTip.style.left = -4 + 'px';
      toolTip.style.top = '-' + 8 + 'px';
      toolTip.style.position = 'absolute';
      toolTip.style.zIndex = '100';
      toolTip.style.backgroundColor = 'transparent';

      toolTip.innerHTML =
        `<div style="font-size: 16px; margin: 4px 0px; color: ${textColor};">${title}</div>` +
        `<div style="font-size: 22px; margin: 4px 0px; color:${textColor}" >` +
        formattedNum(base ?? 0, true) +
        '</div>';

      chart.subscribeCrosshairMove(function (param) {
        if (
          param === undefined ||
          param.time === undefined ||
          param.point === undefined ||
          param.point.x < 0 ||
          param.point.x > width ||
          param.point.y < 0 ||
          param.point.y > HEIGHT
        ) {
          // setLastBarText()
        } else {
          const ts = param.time as BusinessDay;
          let dateStr = useWeekly
            ? dayjs(ts.year + '-' + ts.month + '-' + ts.day)
              .startOf('week')
              .format('MMMM D, YYYY') +
            '-' +
            dayjs(ts.year + '-' + ts.month + '-' + ts.day)
              .endOf('week')
              .format('MMMM D, YYYY')
            : dayjs(ts.year + '-' + ts.month + '-' + ts.day).format('MMMM D, YYYY');
          var price = param.seriesPrices.get(series);

          toolTip.innerHTML =
            `<div style="font-size: 16px; margin: 4px 0px; color: ${textColor};">${title}</div>` +
            `<div style="font-size: 22px; margin: 4px 0px; color: ${textColor}">` +
            formattedNum(price, true) +
            '</div>' +
            '<div>' +
            dateStr +
            '</div>';
        }
      });

      chart.timeScale().fitContent();

      setChartCreated(chart);
    }
  }, [
    base,
    chartCreated,
    data,
    formattedData,
    textColor,
    title,
    topScale,
    type,
    useWeekly,
    width
  ]);

  useEffect(() => {
    if (width) {
      chartCreated && chartCreated.resize(width, HEIGHT)
      chartCreated && chartCreated.timeScale().scrollToPosition(0, true)
    }
  }, [chartCreated, width]);

  return (
    <GraphWrapper>
      <div ref={ref} className="var-color" id={'tradchart-id' + type} />
      <IconWrapper>
        <Play
          onClick={() => {
            chartCreated && chartCreated.timeScale().fitContent()
          }}
        />
      </IconWrapper>
    </GraphWrapper>
  );
}

export default TradingViewChart;
