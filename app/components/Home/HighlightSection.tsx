import { Card, CardBody, Image } from '@nextui-org/react'
import React from 'react'
// max-w-[1024px]
export const HighlightSection = () => {
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-12">
            <Image
              alt="daily sentence"
              className="object-cover"
              height={100}
              shadow="md"
              src="https://nextui.org/images/album-cover.png"
              width="100%"
            />
          </div>
        </div>
      </CardBody>
    </Card>

  )
}