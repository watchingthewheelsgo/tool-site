'use client'
import React from 'react'
import { Title } from '../components/Tool/Title'
import { Card, CardBody, Divider, Input, Radio, RadioGroup, Select, Selection, SelectItem, Slider, SliderValue, Textarea } from '@nextui-org/react'

import type { lib } from 'crypto-js';
import {
  HmacMD5,
  HmacRIPEMD160,
  HmacSHA1,
  HmacSHA224,
  HmacSHA256,
  HmacSHA3,
  HmacSHA384,
  HmacSHA512,
  algo,
  enc,
} from 'crypto-js';
import { toolCollection } from '../components/meta';
import assert from 'assert';

export function convertHexToBin(hex: string) {
  return hex
    .trim()
    .split('')
    .map(byte => Number.parseInt(byte, 16).toString(2).padStart(4, '0'))
    .join('');
}

type Encoding = keyof typeof enc | 'Bin';

function formatWithEncoding(words: lib.WordArray, encoding: Encoding) {
  if (encoding === 'Bin') {
    return convertHexToBin(words.toString(enc.Hex));
  }
  return words.toString(enc[encoding]);
}

const outputEncoding = [
  {
    label: 'Binary (base 2)',
    value: 'Bin',
  },
  {
    label: 'Hexadecimal (base 16)',
    value: 'Hex',
  },
  {
    label: 'Base64 (base 64)',
    value: 'Base64',
  },
  {
    label: 'Base64-url (base 64 with url safe chars)',
    value: 'Base64url',
  },
]
const hashFunctions = {
  MD5: HmacMD5,
  RIPEMD160: HmacRIPEMD160,
  SHA1: HmacSHA1,
  SHA3: HmacSHA3,
  SHA224: HmacSHA224,
  SHA256: HmacSHA256,
  SHA384: HmacSHA384,
  SHA512: HmacSHA512,
} as const;

function hmac(name: string, plain: string, secret: string, encoding: string) {
  const func = (name: string) => {
    switch (name) {
      case "MD5": hashFunctions.MD5
      case "RIPEMD160": return hashFunctions.RIPEMD160
      case "SHA1": return hashFunctions.SHA1
      case "SHA3": return hashFunctions.SHA3
      case "SHA224": return hashFunctions.SHA224
      case "SHA256": return hashFunctions.SHA256
      case "SHA384": return hashFunctions.SHA384
      case "SHA512": return hashFunctions.SHA512
    }
    return hashFunctions.MD5
  }
  const encodingFunc = (encoding: string) => {
    switch (encoding) {
      case "HEX": return 'HEX' as Encoding
      case "Base64": return 'Base64' as Encoding
      case "Base64url": return 'Base64url' as Encoding
      case "Bin": return 'Bin' as Encoding
    }
    return 'Hex' as Encoding
  }
  return formatWithEncoding(func(name)(plain, secret), encodingFunc(encoding))
}


const Page = () => {
  const toolMeta = toolCollection.crypto.findLast((t) => t.key === 'hmac')
  if (toolMeta === undefined) {
    return (
      <div>
        Will support soon...
      </div>
    )
  }
  const [inputTextValue, setInputTextValue] = React.useState("");
  const [inputSecretValue, setInputSecretValue] = React.useState("");
  const [hashFunctionValue, setHashFunctionValue] = React.useState<string>("SHA1");
  const [encodingnValue, setEncodingValue] = React.useState<string>(outputEncoding[0]!.value);

  return (
    <div className='sm:w-[600px] items-center justify-center'>
      <div className='flex flex-col'>
        <Title name={toolMeta.title} desc={toolMeta.desc} />
        <Card className='mt-10'>
          <CardBody className='py-4 '>
            <Textarea
              classNames={{
                inputWrapper: "font-normal",
                input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
              size='md'
              variant='faded'
              label="Plain Text"
              placeholder='Enter plain text...'
              labelPlacement='outside'
              value={inputTextValue}
              onValueChange={setInputTextValue}
            />
            <Input
              isClearable
              label="Secret Key"
              placeholder="Enter secret key..."
              labelPlacement='outside'
              value={inputSecretValue}
              onValueChange={setInputSecretValue}
              classNames={{
                input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0',
                inputWrapper: "my-4"
              }}
            />
            <Divider orientation='horizontal' className='mb-4' />
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Select
                label="Hash Function"
                className="max-w-xs"
                labelPlacement='outside'
                defaultSelectedKeys={["SHA1"]}
                selectedKeys={[hashFunctionValue]}
                onChange={(e) => setHashFunctionValue(e.target.value)}
              >
                {Object.keys(hashFunctions).map((elem) => (
                  <SelectItem key={elem} value={elem}>
                    {elem}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Output Encoding"
                className="max-w-xs"
                labelPlacement='outside'
                defaultSelectedKeys={[outputEncoding[0]!.value]}
                selectedKeys={[encodingnValue]}
                onChange={(e) => setEncodingValue(e.target.value)}
              >
                {outputEncoding.map((elem) => (
                  <SelectItem key={elem.value} value={elem.value}>
                    {elem.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <Divider orientation='horizontal' className='my-4' />
            <Textarea
              readOnly
              classNames={{
                label: "text-black",
                inputWrapper: "h-full font-normal text-default-500",
                input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
              label="HMAC Result"
              labelPlacement='outside'
              size='md'
              variant='faded'
              value={hmac(hashFunctionValue, inputTextValue, inputSecretValue, encodingnValue)}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
export default Page