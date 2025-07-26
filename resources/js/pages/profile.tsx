import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MoveDown, Sparkle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { baseName } from '@/lib/validators/base';
import { Link, usePage, router } from '@inertiajs/react';

const userSetupSchema = z.object({
    name: baseName().min(3, 'Username must be at least 3 characters'),
    character_id: z.number().min(1, "Please select a character")
});

type UserSetupFormData = z.infer<typeof userSetupSchema>;

interface Character {
    id: string;
    name: string;
    image_url: string;
}

interface PageProps {
    auth: {
        user: {
            email: string;
        };
    };
    characters: Character[];
    flash: {
        success?: string;
        error?: string;
    };
}

const Separator: React.FC<{ className?: string }> = ({ className = "" }) => (
    <div className={`h-px bg-gray-200 ${className}`} />
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
    error?: boolean;
}> = ({ className = '', error = false, ...props }) => (
    <input
        className={`w-full border-b py-2 transition-colors focus:outline-none ${error ? 'border-red-500' : 'border-gray-300'
            } ${className}`}
        {...props}
    />
);

const CharacterCard: React.FC<{
    id: string;
    name: string;
    imageSrc: string;
    isSelected: boolean;
    onClick: () => void;
}> = ({ id, name, imageSrc, isSelected, onClick }) => (
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

const ProfileSetupForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState<number>(0);
    const { auth, characters, flash } = usePage<PageProps>().props;

    const form = useForm<UserSetupFormData>({
        resolver: zodResolver(userSetupSchema),
        defaultValues: {
            name: '',
            character_id: 0
        },
        mode: 'onChange',
    });

    const { handleSubmit, register, formState: { errors }, setValue, watch } = form;

    useEffect(() => {
        if (flash?.success) {
            toast.success('Profile setup completed successfully!', {
                description: flash.success
            });
        }
        if (flash?.error) {
            toast.error('Something went wrong!', {
                description: flash.error
            });
        }
    }, [flash]);

    const onSubmit = async (data: UserSetupFormData) => {
        setLoading(true);

        router.put(route('user.update'), data, {
            onSuccess: () => {
                setLoading(false);
                form.reset();
                setSelectedCharacter(0);
            },
            onError: () => {
                setLoading(false);
            }
        });
    };

    const handleCharacterSelect = (characterId: number) => {
        setSelectedCharacter(characterId);
        setValue('character_id', characterId, { shouldValidate: true });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    const isFormValid = watch('name') && watch('name').length >= 3 && selectedCharacter;

    return (
        <div className="min-h-screen bg-neutral-100">
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
                                    <p className="underline">{auth.user.email ?? 'ic@eivern.com'},</p>
                                </div>
                                <div className="space-x-2">
                                    If it's not{' '}
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
                                        {...register('name')}
                                        placeholder="Type your username"
                                        error={!!errors.name}
                                        className="max-w-sm px-0 text-sm"
                                        onKeyPress={handleKeyPress}
                                    />
                                    <p className="max-w-lg text-xs">( Don't be shy )</p>
                                </div>
                                {errors.name && <p className="max-w-sm text-sm text-red-500">{errors.name.message}</p>}
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
                                    <div className="flex-1 space-y-6">
                                        <div className="flex gap-8 justify-center">
                                            {characters.map((character) => (
                                                <CharacterCard
                                                    key={character.id}
                                                    id={character.id}
                                                    name={character.name}
                                                    imageSrc={character.image_url}
                                                    isSelected={selectedCharacter === character.id}
                                                    onClick={() => handleCharacterSelect(Number(character.id))}
                                                />
                                            ))}
                                        </div>

                                        {errors.character_id && (
                                            <p className="text-sm text-red-500 text-center">{errors.character_id.message}</p>
                                        )}
                                    </div>

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
        </div>
    );
};

export default ProfileSetupForm;
