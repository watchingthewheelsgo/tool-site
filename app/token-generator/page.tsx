'use client'
import React from 'react'
import { Title } from '../components/Tool/Title'
import { Card, CardBody, Slider, SliderValue, Switch, Textarea } from '@nextui-org/react'
import { shuffleString } from '@/utils/random';
import { toolCollection } from '../components/meta';

const Page = () => {
  const toolMeta = toolCollection.crypto.findLast((t) => t.key === 'token')
  if (toolMeta === undefined) {
    return (
      <div>
        Will support soon...
      </div>
    )
  }
  const [uppercaseS, setUppercaseS] = React.useState(true);
  const [lowercaseS, setLowercaseS] = React.useState(true);
  const [numerS, setNumberS] = React.useState(true);
  const [symbolS, setSymbolS] = React.useState(true);
  const [tokenLength, setTokenLength] = React.useState<SliderValue>(128);
  return (
    <div className='sm:w-[600px] items-center justify-center'>
      <div className='flex flex-col'>
        <Title name={toolMeta.title} desc={toolMeta.desc} />
        <Card className='mt-10'>
          <CardBody className='py-4 '>
            <div className='grid grid-cols-2 grid-rows-2 gap-2 justify-center'>
              <Switch
                defaultSelected
                isSelected={uppercaseS}
                onValueChange={setUppercaseS}
                className='col-span-1 row-span-1'>
                Uppercase (ABC...)
              </Switch>

              <Switch defaultSelected
                isSelected={numerS}
                onValueChange={setNumberS}
                className='col-span-1'>
                Numbers (123...)
              </Switch>
              <Switch
                defaultSelected
                isSelected={lowercaseS}
                onValueChange={setLowercaseS}
                className='col-span-1 row-span-1 mt-2'>
                Lowercase (abc...)
              </Switch>
              <Switch
                defaultSelected
                isSelected={symbolS}
                onValueChange={setSymbolS}
                className='col-span-1'>
                Symbols (!-;...)
              </Switch>
            </div>

            <Slider
              label="token length"
              step={1}
              maxValue={512}
              minValue={1}
              value={tokenLength}
              onChange={setTokenLength}
              className="max-w-full my-8"
            />
            <Textarea
              readOnly
              classNames={{
                inputWrapper: "h-full font-normal text-default-500",
                input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
              size='md'
              variant='faded'
              value={createToken({
                withUppercase: uppercaseS,
                withLowercase: lowercaseS,
                withNumbers: numerS,
                withSymbols: symbolS,
                length: tokenLength as number
              })}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

function createToken({
  withUppercase,
  withLowercase,
  withNumbers,
  withSymbols,
  length,
  alphabet,
}: {
  withUppercase: boolean
  withLowercase: boolean
  withNumbers: boolean
  withSymbols: boolean
  length: number
  alphabet?: string
}) {
  const allAlphabet = alphabet ?? [
    withUppercase ? 'ABCDEFGHIJKLMOPQRSTUVWXYZ' : '',
    withLowercase ? 'abcdefghijklmopqrstuvwxyz' : '',
    withNumbers ? '0123456789' : '',
    withSymbols ? '.,;:!?./-"\'#{([-|\\@)]=}*+' : '',
  ].join('');

  return shuffleString(allAlphabet.repeat(length)).substring(0, length);
}

export default Page