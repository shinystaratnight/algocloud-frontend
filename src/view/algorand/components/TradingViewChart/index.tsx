import React, { useState, useEffect, useRef } from 'react'
import { BusinessDay, createChart, IChartApi } from 'lightweight-charts'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import styled from 'styled-components'
import { usePrevious } from 'react-use'
import { Play } from 'react-feather'
import { formattedNum } from 'src/modules/algorand/utils'

dayjs.extend(utc)

export const CHART_TYPES = {
  BAR: 'BAR',
  AREA: 'AREA'
}

const Wrapper = styled.div`
  position: relative;
  padding-top: 58px;
`

export const IconWrapper = styled.div`
  position: absolute;
  right: 0;
  border-radius: 3px;
  height: 16px;
  width: 16px;
  padding: 0px;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text1};

  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

// constant height for charts
const HEIGHT = 300

const TradingViewChart = ({
  type = CHART_TYPES.BAR,
  data,
  base,
  field,
  title,
  width,
  timeField = 'createdDate',
  useWeekly = false
}) => {
  // reference for DOM element to create with chart
  const ref = useRef<HTMLDivElement>(null)

  // pointer to the chart object
  const [chartCreated, setChartCreated] = useState<IChartApi | null>(null)
  const dataPrev = usePrevious(data)

  // parese the data and format for tardingview consumption
  const formattedData = data?.map(entry => {
    return {
      time: entry[timeField],
      value: parseFloat(entry[field])
    }
  })

  // adjust the scale based on the type of chart
  const topScale = type === CHART_TYPES.AREA ? 0.32 : 0.2

  const textColor = 'white'

  // reset the chart if them switches
  useEffect(() => {
    if (data !== dataPrev && chartCreated) {
      // remove the tooltip element
      let tooltip = document.getElementById('tooltip-id' + type)
      let node = document.getElementById('tradchart-id' + type)
      if (node && tooltip) {
        node.removeChild(tooltip)
      }
      chartCreated.resize(0, 0)
      setChartCreated(null)
    }
  }, [chartCreated, data, dataPrev, type])

  // if no chart created yet, create one with options and add to DOM manually
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
      })

      var series =
        type === CHART_TYPES.BAR
          ? chart.addHistogramSeries({
              color: '#8be1ea',
              priceFormat: {
                type: 'volume'
              },
              scaleMargins: {
                top: 0.32,
                bottom: 0
              },
              // lineColor: '#8be1ea',
              // lineWidth: 3
            })
          : chart.addAreaSeries({
              topColor: '#8be1ea',
              bottomColor: 'rgba(112, 82, 64, 0)',
              lineColor: '#8be1ea',
              lineWidth: 3
            })

      series.setData(formattedData)
      var toolTip = document.createElement('div')
      toolTip.setAttribute('id', 'tooltip-id' + type)
      toolTip.className = 'three-line-legend'
      if (ref.current)
        ref.current.appendChild(toolTip)
      toolTip.style.display = 'block'
      toolTip.style.fontWeight = '500'
      toolTip.style.left = -4 + 'px'
      toolTip.style.top = '-' + 8 + 'px'
      toolTip.style.position = 'absolute'
      toolTip.style.backgroundColor = 'transparent'

      // get the title of the chart
      toolTip.innerHTML =
        `<div style="font-size: 16px; margin: 4px 0px; color: ${textColor};">${title}</div>` +
        `<div style="font-size: 22px; margin: 4px 0px; color:${textColor}" >` +
        formattedNum(base ?? 0, true) +
        '</div>'

      // update the title when hovering on the chart
      chart.subscribeCrosshairMove(function(param) {
        
        if (
          param === undefined ||
          param.time === undefined ||
          param.point == undefined ||
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
            : dayjs(ts.year + '-' + ts.month + '-' + ts.day).format('MMMM D, YYYY')
          var price = param.seriesPrices.get(series)

          toolTip.innerHTML =
            `<div style="font-size: 16px; margin: 4px 0px; color: ${textColor};">${title}</div>` +
            `<div style="font-size: 22px; margin: 4px 0px; color: ${textColor}">` +
            formattedNum(price, true) +
            '</div>' +
            '<div>' +
            dateStr +
            '</div>'
        }
      })

      chart.timeScale().fitContent()

      setChartCreated(chart)
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
  ])

  // responsiveness
  useEffect(() => {
    if (width) {
      chartCreated && chartCreated.resize(width, HEIGHT)
      chartCreated && chartCreated.timeScale().scrollToPosition(0, true)
    }
  }, [chartCreated, width])

  return (
    <Wrapper>
      <div ref={ref} id={'tradchart-id' + type} />
      <IconWrapper>
        <Play
          onClick={() => {
            chartCreated && chartCreated.timeScale().fitContent()
          }}
        />
      </IconWrapper>
    </Wrapper>
  )
}

export default TradingViewChart
