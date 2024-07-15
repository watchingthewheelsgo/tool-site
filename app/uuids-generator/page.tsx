'use client'
import React from 'react'
import { Title } from '../components/Tool/Title'
import { Card, CardBody, Divider, Input, Radio, RadioGroup, Slider, SliderValue, Textarea } from '@nextui-org/react'
import { v1 as generateUuidV1, v3 as generateUuidV3, v4 as generateUuidV4, v5 as generateUuidV5, NIL as nilUuid } from 'uuid'

const page = () => {
  const [tokenLength, setTokenLength] = React.useState<SliderValue>(5);
  const [versionRadio, setVersionRadio] = React.useState("v3");
  const [namespaceRadio, setNamespaceRadio] = React.useState("dns");
  const [namespaceValue, setNamespaceValue] = React.useState(getNamespaceValue(namespaceRadio));
  const [nameValue, setNameValue] = React.useState("");

  const isInvalid = React.useMemo(() => {
    if (namespaceValue === "") return false;
    return validateUUID(namespaceValue) ? false : true;
  }, [namespaceValue]);


  return (
    <div className='sm:w-[600px] items-center justify-center'>
      <div className='flex flex-col'>
        <Title name={"UUID Generater"} desc={"A Universally Unique Identifier (UUID) is a 128-bit number used to identify information in computer systems. The number of possible UUIDs is 16^32, which is 2^128 or about 3.4x10^38 (which is a lot!)."} />
        <Card className='mt-10'>
          <CardBody className='py-4 '>
            <div className=''>
              <RadioGroup
                label="UUID Version"
                orientation="horizontal"
                classNames={{
                  label: "text-black text-md"
                }}
                value={versionRadio}
                onValueChange={setVersionRadio}
              >
                <Radio value="nil">NIL</Radio>
                <Radio value="v1">V1</Radio>
                <Radio value="v3">V3</Radio>
                <Radio value="v4">V4</Radio>
                <Radio value="v5">V5</Radio>
              </RadioGroup>
            </div>
            {
              versionRadio == 'v3' || versionRadio == 'v5' ? (
                <div>
                  <Divider orientation='horizontal' className='my-2' />
                  <RadioGroup
                    label="Namespace"
                    orientation="horizontal"
                    classNames={{
                      label: "text-black text-md mt-2"
                    }}
                    value={namespaceRadio}
                    onChange={(e) => {
                      setNamespaceRadio(e.target.value)
                      setNamespaceValue(getNamespaceValue(e.target.value))
                    }}
                  >
                    <Radio value="dns">DNS</Radio>
                    <Radio value="url">URL</Radio>
                    <Radio value="oid">OID</Radio>
                    <Radio value="x500">X500</Radio>
                  </RadioGroup>
                  <Input
                    label=""
                    placeholder=""
                    value={namespaceValue}
                    onValueChange={setNamespaceValue}
                    isInvalid={isInvalid}
                    color={isInvalid ? "danger" : "success"}
                    errorMessage="Please enter a valid UUID"
                    classNames={{
                      base: "my-2",
                      label: "my-2",
                      input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
                    }}
                  />
                  <Divider orientation='horizontal' className='my-2' />
                  <Input
                    isClearable
                    label="Name"
                    placeholder="Name"
                    value={nameValue}
                    labelPlacement="outside"
                    onValueChange={setNameValue}
                    classNames={{
                      base: "my-6",
                      label: "text-black text-md",
                      input: "focus:outline-none border-transparent focus:border-transparent focus:ring-0",
                      inputWrapper: "mt-4"
                    }}
                  />
                  <Divider orientation='horizontal' className='my-2' />
                </div>
              ) : (
                <div></div>
              )
            }
            <Slider
              label="Numbers"
              step={1}
              maxValue={24}
              minValue={1}
              value={tokenLength}
              onChange={setTokenLength}
              classNames={{
                base: "max-w-full my-4",
                label: "text-md"
              }}
            />
            <Textarea
              readOnly
              classNames={{
                inputWrapper: "h-full font-normal text-default-500",
                input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
              size='md'
              variant='faded'
              value={generate(versionRadio, tokenLength as number, namespaceValue, nameValue)}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

const namespaceValueMap = {
  DNS: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
  URL: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
  OID: '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
  X500: '6ba7b814-9dad-11d1-80b4-00c04fd430c8',
}

function getNamespaceValue(ns: string) {
  if (ns == 'url') {
    return namespaceValueMap.URL
  } else if (ns == 'oid') {
    return namespaceValueMap.OID
  } else if (ns == 'x500') {
    return namespaceValueMap.X500
  }
  return namespaceValueMap.DNS
}

const validateUUID = (namespaceValue: string) => namespaceValue.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);

function generate(version: string, count: number, namespace: string, name: string) {
  return Array.from({ length: count }, (_ignored, index) => {
    if (version == 'nil') {
      return nilUuid
    } else if (version == 'v1') {
      return generateUuidV1({
        clockseq: index,
        msecs: Date.now(),
        nsecs: Math.floor(Math.random() * 10000),
        node: Array.from({ length: 6 }, () => Math.floor(Math.random() * 256)),
      })
    } else if (version == 'v3') {
      return validateUUID(namespace) ? generateUuidV3(name, namespace) : ""
    } else if (version == 'v4') {
      return generateUuidV4()
    } else {
      return validateUUID(namespace) ? generateUuidV5(name, namespace) : ""
    }
  }).join('\n')

}

export default page