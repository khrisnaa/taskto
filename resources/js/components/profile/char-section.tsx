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
    const data = usePage().props;

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

    const isFormValid = selectedCharacter;

    return (
        <section className="flex h-screen overflow-hidden bg-neutral-100 px-30">
            <div className="relative flex flex-1 items-center">
                <div className="flex w-full items-center justify-center">
                    <div className="w-full space-y-8">
                        <div className="text-7xl font-semibold text-nowrap font-poppins">
                            Choose Your Character
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
                                        {data.characters.map((character) => (
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
                                <div className="flex-shrink-0 space-y-4 min-w-[200px]">
                                    <div className="space-y-2">
                                        <h3 className="text-3xl font-bold text-primary font-poppins">
                                            Ready ?
                                        </h3>
                                        <p className="text-sm text-zinc-600 leading-relaxed max-w-xs">
                                            By continuing, you agree to our Terms and Conditions.
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading || !isFormValid}
                                        className={`relative w-full rounded-lg px-2 py-4 font-medium text-white transition-all duration-200 ${loading || !isFormValid
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-primary hover:bg-primary hover:shadow-lg active:transform active:scale-95'
                                            }`}
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <Loader2 className="h-5 w-5 animate-spin" />

                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2 uppercase font-poppins">
                                                <Sparkle className="h-5 w-5" />
                                                Save my profile
                                            </div>
                                        )}
                                    </button>
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
