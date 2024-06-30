import { Accordion, AccordionItem } from '@nextui-org/react'
import React from 'react'

export const Title = ({name, desc}: {name: string, desc: string}) => {
  return (
    <div className='my-2 bg-blue-100 items-start rounded'>
      <Accordion>
        <AccordionItem key="1" aria-label={name} title={name} className=''>
            {desc}
        </AccordionItem>
        </Accordion>
    </div>
  )
}
