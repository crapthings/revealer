import _ from 'lodash'
import { useEffect, useRef } from 'react'
import Highcharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more.js'
import SolidGauge from 'highcharts/modules/solid-gauge.js'

HighchartsMore(Highcharts)
SolidGauge(Highcharts)

export default function MemWidget ({ mem }) {
  const percent = mem ? _.round((mem.free / mem.total) * 100) : 0
  return (
    <div className='flex flex-col bg-white'>
      <MemGaugeChart percent={percent} />

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
      chart.current.series[0].update({
        data: [percent]
      })
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
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor: 'red',
          innerRadius: '90%',
          outerRadius: '100%',
          shape: 'arc',
          borderColor: 'transparent'
        }
      },
      yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        labels: {
          enabled: false
        },
        stops: [
          [0.3, '#DF5353'], // red
          [0.6, '#DDDF0D'], // yellow
          [0.9, '#55BF3B'], // green
        ],
      },
      plotOptions: {
        solidgauge: {
          innerRadius: '90%',
          dataLabels: {
            // y: 0,
            borderWidth: 0,
            // useHTML: false
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
