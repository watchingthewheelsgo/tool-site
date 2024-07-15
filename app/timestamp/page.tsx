
'use client'
import React from 'react'
import { Title } from '../components/Tool/Title'
import { Card, CardBody, Divider, Select, SelectItem, Tab, Tabs, Selection } from '@nextui-org/react'

const page = () => {
  const name: string = "Timestamp Converter"
  const desc: string = "abc"
  const [tabSelected, setTabSelected] = React.useState("photos");
  const [tzSelected, setTZSelected] = React.useState<Selection>(new Set([]));
  const [tuSelected, setTUSelected] = React.useState<Selection>(new Set([]));
  const timeZones = ['UTC/GMT', 'Local']
  const timeUnits = ['Sec', 'MS']
  return (
    <section>
      <div className='px-2 md:px-4 flex flex-col'>
        <Title name={name} desc={desc} />
        <div>
          <Tabs
            variant='bordered'
            aria-label="mode"
            selectedKey={tabSelected}
            onSelectionChange={(key) =>
              setTabSelected(key as string)
            }
          >
            <Tab key="timestamp" title="Timestamp to Human Date">
              <Card>
                <CardBody>
                  <Divider />
                  <div className='flex items-start space-x-4 md:space-x-6 my-2'>
                    <label className='font-semibold text-base mt-4 '> Options </label>
                    <Select
                      label="Time Zone"
                      className='max-w-32 min-h-0 h-fit'
                      selectionMode='single'
                      selectedKeys={tzSelected}
                      onSelectionChange={setTZSelected}
                    >
                      {timeZones.map((tz) => (
                        <SelectItem key={tz}>
                          {tz}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      label="Time Unit"
                      className='max-w-32'
                      selectionMode='single'
                      selectedKeys={tuSelected}
                      onSelectionChange={setTUSelected}
                    >
                      {timeUnits.map((tu) => (
                        <SelectItem key={tu}>
                          {tu}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <Divider />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="human date" title="Human Date to Timestamp">
              <Card>
                <CardBody>
                  <div>

                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </section>

  )
}

function timestamp(value: string, tz: Selection, tu: Selection) {

}

export default page