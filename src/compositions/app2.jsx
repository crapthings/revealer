import _ from 'lodash'
import prettyBytes from 'pretty-bytes'
import ColorHash from 'color-hash'
import { Suspense, useEffect } from 'react'
import { FaApple } from 'react-icons/fa'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import Layout from '../components/layout'

import stores from '../stores'

const colorHash = new ColorHash({ saturation: .64 })

export default () => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  )
}

function Dashboard () {
  const {
    staticData,
    getStaticData,
  } = stores(({
    staticData,
    getStaticData,
  }) => ({
    staticData,
    getStaticData,
  }))

  console.log(staticData)

  useEffect(() => {
    getStaticData()
  }, [])

  if (!staticData) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <AiOutlineLoading3Quarters className='text-4xl animate-spin' />
      </div>
    )
  }

  return (
    <div>
      <OsWidget data={staticData?.os} />
      <CpuWidget data={staticData?.cpu} />
      <GpuWidget data={staticData?.graphics?.controllers} />
      <MemWidget data={staticData?.memLayout} />
      <DiskWidget data={staticData?.diskLayout} />
      <DisplayWidget data={staticData?.graphics?.displays} />
    </div>
  )
}


function OsWidget ({ data }) {
  return (
    <div className='flex items-center p-2 px-4 space-x-4 text-gray-600 bg-gray-100'>
      <div>
        <FaApple className='text-2xl' />
      </div>

      <div className='flex-1'>
        <div>{data?.codename}</div>
        <div className='text-xs'>{data?.release}</div>
      </div>

      <div className='text-right'>
        <div>{data?.distro}</div>
        <div className='text-xs'>{data?.build} {data?.platform}</div>
      </div>
    </div>
  )
}

function CpuWidget ({ data }) {
  const flags = data?.flags?.split(' ')

  return (
    <div>
      <h3 className='p-4'>CPU</h3>

      <div className='grid grid-cols-2 gap-4 mb-4 px-4'>
        <div className='flex items-center p-2 px-4 rounded-md text-white bg-blue-700 shadow-md'>
          <div className='flex-1'>
            <div className=''>{data?.brand}</div>
            <div className='text-sm'>{data?.manufacturer}</div>
          </div>
          <div className='text-lg'>{data?.speedMax} GHz</div>
        </div>

        <div className='grid grid-cols-3 gap-4'>
          <div className='flex items-center p-2 px-4 rounded-md bg-gray-200'>
            <div className='flex-1'>
              <div className=''>{(data?.cache?.l1i + data?.cache?.l1d) / 1024} KB</div>
              <div className='text-sm'>L1 cache</div>
            </div>
          </div>

          <div className='flex items-center p-2 px-4 rounded-md bg-gray-200'>
            <div className='flex-1'>
              <div className=''>{data?.cache?.l2 / 1024} KB</div>
              <div className='text-sm'>L2 cache</div>
            </div>
          </div>

          <div className='flex items-center p-2 px-4 rounded-md bg-gray-200'>
            <div className='flex-1'>
              <div className=''>{data?.cache?.l3 / 1024 / 1024} MB</div>
              <div className='text-sm'>L3 cache</div>
            </div>
            <div className='text-lg'></div>
          </div>
        </div>

        <div className='flex items-center p-2 px-4 rounded-md bg-gray-200'>
          <div className='flex-1'>
            <div className=''>Cores</div>
            <div className='text-sm'>physical</div>
          </div>
          <div className='text-lg'>{data?.physicalCores}</div>
        </div>

        <div className='flex items-center p-2 px-4 rounded-md bg-gray-200'>
          <div className='flex-1'>
            <div className=''>Threads</div>
            <div className='text-sm'>logical</div>
          </div>
          <div className='text-lg'>{data?.cores}</div>
        </div>
      </div>

      <div className='flex flex-wrap px-3'>
        {flags?.map((item) => (
          <div className='m-1 p-2 py-[1px] rounded-md text-xs text-white' style={{ backgroundColor: colorHash.hex(item) }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

function GpuWidget ({ data }) {
  return (
    <div>
      <h3 className='p-4'>GPU</h3>

      <div className='grid grid-cols-2 gap-4 mb-4 px-4'>
        {data?.map((item) => (
          <div className='flex items-center p-2 px-4 rounded-md bg-gray-200'>
            <div className='flex-1'>
              <div className=''>{item?.model}</div>
              <div className='text-sm'>{item?.vendor}</div>
            </div>
            <div className=''>{_.round(item?.vram / 1024, 0)} GB</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MemWidget ({ data }) {
  return (
    <div>
      <h3 className='p-4'>MEM</h3>

      <div className='grid grid-cols-2 gap-4 mb-4 px-4'>
        {data?.map((item) => (
          <div className='flex items-center p-2 px-4 rounded-md bg-gray-200'>
            <div className='flex-1'>
              <div className=''>{item?.type} {item?.clockSpeed}</div>
              <div className='text-sm'>{item?.manufacturer}</div>
            </div>
            <div className=''>{_.round(item?.size / 1024 / 1024 / 1024, 0)} GB</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DiskWidget ({ data }) {
  return (
    <div>
      <h3 className='p-4'>Disk</h3>

      <div className='grid grid-cols-2 gap-4 mb-4 px-4'>
        {data?.map((item) => (
          <div className='flex items-center p-2 px-4 rounded-md bg-gray-200'>
            <div className='flex-1'>
              <div className=''>{item?.type} {item?.interfaceType}</div>
              <div className='text-sm'>{item?.name}</div>
            </div>
            <div className=''>{_.round(item?.size / 1024 / 1024 / 1024, 0)} GB</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DisplayWidget ({ data }) {
  return (
    <div>
      <h3 className='p-4'>Display</h3>

      <div className='grid grid-cols-2 gap-4 mb-4 px-4'>
        {data?.map((item) => (
          <div className='flex items-center p-2 px-4 rounded-md bg-gray-200'>
            <div className='flex-1'>
              <div className=''>{item?.model}</div>
              <div className='text-sm'>{item?.vendor}</div>
            </div>
            <div className=''>{item?.resolutionX} x {item?.resolutionY}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
