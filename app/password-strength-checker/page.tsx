'use client'
import React from 'react'
import { ulid } from 'ulid'
import _ from 'lodash'
import { Title } from '../components/Tool/Title';
import { Card, CardBody, Divider, Input, Radio, RadioGroup, Slider, SliderValue, Switch, Textarea } from '@nextui-org/react';
import { EyeFilledIcon, EyeSlashFilledIcon } from '../components/icons';

const page = () => {
  const [passwdValue, setPasswdValue] = React.useState("");
  const [isVisible, setIsVisible] = React.useState(false);

  const crackTimeEstimation = () => getPasswordCrackTimeEstimation({ password: passwdValue });

  const details = () => [
    {
      label: "Password length:",
      value: crackTimeEstimation().passwordLength
    },
    {
      label: "Entropy:",
      value: crackTimeEstimation().entropy
    },
    {
      label: "Character set size:",
      value: crackTimeEstimation().charsetLength
    },
    {
      label: "Score:",
      value: crackTimeEstimation().score
    }
  ]

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className='sm:w-[600px] items-center justify-center'>
      <div className='flex flex-col'>
        <Title name={"Password Strength Checker"} desc={"Discover the strength of your password with this client-side-only password strength analyser and crack time estimation tool."} />
        <Card className='mt-10'>
          <CardBody className='py-4 '>
            <Input
              label=""
              placeholder="Try your password"
              value={passwdValue}
              onValueChange={setPasswdValue}
              classNames={{
                base: "my-2",
                label: "my-2",
                input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
            <Divider orientation='horizontal' className='my-2' />

            <div className="grid grid-rows-4 gap-2 grid-cols-4 h-40 rounded-lg bg-default-200">
              <div className='row-span-1 col-span-1 items-center justify-items-end  col-start-2 '>
                Password Length
              </div>
              <div className='col-span-2'>
                {crackTimeEstimation().passwordLength}
              </div>
              <div className='row-span-1 col-span-1  items-center justify-end col-start-2'>
                Entropy
              </div>
              <div className='col-span-2'>
                {Math.round(crackTimeEstimation().entropy * 100) / 100}
              </div>
              <div className='row-span-1 col-span-1 items-center col-start-2  right-0'>
                Character set size
              </div>
              <div className='col-span-2'>
                {crackTimeEstimation().charsetLength}
              </div>
              <div className='row-span-1 col-span-1 items-center col-start-2'>
                Score
              </div>
              <div className='col-span-2'>
                {Math.round(crackTimeEstimation().score * 100)} / 100
              </div>

              {/* {
                details().map((detail => {
                  console.log(detail)
                  return (
                    <div key={detail.value} className=' justify-center'>
                      <div className=''>
                        {detail.label}
                      </div>
                      <div className=''>
                        {detail.value}
                      </div>
                    </div>
                  )
                }))
              } */}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

function getPasswordCrackTimeEstimation({ password, guessesPerSecond = 1e9 }: { password: string; guessesPerSecond?: number }) {
  const charsetLength = getCharsetLength({ password });
  const passwordLength = password.length;

  const entropy = password === '' ? 0 : Math.log2(charsetLength) * passwordLength;

  const secondsToCrack = 2 ** entropy / guessesPerSecond;

  const crackDurationFormatted = getHumanFriendlyDuration({ seconds: secondsToCrack });

  const score = Math.min(entropy / 128, 1);

  return {
    entropy,
    charsetLength,
    passwordLength,
    crackDurationFormatted,
    secondsToCrack,
    score,
  };
}

function getCharsetLength({ password }: { password: string }) {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasDigits = /\d/.test(password);
  const hasSpecialChars = /\W|_/.test(password);

  let charsetLength = 0;

  if (hasLowercase) {
    charsetLength += 26;
  }
  if (hasUppercase) {
    charsetLength += 26;
  }
  if (hasDigits) {
    charsetLength += 10;
  }
  if (hasSpecialChars) {
    charsetLength += 32;
  }

  return charsetLength;
}

function getHumanFriendlyDuration({ seconds }: { seconds: number }) {
  if (seconds <= 0.001) {
    return 'Instantly';
  }

  if (seconds <= 1) {
    return 'Less than a second';
  }

  const timeUnits = [
    { unit: 'millenium', secondsInUnit: 31536000000, format: prettifyExponentialNotation, plural: 'millennia' },
    { unit: 'century', secondsInUnit: 3153600000, plural: 'centuries' },
    { unit: 'decade', secondsInUnit: 315360000, plural: 'decades' },
    { unit: 'year', secondsInUnit: 31536000, plural: 'years' },
    { unit: 'month', secondsInUnit: 2592000, plural: 'months' },
    { unit: 'week', secondsInUnit: 604800, plural: 'weeks' },
    { unit: 'day', secondsInUnit: 86400, plural: 'days' },
    { unit: 'hour', secondsInUnit: 3600, plural: 'hours' },
    { unit: 'minute', secondsInUnit: 60, plural: 'minutes' },
    { unit: 'second', secondsInUnit: 1, plural: 'seconds' },
  ];

  return _.chain(timeUnits)
    .map(({ unit, secondsInUnit, plural, format = _.identity }) => {
      const quantity = Math.floor(seconds / secondsInUnit);
      seconds %= secondsInUnit;

      if (quantity <= 0) {
        return undefined;
      }

      const formattedQuantity = format(quantity);
      return `${formattedQuantity} ${quantity > 1 ? plural : unit}`;
    })
    .compact()
    .take(2)
    .join(', ')
    .value();
}

function prettifyExponentialNotation(exponentialNotation: number) {
  const [base, exponent] = exponentialNotation.toString().split('e');
  const baseAsNumber = Number.parseFloat(base!);
  const prettyBase = baseAsNumber % 1 === 0 ? baseAsNumber.toLocaleString() : baseAsNumber.toFixed(2);
  return exponent ? `${prettyBase}e${exponent}` : prettyBase;
}

export default page