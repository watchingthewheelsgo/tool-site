'use client'
import React from 'react'
import { toolCollection } from '../components/meta'
import { Card, CardBody, Textarea, Divider, Input, Select, SelectItem, Button } from '@nextui-org/react'
import { Title } from '../components/Tool/Title'

import { useRef, forwardRef } from "react";
import { useQRCode } from "next-qrcode";
import ReactToPrint from "react-to-print";
import { saveAs } from "file-saver";

const QRCode = forwardRef<HTMLDivElement, { text: string, options: {} }>((props, ref) => {
  const { Canvas } = useQRCode();

  return (
    <div ref={ref}>
      <Canvas {...props} />
    </div>
  );
});


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
  const toolMeta = toolCollection.image.findLast((t) => t.key === 'qr-code')
  if (toolMeta === undefined) {
    return (
      <div>
        Will support soon...
      </div>
    )
  }

  const [inputText, setInputText] = React.useState("https://www.npmjs.com/package/next-qrcode")
  const [bgColor, setBgColor] = React.useState("#FFFFFFFF")
  const [fgColor, setFgColor] = React.useState("#000000FF")

  const [errorLevel, setErrorLevel] = React.useState("M")

  const errorLevelInfo = [
    {
      "label": "high",
      "value": "H"
    },
    {
      "label": "medium",
      "value": "M"
    },
    {
      "label": "low",
      "value": "L"
    },
    {
      "label": "quartile",
      "value": "Q"
    }
  ]

  const qrRef = useRef<HTMLDivElement>(null);

  return (
    <div className='sm:w-[600px] items-center justify-center'>
      <div className='flex flex-col'>
        <Title name={toolMeta.title} desc={toolMeta.desc} />
        <Card className='mt-10'>
          <CardBody className='py-4 '>
            <Textarea
              size='sm'
              label="Input"
              variant="flat"
              labelPlacement="outside-left"
              placeholder="Enter your url ot text"
              value={inputText}
              onValueChange={setInputText}
              classNames={{
                base: "grid grid-cols-4 gap-4 ",
                label: "col-span-1 justify-self-end text-md",
                inputWrapper: "col-span-3 w-full",
                input: "resize-y focus:outline-none border-transparent focus:border-transparent focus:ring-0"
              }}
            />
            <Divider orientation='horizontal' className='my-2' />
            <Input
              readOnly
              label="Foreground color:"
              labelPlacement="outside-left"
              value={fgColor}
              onValueChange={setFgColor}
              classNames={{
                mainWrapper: "col-span-3 w-full",
                label: "text-md col-span-1 justify-self-end",
                base: "grid grid-cols-4 gap-2",
                inputWrapper: "",
                input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
            />
            <Divider orientation='horizontal' className='my-2' />
            <Input
              readOnly
              label="Background color:"
              labelPlacement="outside-left"
              classNames={{
                mainWrapper: "col-span-3 w-full",
                label: "text-md col-span-1 justify-self-end",
                base: "grid grid-cols-4 gap-2",
                inputWrapper: "",
                input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
              value={bgColor}
              onValueChange={setBgColor}
            />
            <Divider orientation='horizontal' className='my-2' />
            <Select
              label="Error resistance:"
              labelPlacement='outside-left'
              selectedKeys={[errorLevel]}
              onChange={(e) => setErrorLevel(e.target.value)}
              classNames={{
                label: "text-md col-span-1 justify-self-end",
                base: "grid grid-cols-4 gap-2 items-center",
                mainWrapper: "col-span-3 w-full"
              }}
            >
              {errorLevelInfo.map((level) => (
                <SelectItem key={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </Select>
            <Divider orientation='horizontal' className='my-2' />
            <div className='grid grid-cols-1 justify-items-center my-8'>
              {
                (inputText != "") ? (
                  <QRCode
                    ref={qrRef}
                    text={inputText}
                    options={{
                      width: 200,
                      level: { errorLevel },
                      color: {
                        dark: fgColor,
                        light: bgColor
                      }
                    }}
                  />
                ) : (
                  <div>
                  </div>
                )
              }
              <div className='justify-center'>
                <ReactToPrint
                  trigger={() => {
                    return (
                      <Button
                        size="sm"
                        className='mr-2'>
                        Print
                      </Button>
                    )
                  }}
                  content={() => qrRef.current}
                />

                <Button
                  onClick={onDownload}
                  size="sm"
                >
                  Download
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Page