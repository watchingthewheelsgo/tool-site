'use client'
import React from 'react'
import { toolCollection } from '../components/meta'
import { Card, CardBody, Input, Select, SelectItem, Switch, Textarea } from '@nextui-org/react'
import { Title } from '../components/Tool/Title'
import yaml, { ParseOptions } from 'yaml';
import { Yarndings_12 } from 'next/font/google'
import { getErrorMessageIfThrows } from '@/utils/error'

const Page = () => {
  const toolMeta = toolCollection.formatter.findLast((t) => t.key === 'yaml')
  if (toolMeta === undefined) {
    return (
      <div>
        Will support soon...
      </div>
    )
  }
  const [indentValue, setIndentValue] = React.useState("2");
  const [rawYaml, setRawYaml] = React.useState("");

  const [sortSelected, setSortSelected] = React.useState(true);

  const isInvalid = React.useMemo(() => {
    if (rawYaml == "") return {
      result: false,
      hint: ""
    }
    const error = getErrorMessageIfThrows(() => yaml.parse(rawYaml))
    console.log(error)
    const result = error == undefined ? false : true
    return {
      result: result,
      hint: error
    }
  }, [rawYaml]);

  const formatYAML = () => {
    const parsedYaml = yaml.parse(rawYaml);
    return yaml.stringify(parsedYaml, {
      sortMapEntries: sortSelected,
      indent: parseInt(indentValue),
    } as ParseOptions);
  }

  return (
    <div className='sm:w-[600px] items-center justify-center'>
      <div className='flex flex-col'>
        <Title name={toolMeta.title} desc={toolMeta.desc} />
        <Card className='mt-10'>
          <CardBody className='py-4 '>
            <div className='grid grid-cols-2 justify-items-center gap-6'>
              <Switch
                isSelected={sortSelected}
                onValueChange={setSortSelected}
              >
                Sort Keys
              </Switch>
              <Input
                type="number"
                label="Indent Size: "
                value={indentValue}
                labelPlacement='outside-left'
                onValueChange={setIndentValue}
                classNames={{
                  inputWrapper: "font-normal",
                  input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
                }}
              />
            </div>
            <Textarea
              classNames={{
                label: "text-black my-2",
                inputWrapper: "font-normal",
                input: 'resize-y min-h-[180px] focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
              size='md'
              variant='faded'
              label="Raw YAML"
              placeholder='Enter raw yaml to be formatted'
              labelPlacement='outside'
              value={rawYaml}
              onValueChange={setRawYaml}
              isInvalid={isInvalid.result}
              errorMessage={`Invalid yaml: [${isInvalid.hint}`}
            />
            <Textarea
              readOnly
              classNames={{
                label: "mt-4 mb-2",
                inputWrapper: "h-full ",
                input: 'resize-y min-h-[180px]  focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
              label="Formatted YAML"
              labelPlacement='outside'
              size='md'
              variant='faded'
              value={isInvalid.result? "" : formatYAML()}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Page