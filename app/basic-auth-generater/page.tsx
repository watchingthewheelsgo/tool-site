'use client'
import React from 'react'
import { toolCollection } from '../components/meta'
import { Card, CardBody, Divider, Input, Select, Spacer, Textarea } from '@nextui-org/react'
import { Title } from '../components/Tool/Title'

const Page = () => {
  const toolMeta = toolCollection.web.findLast((t) => t.key === 'auth')
  if (toolMeta === undefined) {
    return (
      <div>
        Will support soon...
      </div>
    )
  }
  const [username, setUsername] = React.useState("username");
  const [passwd, setPasswd] = React.useState("password");
  return (
    <div className='sm:w-[600px] items-center justify-center'>
      <div className='flex flex-col'>
        <Title name={toolMeta.title} desc={toolMeta.desc} />
        <Card className='mt-10'>
          <CardBody className='py-4 '>
            <Input
              label="Username"
              labelPlacement="outside"
              value={username}
              onValueChange={setUsername}
              classNames={{
                inputWrapper: "",
                input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
            />
            <Spacer y={4}/>
            <Input
              label="Password"
              labelPlacement="outside"
              value={passwd}
              onValueChange={setPasswd}
              classNames={{
                inputWrapper: "",
                input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
            />
            <Textarea
              readOnly
              classNames={{
                label: "text-black mt-4 mb-2",
                inputWrapper: "h-full font-normal text-default-500",
                input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
              label="Authorization header"
              labelPlacement='outside'
              size='md'
              variant='faded'
              value={header(username, passwd)}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

const header = (u: string, p: string) => {
  return `Authorization: Basic ${Buffer.from(`${u}:${p}`).toString("base64")}`
}

export default Page