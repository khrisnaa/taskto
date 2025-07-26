import React from 'react'
import { Separator } from './ui/separator'
import { Instagram, Link, Linkedin, LinkedinIcon } from 'lucide-react'

const Footer = () => {
    const SOCIAL_LINKS = [
        {
            avatar: '/assets/12.png',
            name: 'Kemas',
            linkedIn: '#',
            instagram: '#',
        },
        {
            avatar: '/assets/14.png',
            name: 'Agung',
            linkedIn: '#',
            instagram: '#',
        },
        {
            avatar: '/assets/17.png',
            name: 'Khrisna',
            linkedIn: '#',
            instagram: '#',
        },
        {
            avatar: '/assets/16.png',
            name: 'Dede',
            linkedIn: '#',
            instagram: '#',
        },
    ]

    return (
        <div className="mx-auto p-6 bg-secondary rounded-lg shadow-lg pb-10 md:flex  md:justify-center md:items-center">
            <div className="md:flex-1">
                <div className="flex justify-start items-center space-x-2 mb-4 md:flex md:space-x-6">
                    <div className="w-20">
                        <Separator className='bg-primary' />
                    </div>
                    <img src="/assets/logo.svg" alt="Logo" className="h-8 md:w-auto" />
                </div>

                <h1 className="text-4xl text-center font-bold text-primary mb-4 md:text-left">Built by Dreamers</h1>
                <p className="text-primary text-base text-center mb-6 md:mb-0 md:text-left">
                    Created by a passionate team of developers and creatives who believe task
                    management should feel like an adventure.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 lg:flex-1 lg:justify-between md:gap-1">
                {SOCIAL_LINKS.map((item, index) => (
                    <div className="text-center space-y-2 w-[calc(50%-8px)] lg:w-auto" key={index}>
                        <div className="w-24 h-24 mx-auto overflow-hidden">
                            <img src={item.avatar} alt="" className="block h-auto" />
                        </div>

                        <p className="text-2xl font-bold">{item.name}</p>
                        <div className="flex justify-center space-x-4">
                            <a href={item.instagram} className="text-primary hover:text-accent">
                                <Instagram size={30} />
                            </a>
                            <a href={item.linkedIn} className="text-primary hover:text-accent">
                                <Linkedin size={30} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Footer
