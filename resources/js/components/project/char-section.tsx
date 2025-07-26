/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MoveDown, Sparkle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { baseName } from '@/lib/validators/base';
import { Link, usePage } from '@inertiajs/react';

const userSetupSchema = z.object({
    character: z.string().min(1, "Please select a character")
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

const CharacterCard = ({
    id,
    name,
    imageSrc,
    isSelected,
    onClick
}: {
    id: string;
    name: string;
    imageSrc: string;
    isSelected: boolean;
    onClick: () => void;
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
                    e.currentTarget.src = '/assets/char1.png';
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

const CharSection = () => {
    const [loading, setLoading] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState<string>('');
    // const data = usePage().props;

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

    const form = useForm<UserSetupFormData>({
        resolver: zodResolver(userSetupSchema),
        defaultValues: {
            character: ''
        },
        mode: 'onChange',
    });

    const { handleSubmit, register, formState: { errors }, setValue, watch } = form;

    const onSubmit = async (data: UserSetupFormData) => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log('Form submitted:', data);
            toast.success('Character selected successfully!', {
                description: 'Your character has been selected.'
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

    return (
        <section className="flex h-screen overflow-hidden bg-neutral-100 px-30">
            <div className="relative flex flex-1 items-center">
                <div className="flex w-full items-center justify-center">
                    <div className="w-full space-y-8">
                        <div className="text-7xl font-semibold text-nowrap font-poppins">
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

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

                                {/* Submit Section */}
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
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CharSection;
