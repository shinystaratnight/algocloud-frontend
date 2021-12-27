import React, { useState, useEffect, useRef } from 'react'
import { BarPrices, createChart, CrosshairMode, IChartApi, UTCTimestamp } from 'lightweight-charts'
import dayjs from 'dayjs'
import { formattedNum } from 'src/modules/algorand/utils'
import { usePrevious } from 'react-use'
import { Play } from 'react-feather'
import { IconWrapper } from 'src/view/algorand/styled'

const CandleStickChart = ({
  data,
  width,
  height = 300,
  base,
  margin = true,
  valueFormatter = val => formattedNum(val, true)
}) => {
  // reference for DOM element to create with chart
  const ref = useRef<HTMLDivElement>(null)

  const formattedData = data?.map(entry => {
    return {
      time: parseFloat(entry.timestamp),
      open: parseFloat(entry.open),
      low: parseFloat(entry.open),
      close: parseFloat(entry.close),
      high: parseFloat(entry.close)
    }
  })

  if (formattedData && formattedData.length > 0) {
    formattedData.push({
      time: dayjs().unix(),
      open: parseFloat(formattedData[formattedData.length - 1].close),
      close: parseFloat(formattedData[formattedData.length - 1].close),
      low: parseFloat(formattedData[formattedData.length - 1].close),
      high: parseFloat(formattedData[formattedData.length - 1].close)
    })
  }

  // pointer to the chart object
  const [chartCreated, setChartCreated] = useState<IChartApi | null>(null)
  const dataPrev = usePrevious(data)

  // const [darkMode] = useDarkModeManager()
  const darkMode = 'white';
  const textColor = darkMode ? 'white' : 'black'
  const previousTheme = usePrevious(darkMode)

  // reset the chart if theme switches
  useEffect(() => {
    if (chartCreated && previousTheme !== darkMode) {
      // remove the tooltip element
      let tooltip = document.getElementById('tooltip-id')
      let node = document.getElementById('test-id')
      if (node && tooltip)
        node.removeChild(tooltip)
      chartCreated.resize(0, 0)
      setChartCreated(null)
    }
  }, [chartCreated, previousTheme])

  useEffect(() => {
    if (data !== dataPrev && chartCreated) {
      // remove the tooltip element
      let tooltip = document.getElementById('tooltip-id')
      let node = document.getElementById('test-id')
      if (node && tooltip)
        node.removeChild(tooltip)
      chartCreated.resize(0, 0)
      setChartCreated(null)
    }
  }, [chartCreated, data, dataPrev])

  // if no chart created yet, create one with options and add to DOM manually
  useEffect(() => {
    if (!chartCreated) {
      if (!ref.current) return;

      const chart = createChart(ref.current, {
        width: width,
        height: height,
        layout: {
          backgroundColor: 'transparent',
          textColor: textColor
        },
        grid: {
          vertLines: {
            color: 'rgba(197, 203, 206, 0.5)'
          },
          horzLines: {
            color: 'rgba(197, 203, 206, 0.5)'
          }
        },
        crosshair: {
          mode: CrosshairMode.Normal
        },
        rightPriceScale: {
          borderColor: 'rgba(197, 203, 206, 0.8)',
          visible: true
        },
        timeScale: {
          borderColor: 'rgba(197, 203, 206, 0.8)'
        },
        localization: {
          priceFormatter: val => formattedNum(val)
        }
      })

      var candleSeries = chart.addCandlestickSeries({
        upColor: 'green',
        downColor: 'red',
        borderDownColor: 'red',
        borderUpColor: 'green',
        wickDownColor: 'red',
        wickUpColor: 'green'
      })

      candleSeries.setData(formattedData)

      var toolTip = document.createElement('div')
      toolTip.setAttribute('id', 'tooltip-id')
      toolTip.className = 'three-line-legend'
      ref.current.appendChild(toolTip)
      toolTip.style.display = 'block'
      toolTip.style.left = (margin ? 16 : 10) + 'px'
      toolTip.style.top = 5 + 'px'
      toolTip.style.backgroundColor = 'transparent'
      toolTip.style.position = 'absolute'

      // get the title of the chart
      toolTip.innerHTML = base
        ? `<div style="font-size: 18px; margin: 4px 0px; color: ${textColor}">` + valueFormatter(base) + '</div>'
        : ''

      // update the title when hovering on the chart
      chart.subscribeCrosshairMove(function(param) {
        if (
          param === undefined ||
          param.time === undefined ||
          param.point === undefined ||
          param.point.x < 0 ||
          param.point.x > width ||
          param.point.y < 0 ||
          param.point.y > height
        ) {
          toolTip.innerHTML = base
            ? `<div style="font-size: 18px; margin: 4px 0px; color: ${textColor}">` + valueFormatter(base) + '</div>'
            : ''
        } else {
          if (param === undefined || param.seriesPrices === undefined) return;
          if (candleSeries === undefined) return;

          const ts = param.time as UTCTimestamp;
          var price = (param.seriesPrices.get(candleSeries) as BarPrices).close
          const time = dayjs.unix(ts).format('MM/DD h:mm A')
          toolTip.innerHTML =
            `<div style="font-size: 18px; margin: 4px 0px; color: ${textColor}">` +
            price +
            `<span style="font-size: 12px; margin: 4px 6px; color: ${textColor}">` +
            time +
            ' UTC' +
            '</span>' +
            '</div>'
        }
      })

      chart.timeScale().fitContent()

      setChartCreated(chart)
    }
  }, [chartCreated, formattedData, width, height, valueFormatter, base, margin, textColor])

  // responsiveness
  useEffect(() => {
    if (width) {
      chartCreated && chartCreated.resize(width, height)
      chartCreated && chartCreated.timeScale().scrollToPosition(0, true)
    }
  }, [chartCreated, height, width])

  return (
    <div className='position-relative'>
      <div ref={ref} id="test-id" />
      <IconWrapper>
        <Play
          onClick={() => {
            chartCreated && chartCreated.timeScale().fitContent()
          }}
        />
      </IconWrapper>
    </div>
  )
}

export default CandleStickChart
