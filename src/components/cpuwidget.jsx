import Highcharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more.js'
import SolidGauge from 'highcharts/modules/solid-gauge.js'

HighchartsMore(Highcharts)
SolidGauge(Highcharts)

import _ from 'lodash'

import { useEffect, useRef } from 'react'

export default function ({ cpu, currentLoad, cpuTemperature }) {
  return (
    <div className='row-span-2 col-span-2 flex flex-col text-white bg-blue-600'>
      <div className='flex-none'>1</div>
      <CpuCurrentLoad currentLoad={currentLoad} />
      <CpuLoadChart currentLoad={currentLoad} />
      <Cpu cpu={cpu} />
    </div>
  )
}

function Cpu ({ cpu }) {
  const l1 = (cpu.cache.l1i + cpu.cache.l1d).toString().length > 6
    ? `${(cpu.cache.l1i + cpu.cache.l1d) / 1024 / 1024} MB`
    : `${(cpu.cache.l1i + cpu.cache.l1d) / 1024} KB`

  const l2 = cpu.cache.l2.toString().length > 6
    ? `${cpu.cache.l2 / 1024 / 1024} MB`
    : `${cpu.cache.l2 / 1024} KB`

  const l3 = cpu.cache.l3.toString().length > 6
    ? `${cpu.cache.l3 / 1024 / 1024} MB`
    : `${cpu.cache.l3 / 1024} KB`

  return (
    <div className='flex-none grid grid-cols-5 gap-2 p-2 text-xs text-black'>
      <div className='col-span-2 p-2 rounded-md bg-white'>
        <div>{cpu.brand}</div>
        <div>{cpu.manufacturer}</div>
      </div>

      <div className='p-2 rounded-md bg-white'>
        <div>{cpu.speedMax} GHz</div>
        <div>Frequency</div>
      </div>

      <div className='p-2 rounded-md bg-white'>
        <div>{cpu.physicalCores} / {cpu.cores}</div>
        <div>Core / Threads</div>
      </div>

      <div className='p-2 rounded-md bg-white'>
        <div>{cpu.virtualization ? 'Yes' : 'No'}</div>
        <div>Virtualization</div>
      </div>

      <div className='col-span-2 grid grid-cols-3 gap-2'>
        <div className='p-2 rounded-md bg-white'>
          <div>{l1}</div>
          <div>L1</div>
        </div>

        <div className='p-2 rounded-md bg-white'>
          <div>{l2}</div>
          <div>L2</div>
        </div>

        <div className='p-2 rounded-md bg-white'>
          <div>{l3}</div>
          <div>L3</div>
        </div>
      </div>
    </div>
  )
}

function CpuCurrentLoad ({ currentLoad }) {
  return (
    <div className='overflow-auto flex-1 px-2'>
      <div className='grid grid-cols-8 gap-2 text-xs text-black'>
        {[...currentLoad.cpus].map((cpu) => (
          <div className='p-2 rounded-md bg-white'>{_.round(cpu.load)}%</div>
        ))}
      </div>
    </div>
  )
}

function CpuLoadChart ({ currentLoad }) {
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
        data: [currentLoad.currentLoad]
      }]
    })
  }, [currentLoad.currentLoad])

  return (
    <div ref={ref} className='flex-1'></div>
  )
}
