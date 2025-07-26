/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Sparkle, Calendar, MoveDown, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { router, usePage } from '@inertiajs/react';

// Updated schema to match backend validation
const projectSetupSchema = z.object({
    title: z.string().min(3, "Project title must be at least 3 characters").max(150, "Project title must not exceed 150 characters"),
    due_date: z.string().min(1, "Please select a deadline date"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    character_id: z.number().min(1, "Please select a character"),
    is_public: z.boolean().default(false),
    team_members: z.array(z.number()).optional()
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

interface Character {
    id: string;
    name: string;
    image_url: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
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
    onKeyPress: (e: React.KeyboardEvent) => void;
}> = ({ register, errors, watch, onKeyPress }) => {
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
                            {/* Project Title Input */}
                            <div className="flex items-start gap-2">
                                <Sparkle
                                    fill={"black"}
                                    className={`mt-1 flex-shrink-0 text-primary`}
                                />
                                <div className="flex-1 space-y-2">
                                    <div className="flex gap-x-2">
                                        <Input
                                            {...register('title')}
                                            placeholder="Type your project title"
                                            error={!!errors.title}
                                            className="max-w-sm"
                                            onKeyPress={onKeyPress}
                                        />
                                    </div>
                                    {errors.title && (
                                        <p className="text-red-500 text-sm max-w-sm">{errors.title.message}</p>
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
                                                {...register('due_date')}
                                                type="datetime-local"
                                                placeholder="Select a deadline"
                                                error={!!errors.due_date}
                                                className="pr-10"
                                                onKeyPress={onKeyPress}
                                            />
                                        </div>
                                    </div>
                                    {watchedValues.due_date && (
                                        <p className="text-sm text-gray-600 max-w-sm">
                                            📅 {formatDate(watchedValues.due_date)}
                                        </p>
                                    )}
                                    {errors.due_date && (
                                        <p className="text-red-500 text-sm max-w-sm">{errors.due_date.message}</p>
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
                                            onKeyPress={onKeyPress}
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
    selectedCharacter: number;
    handleCharacterSelect: (characterId: number) => void;
    errors: any;
    characters: Character[];
}> = ({ selectedCharacter, handleCharacterSelect, errors, characters }) => {
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
                                                isSelected={selectedCharacter === Number(character.id)}
                                                onClick={() => handleCharacterSelect(Number(character.id))}
                                            />
                                        ))}
                                    </div>

                                    {errors.character_id && (
                                        <p className="text-sm text-red-500 text-center">{errors.character_id.message}</p>
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
    selectedMembers: User[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filteredUsers: User[];
    handleAddMember: (user: User) => void;
    handleRemoveMember: (userId: number) => void;
    handleSearchKeyPress: (e: React.KeyboardEvent) => void;
    showDropdown: boolean;
    onSubmit: () => void;
    loading: boolean;
    isFormValid: boolean;
    register: any;
    watch: any;
}> = ({
    selectedMembers,
    searchQuery,
    setSearchQuery,
    filteredUsers,
    handleAddMember,
    handleRemoveMember,
    handleSearchKeyPress,
    showDropdown,
    onSubmit,
    loading,
    isFormValid,
    register,
    watch
}) => {
        const isPublic = watch('is_public');

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
                                Invite Your Friends Now!
                            </div>

                            <div className="space-y-4">
                                {/* Public/Private Toggle */}
                                <div className="flex items-start gap-2">
                                    <Sparkle
                                        fill={"black"}
                                        className={`mt-1 flex-shrink-0 text-primary`}
                                    />
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-3">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    {...register('is_public')}
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                            </label>
                                            <span className="text-sm font-medium text-gray-700">
                                                {isPublic ? 'Public Project' : 'Private Project'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-600 max-w-sm">
                                            {isPublic
                                                ? 'Anyone can view and join this project'
                                                : 'Only invited members can access this project'
                                            }
                                        </p>
                                    </div>
                                </div>

                                {/* Team Member Search */}
                                <div className="flex items-start gap-2">
                                    <Sparkle
                                        fill={"black"}
                                        className={`mt-1 flex-shrink-0 text-primary`}
                                    />
                                    <div className="flex-1 space-y-2">
                                        <div className="relative max-w-sm">
                                            <Input
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                onKeyPress={handleSearchKeyPress}
                                                placeholder="Search team member by name or email..."
                                                className="w-full"
                                            />

                                            {/* Dropdown for search results */}
                                            {showDropdown && filteredUsers.length > 0 && (
                                                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto z-10 mt-1">
                                                    {filteredUsers.map((user) => (
                                                        <div
                                                            key={user.id}
                                                            onClick={() => handleAddMember(user)}
                                                            className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                                        >
                                                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                                                                {user.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                                <p className="text-xs text-gray-500">{user.email}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Selected Members as Tags */}
                                        {selectedMembers.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {selectedMembers.map((member) => (
                                                    <div
                                                        key={member.id}
                                                        className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-white rounded-full text-sm font-medium"
                                                    >
                                                        <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xs font-bold">
                                                            {member.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span>{member.name}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveMember(member.id)}
                                                            className="text-white hover:text-red-200 ml-1"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <p className="text-xs text-gray-600">
                                            Type a name or email and press Enter to add team members
                                        </p>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex items-start gap-2 pt-6">

                                    <div className="flex-1">
                                        <button
                                            type="button"
                                            onClick={onSubmit}
                                            disabled={loading || !isFormValid}
                                            className={`relative rounded-lg px-8 py-4 font-medium text-white transition-all duration-200 ${loading || !isFormValid
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-primary hover:bg-primary hover:shadow-lg active:transform active:scale-95'
                                                }`}
                                        >
                                            {loading ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <Loader2 className="h-5 w-5 animate-spin" />
                                                    Creating Project...
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center gap-2 uppercase font-poppins">
                                                    <Sparkle className="h-5 w-5" />
                                                    Create Project
                                                </div>
                                            )}
                                        </button>
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

// Main Unified Form Component
const UnifiedProjectForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState<number>(0);
    const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const { characters, flash } = usePage<PageProps>().props;

    // Dummy users data
    const dummyUsers: User[] = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
        { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
        { id: 4, name: 'Sarah Wilson', email: 'sarah.wilson@example.com' },
        { id: 5, name: 'David Brown', email: 'david.brown@example.com' },
        { id: 6, name: 'Lisa Davis', email: 'lisa.davis@example.com' },
        { id: 7, name: 'Tom Anderson', email: 'tom.anderson@example.com' },
        { id: 8, name: 'Emily Taylor', email: 'emily.taylor@example.com' }
    ];

    const form = useForm<ProjectSetupFormData>({
        resolver: zodResolver(projectSetupSchema),
        defaultValues: {
            title: '',
            due_date: '',
            description: '',
            character_id: 0,
            is_public: false,
            team_members: []
        },
        mode: 'onChange',
    });

    const { handleSubmit, register, formState: { errors }, setValue, watch } = form;

    // Filter users based on search query using dummy data
    const filteredUsers = dummyUsers.filter(user =>
        (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
        !selectedMembers.some(member => member.id === user.id) &&
        searchQuery.trim() !== ''
    );

    useEffect(() => {
        if (flash?.success) {
            toast.success('Project created successfully!', {
                description: flash.success
            });
        }
        if (flash?.error) {
            toast.error('Something went wrong!', {
                description: flash.error
            });
        }
    }, [flash]);

    useEffect(() => {
        // Update form with selected team members
        setValue('team_members', selectedMembers.map(member => member.id));
    }, [selectedMembers, setValue]);

    useEffect(() => {
        // Show dropdown when there's a search query and filtered results
        setShowDropdown(searchQuery.trim() !== '' && filteredUsers.length > 0);
    }, [searchQuery, filteredUsers]);

    const onSubmit = async (data: ProjectSetupFormData) => {
        setLoading(true);

        // Format the date to match backend expectation (Y-m-d H:i:s)
        const formattedData = {
            ...data,
            due_date: new Date(data.due_date).toISOString().slice(0, 19).replace('T', ' ')
        };

        router.post(route('project.store'), formattedData, {
            onSuccess: () => {
                setLoading(false);
                form.reset();
                setSelectedCharacter(0);
                setSelectedMembers([]);
                setSearchQuery('');
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

    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    const handleAddMember = (user: User) => {
        if (!selectedMembers.some(member => member.id === user.id)) {
            setSelectedMembers(prev => [...prev, user]);
        }
        setSearchQuery('');
        setShowDropdown(false);
    };

    const handleRemoveMember = (userId: number) => {
        setSelectedMembers(prev => prev.filter(member => member.id !== userId));
    };

    const handleSearchKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && filteredUsers.length > 0) {
            e.preventDefault();
            handleAddMember(filteredUsers[0]);
        }
    };

    const isFormValid = watch('title') && watch('title').length >= 3 &&
        watch('due_date') &&
        watch('description') && watch('description').length >= 10 &&
        selectedCharacter > 0;

    return (
        <div className="min-h-screen bg-neutral-100">
            <form>
                <HeroSection
                    register={register}
                    errors={errors}
                    watch={watch}
                    onKeyPress={handleKeyPress}
                />
                <CharSection
                    selectedCharacter={selectedCharacter}
                    handleCharacterSelect={handleCharacterSelect}
                    errors={errors}
                    characters={characters}
                />
                <InviteSection
                    selectedMembers={selectedMembers}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    filteredUsers={filteredUsers}
                    handleAddMember={handleAddMember}
                    handleRemoveMember={handleRemoveMember}
                    handleSearchKeyPress={handleSearchKeyPress}
                    showDropdown={showDropdown}
                    onSubmit={handleFormSubmit}
                    loading={loading}
                    isFormValid={isFormValid}
                    register={register}
                    watch={watch}
                />
            </form>
        </div>
    );
};

export default UnifiedProjectForm;
