import Highcharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more.js'
import SolidGauge from 'highcharts/modules/solid-gauge.js'

HighchartsMore(Highcharts)
SolidGauge(Highcharts)

import _ from 'lodash'
import c3 from 'c3'
import { Suspense, useEffect, useRef } from 'react'

import Loading from './loading'
import stores from '../stores'

export default function MemWidget () {
  const {
    mem,
    getMem,
  } = stores(({
    mem,
    getMem,
  }) => ({
    mem,
    getMem,
  }))

  useEffect(() => {
    const timer = setInterval(() => {
      getMem()
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!mem) {
    return <Loading />
  }

  return (
    <div className='flex flex-col bg-white'>
      <MemGaugeChart percent={(mem.free / mem.total) * 100} />

      <div className='flex-none flex text-center bg-gray-100'>
        <div className='flex-1 py-2'>
          <div className='text-sm'>{fmtByte(mem.free)}</div>
          <div className='text-xs'>free</div>
        </div>
        <div className='flex-1 py-2'>
          <div className='text-sm'>{fmtByte(mem.used)}</div>
          <div className='text-xs'>used</div>
        </div>
        <div className='flex-1 py-2'>
          <div className='text-sm'>{fmtByte(mem.total)}</div>
          <div className='text-xs'>total</div>
        </div>
      </div>
    </div>
  )
}

function MemGaugeChart ({ percent }) {
  const ref = useRef()
  const chart = useRef()

  useEffect(() => {
    if (chart.current) {
      return
    }

    chart.current = Highcharts.chart(ref.current, {
      chart: {
        type: 'solidgauge',
        backgroundColor: 'transparent',
        spacing: [0, 0, 0, 0]
      },
      title: null,
      credits: false,
      tooltip: {
        enabled: false,
      },
      pane: {
        center: ['50%', '70%'],
        size: '130%',
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor: '#fff',
          innerRadius: '95%',
          outerRadius: '100%',
          shape: 'arc',
          borderColor: 'transparent'
        }
      },
      yAxis: {
        stops: [
          [0.3, '#55BF3B'], // green
          [0.6, '#DDDF0D'], // yellow
          [0.9, '#DF5353'] // red
        ],
        plotLines: [
          {
            // from: 0,
            // to: 45,
            // color: '#89A54E',
            // outerRadius: '105%',
            // thickness: '25%'
            width: 5
          }
        ],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        labels: {
          enabled: false
        },
        min: 0,
        max: 100,
      },
      plotOptions: {
        solidgauge: {
          innerRadius: '95%',
          dataLabels: {
            y: 0,
            borderWidth: 0,
            useHTML: true
          }
        }
      },
      series: [{
        name: 'Speed',
        data: [percent]
      }]
    })
  }, [percent])

  return (
    <div ref={ref} className='flex-1 shadow-md'></div>
  )
}

function fmtByte (val) {
  return _.round(val / 1024 / 1024)
}
