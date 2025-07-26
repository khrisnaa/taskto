/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Sparkle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
<<<<<<< HEAD
import { baseName } from '@/lib/validators/base';
import { Link, usePage } from '@inertiajs/react';
=======
import { z } from 'zod';
>>>>>>> 07a6f4f5c3c0719325b684c59bd0bfe38925c098

const userSetupSchema = z.object({
    character: z.string().min(1, 'Please select a character'),
});

type UserSetupFormData = z.infer<typeof userSetupSchema>;

const Input = ({ className = '', error = false, ...props }) => (
    <input
        className={`w-full border-b px-3 py-2 transition-colors focus:outline-none ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
        {...props}
    />
);

const Separator = ({ className = '' }) => <div className={`h-px bg-gray-200 ${className}`} />;

const CharacterCard = ({
    id,
    name,
    imageSrc,
    isSelected,
    onClick,
}: {
    id: string;
    name: string;
    imageSrc: string;
    isSelected: boolean;
    onClick: () => void;
}) => (
<<<<<<< HEAD
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
=======
    <div className="flex cursor-pointer flex-col items-center transition-all duration-200" onClick={onClick}>
        <div className={`relative transition-all duration-200 ${isSelected ? 'rounded-xl ring-2 ring-neutral-500 ring-offset-2' : ''}`}>
            <img src={imageSrc} alt={`Character ${name}`} className="h-auto w-96 scale-125 rounded-full object-cover" />
>>>>>>> 07a6f4f5c3c0719325b684c59bd0bfe38925c098
            {isSelected && (
                <div className="absolute -top-3 -right-3 rounded-full bg-primary p-2">
                    <Sparkle className="h-5 w-5 text-white" />
                </div>
            )}
        </div>
        <p className={`mt-3 text-center font-medium transition-colors duration-200 ${isSelected ? 'text-primary' : 'text-gray-700'}`}>{name}</p>
    </div>
);

const CharSection = () => {
    const [loading, setLoading] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState<string>('');
<<<<<<< HEAD
    const data = usePage().props;
=======

    const characters = [
        {
            id: 'strategist',
            name: 'The Strategist',
            imageSrc: '/assets/char3.png',
        },
        {
            id: 'warrior',
            name: 'The Warrior',
            imageSrc: '/assets/char3.png',
        },
        {
            id: 'sprinter',
            name: 'The Sprinter',
            imageSrc: '/assets/char3.png',
        },
        {
            id: 'Kemas',
            name: 'The strongest',
            imageSrc: '/assets/char3.png',
        },
    ];
>>>>>>> 07a6f4f5c3c0719325b684c59bd0bfe38925c098

    const form = useForm<UserSetupFormData>({
        resolver: zodResolver(userSetupSchema),
        defaultValues: {
            character: '',
        },
        mode: 'onChange',
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        watch,
    } = form;

    const onSubmit = async (data: UserSetupFormData) => {
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            console.log('Form submitted:', data);
            toast.success('Character selected successfully!', {
                description: 'Your character has been selected.',
            });

            form.reset();
            setSelectedCharacter('');
        } catch (error) {
            toast.error('Something went wrong!', {
                description: 'Please try again later.',
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
        <section className="flex min-h-screen flex-col overflow-hidden bg-neutral-100 px-8 py-8 md:h-screen md:flex-row md:px-12">
            <div className="relative flex flex-1 items-center">
                <div className="flex w-full items-center justify-center">
                    <div className="w-full space-y-8">
                        <div className="font-poppins text-4xl font-semibold text-nowrap md:text-7xl">Choose Your Character</div>

                        <div className="flex flex-row gap-x-4">
                            <p className="max-w-lg">
                                Are you the calm strategist, the focused warrior, or the deadline sprinter? Choose the avatar that matches your
                                productivity personality
                            </p>

                            <div className="flex max-w-sm items-center">
                                <Separator className="h-20 w-px bg-neutral-600" />
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="flex flex-col items-start gap-12 md:flex-row">
                                {/* Character Selection */}
                                <div className="flex-1 space-y-6">
<<<<<<< HEAD
                                    <div className="flex gap-8 justify-center">
                                        {data.characters.map((character) => (
=======
                                    <div className="flex flex-col justify-center gap-8 md:flex-row">
                                        {characters.map((character) => (
>>>>>>> 07a6f4f5c3c0719325b684c59bd0bfe38925c098
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

                                    {errors.character && <p className="text-center text-sm text-red-500">{errors.character.message}</p>}
                                </div>

                                {/* Submit Section */}
                                <div className="min-w-[200px] flex-shrink-0 space-y-4">
                                    <div className="space-y-2">
                                        <h3 className="font-poppins text-3xl font-bold text-primary">Ready ?</h3>
                                        <p className="max-w-xs text-sm leading-relaxed text-zinc-600">
                                            By continuing, you agree to our Terms and Conditions.
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading || !isFormValid}
                                        className={`relative w-full rounded-lg px-2 py-4 font-medium text-white transition-all duration-200 ${
                                            loading || !isFormValid
                                                ? 'cursor-not-allowed bg-gray-400'
                                                : 'bg-primary hover:bg-primary hover:shadow-lg active:scale-95 active:transform'
                                        }`}
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2 font-poppins uppercase">
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
