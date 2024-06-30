import Image from 'next/image'
import Link from 'next/link'
import XLogo from 'public/svgs/cancel-svgrepo-com.svg'

const Logo = () => {
  return (
    <Link href='/' className='flex items-center text-dark w-1/8 h-7/8'>
        <div className='w-16 rounded-full overflow-hidden border border-solid border-dark mr-4'>
            <Image 
              src={XLogo}
              alt='x-tools'
              className='w-full h-auto rounded-full'
            />
        </div>
        <span className='font-bold text-xl'>X-Tools</span>
    </Link>
  )
}

export default Logo