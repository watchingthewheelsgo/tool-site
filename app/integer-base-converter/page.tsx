'use client'
import React from 'react'
import { toolCollection } from '../components/meta'
import { Card, CardBody, Divider, Input, Spacer } from '@nextui-org/react'
import { Title } from '../components/Tool/Title'

const range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('');
export function convertBase({ value, fromBase, toBase }: { value: string; fromBase: number; toBase: number }) {
  const fromRange = range.slice(0, fromBase);
  const toRange = range.slice(0, toBase);
  let decValue = value
    .split('')
    .reverse()
    .reduce((carry: bigint, digit: string, index: number) => {
      if (!fromRange.includes(digit)) {
        throw new Error(`Invalid digit "${digit}" for base ${fromBase}.`);
      }
      return (carry += BigInt(fromRange.indexOf(digit)) * BigInt(fromBase) ** BigInt(index));
    }, 0n);
  let newValue = '';
  while (decValue > 0) {
    newValue = toRange[Number(decValue % BigInt(toBase))] + newValue;
    decValue = (decValue - (decValue % BigInt(toBase))) / BigInt(toBase);
  }
  return newValue || '0';
}

const Page = () => {
  const toolMeta = toolCollection.convert.findLast((t) => t.key === 'integer')
  if (toolMeta === undefined) {
    return (
      <div>
        Will support soon...
      </div>
    )
  }

  const [value, setValue] = React.useState("24")
  const [base, setBase] = React.useState("10")
  const [outbase, setOutBase] = React.useState("10")

  const isValueInvalid = React.useMemo(() => {
    if (value === "") return {
      result: false,
      hint: []
    };
    const tmpBase = Number(base)
    if (isNaN(tmpBase) || tmpBase <= 1 || tmpBase > 64) {
      return {
        result: true,
        hint: ["Invalid base: " + base]
      }
    }
    const res = value.split('').filter((char) => !range.slice(0, tmpBase).includes(char))
    return {
      result: res.length == 0 ? false : true,
      hint: res
    }
  }, [value, base]);


  const isBaseInvalid = React.useMemo(() => {
    if (base === "") return false;
    const tmp = Number(base)
    return !isNaN(tmp) && tmp > 1 && tmp <= 64 ? false : true
  }, [base]);

  const isOutBaseInvalid = React.useMemo(() => {
    if (outbase === "") return false;
    const tmp = Number(outbase)
    return !isNaN(tmp) && tmp > 1 && tmp <= 64 ? false : true
  }, [outbase]);


  const outputs = [
    {
      "label": "Binary (2)",
      converter: (input: string, fromBase: number, toBase = 2) => convertBase({ value: input, fromBase: fromBase, toBase: toBase })
    },
    {
      "label": "Octal (8)",
      converter: (input: string, fromBase: number, toBase = 8) => convertBase({ value: input, fromBase: fromBase, toBase: toBase })
    },
    {
      "label": "Decimal (10)",
      converter: (input: string, fromBase: number, toBase = 10) => convertBase({ value: input, fromBase: fromBase, toBase: toBase })
    },
    {
      "label": "Hexadecimal (16)",
      converter: (input: string, fromBase: number, toBase = 16) => convertBase({ value: input, fromBase: fromBase, toBase: toBase })
    },
    {
      "label": "Base64 (64)",
      converter: (input: string, fromBase: number, toBase = 64) => convertBase({ value: input, fromBase: fromBase, toBase: toBase })
    }
  ]

  return (
    <div className='sm:w-[600px] items-center justify-center'>
      <div className='flex flex-col'>
        <Title name={toolMeta.title} desc={toolMeta.desc} />
        <Card className='mt-10'>
          <CardBody className='py-4 '>
            <div className='flex flex-col'>
              <Input
                label="Input number"
                labelPlacement="outside-left"
                classNames={{
                  mainWrapper: "w-3/4 col-span-3 w-full",
                  label: "text-md col-span-1 justify-self-end",
                  base: "grid grid-cols-4 gap-2",
                  inputWrapper: "",
                  input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
                }}
                errorMessage={"Input contains invalid character under base " + base + ". Message: [ " + isValueInvalid.hint + " ]."}
                isInvalid={isValueInvalid.result}
                value={value}
                onValueChange={setValue}
              />
              <Spacer y={2} />
              <Input
                label="Input base"
                labelPlacement="outside-left"
                classNames={{
                  mainWrapper: "w-3/4 col-span-3 w-full",
                  label: "text-md col-span-1 justify-self-end",
                  base: "grid grid-cols-4 gap-2",
                  inputWrapper: "",
                  input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
                }}
                type='number'
                errorMessage="Integer base should >1 and <= 64 "
                isInvalid={isBaseInvalid}
                value={base}
                onValueChange={setBase}
              />
            </div>
            <Divider orientation='horizontal' className='my-2' />
            <div className='flex flex-col '>
              {
                outputs.map((output) => (
                  <div key={output.label}>
                    <Input
                      isReadOnly
                      label={output.label}
                      labelPlacement="outside-left"
                      value={isValueInvalid.result ? "Invalid input integer..." :
                        output.converter(value, Number(base))
                      }
                      classNames={{
                        mainWrapper: "w-3/4 col-span-3 w-full",
                        label: "text-md col-span-1 justify-self-end",
                        base: "grid grid-cols-4 gap-2",
                        inputWrapper: "",
                        input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
                      }}
                    />
                    <Spacer y={4} />
                  </div>
                ))
              }
            </div>
            <div className='grid grid-cols-4 gap-2'>
              <Input
                label="Custom"
                labelPlacement='outside-left'
                value={outbase}
                onValueChange={setOutBase}
                isInvalid={isOutBaseInvalid}
                errorMessage={"Invalid output base..."}
                classNames={{
                  label: "text-md",
                  base: "col-span-1",
                  inputWrapper: "",
                  input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
                }}
                type="number"
              />
              <Input
                isReadOnly
                classNames={{
                  base: "col-span-3",
                  inputWrapper: "",
                  input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
                }}
                value={isValueInvalid.result ? "Invalid input integer..." : convertBase({ value: value, fromBase: Number(base), toBase: Number(outbase) })}
              />
            </div>

          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Page