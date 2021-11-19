import Highcharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more.js'
import SolidGauge from 'highcharts/modules/solid-gauge.js'

HighchartsMore(Highcharts)
SolidGauge(Highcharts)

import _ from 'lodash'
import c3 from 'c3'


import { useEffect, useRef } from 'react'
import { FaApple } from 'react-icons/fa'

import Loading from './loading'
import stores from '../stores'

export default function () {
  return (
    <div className='row-span-2 col-span-2 flex flex-col text-white bg-blue-600'>
      <div className='flex-none'>1</div>
      <CpuCurrentLoadContainer>
      {(cpuCurrentLoad) => (
        <>
          <CpuCurrentLoad cpuCurrentLoad={cpuCurrentLoad} />
          <CpuLoadChart cpuCurrentLoad={cpuCurrentLoad} />
        </>
      )}
      </CpuCurrentLoadContainer>
      <Cpu />
    </div>
  )
}

function Cpu () {
  const cpu = stores(state => state.cpu)
  const getCpu = stores(state => state.getCpu)

  useEffect(() => {
    getCpu()
  }, [])

  if (!cpu) {
    return null
  }

  // console.log(JSON.stringify(cpu, null, 2))

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

function CpuCurrentLoadContainer ({ children }) {
  const cpuCurrentLoad = stores(state => state.cpuCurrentLoad)
  const getCpuCurrentLoad = stores(state => state.getCpuCurrentLoad)

  useEffect(() => {
    const timer = setInterval(() => {
      getCpuCurrentLoad()
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  if (!cpuCurrentLoad) {
    return null
  }

  // console.log(JSON.stringify(cpuCurrentLoad, null, 2))

  return children(cpuCurrentLoad)
}

function CpuCurrentLoad ({ cpuCurrentLoad }) {
  return (
    <div className='overflow-auto flex-1 px-2'>
      <div className='grid grid-cols-8 gap-2 text-xs text-black'>
        {[...cpuCurrentLoad.cpus, ...cpuCurrentLoad.cpus, ...cpuCurrentLoad.cpus, ...cpuCurrentLoad.cpus, ...cpuCurrentLoad.cpus, ...cpuCurrentLoad.cpus, ...cpuCurrentLoad.cpus, ...cpuCurrentLoad.cpus].map((cpu) => (
          <div className='p-2 rounded-md bg-white'>{_.round(cpu.load)}%</div>
        ))}
      </div>
    </div>
  )
}

function CpuLoadChart ({ cpuCurrentLoad }) {
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
        data: [45]
      }]
    })
  }, [cpuCurrentLoad.currentLoad])

  return (
    <div ref={ref} className='flex-1'></div>
  )
}
