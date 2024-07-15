'use client'
import { Card, CardBody, Divider, Pagination, Image, CardFooter, Link, Tooltip } from '@nextui-org/react'
import React from 'react'
import { TbBinary } from "react-icons/tb"
import { Base64Icon, TimestampIcon } from '../icons'

const ToolSection = ({ name }: { name: String }) => {
  const list = [
    {
      "title": "base64",
      "category": "codec",
      "icon": <Base64Icon className='w-full object-cover h-auto'/>,
      "desc": "base64 tool is to convert string to/from base64 strings, in real time"
    },
    {
      "title": "timestamp",
      "category": "convert",
      "icon": <TimestampIcon className='w-full object-cover h-auto'/>,
      "desc": "timestamp tool is to convert time stamp to human readable time, for any zones"
    }
  ]
  return (
    <section className='w-full px-3 md:px-6 mt-4 md:mt-8 items-center justify-center'>
      <div className='w-full flex justify-between'>
        <h2 className=' inline-block font-bold capitalize text-2xl'>
          {name}
        </h2>
        <Pagination total={5} initialPage={1} />
      </div>
      <Divider orientation="horizontal" className='mt-1' />
      <div className="gap-2 grid grid-cols-4 sm:grid-cols-6 mt-1">
        {list.map((item, index) => (
          <Tooltip showArrow={true} key={item.title} content={item.desc}>
            <Card shadow="sm" key={index} isPressable onPress={() => window.open("/" + item.title)} >
              <CardBody className="overflow-visible p-0">
                {item.icon}
              </CardBody>
              <CardFooter className="text-lg justify-between">
                <b>{item.title}</b>
                <p className="text-default-500 hidden md:flex">{item.category}</p>
              </CardFooter>
            </Card>
          </Tooltip>
        ))}
      </div>

    </section>
  )
}

export default ToolSection