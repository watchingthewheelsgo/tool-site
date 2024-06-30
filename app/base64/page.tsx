'use client'
import { Divider, Select, SelectItem, Textarea, Selection } from '@nextui-org/react'
import React from 'react'
import { Title } from '../components/Tool/Title';
import { Buffer } from "buffer";

const page = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [modeValue, setModeValues] = React.useState<Selection>(new Set([]));

  const name: string = 'Base64 Encode and Decode'
  const description: string = "Base64 encoding is a process that converts binary data (such as images or text) into a string of \
  characters using only ASCII letters, numbers, and symbols, allowing for efficient transmission over \
  text-based protocols, while Base64 decoding reverses this process by converting the encoded string \
  back into its original binary form"
  const modeOptions = ["Encode", "Decode"]
  return (
    <section>
      <div className='px-2 md:px-4'>
        <Title name={name} desc={description} />
        <Divider />
        <div className='w-full items-start flex space-x-4'>
          <label className='capitalize mt-5'>Options</label>
          <Divider orientation="vertical" />
          <Select
            disallowEmptySelection
            defaultSelectedKeys={'Decode'}
            label="mode"
            className="max-w-24 my-1 items-center"
            selectedKeys={modeValue}
            selectionMode='single'
            onSelectionChange={setModeValues}
          >
            {modeOptions.map((mode) => (
              <SelectItem key={mode}>
                {mode}
              </SelectItem>
            ))}
          </Select>
        </div>
        <Divider />
        <div className='mt-4 grid grid-cols-4 gap-6 '>
          <label className='col-span-2'>
            Input
          </label>
          <label className='col-span-2'>
            Output
          </label>
        </div>
        <div className='grid grid-cols-4 grid-rows-4 md:gap-6 gap-4'>
          <Textarea
            className='col-span-2 row-span-2'
            variant="bordered"
            label=""
            placeholder="Type (or paste) here"
            value={inputValue}
            onValueChange={setInputValue}
          />
          <Textarea
            readOnly
            className='col-span-2 row-span-2'
            variant="bordered"
            label=""
            placeholder="Find result here"
            value={base64(modeValue, inputValue)}
          />
        </div>
      </div>
    </section>
  )
}

function base64(mode: Selection, value: string) {
  const tmp = mode as Set<string>
  console.log(tmp, tmp.entries)
  if (tmp.has('Decode')) {
    return Buffer.from(value, "base64").toString()
  } 
  return Buffer.from(value).toString("base64")
}

export default page