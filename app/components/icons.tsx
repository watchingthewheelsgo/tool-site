import exp from "constants"
import * as React from "react"
import { SVGProps } from "react"

export const TimestampIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={200}
    height={200}
    className="icon"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill="#263238"
      d="M501.296 544c-17.648 0-32-14.352-32-32V400c0-17.648 14.352-32 32-32s32 14.352 32 32v112c0 17.648-14.352 32-32 32zm0-160c-8.816 0-16 7.184-16 16v112c0 8.816 7.184 16 16 16s16-7.184 16-16V400c0-8.816-7.184-16-16-16zm64-168h-128c-13.232 0-24-10.768-24-24v-32c0-13.232 10.768-24 24-24h128c13.232 0 24 10.768 24 24v32c0 13.232-10.768 24-24 24zm-128-64a8 8 0 0 0-8 8v32a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-32a8 8 0 0 0-8-8h-128z"
    />
    <path
      fill="#263238"
      d="M453.296 240a8 8 0 0 1-8-8v-24a8 8 0 0 1 16 0v24a8 8 0 0 1-8 8zm96 0a8 8 0 0 1-8-8v-24a8 8 0 0 1 16 0v24a8 8 0 0 1-8 8z"
    />
    <path
      fill="#4DB6AC"
      d="M501.296 264c-132.544 0-240 107.456-240 240 0 132.544 107.456 240 240 240 132.544 0 240-107.456 240-240 0-132.544-107.456-240-240-240zm0 432c-106.032 0-192-85.968-192-192s85.968-192 192-192 192 85.968 192 192-85.968 192-192 192z"
    />
    <path
      fill="#263238"
      d="M501.296 752c-136.752 0-248-111.248-248-248s111.248-248 248-248 248 111.248 248 248-111.248 248-248 248zm0-480c-127.92 0-232 104.08-232 232s104.08 232 232 232 232-104.08 232-232-104.08-232-232-232zm0 432c-110.288 0-200-89.712-200-200s89.712-200 200-200 200 89.712 200 200-89.712 200-200 200zm0-384c-101.456 0-184 82.544-184 184s82.544 184 184 184 184-82.544 184-184-82.544-184-184-184z"
    />
    <path
      fill="#FFD740"
      d="M501.296 968c-255.856 0-464-208.144-464-464h128c0 185.28 150.72 336 336 336 185.264 0 336-150.72 336-336h128c0 255.856-208.16 464-464 464z"
    />
    <path
      fill="#263238"
      d="M501.296 976c-260.272 0-472-211.728-472-472a8 8 0 0 1 8-8h128a8 8 0 0 1 8 8c0 180.864 147.136 328 328 328s328-147.136 328-328a8 8 0 0 1 8-8h128a8 8 0 0 1 8 8c0 260.272-211.728 472-472 472zM45.36 512c4.288 247.76 207.168 448 455.936 448S952.96 759.76 957.232 512H845.2c-4.272 186-156.896 336-343.904 336S161.648 698 157.392 512H45.36zm670.896-169.696a8 8 0 0 1-5.664-13.648l16.992-16.976-33.952-33.936-16.976 16.976a8 8 0 0 1-11.312-11.312l22.624-22.624a8 8 0 0 1 11.312 0l45.264 45.248a8 8 0 0 1 0 11.328L721.904 340a8.096 8.096 0 0 1-5.648 2.304zm-429.92 0a8.032 8.032 0 0 1-5.664-2.336l-22.624-22.64a8 8 0 0 1 0-11.312l45.248-45.248a8 8 0 0 1 11.312 0l22.64 22.624a8 8 0 0 1-11.312 11.312l-16.976-16.976-33.936 33.936L292 328.64a8 8 0 0 1-5.664 13.664zM55.904 464a8 8 0 0 1-7.968-8.848 453.76 453.76 0 0 1 7.904-48.864 8 8 0 1 1 15.632 3.424 445.673 445.673 0 0 0-7.632 47.136A8 8 0 0 1 55.904 464z"
    />
    <path
      fill="#263238"
      d="M946.688 464a8 8 0 0 1-7.936-7.152C914.896 232.896 726.832 64 501.296 64 308.048 64 134.64 193.232 79.568 378.288a7.968 7.968 0 0 1-9.952 5.376 7.984 7.984 0 0 1-5.376-9.952C121.312 181.936 301.024 48 501.296 48c233.728 0 428.64 175.04 453.36 407.152a8 8 0 0 1-7.968 8.848zm-589.392 48h-48a8 8 0 0 1 0-16h48a8 8 0 0 1 0 16zm336 0h-48a8 8 0 0 1 0-16h48a8 8 0 0 1 0 16zm-192 192a8 8 0 0 1-8-8v-48a8 8 0 0 1 16 0v48a8 8 0 0 1-8 8zm0 272a8 8 0 0 1-8-8v-64a8 8 0 0 1 16 0v64a8 8 0 0 1-8 8zm323.936-132.048a8.032 8.032 0 0 1-5.664-2.336l-45.248-45.264a8 8 0 0 1 11.312-11.312l45.248 45.264a8 8 0 0 1-5.648 13.648zM927.152 696.4a7.888 7.888 0 0 1-3.056-.608l-29.568-12.256a8 8 0 0 1 6.112-14.784l29.568 12.256a8 8 0 0 1-3.056 15.392zm-851.712 0a8 8 0 0 1-3.056-15.392l29.568-12.256a8 8 0 0 1 6.112 14.784l-29.568 12.256a7.888 7.888 0 0 1-3.056.608zm101.904 147.552a8 8 0 0 1-5.664-13.648l45.264-45.264a8 8 0 0 1 11.312 11.312L183.008 841.6a8 8 0 0 1-5.664 2.352zm498.688 97.904a8 8 0 0 1-7.392-4.944l-12.256-29.568a8 8 0 0 1 14.784-6.112l12.256 29.568a8 8 0 0 1-7.392 11.056zM326.56 941.856a8 8 0 0 1-7.392-11.056l12.256-29.568a8 8 0 0 1 14.784 6.112l-12.256 29.568a8 8 0 0 1-7.392 4.944z"
    />
    <path
      fill="#263238"
      d="M946.704 464a7.888 7.888 0 0 1-3.968-1.056l-56-32a8 8 0 1 1 7.936-13.888l50.176 28.672 35.712-42.848a8 8 0 0 1 12.272 10.256l-40 48a7.952 7.952 0 0 1-6.128 2.864z"
    />
  </svg>
)

export const Base64Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={200}
    height={200}
    className="icon"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill="#00BBD3"
      d="M510.685 991.545c-130.925 0-261.85.01-392.775-.005-55.398-.005-88.329-32.66-88.331-87.635-.015-262.295-.015-524.59 0-786.885.003-55.028 32.874-87.653 88.285-87.655 261.849-.01 523.7-.01 785.549 0 56.025.002 88.338 32.544 88.339 88.945.008 261.404.008 522.808 0 784.213-.001 56.893-32.355 89.017-89.63 89.02-130.479.006-260.958.002-391.437.002zM344.569 538.17c-72.666-6.169-137.564 32.063-164.739 97.413-20.084 48.298-21.976 99.233-12.808 149.558 16.57 90.946 117.031 130.807 187.52 75.742 37.708-29.456 45.827-70.429 40.791-115.083-9.118-80.872-81.807-116.59-151.532-74.924-3.565 2.13-6.748 4.492-10.797 1.026 14.672-57.545 55.69-78.608 111.565-79.312v-54.42zm314.804 214.36v-211.88c-19.843 0-38.04.498-56.191-.215-8.703-.34-13.518 2.604-18.12 9.95-40.634 64.851-80.621 130.155-123.246 193.685-14.11 21.031-9.755 40.622-8.647 63.296H592.58v71.314h67.526v-72.323h36.955v-53.826h-37.69zM845.247 210.87l12.609-74.45c-11.756.336-22.668-1.427-33.627 1.1-3.88 21.959-7.731 43.389-11.41 64.85-.845 4.93-.892 10.353-7.838 10.146-9.198-.274-18.56 1.586-28.868-1.788l12.548-74.456c-11.833.722-22.73-1.617-33.463 1.491-3.965 22.108-8.294 43.467-11.403 65.002-1.186 8.209-4.602 10.068-12.098 10.042-12.304-.044-24.723-1.38-37.457 1-.655 10.526-2.12 20.484 1.332 31.353h40.035c-2.524 18.093-4.78 34.858-9.221 50.942-16.075 1.702-31.153-1.122-45.786 1.67v30.987h40.805L708.63 402.76c11.674.966 22.562 1.684 33.569-.35 3.916-22.018 7.786-43.433 11.489-64.877.77-4.459.597-9.117 7.144-9.012 9.495.151 18.994.039 29.504.039l-12.562 74.182h33.32l13.44-74.711h45.898v-31.293h-40.29c2.699-16.168 5.163-30.962 7.64-45.754.979-5.843 5.19-6.235 9.98-6.18 11.92.137 23.842.046 36.252.046 1.206-11.294 1.3-21.226.067-31.289-12.894-2.508-25.514.997-38.835-2.692z"
    />
    <path
      fill="#FEFEFE"
      d="M344.57 538.171v54.421c-55.876.704-96.894 21.767-111.566 79.312 4.049 3.466 7.232 1.104 10.797-1.026 69.725-41.666 142.413-5.948 151.532 74.924 5.035 44.654-3.084 85.627-40.79 115.083-70.489 55.066-170.951 15.204-187.52-75.742-9.169-50.325-7.277-101.26 12.807-149.558 27.175-65.352 92.073-103.584 164.74-97.414zM230.28 755.746c-.106 15.676 1.74 31.052 7.974 45.58 7.966 18.561 22.298 28.805 42.41 29.012 19.724.202 33.9-10.104 41.84-27.786 9.734-21.675 9.898-44.1.772-66.007-9.56-22.95-30.459-33.065-55.607-28.042-23.692 4.731-37.464 22.145-37.388 47.243zm429.093-3.214h37.689v53.826h-36.955v72.323H592.58v-71.314H453.169c-1.107-22.674-5.463-42.266 8.647-63.296 42.625-63.53 82.612-128.834 123.245-193.686 4.603-7.345 9.418-10.291 18.12-9.949 18.15.713 36.348.216 56.192.216v211.88zm-68.383-.417v-117.2l-73.653 117.2h73.653zM845.247 210.87c13.321 3.689 25.941.186 38.835 2.69 1.233 10.063 1.139 19.996-.067 31.29-12.411 0-24.333.092-36.252-.046-4.79-.054-9.001.337-9.98 6.18-2.478 14.792-4.941 29.586-7.64 45.754h40.29v31.292h-45.898l-13.44 74.711h-33.32l12.562-74.181c-10.51 0-20.01.112-29.504-.04-6.547-.104-6.374 4.555-7.144 9.013-3.703 21.444-7.573 42.86-11.49 64.876-11.006 2.035-21.894 1.318-33.568.35l12.774-74.002H680.6v-30.986c14.635-2.792 29.711.032 45.786-1.67 4.442-16.084 6.697-32.849 9.221-50.942h-40.035c-3.453-10.869-1.988-20.827-1.332-31.352 12.734-2.382 25.153-1.045 37.457-1.002 7.497.027 10.913-1.833 12.098-10.042 3.11-21.534 7.438-42.893 11.403-65 10.735-3.11 21.63-.77 33.463-1.492l-12.548 74.456c10.309 3.374 19.67 1.515 28.868 1.788 6.946.207 6.993-5.215 7.838-10.146 3.679-21.461 7.53-42.892 11.41-64.85 10.958-2.527 21.871-.764 33.627-1.1l-12.609 74.451zm-39.927 33.99c-10.718 0-19.532.167-28.336-.067-4.778-.128-7.547 1.552-8.346 6.403-2.425 14.736-4.939 29.455-7.528 44.836h35.015l9.195-51.172z"
    />
    <path
      fill="#00BBD3"
      d="M230.298 755.743c-.091-25.095 13.68-42.509 37.372-47.24 25.148-5.024 46.046 5.09 55.607 28.04 9.126 21.91 8.962 44.334-.772 66.008-7.94 17.681-22.116 27.988-41.84 27.786-20.112-.208-34.445-10.45-42.41-29.011-6.235-14.528-8.08-29.905-7.957-45.583zm360.692-3.628h-73.653l73.653-117.2v117.2zM805.32 244.86l-9.195 51.17H761.11c2.59-15.379 5.103-30.1 7.528-44.835.799-4.851 3.57-6.53 8.346-6.403 8.805.235 17.62.068 28.336.068z"
    />
  </svg>
)

export const XIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={props.width || 18}
    height={props.height || 18}
    viewBox="0 0 512 512"
    {...props}
  >
    <path
      d="M83.753 511.961c-21.451 0-42.904-8.167-59.236-24.497-32.663-32.664-32.663-85.811 0-118.473l201.65-201.65c6.38-6.377 16.719-6.377 23.101 0 6.378 6.378 6.378 16.721 0 23.101l-201.65 201.65c-19.926 19.926-19.926 52.348 0 72.273 19.926 19.927 52.346 19.924 72.272 0L464.345 119.91c19.926-19.926 19.926-52.348 0-72.273-19.927-19.929-52.348-19.926-72.272 0l-51.881 51.881c-6.38 6.377-16.719 6.377-23.101 0-6.378-6.378-6.378-16.721 0-23.101l51.881-51.881c32.664-32.659 85.808-32.661 118.472 0 32.663 32.663 32.663 85.809 0 118.473L142.988 487.464c-16.332 16.33-37.783 24.497-59.235 24.497z"
      style={{
        fill: "#507c5c",
      }}
    />
    <path
      d="M475.894 475.914c-26.336 26.336-69.036 26.336-95.373 0L36.066 131.459c-26.336-26.336-26.336-69.036 0-95.373 26.336-26.336 69.036-26.336 95.373 0l344.455 344.455c26.337 26.337 26.337 69.036 0 95.373z"
      style={{
        fill: "#cff09e",
      }}
    />
    <path
      d="M428.208 512c-22.377 0-43.413-8.714-59.237-24.535L24.517 143.01c-32.663-32.664-32.663-85.809 0-118.473C40.341 8.714 61.377 0 83.753 0c22.377 0 43.413 8.714 59.238 24.535L487.445 368.99c15.822 15.824 24.535 36.86 24.535 59.238 0 22.377-8.714 43.413-24.535 59.238-15.824 15.82-36.86 24.534-59.237 24.534zM83.753 32.667c-13.648 0-26.483 5.315-36.135 14.968-19.926 19.926-19.926 52.348 0 72.273l344.455 344.455c9.652 9.653 22.487 14.968 36.137 14.968 13.648 0 26.483-5.315 36.135-14.968 9.653-9.652 14.968-22.487 14.968-36.137 0-13.65-5.315-26.485-14.968-36.137L119.889 47.636c-9.651-9.654-22.486-14.969-36.136-14.969z"
      style={{
        fill: "#507c5c",
      }}
    />
  </svg>
)

export const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={props.height || 18}
    role="presentation"
    viewBox="0 0 24 24"
    width={props.width || 18}
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={props.strokeWidth || 1.5}
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={props.strokeWidth || 1.5}
    />
  </svg>
);

export const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
