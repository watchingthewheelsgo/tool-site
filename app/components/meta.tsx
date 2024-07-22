import { Base64Icon, Base64IconSingle, BasicAuthIcon, DateTimeIcon, HMACIcon, IntegerBaseIcon, JWTIcon, OTPIcon, PASSWDICon, PDFIcon, QRCodeIcon, RSAICon, SQLIcon, SVGIcon, TokenIcon, UUIDIcon, UULDIcon, UserAgentIcon, YAMLFileIcon, YAMLIcon } from './icons';

export const toolCollection = {
  crypto: [
    {
      key: "uuid",
      title: "UUIDs Generator",
      icon: <UUIDIcon className="w-4 h-4"/>,
      desc: "A Universally Unique Identifier (UUID) is a 128-bit number used to identify information in computer systems. The number of possible UUIDs is 16^32, which is 2^128 or about 3.4x10^38 (which is a lot!)."
    },
    {
      key: "ulid",
      title: "ULIDs Generator",
      icon: <UULDIcon className="w-4 h-4" />,
      desc: "Generate random Universally Unique Lexicographically Sortable Identifier (ULID)."
    },
    {
      key: "rsa",
      title: "RSA Key Pair Generator",
      icon: <RSAICon className="w-4 h-4" />,
      desc: "Generate a new random RSA private and public pem certificate key pair."
    },
    {
      key: "passwd",
      title: "Password Strength Checker",
      icon: <PASSWDICon className="w-4 h-4" />,
      desc: "Discover the strength of your password with this client-side-only password strength analyser and crack time estimation tool."
    },
    {
      key: "hmac",
      title: "HMAC Generator",
      icon: <HMACIcon className="w-4 h-4" />,
      desc: "Computes a hash-based message authentication code (HMAC) using a secret key and your favorite hashing function."
    },
    // {
    //   key: "pdf-signature",
    //   title: "PDF Signature Validator",
    //   icon: <PDFIcon className={"w-5 h-5"} />,
    //   desc: "Verify the signatures of a PDF file. A signed PDF file contains one or more signatures that may be used to determine whether the contents of the file have been altered since the file was signed."
    // },
    {
      key: "token",
      title: "Token Generator",
      icon: <TokenIcon className="w-5 h-5"/>,
      desc: "Generate random string with the chars you want, uppercase or lowercase letters, numbers and/or symbols."
    }
  ],
  convert: [
    {
      key: "dtc",
      title: "Date-Time Converter",
      desc: "Convert date and time into the various different formats",
      icon: <DateTimeIcon className="w-5 h-5" />
    },
    {
      key: "base64",
      title: "Base64 String Converter",
      desc: "Simply encode and decode strings into their base64 representation.",
      icon: <Base64IconSingle className='w-5 h-5' />
    },
    {
      key: "integer",
      title: "Integer Base Converter",
      desc: "Convert a number between different bases (decimal, hexadecimal, binary, octal, base64, ...)",
      icon: <IntegerBaseIcon className="w-5 h-5" />
    },
    {
      key: "yaml2json",
      title: "Yaml to Json",
      desc: "Simply convert YAML to JSON with this online live converter.",
      icon: <YAMLIcon className="w-5 h-5" />
    }
  ],
  web: [
    {
      key: "jwt",
      title: "JWT Parser",
      desc: "Parse and decode your JSON Web Token (jwt) and display its content.",
      icon: <JWTIcon className="w-5 h-5" />
    },
    {
      key: "auth",
      title: "Basic Auth Generater",
      desc: "Generate a base64 basic auth header from a username and password.",
      icon: <BasicAuthIcon className="w-5 h-5" />
    },
    // {
    //   key: "otp",
    //   title: "OTP Code Generater",
    //   desc: "Generate and validate time-based OTP (one time password) for multi-factor authentication.",
    //   icon: <OTPIcon className="w-5 h-5" />
    // },
    // {
    //   key: "user-agent",
    //   title: "User-agent Parser",
    //   desc: "Detect and parse Browser, Engine, OS, CPU, and Device type/model from an user-agent string.",
    //   icon: <UserAgentIcon className="w-5 h-5" />
    // }
  ],
  image: [
    {
      key: "qr-code",
      title: "QR Code Generator",
      desc: "Generate and download a QR code for a URL (or just plain text), and customize the background and foreground colors.",
      icon: <QRCodeIcon className="w-5 h-5" />
    },
    {
      key: "svg",
      title: "SVG Generater",
      desc: "Generate svg images to use as a placeholder in your applications.",
      icon: <SVGIcon className="w-5 h-5" />
    }
  ],
  formatter: [
    {
      key: "sql",
      title: "SQL Formatter",
      desc: "Format and prettify your SQL queries online (it supports various SQL dialects).",
      icon: <SQLIcon  className="w-5 h-5" />
    },
    {
      key: "yaml",
      title: "YAML Formatter",
      desc: "Prettify your YAML string into a friendly, human-readable format.",
      icon: <YAMLFileIcon className="w-5 h-5" />
    }
  ]
}