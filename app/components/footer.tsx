import React from 'react'
import { GithubIcon, LinkedinIcon, TwitterIcon } from './icons'
import { Divider } from '@nextui-org/react'

export const Footer = () => {
  return (
    <footer className='mt-10 rounded-xl m-10 flex flex-col bg-black/5 items-center text-black'>
        <h3 className='mt-10 font-medium text-center capitalize text-2xl px-4'>
            Tools &nbsp;|&nbsp; Algorithms &nbsp;|&nbsp; News & Updates
        </h3>
        <p className='mt-5 px-4 text-center w-3/5 font-light text-base'>
            Stay hungry, stay foolish.
        </p>
        <div className='mt-6 flex items-center'>
            <a className=' inline-block w-6 h-6 mr-4'>
                <LinkedinIcon className="hover:scale-125 transition-all ease duration-200"/>
            </a>
            <a className=' inline-block w-6 h-6 mr-4'>
            <TwitterIcon className="hover:scale-125 transition-all ease duration-200"/>
            </a>
            <a className=' inline-block w-6 h-6 mr-4'>
            <GithubIcon className="hover:scale-125 transition-all ease duration-200"/>
            </a>
        </div>
        <div className="w-full mt-8 relative font-medium border-t border-solid border-light py-3 px-4 flex  flex-col items-start justify-between">
            <span className=" text-left">
             &copy;2024 Sunset. All rights reserved.
            </span>
        </div>
    </footer>
  )
}
