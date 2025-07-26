/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseName } from '@/lib/validators/base';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@inertiajs/react';
import { Sparkle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const userSetupSchema = z.object({
    username: baseName().min(3, 'Username must be at least 3 characters'),
});

type UserSetupFormData = z.infer<typeof userSetupSchema>;

const Input = ({ className = '', error = false, ...props }) => (
    <input
        className={`w-full border-b py-2 transition-colors focus:outline-none ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
        {...props}
    />
);

const Separator = ({ className = '' }) => <div className={`h-px bg-gray-200 ${className}`} />;

const HeroSection = () => {
    const [loading, setLoading] = useState(false);

    const form = useForm<UserSetupFormData>({
        resolver: zodResolver(userSetupSchema),
        defaultValues: {
            username: '',
        },
        mode: 'onChange',
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = form;

    const onSubmit = async (data: UserSetupFormData) => {
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            console.log('Form submitted:', data);
            toast.success('Profile setup completed successfully!', {
                description: `Welcome, ${data.username}! Your profile has been created.`,
            });

            form.reset();
        } catch (error) {
            toast.error('Something went wrong!', {
                description: 'Please try again later.',
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
        // <section className="flex h-screen overflow-hidden bg-neutral-100 px-30">
        //     <div className="relative flex flex-1 items-center">
        //         <div className="flex w-full items-center justify-center">
        //             <div className="w-full space-y-4">
        //                 <div className="font-poppins text-7xl font-semibold text-nowrap">Set Up & Suit Up</div>
        //                 <p>Complete your personal info and choose a character that matches your vibe. Time to make tasks more fun!</p>
        //                 <div className="max-w-sm">
        //                     <Separator className="bg-neutral-600" />
        //                 </div>

        //                 <div className="font-poppins text-4xl font-thin tracking-wider">Tell Us About You</div>

        //                 <div className="space-y-4">
        //                     <div className="flex items-start gap-2">
        //                         <Sparkle fill="black" className="mt-1 flex-shrink-0" />
        //                         <div className="flex space-y-2 space-x-2">
        //                             Is this you?
        //                             <p className="underline">agung@eivern.com,</p>
        //                             If it’s not{' '}
        //                             <Link href={'#'} className="ml-1 underline">
        //                                 Change Now
        //                             </Link>
        //                         </div>
        //                     </div>
        //                     <div className="flex items-start gap-2">
        //                         <Sparkle fill="black" className="mt-1 flex-shrink-0" />
        //                         <div className="flex-1 space-y-2">
        //                             <div className="flex gap-x-2">
        //                                 <Input
        //                                     {...register('username')}
        //                                     placeholder="Type your username"
        //                                     error={!!errors.username}
        //                                     className="max-w-sm"
        //                                     onKeyPress={handleKeyPress}
        //                                 />
        //                                 <p className="max-w-lg">( Don't be shy )</p>
        //                             </div>
        //                             {errors.username && <p className="max-w-sm text-sm text-red-500">{errors.username.message}</p>}
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="absolute top-8 left-1/2 -translate-x-1/2">
        //         <div className="flex items-center gap-2">
        //             <div className="relative size-4">
        //                 <img src="/icons/diamonx.svg" alt="Diamond" className="h-full w-full object-cover" />
        //             </div>
        //             <span className="font-playfair text-2xl font-medium">Taskto</span>
        //             <div className="relative size-4">
        //                 <img src="/icons/diamonx.svg" alt="Diamond" className="h-full w-full object-cover" />
        //             </div>
        //         </div>
        //     </div>
        //     <div className="relative flex-[.8] overflow-hidden">
        //         <div className="absolute bottom-0 left-[30%] flex aspect-square w-[60%] -translate-x-1/2 translate-y-[55%] items-start justify-center rounded-full border border-neutral-600 bg-neutral-100 text-primary">
        //             <div className="flex flex-col items-center justify-center pt-16">
        //                 <span className="text-lg font-medium">Select Your Character</span>
        //                 <MoveDown className="size-4" />
        //             </div>
        //         </div>
        //     </div>
        //     <div className="relative flex-[.6] overflow-hidden">
        //         <div className="relative h-[220dvh] -translate-y-[14%] overflow-hidden">
        //             <img alt="Home Image" src="/assets/char3.png" className="h-full w-full object-cover object-top" />
        //         </div>
        //     </div>
        // </section>

        <div className="flex flex-col-reverse px-8 py-8 md:h-screen md:flex-row md:px-12 md:py-0">
            <section className="flex flex-[1] flex-col justify-center gap-4">
                <div className="hidden space-y-4 md:block">
                    <h1 className="text-4xl font-semibold md:text-7xl">Set Up & Suit Up</h1>
                    <p>Complete your personal info and choose a character that matches your vibe. Time to make tasks more fun!</p>
                </div>
                <div className="w-40">
                    <Separator className="bg-neutral-800" />
                </div>
                <div>
                    <h1 className="text-4xl font-medium">Tell Us About You?</h1>
                </div>
                <div>
                    <div className="flex items-start gap-2">
                        <Sparkle fill="black" className="mt-1 flex-shrink-0" />
                        <div className="flex flex-col space-y-2 space-x-2 md:flex-row">
                            <div className="flex gap-x-2">
                                Is this you?
                                <p className="underline">agung@eivern.com,</p>
                            </div>
                            <div className="space-x-2">
                                If it’s not{' '}
                                <Link href={'#'} className="ml-1 underline">
                                    Change Now
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <Sparkle fill="black" className="mt-1 flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                            <div className="flex items-end gap-x-4">
                                <Input
                                    {...register('username')}
                                    placeholder="Type your username"
                                    error={!!errors.username}
                                    className="max-w-sm px-0 text-sm"
                                    onKeyPress={handleKeyPress}
                                />
                                <p className="max-w-lg text-xs">( Don't be shy )</p>
                            </div>
                            {errors.username && <p className="max-w-sm text-sm text-red-500">{errors.username.message}</p>}
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex-[.8]">
                <div className="relative h-[60dvh] w-full overflow-hidden md:h-full">
                    <div className="relative h-[80dvh] -translate-y-[14%] overflow-hidden md:h-[150dvh]">
                        <img alt="Home Image" src="/assets/char3.png" className="h-full w-full object-cover object-top" />
                    </div>
                </div>
            </section>
            <section className="space-y-4 md:hidden">
                <h1 className="text-4xl font-semibold md:text-7xl">Set Up & Suit Up</h1>
                <p>Complete your personal info and choose a character that matches your vibe. Time to make tasks more fun!</p>
            </section>
        </div>
    );
};

export default HeroSection;
