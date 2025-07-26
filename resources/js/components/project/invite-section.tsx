/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Sparkle, Calendar, MoveDown } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from '@inertiajs/react';

const projectSetupSchema = z.object({
    projectName: z.string().min(3, "Project name must be at least 3 characters"),
    deadline: z.string().min(1, "Please select a deadline date"),
    description: z.string().min(10, "Description must be at least 10 characters")
});

type ProjectSetupFormData = z.infer<typeof projectSetupSchema>;

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


const InviteSection = () => {
    const form = useForm<ProjectSetupFormData>({
        resolver: zodResolver(projectSetupSchema),
        defaultValues: {
            projectName: '',
            deadline: '',
            description: ''
        },
        mode: 'onChange',
    });

    const { register, formState: { errors }, watch } = form;

    // Watch form values to automatically progress steps
    const watchedValues = watch();


    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <section className="flex h-screen overflow-hidden bg-neutral-100 px-30">
            <div className="relative flex flex-1 items-center">
                <div className="flex w-full items-center justify-center">
                    <div className="w-full space-y-4">
                        <div className="text-7xl font-semibold text-nowrap font-poppins">
                            Assemble Your Squad
                        </div>

                        <p className='max-w-lg'>Want to move faster? Bring your team. Share the workload and make productivity a team game.</p>
                        <div className="max-w-sm">
                            <Separator className="bg-neutral-600" />
                        </div>

                        <div className="text-4xl font-thin tracking-wider font-poppins">
                            Invite our Friends Now!
                        </div>

                        <div className="space-y-4">
                            {/* Project Name Input */}
                            <div className="flex items-start gap-2">
                                <Sparkle
                                    fill={"black"}
                                    className={`mt-1 flex-shrink-0 text-primary`}
                                />
                                <div className="flex-1 space-y-2">
                                    <div className="flex gap-x-2">
                                        <Input
                                            {...register('projectName')}
                                            placeholder="Search team member by name or email..."
                                            error={!!errors.projectName}
                                            className="max-w-sm"
                                        />
                                    </div>
                                    {errors.projectName && (
                                        <p className="text-red-500 text-sm max-w-sm">{errors.projectName.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Logo */}
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

            {/* Progress Bar Section */}
            <div className="relative overflow-hidden">
                <div className="relative h-[220dvh] -translate-y-[28%] overflow-hidden flex items-center justify-center">
                    <div className="w-full max-w-xs space-y-8 px-8">
                        {/* Vertical Progress Steps */}
                        <div className="space-y-10">
                            <div className={`flex items-center gap-4 transition-all duration-300 scale-105`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-primary text-white`}>
                                    1
                                </div>
                                <div className={'font-semibold'}>
                                    <p className="text-sm">Project Detail</p>

                                </div>
                            </div>

                            <div className={`flex items-center gap-4 transition-all duration-300 scale-105`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-primary border border-primary`}>
                                    2
                                </div>
                                <div className={'font-semibold'}>
                                    <p className="text-sm">Project Difficulty</p>

                                </div>
                            </div>
                            <div className={`flex items-center gap-4 transition-all duration-300 scale-105`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-primary border border-primary`}>
                                    3
                                </div>
                                <div className={'font-semibold'}>
                                    <p className="text-sm">Select team member</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InviteSection;
