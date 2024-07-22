'use client'
import React from 'react'
import { ulid } from 'ulid'
import _ from 'lodash'
import { Title } from '../components/Tool/Title';
import { Card, CardBody, Divider, Radio, RadioGroup, Slider, SliderValue, Switch, Textarea } from '@nextui-org/react';
import { toolCollection } from '../components/meta';

const Page = () => {
  const toolMeta = toolCollection.crypto.findLast((t) => t.key === 'ulid')
  if (toolMeta === undefined) {
    return (
      <div>
        Will support soon...
      </div>
    )
  }
  const [outputNumber, setOutputNumber] = React.useState<SliderValue>(5);
  const [versionRadio, setVersionRadio] = React.useState("raw");
  return (
    <div className='sm:w-[600px] items-center justify-center'>
      <div className='flex flex-col'>
        <Title name={toolMeta.title} desc={toolMeta.desc} />
        <Card className='mt-10'>
          <CardBody className='py-4 '>
            <Slider
              label="Number"
              step={1}
              maxValue={100}
              minValue={1}
              value={outputNumber}
              onChange={setOutputNumber}
              className="max-w-full"
            />
            <Divider orientation='horizontal' className='my-2' />
            <div className=''>
              <RadioGroup
                label="Format"
                orientation="horizontal"
                classNames={{
                  label: "text-black text-md"
                }}
                value={versionRadio}
                onValueChange={setVersionRadio}
              >
                <Radio value="raw">Raw</Radio>
                <Radio value="json">Json</Radio>
              </RadioGroup>
            </div>
            <Divider orientation='horizontal' className='my-4' />
            <Textarea
              readOnly
              classNames={{
                inputWrapper: "h-full font-normal text-default-500",
                input: 'min-h-[240px] focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
              size='md'
              variant='faded'
              value={generateUlid(outputNumber as number, versionRadio)}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

function generateUlid(n: number, format: string) {
  const ids = _.times(n, () => ulid());
  if (format=== 'json') {
    return JSON.stringify(ids, null, 2);
  }

  return ids.join('\n');
}

export default Page