/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MoveDown, Sparkle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { baseName } from '@/lib/validators/base';
import { Link } from '@inertiajs/react';

const userSetupSchema = z.object({
    username: baseName().min(3, "Username must be at least 3 characters")
});

type UserSetupFormData = z.infer<typeof userSetupSchema>;

const Input = ({ className = "", error = false, ...props }) => (
    <input
        className={`w-full px-3 py-2 border-b focus:outline-none transition-colors ${error ? 'border-red-500' : 'border-gray-300'
            } ${className}`}
        {...props}
    />
);

const Separator = ({ className = "" }) => (
    <div className={`h-px bg-gray-200 ${className}`} />
);

const HeroSection = () => {
    const [loading, setLoading] = useState(false);

    const form = useForm<UserSetupFormData>({
        resolver: zodResolver(userSetupSchema),
        defaultValues: {
            username: ''
        },
        mode: 'onChange',
    });

    const { handleSubmit, register, formState: { errors } } = form;

    const onSubmit = async (data: UserSetupFormData) => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log('Form submitted:', data);
            toast.success('Profile setup completed successfully!', {
                description: `Welcome, ${data.username}! Your profile has been created.`
            });

            form.reset();
        } catch (error) {
            toast.error('Something went wrong!', {
                description: 'Please try again later.'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    return (
        <section className="flex h-screen overflow-hidden bg-neutral-100 px-30">
            <div className="relative flex flex-1 items-center">
                <div className="flex w-full items-center justify-center">
                    <div className="w-full space-y-4">
                        <div className="text-7xl font-semibold text-nowrap font-poppins">
                            Set Up & Suit Up
                        </div>

                        <p className='max-w-lg'>Complete your personal info and choose a character that matches your vibe. Time to make tasks more fun!</p>
                        <div className="max-w-sm">
                            <Separator className="bg-neutral-600" />
                        </div>

                        <div className="text-4xl font-thin tracking-wider font-poppins">
                            Tell Us About You
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-2">
                                <Sparkle fill="black" className="mt-1 flex-shrink-0" />
                                <div className="space-y-2 flex space-x-2">
                                    Is this you?
                                    <p className='underline'>agung@eivern.com,</p>
                                    If it’s not <Link href={'#'} className='underline ml-1'>Change Now</Link>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Sparkle fill="black" className="mt-1 flex-shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="flex gap-x-2">
                                        <Input
                                            {...register('username')}
                                            placeholder="Type your username"
                                            error={!!errors.username}
                                            className="max-w-sm"
                                            onKeyPress={handleKeyPress}
                                        />
                                        <p className='max-w-lg'>( Don't be shy )</p>
                                    </div>
                                    {errors.username && (
                                        <p className="text-red-500 text-sm max-w-sm">{errors.username.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute top-8 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2">
                    <div className="relative size-4">
                        <img src="/icons/diamonx.svg" alt="Diamond" className="h-full w-full object-cover" />
                    </div>
                    <span className="font-playfair text-2xl font-medium">Taskto</span>
                    <div className="relative size-4">
                        <img src="/icons/diamonx.svg" alt="Diamond" className="h-full w-full object-cover" />
                    </div>
                </div>
            </div>
            <div className="relative flex-[.8] overflow-hidden">
                <div className="absolute bottom-0 left-[30%] flex aspect-square w-[60%] -translate-x-1/2 translate-y-[55%] items-start justify-center rounded-full border border-neutral-600 bg-neutral-100 text-primary">
                    <div className="flex flex-col items-center justify-center pt-16">
                        <span className="text-lg font-medium">Select Your Character</span>
                        <MoveDown className="size-4" />
                    </div>
                </div>
            </div>
            <div className="relative flex-[.6] overflow-hidden">
                <div className="relative h-[220dvh] -translate-y-[14%] overflow-hidden">
                    <img
                        alt="Home Image"
                        src="/assets/char3.png"
                        className="h-full w-full object-cover object-top"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
