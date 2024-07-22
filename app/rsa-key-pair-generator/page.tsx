'use client'
import React, { useEffect } from 'react'
import { Title } from '../components/Tool/Title'
import { Card, CardBody, Input, Textarea } from '@nextui-org/react'
import { pki } from 'node-forge'
import { workerScript } from 'node-forge/dist/prime.worker.min.js';
import { toolCollection } from '../components/meta'


const validateKeyLength = (keyLength: string) => {
  let isnum = /^\d+$/.test(keyLength)
  if (isnum) {
    const num = parseInt(keyLength)
    return num >= 256 && num <= 16384 && num % 8 === 0
  }
  return false
}
const Page = () => {
  const toolMeta = toolCollection.crypto.findLast((t) => t.key === 'rsa')
  if (toolMeta === undefined) {
    return (
      <div>
        Will support soon...
      </div>
    )
  }
  const [keyLength, setKeyLength] = React.useState("2048");
  const [publicKey, setPublicKey] = React.useState("");
  const [privateKey, setPrivateKey] = React.useState("");
  const isInvalid = React.useMemo(() => {
    console.log(keyLength)
    if (keyLength === "") return false;
    return validateKeyLength(keyLength) ? false : true;
  }, [keyLength]);

  useEffect(()=> {
    generateKeyPair({bits: parseInt(keyLength)})
    .then((kp) => {
      setPublicKey(kp.publicKeyPem)
      setPrivateKey(kp.privateKeyPem)
    })
  }, [keyLength])

  return (
    <div className='sm:w-[600px] items-center justify-center'>
      <div className='flex flex-col'>
        <Title name={toolMeta.title} desc={toolMeta.desc} />
        <Card className='mt-10'>
          <CardBody className='py-4 '>
            <Input
              isClearable
              label="Bits Number"
              placeholder="Give bits number"
              value={keyLength}
              labelPlacement="outside-left"
              onChange={(e) => {
                setKeyLength(e.target.value)
                // const kp = generateKeyPair(parseInt(e.target.value))
                setPrivateKey(e.target.value)
                setPublicKey(e.target.value)
              }}
              isInvalid={isInvalid}
              color={isInvalid ? "danger" : "success"}
              errorMessage="Bits number should be [256, 16384] and can be divided by 8"
              classNames={{
                base: "my-6",
                label: "text-black text-md items-center mr-4",
                input: "focus:outline-none border-transparent focus:border-transparent focus:ring-0 pl-4",
              }}
              type='number'
            />
            <Textarea
              readOnly
              classNames={{
                label: "text-md text-black",
                inputWrapper: "h-full font-normal text-default-500",
                input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
              label="Public Key"
              labelPlacement='outside'
              size='md'
              variant='faded'
              value={publicKey}
              // onValueChange={setPublicKey}
            />
            <Textarea
              readOnly
              classNames={{
                base: "mt-4",
                label: "text-md text-black",
                inputWrapper: "h-full font-normal text-default-500",
                input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
              label="Private Key"
              labelPlacement='outside'
              size='md'
              variant='faded'
              value={privateKey}
              // onValueChange={setPrivateKey}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

function generateRawPairs({ bits = 2048 }) {
  return new Promise<pki.rsa.KeyPair>((resolve, reject) =>
    pki.rsa.generateKeyPair({ bits,  workerScript}, (err, keyPair) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(keyPair);
    }),
  );
}

async function generateKeyPair(config: { bits?: number } = {}) {

  const { privateKey, publicKey } = await generateRawPairs(config);

  return {
    publicKeyPem: pki.publicKeyToPem(publicKey),
    privateKeyPem: pki.privateKeyToPem(privateKey),
  };
}

export default Page