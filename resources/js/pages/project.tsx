/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Sparkle, Calendar, MoveDown, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { router } from '@inertiajs/react';

// Unified schema for all sections
const projectSetupSchema = z.object({
    projectName: z.string().min(3, "Project name must be at least 3 characters"),
    deadline: z.string().min(1, "Please select a deadline date"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    character: z.string().min(1, "Please select a character"),
    teamMember: z.string().optional()
});

type ProjectSetupFormData = z.infer<typeof projectSetupSchema>;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    error?: boolean;
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    error?: boolean;
}

const Input: React.FC<InputProps> = ({ className = "", error = false, ...props }) => (
    <input
        className={`w-full px-3 py-2 border-b focus:outline-none transition-colors ${error ? 'border-red-500' : 'border-gray-300'
            } ${className}`}
        {...props}
    />
);

const TextArea: React.FC<TextAreaProps> = ({ className = "", error = false, ...props }) => (
    <textarea
        className={`w-full px-3 py-2 border-b focus:outline-none transition-colors resize-none ${error ? 'border-red-500' : 'border-gray-300'
            } ${className}`}
        rows={1}
        {...props}
    />
);

const Separator: React.FC<{ className?: string }> = ({ className = "" }) => (
    <div className={`h-px bg-gray-200 ${className}`} />
);

interface CharacterCardProps {
    id: string;
    name: string;
    imageSrc: string;
    isSelected: boolean;
    onClick: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
    id,
    name,
    imageSrc,
    isSelected,
    onClick
}) => (
    <div
        className="flex flex-col items-center cursor-pointer transition-all duration-200"
        onClick={onClick}
    >
        <div
            className={`relative transition-all duration-200 ${isSelected ? 'ring-2 ring-neutral-500 ring-offset-2 rounded-xl' : ''
                }`}
        >
            <img
                src={imageSrc}
                alt={`Character ${name}`}
                className="h-auto w-96 rounded-full object-cover scale-150"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/char1.png';
                }}
            />
            {isSelected && (
                <div className="absolute -top-3 -right-3 rounded-full bg-primary p-2">
                    <Sparkle className="h-5 w-5 text-white" />
                </div>
            )}
        </div>
        <p className={`mt-3 text-center font-medium transition-colors duration-200 ${isSelected ? 'text-primary' : 'text-gray-700'
            }`}>
            {name}
        </p>
    </div>
);

// Hero Section Component
const HeroSection: React.FC<{
    register: any;
    errors: any;
    watch: any;
}> = ({ register, errors, watch }) => {
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
                            Set Up Your Project
                        </div>

                        <p className='max-w-lg'>Tell us about your project so we can help you stay organized and on track!</p>
                        <div className="max-w-sm">
                            <Separator className="bg-neutral-600" />
                        </div>

                        <div className="text-4xl font-thin tracking-wider font-poppins">
                            Project Details
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
                                            placeholder="Type your project name"
                                            error={!!errors.projectName}
                                            className="max-w-sm"
                                        />
                                    </div>
                                    {errors.projectName && (
                                        <p className="text-red-500 text-sm max-w-sm">{errors.projectName.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Deadline Date Input */}
                            <div className="flex items-start gap-2">
                                <Sparkle
                                    fill={"black"}
                                    className={`mt-1 flex-shrink-0 text-primary`}
                                />
                                <div className="flex-1 space-y-2">
                                    <div className="flex gap-x-2 items-center">
                                        <div className="relative max-w-sm">
                                            <Input
                                                {...register('deadline')}
                                                type="date"
                                                placeholder="Select a deadline"
                                                error={!!errors.deadline}
                                                className="pr-10"
                                            />
                                        </div>
                                    </div>
                                    {watchedValues.deadline && (
                                        <p className="text-sm text-gray-600 max-w-sm">
                                            📅 {formatDate(watchedValues.deadline)}
                                        </p>
                                    )}
                                    {errors.deadline && (
                                        <p className="text-red-500 text-sm max-w-sm">{errors.deadline.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Project Description Input */}
                            <div className="flex items-start gap-2">
                                <Sparkle
                                    fill={"black"}
                                    className={`mt-1 flex-shrink-0 text-primary`}
                                />
                                <div className="flex-1 space-y-2">
                                    <div className="flex gap-x-2">
                                        <TextArea
                                            {...register('description')}
                                            placeholder="Type your project description"
                                            error={!!errors.description}
                                            className="max-w-sm"
                                        />
                                    </div>
                                    {errors.description && (
                                        <p className="text-red-500 text-sm max-w-sm">{errors.description.message}</p>
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
        </section>
    );
};

// Character Section Component
const CharSection: React.FC<{
    selectedCharacter: string;
    handleCharacterSelect: (characterId: string) => void;
    errors: any;
}> = ({ selectedCharacter, handleCharacterSelect, errors }) => {
    const characters = [
        {
            id: '1',
            name: 'Easy',
            image_url: '/assets/char1.png',
        },
        {
            id: '2',
            name: 'Medium',
            image_url: '/assets/char2.png',
        },
        {
            id: '3',
            name: 'Hard',
            image_url: '/assets/char3.png',
        },
    ];

    return (
        <section className="flex h-screen overflow-hidden bg-neutral-100 px-30">
            <div className="relative flex flex-1 items-center">
                <div className="flex w-full items-center justify-center">
                    <div className="w-full space-y-8">
                        <div className="text-8xl font-semibold text-nowrap font-poppins">
                            Choose Your Difficulty
                        </div>

                        <div className="flex flex-row gap-x-4">
                            <p className="max-w-lg">
                                Are you the calm strategist, the focused warrior, or the deadline sprinter? Choose the avatar that matches your productivity personality
                            </p>

                            <div className="max-w-sm flex items-center">
                                <Separator className="bg-neutral-600 h-20 w-px" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-12">
                                {/* Character Selection */}
                                <div className="flex-1 space-y-6">
                                    <div className="flex gap-8 justify-center">
                                        {characters.map((character) => (
                                            <CharacterCard
                                                key={character.id}
                                                id={character.id}
                                                name={character.name}
                                                imageSrc={character.image_url}
                                                isSelected={selectedCharacter === character.id}
                                                onClick={() => handleCharacterSelect(character.id)}
                                            />
                                        ))}
                                    </div>

                                    {errors.character && (
                                        <p className="text-sm text-red-500 text-center">{errors.character.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Invite Section Component
const InviteSection: React.FC<{
    register: any;
    errors: any;
    loading: boolean;
    onSubmit: () => void;
}> = ({ register, errors, loading, onSubmit }) => {
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
                            {/* Team Member Search Input */}
                            <div className="flex items-start gap-2">
                                <Sparkle
                                    fill={"black"}
                                    className={`mt-1 flex-shrink-0 text-primary`}
                                />
                                <div className="flex-1 space-y-2">
                                    <div className="flex gap-x-2">
                                        <Input
                                            {...register('teamMember')}
                                            placeholder="Search team member by name or email..."
                                            error={!!errors.teamMember}
                                            className="max-w-sm"
                                        />
                                    </div>
                                    {errors.teamMember && (
                                        <p className="text-red-500 text-sm max-w-sm">{errors.teamMember.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="button"
                                    onClick={onSubmit}
                                    disabled={loading}
                                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                                    {loading ? 'Creating Project...' : 'Create Project'}
                                </button>
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
        </section>
    );
};

// Main Unified Form Component
const UnifiedProjectForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState<string>('');

    const form = useForm<ProjectSetupFormData>({
        resolver: zodResolver(projectSetupSchema),
        defaultValues: {
            projectName: '',
            deadline: '',
            description: '',
            character: '',
            teamMember: ''
        },
        mode: 'onChange',
    });

    const { handleSubmit, register, formState: { errors }, setValue, watch } = form;

    const onSubmit = async (data: ProjectSetupFormData) => {
        setLoading(true);
        try {
            router.post(route('project.create'), data, {
                onSuccess: () => {
                    setLoading(false);
                    form.reset();
                    setSelectedCharacter(0);
                },
                onError: () => {
                    setLoading(false);
                }
            });

            form.reset();
            setSelectedCharacter('');
        } catch (error) {
            toast.error('Something went wrong!', {
                description: 'Please try again later.'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCharacterSelect = (characterId: string) => {
        setSelectedCharacter(characterId);
        setValue('character', characterId, { shouldValidate: true });
    };

    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };

    return (
        <form>
            <HeroSection
                register={register}
                errors={errors}
                watch={watch}
            />
            <CharSection
                selectedCharacter={selectedCharacter}
                handleCharacterSelect={handleCharacterSelect}
                errors={errors}
            />
            <InviteSection
                register={register}
                errors={errors}
                loading={loading}
                onSubmit={handleFormSubmit}
            />
        </form>
    );
};

export default UnifiedProjectForm;
