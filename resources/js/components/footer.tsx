import React from 'react'
import { Separator } from './ui/separator'
import { Instagram, Linkedin } from 'lucide-react'

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
        <div className="mx-auto p-6 bg-secondary rounded-lg shadow-lg">
            <div className="lg:flex lg:items-center lg:gap-10">
                {/* Header Section */}
                <div className="mb-8 lg:mb-0 lg:flex-1">
                    <div className="flex justify-start items-center space-x-2 mb-4">
                        <div className="w-16 md:w-20">
                            <Separator className='bg-primary' />
                        </div>
                        <img src="/assets/logo.svg" alt="Logo" className="h-6 md:h-8" />
                    </div>

                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4 text-center md:text-left">
                        Built by Dreamers
                    </h1>
                    <p className="text-primary text-sm md:text-base text-center md:text-left max-w-md md:max-w-lg">
                        Created by a passionate team of developers and creatives who believe task
                        management should feel like an adventure.
                    </p>
                </div>

                {/* Team Section */}
                <div className="grid grid-cols-2 gap-4 md:gap-6 lg:flex lg:gap-6 lg:flex-1 lg:justify-between">
                    {SOCIAL_LINKS.map((item, index) => (
                        <div className="text-center space-y-2 md:space-y-3" key={index}>
                            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto overflow-hidden rounded-full">
                                <img
                                    src={item.avatar}
                                    alt={`${item.name} avatar`}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <p className="text-base md:text-lg lg:text-xl font-bold text-primary">
                                {item.name}
                            </p>

                            <div className="flex justify-center space-x-2 md:space-x-3">
                                <a
                                    href={item.instagram}
                                    className="text-primary hover:text-accent transition-colors duration-200"
                                    aria-label={`${item.name}'s Instagram`}
                                >
                                    <Instagram size={20} className="md:w-6 md:h-6" />
                                </a>
                                <a
                                    href={item.linkedIn}
                                    className="text-primary hover:text-accent transition-colors duration-200"
                                    aria-label={`${item.name}'s LinkedIn`}
                                >
                                    <Linkedin size={20} className="md:w-6 md:h-6" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Footer
