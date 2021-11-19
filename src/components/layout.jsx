import Nav from './nav'

export default function ({ children }) {
  return (
    <div className='flex min-h-screen bg-white font-sans subpixel-antialiased'>
      <div className='flex-1'>{children}</div>
    </div>
  )
}
