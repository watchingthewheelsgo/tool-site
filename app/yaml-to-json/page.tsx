'use client'
import { parse as parseYaml } from 'yaml';
import React from 'react'
import { toolCollection } from '../components/meta'
import { Card, CardBody, Divider, Input, Spacer, Textarea } from '@nextui-org/react'
import { Title } from '../components/Tool/Title'
import { withDefaultOnError } from '@/utils/default'


function transformer(value: string) {
  if (value == "") return ""
  return withDefaultOnError(() => {
    const obj = parseYaml(value);
    return obj ? JSON.stringify(obj, null, 3) : 'error';
  }, 'error');
}


const Page = () => {
  const toolMeta = toolCollection.convert.findLast((t) => t.key === 'yaml2json')
  if (toolMeta === undefined) {
    return (
      <div>
        Will support soon...
      </div>
    )
  }
  const [inPlainValue, setInPlainValue] = React.useState("");
  return (
    <div className='sm:w-[600px] items-center justify-center'>
      <div className='flex flex-col'>
        <Title name={toolMeta.title} desc={toolMeta.desc} />
        <Card className='mt-10'>
          <CardBody className='py-4 '>
            <label className='text-black text-md my-4 font-semibold'> Input your YAML</label>
            <Textarea
              disableAnimation
              disableAutosize
              classNames={{
                label: "text-black mb-2",
                inputWrapper: "font-normal",
                input: 'resize-y min-h-[240px] focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
              size='md'
              variant='faded'
              placeholder='Enter yaml text to be converted...'
              labelPlacement='outside'
              value={inPlainValue}
              onValueChange={setInPlainValue}
            />
            <label className='text-black text-md my-4 font-semibold'>JSON from YAML</label>
            <Textarea
              readOnly
              classNames={{
                label: "text-black mb-2",
                inputWrapper: "font-normal",
                input: 'min-h-[240px] focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
              size='md'
              variant='faded'
              placeholder='Find output json here...'
              labelPlacement='outside'
              value={transformer(inPlainValue)}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Page