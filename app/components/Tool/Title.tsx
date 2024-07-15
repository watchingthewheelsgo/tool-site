import { Button, Divider } from '@nextui-org/react'
import React from 'react'
import { UnLikeIcon } from '../icons'

export const Title = ({ name, desc }: { name: string, desc: string }) => {
  return (
    <div className='flex justify-between'>
      <div>
        <h1 className='text-3xl'>
          {name}
        </h1>
        <Divider className='my-1' orientation='horizontal'/>
        <p className='text-gray '>
          {desc}
        </p>
      </div>
      <Button isIconOnly color="default" aria-label="Like" size='sm'>
        <UnLikeIcon className=''/>
      </Button>
    </div>
  )
}
