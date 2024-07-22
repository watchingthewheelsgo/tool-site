'use client'
import React from 'react'
import { toolCollection } from '../components/meta'
import { Card, CardBody, Spacer, Table, TableHeader, TableColumn, Textarea, TableBody, TableRow, TableCell, getKeyValue, Divider } from '@nextui-org/react'
import { Title } from '../components/Tool/Title'
import { jwtDecode, JwtHeader, JwtPayload } from 'jwt-decode';
import _ from 'lodash';
import { getErrorMessageIfThrows } from '@/utils/error'

export const ALGORITHM_DESCRIPTIONS: { [k: string]: string } = {
  HS256: 'HMAC using SHA-256',
  HS384: 'HMAC using SHA-384',
  HS512: 'HMAC using SHA-512',
  RS256: 'RSASSA-PKCS1-v1_5 using SHA-256',
  RS384: 'RSASSA-PKCS1-v1_5 using SHA-384',
  RS512: 'RSASSA-PKCS1-v1_5 using SHA-512',
  ES256: 'ECDSA using P-256 and SHA-256',
  ES384: 'ECDSA using P-384 and SHA-384',
  ES512: 'ECDSA using P-521 and SHA-512',
  PS256: 'RSASSA-PSS using SHA-256 and MGF1 with SHA-256',
  PS384: 'RSASSA-PSS using SHA-384 and MGF1 with SHA-384',
  PS512: 'RSASSA-PSS using SHA-512 and MGF1 with SHA-512',
  none: 'No digital signature or MAC performed',
};

// List extracted from IANA: https://www.iana.org/assignments/jwt/jwt.xhtml
export const CLAIM_DESCRIPTIONS: Record<string, string> = {
  typ: 'Type',
  alg: 'Algorithm',
  iss: 'Issuer',
  sub: 'Subject',
  aud: 'Audience',
  exp: 'Expiration Time',
  nbf: 'Not Before',
  iat: 'Issued At',
  jti: 'JWT ID',
  name: 'Full name',
  given_name: 'Given name(s) or first name(s)',
  family_name: 'Surname(s) or last name(s)',
  middle_name: 'Middle name(s)',
  nickname: 'Casual name',
  preferred_username: 'Shorthand name by which the End-User wishes to be referred to',
  profile: 'Profile page URL',
  picture: 'Profile picture URL',
  website: 'Web page or blog URL',
  email: 'Preferred e-mail address',
  email_verified: 'True if the e-mail address has been verified; otherwise false',
  gender: 'Gender',
  birthdate: 'Birthday',
  zoneinfo: 'Time zone',
  locale: 'Locale',
  phone_number: 'Preferred telephone number',
  phone_number_verified: 'True if the phone number has been verified; otherwise false',
  address: 'Preferred postal address',
  updated_at: 'Time the information was last updated',
  azp: 'Authorized party - the party to which the ID Token was issued',
  nonce: 'Value used to associate a Client session with an ID Token',
  auth_time: 'Time when the authentication occurred',
  at_hash: 'Access Token hash value',
  c_hash: 'Code hash value',
  acr: 'Authentication Context Class Reference',
  amr: 'Authentication Methods References',
  sub_jwk: 'Public key used to check the signature of an ID Token',
  cnf: 'Confirmation',
  sip_from_tag: 'SIP From tag header field parameter value',
  sip_date: 'SIP Date header field value',
  sip_callid: 'SIP Call-Id header field value',
  sip_cseq_num: 'SIP CSeq numeric header field parameter value',
  sip_via_branch: 'SIP Via branch header field parameter value',
  orig: 'Originating Identity String',
  dest: 'Destination Identity String',
  mky: 'Media Key Fingerprint String',
  events: 'Security Events',
  toe: 'Time of Event',
  txn: 'Transaction Identifier',
  rph: 'Resource Priority Header Authorization',
  sid: 'Session ID',
  vot: 'Vector of Trust value',
  vtm: 'Vector of Trust trustmark URL',
  attest: 'Attestation level as defined in SHAKEN framework',
  origid: 'Originating Identifier as defined in SHAKEN framework',
  act: 'Actor',
  scope: 'Scope Values',
  client_id: 'Client Identifier',
  may_act: 'Authorized Actor - the party that is authorized to become the actor',
  jcard: 'jCard data',
  at_use_nbr: 'Number of API requests for which the access token can be used',
  div: 'Diverted Target of a Call',
  opt: 'Original PASSporT (in Full Form)',
  vc: 'Verifiable Credential as specified in the W3C Recommendation',
  vp: 'Verifiable Presentation as specified in the W3C Recommendation',
  sph: 'SIP Priority header field',
  ace_profile: 'ACE profile a token is supposed to be used with.',
  cnonce: 'Client nonce',
  exi: 'Expires in',
  roles: 'Roles',
  groups: 'Groups',
  entitlements: 'Entitlements',
  token_introspection: 'Token introspection response',
};


function decodeJwt({ jwt }: { jwt: string }) {
  const rawHeader = jwtDecode<JwtHeader>(jwt, { header: true });
  const rawPayload = jwtDecode<JwtPayload>(jwt);

  const header = _.map(rawHeader, (value, claim) => parseClaims({ claim, value }));
  const payload = _.map(rawPayload, (value, claim) => parseClaims({ claim, value }));

  return {
    header,
    payload,
  };
}

function parseClaims({ claim, value }: { claim: string; value: unknown }) {
  const claimDescription = CLAIM_DESCRIPTIONS[claim];
  const formattedValue = _.isPlainObject(value) || _.isArray(value) ? JSON.stringify(value, null, 3) : _.toString(value);
  const friendlyValue = getFriendlyValue({ claim, value });

  return {
    value: formattedValue,
    friendlyValue,
    claim,
    claimDescription,
  };
}

function getFriendlyValue({ claim, value }: { claim: string; value: unknown }) {
  if (['exp', 'nbf', 'iat'].includes(claim)) {
    return dateFormatter(value);
  }

  if (claim === 'alg' && _.isString(value)) {
    return ALGORITHM_DESCRIPTIONS[value];
  }

  return undefined;
}

function dateFormatter(value: unknown) {
  if (_.isNil(value)) {
    return undefined;
  }

  const date = new Date(Number(value) * 1000);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

const sections = [
  { key: 'header', title: 'Header' },
  { key: 'payload', title: 'Payload' },
] as const;

const defaultJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

const Page = () => {
  const toolMeta = toolCollection.web.findLast((t) => t.key === 'jwt')
  if (toolMeta === undefined) {
    return (
      <div>
        Will support soon...
      </div>
    )
  }
  const [jwtToken, setJwtToken] = React.useState(defaultJwtToken);

  const isInvalid = React.useMemo(() => {
    if (jwtToken === "") return {
      result: false,
      hint: ""
    };
    const dryrun = getErrorMessageIfThrows(() => decodeJwt({ jwt: jwtToken }))
    if (dryrun == undefined) {
      return {
        result: false,
        hint: ""
      }
    }
    return {
      result: true,
      hint: "Please input a valid JWT token. Message: " + dryrun
    }
  }, [jwtToken]);

  const decodedJWT = () => decodeJwt({ jwt: jwtToken })
  return (
    <div className='sm:w-[600px] items-center justify-center'>
      <div className='flex flex-col'>
        <Title name={toolMeta.title} desc={toolMeta.desc} />
        <Card className='mt-10'>
          <CardBody className='py-4 '>
            <label className='text-black text-md my-4 font-semibold'>JWT to decode</label>
            <Textarea
              disableAnimation
              disableAutosize
              classNames={{
                label: "text-black mb-2",
                inputWrapper: "font-normal",
                input: 'resize-y min-h-[120px] focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
              size='md'
              variant='faded'
              placeholder='Enter jwt token to be parsed...'
              labelPlacement='outside'
              value={jwtToken}
              onValueChange={setJwtToken}
              isInvalid={isInvalid.result}
              errorMessage={isInvalid.result ? isInvalid.hint : ""}
            />
            <Spacer y={2} />
            {
              (!isInvalid.result && jwtToken != "") ? (

                <Card>
                  <CardBody>
                    <label className='text-black text-md my-2 font-semibold'>JWT Info</label>
                    <div className='grid grid-cols-3'>
                      <div className='my-2 text-center col-span-3 justify-items-center bg-default-100 border-medium border-default-200 border-transparent transition-none rounded-medium'>
                        Header
                      </div>
                      <Table
                        hideHeader
                        selectionMode="single"
                        color='default'
                        aria-label="header"
                        className='w-full col-span-3'>
                        <TableHeader>
                          {[{ key: "1", label: "a" }, { key: "2", label: "b" }].map((column) =>
                            <TableColumn align='start' key={column.key}>{column.label}</TableColumn>
                          )}
                        </TableHeader>
                        <TableBody>
                          {decodeJwt({ jwt: jwtToken }).header.map((row) =>
                            <TableRow key={row.claim}>
                              <TableCell>{row.claim + " (" + row.claimDescription + ")"}</TableCell>
                              <TableCell>{row.friendlyValue == undefined ? row.value : row.value + " (" + row.friendlyValue + ")"}</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                      <div className='my-2 text-center col-span-3 justify-items-center bg-default-100 border-medium border-default-200 border-transparent transition-none rounded-medium'>
                        Payload
                      </div>
                      <Table
                        hideHeader
                        selectionMode="single"
                        aria-label="payload"
                        className='w-full col-span-3'>
                        <TableHeader>
                          {[{ key: "1", label: "a" }, { key: "2", label: "b" }].map((column) =>
                            <TableColumn align='start' key={column.key}>{column.label}</TableColumn>
                          )}
                        </TableHeader>
                        <TableBody>
                          {decodeJwt({ jwt: jwtToken }).payload.map((row) =>
                            <TableRow key={row.claim}>
                              <TableCell>{row.claim + " (" + row.claimDescription + ")"}</TableCell>
                              <TableCell>{row.friendlyValue == undefined ? row.value : row.value + " (" + row.friendlyValue + ")"}</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              ) : (
                <div>

                </div>
              )
            }
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
export default Page