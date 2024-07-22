'use client'
import React from 'react'
import { toolCollection } from '../components/meta'
import { Card, CardBody, Textarea, Divider, Input, Spacer, Image } from '@nextui-org/react'
import { Title } from '../components/Tool/Title'

import { useRef, forwardRef } from "react";
import { useQRCode } from "next-qrcode";
import ReactToPrint from "react-to-print";
import { saveAs } from "file-saver";


const onDownload = () => {
  const canva = document.getElementsByTagName("canvas")[0];
  if (canva != undefined) {
    canva.toBlob((blob) => {
      if (blob != null) {
        saveAs(blob, "qr-code.png");
      } else {
        console.log("canva found but blob is numm")
      }
    });
  } else {
    console.log("no canva found")
  }
};


const Page = () => {
  const toolMeta = toolCollection.image.findLast((t) => t.key === 'svg')
  if (toolMeta === undefined) {
    return (
      <div>
        Will support soon...
      </div>
    )
  }

  const [width, setWidth] = React.useState("600")
  const [heigth, setHeight] = React.useState("350")
  const [fontSize, setFontSize] = React.useState("30")
  const [bgColor, setBgColor] = React.useState("#cccccc")
  const [textColor, setTextColor] = React.useState("#333333")
  const [textConet, setTextConet] = React.useState("Hello world!")

  const svgString = () => {
    const text = textConet.length > 0 ? textConet : `${width}x${heigth}`;
    return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${heigth}" width="${width}" height="${heigth}">
      <rect width="${width}" height="${heigth}" fill="${bgColor}"></rect>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="${fontSize}px" fill="${textColor}">${text}</text>   
    </svg>
      `.trim();
  }

  const base64String = () => {
    return "data:image/svg+xml;base64," + Buffer.from(svgString()).toString("base64")
  }

  return (
    <div className='sm:w-[600px] items-center justify-center'>
      <div className='flex flex-col'>
        <Title name={toolMeta.title} desc={toolMeta.desc} />
        <Card className='mt-10'>
          <CardBody className='py-4 '>
            <div className='grid grid-cols-2 gap-2'>
              <div className='col-span-1'>
                <Input
                  label="Width (px)"
                  labelPlacement="outside-left"
                  value={width}
                  onValueChange={setWidth}
                  classNames={{
                    mainWrapper: "col-span-2 w-full",
                    label: "text-md col-span-1 justify-self-end",
                    base: "grid grid-cols-3 gap-2",
                    inputWrapper: "",
                    input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
                  }}
                />
              </div>
              <div className='col-span-1'>
                <Input
                  label="Background"
                  labelPlacement="outside-left"
                  value={bgColor}
                  onValueChange={setBgColor}
                  classNames={{
                    mainWrapper: "col-span-2 w-full",
                    label: "text-md col-span-1 justify-self-end",
                    base: "grid grid-cols-3 gap-2",
                    inputWrapper: "",
                    input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
                  }}
                />
              </div>
              <Spacer className='col-span-2 my-1' />

              <div className='col-span-1'>
                <Input
                  label="Height (px)"
                  labelPlacement="outside-left"
                  value={heigth}
                  onValueChange={setHeight}
                  classNames={{
                    mainWrapper: "col-span-2 w-full",
                    label: "text-md col-span-1 justify-self-end",
                    base: "grid grid-cols-3 gap-2",
                    inputWrapper: "",
                    input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
                  }}
                />
              </div>
              <div className='col-span-1'>
                <Input
                  label="Text color"
                  labelPlacement="outside-left"
                  value={textColor}
                  onValueChange={setTextColor}
                  classNames={{
                    mainWrapper: "col-span-2 w-full",
                    label: "text-md col-span-1 justify-self-end",
                    base: "grid grid-cols-3 gap-2",
                    inputWrapper: "",
                    input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
                  }}
                />
              </div>
              <Spacer className='col-span-2 my-1' />
              <div className='col-span-1'>
                <Input
                  label="Font size"
                  labelPlacement="outside-left"
                  value={fontSize}
                  onValueChange={setFontSize}
                  classNames={{
                    mainWrapper: "col-span-2 w-full",
                    label: "text-md col-span-1 justify-self-end",
                    base: "grid grid-cols-3 gap-2",
                    inputWrapper: "",
                    input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
                  }}
                />
              </div>
              <div className='col-span-1'>
                <Input
                  label="Custom text"
                  labelPlacement="outside-left"
                  value={textConet}
                  onValueChange={setTextConet}
                  classNames={{
                    mainWrapper: "col-span-2 w-full",
                    label: "text-md col-span-1 justify-self-end",
                    base: "grid grid-cols-3 gap-2",
                    inputWrapper: "",
                    input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
                  }}
                />
              </div>
              <Divider orientation='horizontal' className='col-span-2 my-1' />
            </div>
            <Textarea
              readOnly
              disableAnimation
              disableAutosize
              label="SVG HTML element"
              classNames={{
                label: "text-black my-2",
                inputWrapper: "font-normal",
                input: 'resize-y min-h-[100px] focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
              size='md'
              variant='faded'
              placeholder='Enter jwt token to be parsed...'
              labelPlacement='outside'
              value={svgString()}
            />
            <Textarea
              readOnly
              disableAnimation
              disableAutosize
              label="SVG in Base64"
              classNames={{
                label: "text-black my-2",
                inputWrapper: "font-normal",
                input: 'resize-y min-h-[100px] focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
              size='md'
              variant='faded'
              placeholder='Enter jwt token to be parsed...'
              labelPlacement='outside'
              value={base64String()}
            />
          </CardBody>
        </Card>
        <Spacer y={4} />
        <Image
          src={base64String()}
          id="renedr_image"
        />
      </div>
    </div>
  )
}

export default Page