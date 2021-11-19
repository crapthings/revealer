import CpuWidget from '../components/cpuwidget'
import MemWidget from '../components/memwidget'
import OsWidget from '../components/oswidget'

import stores from '../stores'

export default () => {
  return (
    <div className='grid grid-rows-4 grid-cols-4 gap-4 max-h-screen h-screen font-sans font-thin'>
      <CpuWidget />

      <MemWidget />

      <OsWidget />

      <div className='col-span-2 bg-white'>
        4
      </div>

      <div className='bg-white'>
        5
      </div>

      <div className='bg-white'>
        6
      </div>

      <div className='bg-white'>
        7
      </div>

      <div className='bg-white'>
        8
      </div>

      <div className='bg-white'>
        9
      </div>

      <div className='bg-white'>
        10
      </div>

      <div className='bg-white'>
        11
      </div>

      <div className='bg-white'>
        12
      </div>
    </div>
  )
}

