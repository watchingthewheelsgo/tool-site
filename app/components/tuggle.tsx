'use client'
import React from 'react'
import { Accordion, AccordionItem, Listbox, ListboxItem, ScrollShadow } from "@nextui-org/react";
import { HMACIcon, PASSWDICon, PDFIcon, RSAICon, TokenIcon, UUIDIcon, UULDIcon } from './icons';


const Tuggle = () => {
  const toolCollection = {
    crypto: [
      {
        key: "uuid",
        title: "UUIDs Generator",
        icon: <UUIDIcon className="w-4 h-4"/>
      },
      {
        key: "ulid",
        title: "ULIDs Generator",
        icon: <UULDIcon className="w-4 h-4" />
      },
      {
        key: "rsa",
        title: "RSA Key Pair Generator",
        icon: <RSAICon className="w-4 h-4" />
      },
      {
        key: "passwd",
        title: "Password Strength Checker",
        icon: <PASSWDICon className="w-4 h-4" />
      },
      {
        key: "hmac",
        title: "HMAC Generator",
        icon: <HMACIcon className="w-4 h-4" />
      },
      {
        key: "pdf signature",
        title: "PDF Signature Validator",
        icon: <PDFIcon className={"w-5 h-5"} />
      },
      {
        key: "token",
        title: "Token Generator",
        icon: <TokenIcon className="w-5 h-5"/>
      }
    ],
    converter: [
      {
        key: "dtc",
        title: "Date-Time Converter"
      },
      {
        key: "base64",
        title: "Base64 String Converter"
      },
      {
        key: "integer",
        title: "Integer Base Converter"
      },
      {
        key: "yaml2json",
        title: "Yaml to Json"
      }
    ],
    web: [
      {
        key: "jwt",
        title: "JWT Parser"
      },
      {
        key: "auth",
        title: "Auth Generator"
      },
      {
        key: "otp",
        title: "OTP Code Generator"
      },
      {
        key: "user-agent",
        title: "User-agent Parser"
      }
    ],
    image: [
      {
        key: "qr-code",
        title: "QR Code Generator"
      },
      {
        key: "svg",
        title: "SVG Generatopr"
      }
    ],
    formatter: [
      {
        key: "sql",
        title: "SQL Formatter"
      },
      {
        key: "yaml",
        title: "YAML Formatter"
      }
    ]
  }
  return (
    <ScrollShadow className="h-[800px]">
      <Accordion
        variant="splitted"
        defaultExpandedKeys={["1", "2", "3", "4", "5"]}
        selectionMode="multiple">
        <AccordionItem key="1" aria-label="Crypto" title="Crypto" >
          <Listbox items={toolCollection.crypto} className=' overflow-hidden'>
            {(item) => (
              <ListboxItem
                key={item.key}
                color="default"
                className="overflow-hidden"
                href={`/${item.title.replaceAll(" ", "-").toLocaleLowerCase()}`}
                startContent={item.icon}
              >
                {item.title}
              </ListboxItem>
            )}
          </Listbox>
        </AccordionItem>
        <AccordionItem key="2" aria-label="Convertor" title="Convertor"  >
          <Listbox items={toolCollection.converter}>
            {(item) => (
              <ListboxItem
                key={item.key}
                color="default"
                className=""
              >
                {item.title}
              </ListboxItem>
            )}
          </Listbox>
        </AccordionItem>
        <AccordionItem key="3" aria-label="Image" title="Image"  >
          <Listbox items={toolCollection.image}>
            {(item) => (
              <ListboxItem
                key={item.key}
                color="default"
                className=""
              >
                {item.title}
              </ListboxItem>
            )}
          </Listbox>
        </AccordionItem>
        <AccordionItem key="4" aria-label="Web" title="Web"  >
          <Listbox items={toolCollection.web}>
            {(item) => (
              <ListboxItem
                key={item.key}
                color="default"
                className=""
              >
                {item.title}
              </ListboxItem>
            )}
          </Listbox>
        </AccordionItem>
        <AccordionItem key="5" aria-label="Formatter" title="Formatter"  >
          <Listbox items={toolCollection.formatter}>
            {(item) => (
              <ListboxItem
                key={item.key}
                color="default"
                className=""
              >
                {item.title}
              </ListboxItem>
            )}
          </Listbox>
        </AccordionItem>
      </Accordion>
    </ScrollShadow>
  )
}

export default Tuggle