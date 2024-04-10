import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-gray-400 border border-t-2 border-t-black">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="200px" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    &copy; Copyright 2024. All Rights Reserved by Sociogram.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-1/2">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-s font-semibold text-gray-500 tracking-wide">
                                App built with react to create your own blog with Sociogram.
                            </h3>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
  )
}

export default Footer