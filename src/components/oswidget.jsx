import { FaApple } from 'react-icons/fa'

const bg = {
  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='308' height='168' preserveAspectRatio='none' viewBox='0 0 308 168'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1069%26quot%3b)' fill='none'%3e%3crect width='308' height='168' x='0' y='0' fill='rgba(75%2c 85%2c 99%2c 1)'%3e%3c/rect%3e%3cpath d='M66.54 199.43C117.44 186.21 136.08 47.39 211.13 46.64 286.17 45.89 315.35 116.91 355.71 118.88' stroke='rgba(156%2c 163%2c 175%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M170.82 188.8C211.73 166.11 212.85 30.65 266.37 27.92 319.88 25.19 333.32 88.91 361.91 91.76' stroke='rgba(156%2c 163%2c 175%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M131.3 185.99C161.95 171.58 148.03 73.68 206.29 73.15 264.55 72.62 316.59 124.5 356.27 125.23' stroke='rgba(156%2c 163%2c 175%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M26.59 188.14C57.65 183.41 73.37 109.77 124.34 109.16 175.32 108.55 173.22 130.16 222.1 130.16 270.97 130.16 294.85 109.28 319.85 109.16' stroke='rgba(156%2c 163%2c 175%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M151.16 171.53C174.01 165.95 157.56 110.45 216.93 104.26 276.31 98.07 311.6 38.97 348.48 37.06' stroke='rgba(156%2c 163%2c 175%2c 1)' stroke-width='2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1069'%3e%3crect width='308' height='168' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e")`
}

export default function ({ osInfo }) {
  return (
    <div className='flex flex-col text-xs text-white bg-cover bg-no-repeat bg-center' style={{ ...bg }}>
      <div className='p-2'>
        <div className='text-sm'>{osInfo.codename}</div>
        <div>{osInfo.release}</div>
      </div>

      <div className='flex-1 flex justify-center items-center'>
        <FaApple className='text-6xl text-white filter drop-shadow-xl' />
      </div>

      <div className='flex justify-end place-items-end p-2'>
        <div>{osInfo.arch}</div>
      </div>
    </div>
  )
}
