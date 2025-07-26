import { Instagram, Linkedin } from 'lucide-react';
import { Separator } from './ui/separator';

const Footer = () => {
    const SOCIAL_LINKS = [
        {
            avatar: '/assets/13.png',
            name: 'Kemas',
            linkedIn: '#',
            instagram: '#',
        },
        {
            avatar: '/assets/12.png',
            name: 'Agung',
            linkedIn: '#',
            instagram: '#',
        },
        {
            avatar: '/assets/14.png',
            name: 'Khrisna',
            linkedIn: '#',
            instagram: '#',
        },
        {
            avatar: '/assets/11.png',
            name: 'Dede',
            linkedIn: '#',
            instagram: '#',
        },
    ];

    return (
        <div className="mx-auto rounded-lg bg-secondary p-6 shadow-lg">
            <div className="lg:flex lg:items-center lg:gap-10">
                {/* Header Section */}
                <div className="mb-8 lg:mb-0 lg:flex-1">
                    <div className="mb-4 flex items-center justify-start space-x-2">
                        <div className="w-16 md:w-20">
                            <Separator className="bg-primary" />
                        </div>
                        <img src="/assets/logo.svg" alt="Logo" className="h-5" />
                    </div>

                    <h1 className="mb-4 text-center text-2xl font-bold text-primary md:text-left md:text-3xl lg:text-4xl">Built by Dreamers</h1>
                    <p className="max-w-md text-center text-sm text-primary md:max-w-lg md:text-left md:text-base">
                        Created by a passionate team of developers and creatives who believe task management should feel like an adventure.
                    </p>
                </div>

                {/* Team Section */}
                <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-1 sm:justify-between md:gap-6 lg:gap-6">
                    {SOCIAL_LINKS.map((item, index) => (
                        <div className="space-y-2 text-center md:space-y-3" key={index}>
                            <div className="relative mx-auto flex aspect-square h-12 items-center justify-center overflow-hidden sm:h-16 md:h-24">
                                <div className="relative aspect-square h-32 overflow-hidden sm:h-40 md:h-64">
                                    <img src={item.avatar} alt={`${item.name} avatar`} className="h-full w-full object-cover object-center" />
                                </div>
                            </div>

                            <p className="text-base font-semibold text-primary md:text-lg lg:text-xl">{item.name}</p>

                            <div className="flex justify-center space-x-2 md:space-x-3">
                                <a
                                    href={item.instagram}
                                    className="text-primary transition-colors duration-200 hover:text-accent"
                                    aria-label={`${item.name}'s Instagram`}
                                >
                                    <Instagram size={20} className="md:h-6 md:w-6" />
                                </a>
                                <a
                                    href={item.linkedIn}
                                    className="text-primary transition-colors duration-200 hover:text-accent"
                                    aria-label={`${item.name}'s LinkedIn`}
                                >
                                    <Linkedin size={20} className="md:h-6 md:w-6" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Footer;
