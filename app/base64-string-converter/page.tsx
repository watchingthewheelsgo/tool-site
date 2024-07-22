'use client'
import React from 'react'
import { toolCollection } from '../components/meta'
import { Card, CardBody, Textarea } from '@nextui-org/react'
import { Title } from '../components/Tool/Title'

const Page = () => {
  const toolMeta = toolCollection.convert.findLast((t) => t.key === 'base64')
  if (toolMeta === undefined) {
    return (
      <div>
        Will support soon...
      </div>
    )
  }
  const [inPlainValue, setInPlainValue] = React.useState("");
  const [inEncodedValue, setInEncodedValue] = React.useState("");
  return (
    <div className='sm:w-[600px] items-center justify-center'>
      <div className='flex flex-col'>
        <Title name={toolMeta.title} desc={toolMeta.desc} />
        <Card className='mt-10'>
          <CardBody className='py-4 '>
            <label className='text-md font-semibold mb-4'>String to Base64</label>
            <Textarea
              classNames={{
                label: "text-black mb-2",
                inputWrapper: "font-normal",
                input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
              size='md'
              variant='faded'
              label="String to encode"
              placeholder='Enter plain text to be encoded...'
              labelPlacement='outside'
              value={inPlainValue}
              onValueChange={setInPlainValue}
            />
            <Textarea
              readOnly
              classNames={{
                label: "text-black mt-4 mb-2",
                inputWrapper: "h-full font-normal text-default-500",
                input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
              label="Base64 encoded result"
              labelPlacement='outside'
              size='md'
              variant='faded'
              value={Buffer.from(inPlainValue).toString("base64")}
            />
          </CardBody>
        </Card>
        <Card className='mt-10'>
          <CardBody className='py-4 '>
            <label className='text-md font-semibold mb-4'>Base64 to string</label>
            <Textarea
              classNames={{
                label: "text-black mb-2",
                inputWrapper: "font-normal",
                input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
              size='md'
              variant='faded'
              label="String to decode"
              placeholder='Enter encoded text to be decoded...'
              labelPlacement='outside'
              value={inEncodedValue}
              onValueChange={setInEncodedValue}
            />
            <Textarea
              readOnly
              classNames={{
                label: "text-black mt-4 mb-2",
                inputWrapper: "h-full font-normal text-default-500",
                input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
              label="Decoded string result"
              labelPlacement='outside'
              size='md'
              variant='faded'
              value={Buffer.from(inEncodedValue, "base64").toString()}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Page