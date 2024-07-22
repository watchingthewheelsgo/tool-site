'use client'
import React from 'react'
import { Accordion, AccordionItem, Listbox, ListboxItem, ScrollShadow } from "@nextui-org/react";
import { toolCollection } from './meta';

const Tuggle = () => {
  return (
    <ScrollShadow className="h-[1024px]">
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
        <AccordionItem key="2" aria-label="Convert" title="Convert"  >
          <Listbox items={toolCollection.convert}>
            {(item) => (
              <ListboxItem
                key={item.key}
                color="default"
                className=""
                href={`/${item.title.replaceAll(" ", "-").toLocaleLowerCase()}`}
                startContent={item.icon}
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
                href={`/${item.title.replaceAll(" ", "-").toLocaleLowerCase()}`}
                startContent={item.icon}
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
                href={`/${item.title.replaceAll(" ", "-").toLocaleLowerCase()}`}
                startContent={item.icon}
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
                href={`/${item.title.replaceAll(" ", "-").toLocaleLowerCase()}`}
                startContent={item.icon}
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