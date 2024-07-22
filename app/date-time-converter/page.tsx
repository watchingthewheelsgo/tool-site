'use client'
import React, { useEffect, useState } from 'react'
import { Title } from '../components/Tool/Title'
import { Card, CardBody, DatePicker, Divider, Input, Select, SelectItem, Slider, SliderValue, Switch, Textarea } from '@nextui-org/react'
import { toolCollection } from '../components/meta';
import { now, DateValue, parseDate, getLocalTimeZone } from "@internationalized/date";
import {
  formatISO,
  formatISO9075,
  formatRFC3339,
  formatRFC7231,
  fromUnixTime,
  getTime,
  getUnixTime,
  isDate,
  isValid,
  parseISO,
  parseJSON,
  parse,
  toDate as toDateGeneral
} from 'date-fns';
import _ from 'lodash';

const ISO8601_REGEX
  = /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
const ISO9075_REGEX
  = /^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})(\.[0-9]{1,6})?(([+-])([0-9]{2}):([0-9]{2})|Z)?$/;

const RFC3339_REGEX
  = /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(\.[0-9]{1,9})?(([+-])([0-9]{2}):([0-9]{2})|Z)$/;

const RFC7231_REGEX = /^[A-Za-z]{3},\s[0-9]{2}\s[A-Za-z]{3}\s[0-9]{4}\s[0-9]{2}:[0-9]{2}:[0-9]{2}\sGMT$/;

const EXCEL_FORMAT_REGEX = /^-?\d+(\.\d+)?$/;

function createRegexMatcher(regex: RegExp) {
  return (date?: string) => !_.isNil(date) && regex.test(date);
}

const isISO8601DateTimeString = createRegexMatcher(ISO8601_REGEX);
const isISO9075DateString = createRegexMatcher(ISO9075_REGEX);
const isRFC3339DateString = createRegexMatcher(RFC3339_REGEX);
const isRFC7231DateString = createRegexMatcher(RFC7231_REGEX);
const isUnixTimestamp = createRegexMatcher(/^[0-9]{1,10}$/);
const isTimestamp = createRegexMatcher(/^[0-9]{1,13}$/);
const isMongoObjectId = createRegexMatcher(/^[0-9a-fA-F]{24}$/);

const isExcelFormat = createRegexMatcher(EXCEL_FORMAT_REGEX);

function isUTCDateString(date?: string) {
  if (_.isNil(date)) {
    return false;
  }

  try {
    return new Date(date).toUTCString() === date;
  }
  catch (_ignored) {
    return false;
  }
}

function dateToExcelFormat(date: Date) {
  return String(((date.getTime()) / (1000 * 60 * 60 * 24)) + 25569);
}

function excelFormatToDate(excelFormat: string | number) {
  return new Date((Number(excelFormat) - 25569) * 86400 * 1000);
}


export interface DateFormat {
  name: string
  fromDate: (date: Date) => string
  toDate: (value: string) => Date
  formatMatcher: (dateString: string) => boolean
}
export type ToDateMapper = (value: string) => Date;

const toDate: ToDateMapper = date => new Date(date);


const formats: DateFormat[] = [
  {
    name: 'JS locale date string',
    fromDate: date => date.toString(),
    toDate,
    formatMatcher: () => false,
  },
  {
    name: 'ISO 8601',
    fromDate: formatISO,
    toDate: parseISO,
    formatMatcher: date => isISO8601DateTimeString(date),
  },
  {
    name: 'ISO 9075',
    fromDate: formatISO9075,
    toDate: parseISO,
    formatMatcher: date => isISO9075DateString(date),
  },
  {
    name: 'RFC 3339',
    fromDate: formatRFC3339,
    toDate,
    formatMatcher: date => isRFC3339DateString(date),
  },
  {
    name: 'RFC 7231',
    fromDate: formatRFC7231,
    toDate,
    formatMatcher: date => isRFC7231DateString(date),
  },
  {
    name: 'Unix timestamp',
    fromDate: date => String(getUnixTime(date)),
    toDate: sec => fromUnixTime(+sec),
    formatMatcher: date => isUnixTimestamp(date),
  },
  {
    name: 'Timestamp',
    fromDate: date => String(getTime(date)),
    toDate: ms => toDateGeneral(ms),
    formatMatcher: date => isTimestamp(date),
  },
  {
    name: 'UTC format',
    fromDate: date => date.toUTCString(),
    toDate,
    formatMatcher: date => isUTCDateString(date),
  },
  {
    name: 'Mongo ObjectID',
    fromDate: date => `${Math.floor(date.getTime() / 1000).toString(16)}0000000000000000`,
    toDate: objectId => new Date(Number.parseInt(objectId.substring(0, 8), 16) * 1000),
    formatMatcher: date => isMongoObjectId(date),
  },
  {
    name: 'Excel date/time',
    fromDate: date => dateToExcelFormat(date),
    toDate: excelFormatToDate,
    formatMatcher: isExcelFormat,
  },
];

const inputDateTypes = [
  {
    name: "Timestamp (ms)",
    validator: (date: string, tz: string) => date == "" || isTimestamp(date),
    toDate: (date: string, dateValue: DateValue | undefined, tz: string, currentTs: number) => {
      return date == "" ? toDateGeneral(currentTs) : toDateGeneral(parseInt(date))
    },
    errorMessage: "Timestamp (ms) must be a number, whose char length less than or equals to 13"

  },
  {
    name: "Unix Timestamp (sec)",
    validator: (date: string, tz: string) => date == "" || isUnixTimestamp(date), 
    toDate: (date: string, dateValue: DateValue | undefined, tz: string, currentTs: number) => {
      return date == "" ? toDateGeneral(currentTs) : toDateGeneral(parseInt(date) * 1000)
    },
    errorMessage: "Unix Timestamp (sec) must be a number, whose char length less than or equals to 10"
  },
  {
    name: "Date Time",
    validator: (date: string, tz: string) => {
      return tz == undefined || tz=="" ? false : true
    },
    toDate: (date: string, dateValue: DateValue | undefined, tz: string, currentTs: number) => {
      if (dateValue == undefined) {
        return toDateGeneral(currentTs)
      } else if (tz == 'Local') {
        return dateValue.toDate(getLocalTimeZone())
      }
      console.log(tz)
      return dateValue.toDate(tz)
    },
    errorMessage: "Please input a valid date time"
  }
]

const timeZones = [
  {
    "label": "Local",
    "value": "Local"
  },
  {
    "label": "PST - America/Los_Angeles",
    "value": "America/Los_Angeles"
  },
  {
    "label": "CST - Asia/Shanghai",
    "value": "Asia/Shanghai"
  },
  {
    "label": "GMT - Europe/London",
    "value": "Europe/London"
  },
  {
    "label": "HKT - Asia/Hong_Kong",
    "value": "Asia/Hong_Kong"
  },
  {
    "label": "JST - Asia/Tokyo",
    "value": "Asia/Tokyo"
  },
  {
    "label": "MSK - Europe/Moscow",
    "value": "Europe/Moscow"
  }
]

const Page = () => {
  const toolMeta = toolCollection.convert.findLast((t) => t.key === 'dtc')

  if (toolMeta === undefined) {
    return (
      <div>
        Will support soon...
      </div>
    )
  }

  const [timestamp, setTimestamp] = React.useState(Date.now());

  const [value, setValue] = React.useState("");
  const [dateValue, setDateValue] = React.useState<DateValue>();
  const [dateType, setDateType] = React.useState(inputDateTypes[0]!.name);
  const [timeZone, setTimeZone] = React.useState(timeZones[0]!.label);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimestamp(Date.now());
    }, 1);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const isInvalid = React.useMemo(() => {
    const validator = inputDateTypes.find(f => f.name == dateType)
    if (validator != undefined) {
      return validator.validator(value, timeZone) ? false : true
    }
    return false
  }, [value, dateValue, dateType, timeZone]);

  const getErrorMsg = (dateType: string) => {
    return inputDateTypes.find(f => f.name == dateType)?.errorMessage
  }
  return (
    <div className='sm:w-[600px] items-center justify-center'>
      <div className='flex flex-col'>
        <Title name={toolMeta.title} desc={toolMeta.desc} />
        <Card className='mt-10'>
          <CardBody className='py-4'>
            <div className='flex justify-between'>
              <Select
                className="w-60"
                color='default'
                variant='flat'
                selectedKeys={[dateType!]}
                onChange={(e) => setDateType(e.target.value)}
                classNames={{
                  base: "mb-2",
                  mainWrapper: "w-full max-w-[284px]"
                }}
              >
                {inputDateTypes.map((elem) => (
                  <SelectItem key={elem.name} value={elem.name}>
                    {elem.name}
                  </SelectItem>
                ))}
              </Select>
              {
                (dateType == 'Date Time') ?
                  (
                    <Select
                      isInvalid={isInvalid}
                      errorMessage=""
                      disabled={dateType == inputDateTypes[2]!.name ? false : true}
                      className="w-60"
                      color='default'
                      variant='flat'
                      selectedKeys={[timeZone]}
                      onChange={(e) => setTimeZone(e.target.value)}
                      classNames={{
                        base: "mb-2",
                        mainWrapper: "w-full max-w-[284px]"
                      }}
                      
                    >
                      {timeZones.map((elem) => (
                        <SelectItem key={elem.value} value={elem.value}>
                          {elem.label}
                        </SelectItem>
                      ))}
                    </Select>
                  ) : (
                    <div> </div>
                  )
              }
            </div>
            {
              (dateType == 'Date Time') ?
                (
                  <DatePicker
                    fullWidth
                    hideTimeZone
                    showMonthAndYearPickers
                    value={dateValue}
                    onChange={setDateValue}
                    granularity="second"
                  />
                ) : (
                  <Input
                    value={value}
                    variant="flat"
                    isInvalid={isInvalid}
                    color={isInvalid ? "danger" : "success"}
                    errorMessage={getErrorMsg(dateType)}
                    onValueChange={setValue}
                    classNames={{
                      base: "",
                      inputWrapper: "font-normal",
                      input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
                    }}
                  />
                )
            }
            <Divider orientation='horizontal' className='my-2' />
            <div className='flex flex-col '>
              {
                formats.map((format) => (
                  <div key={format.name}>
                    <Input
                      isReadOnly
                      label={format.name}
                      labelPlacement="outside-left"
                      value={isInvalid ? "Invalid input time...":
                        format.fromDate(getDate(timestamp, dateType, value, dateValue, timeZone))
                      }
                      classNames={{
                        mainWrapper: "w-3/4 col-span-3 w-full",
                        label: "text-md col-span-1 justify-self-end",
                        base: "grid grid-cols-4 gap-2",
                        inputWrapper: "",
                        input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
                      }}
                    />
                    <Divider orientation='horizontal' className='my-2' />
                  </div>
                ))
              }
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

function getDate(curTimestamp: number, dateType: string, timestampValue: string, dateValue: DateValue | undefined, tz: string) {
  const inputInfo = inputDateTypes.find(f => f.name == dateType)
  if (inputInfo != undefined) {
    return inputInfo.toDate(timestampValue, dateValue, tz, curTimestamp)
  }

  return toDateGeneral(curTimestamp)
}

export default Page