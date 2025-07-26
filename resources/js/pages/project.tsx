import React, { useState, createContext, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MoveDown, Sparkle, Loader2, Calendar, Plus, X } from 'lucide-react';

// Context for managing global form state and progress
const ProjectSetupContext = createContext<{
    currentSection: number;
    setCurrentSection: (section: number) => void;
    projectData: any;
    setProjectData: (data: any) => void;
    selectedCharacter: string;
    setSelectedCharacter: (char: string) => void;
    collaborators: any[];
    setCollaborators: (collabs: any[]) => void;
}>({
    currentSection: 1,
    setCurrentSection: () => { },
    projectData: {},
    setProjectData: () => { },
    selectedCharacter: '',
    setSelectedCharacter: () => { },
    collaborators: [],
    setCollaborators: () => { },
});

const useProjectSetup = () => useContext(ProjectSetupContext);

// Schemas
const projectSetupSchema = z.object({
    projectName: z.string().min(3, "Project name must be at least 3 characters"),
    deadline: z.string().min(1, "Please select a deadline date"),
    description: z.string().min(10, "Description must be at least 10 characters")
});

const userSetupSchema = z.object({
    character: z.string().min(1, "Please select a character")
});

const inviteSchema = z.object({
    searchQuery: z.string().optional()
});

type ProjectSetupFormData = z.infer<typeof projectSetupSchema>;
type UserSetupFormData = z.infer<typeof userSetupSchema>;
type InviteFormData = z.infer<typeof inviteSchema>;

// Reusable Components
const Input = ({ className = "", error = false, ...props }) => (
    <input
        className={`w-full px-3 py-2 border-b focus:outline-none transition-colors ${error ? 'border-red-500' : 'border-gray-300'
            } ${className}`}
        {...props}
    />
);

const TextArea = ({ className = "", error = false, ...props }) => (
    <textarea
        className={`w-full px-3 py-2 border-b focus:outline-none transition-colors resize-none ${error ? 'border-red-500' : 'border-gray-300'
            } ${className}`}
        rows={1}
        {...props}
    />
);

const Separator = ({ className = "" }) => (
    <div className={`h-px bg-gray-200 ${className}`} />
);

// Mock user data for search results
const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', avatar: '/api/placeholder/40/40', role: 'Developer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: '/api/placeholder/40/40', role: 'Designer' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', avatar: '/api/placeholder/40/40', role: 'Manager' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', avatar: '/api/placeholder/40/40', role: 'Developer' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', avatar: '/api/placeholder/40/40', role: 'QA' },
];

// Character Card Component
const CharacterCard = ({
    id,
    name,
    imageSrc,
    isSelected,
    onClick,
    bossName
}: {
    id: string;
    name: string;
    imageSrc: string;
    isSelected: boolean;
    onClick: () => void;
    bossName: string;
}) => (
    <div
        className="flex flex-col items-center cursor-pointer transition-all duration-200"
        onClick={onClick}
    >
        <div className="text-center mb-4">
            <p className="text-lg font-semibold text-gray-800">{bossName}</p>
            <p className="text-sm text-gray-600">Boss Character</p>
        </div>
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

// User Search Result Component
const UserSearchResult = ({ user, onAdd, isAdded }) => (
    <div className="flex items-center justify-between p-3 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3">
            <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                    e.currentTarget.src = '/api/placeholder/40/40';
                }}
            />
            <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-xs text-gray-400">{user.role}</p>
            </div>
        </div>
        <button
            onClick={() => onAdd(user)}
            disabled={isAdded}
            className={`p-2 rounded-full transition-colors ${isAdded
                ? 'bg-green-100 text-green-600'
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
        >
            {isAdded ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
    </div>
);

// Collaborator Card Component
const CollaboratorCard = ({ user, onRemove }) => (
    <div className="flex items-center gap-3 p-3 border rounded-lg bg-blue-50">
        <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
            onError={(e) => {
                e.currentTarget.src = '/api/placeholder/40/40';
            }}
        />
        <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
        </div>
        <button
            onClick={() => onRemove(user.id)}
            className="p-1 rounded-full hover:bg-red-100 text-red-600 transition-colors"
        >
            <X className="w-3 h-3" />
        </button>
    </div>
);

// Hero Section
const HeroSection = () => {
    const { currentSection, setCurrentSection, projectData, setProjectData } = useProjectSetup();
    const [currentStep, setCurrentStep] = useState(1);

    const form = useForm<ProjectSetupFormData>({
        resolver: zodResolver(projectSetupSchema),
        defaultValues: {
            projectName: projectData.projectName || '',
            deadline: projectData.deadline || '',
            description: projectData.description || ''
        },
        mode: 'onChange',
    });

    const { register, formState: { errors }, watch } = form;
    const watchedValues = watch();

    React.useEffect(() => {
        setProjectData(watchedValues);

        if (watchedValues.projectName && watchedValues.projectName.length >= 3) {
            if (currentStep < 2) setCurrentStep(2);
        }
        if (watchedValues.deadline) {
            if (currentStep < 3) setCurrentStep(3);
        }
        if (watchedValues.description && watchedValues.description.length >= 10) {
            if (currentStep < 4) setCurrentStep(4);
            // Auto progress to next section when form is complete
            setTimeout(() => setCurrentSection(2), 1000);
        }
    }, [watchedValues, currentStep, setProjectData, setCurrentSection]);

    const getStepStatus = (step: number) => {
        if (step < currentStep) return 'completed';
        if (step === currentStep) return 'current';
        return 'upcoming';
    };

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
                            <div className="flex items-start gap-2">
                                <Sparkle
                                    fill={getStepStatus(1) === 'completed' ? '#10b981' : getStepStatus(1) === 'current' ? 'black' : '#d1d5db'}
                                    className={`mt-1 flex-shrink-0 ${getStepStatus(1) === 'completed' ? 'text-primary' : getStepStatus(1) === 'current' ? 'text-black' : 'text-gray-300'}`}
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

                            <div className="flex items-start gap-2">
                                <Sparkle
                                    fill={getStepStatus(2) === 'completed' ? '#10b981' : getStepStatus(2) === 'current' ? 'black' : '#d1d5db'}
                                    className={`mt-1 flex-shrink-0 ${getStepStatus(2) === 'completed' ? 'text-primary' : getStepStatus(2) === 'current' ? 'text-black' : 'text-gray-300'}`}
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

                            <div className="flex items-start gap-2">
                                <Sparkle
                                    fill={getStepStatus(3) === 'completed' ? '#10b981' : getStepStatus(3) === 'current' ? 'black' : '#d1d5db'}
                                    className={`mt-1 flex-shrink-0 ${getStepStatus(3) === 'completed' ? 'text-primary' : getStepStatus(3) === 'current' ? 'text-black' : 'text-gray-300'}`}
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
                        <span className="text-lg font-medium">Select Your Difficulty</span>
                        <MoveDown className="size-4" />
                    </div>
                </div>
            </div>

            <div className="relative overflow-hidden">
                <div className="relative h-[220dvh] -translate-y-[28%] overflow-hidden flex items-center justify-center">
                    <div className="w-full max-w-xs space-y-8 px-8">
                        <div className="space-y-10">
                            <div className={`flex items-center gap-4 transition-all duration-300 ${getStepStatus(1) === 'current' ? 'scale-105' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepStatus(1) === 'completed' ? 'bg-primary text-white' :
                                    getStepStatus(1) === 'current' ? 'bg-primary text-white' :
                                        'border border-primary text-gray-600'
                                    }`}>
                                    {getStepStatus(1) === 'completed' ? '✓' : '1'}
                                </div>
                                <div className={`${getStepStatus(1) === 'current' ? 'font-semibold' : ''}`}>
                                    <p className="text-sm">Project Detail</p>
                                    {watchedValues.projectName && (
                                        <p className="text-xs text-gray-600 truncate">{watchedValues.projectName}</p>
                                    )}
                                </div>
                            </div>

                            <div className={`flex items-center gap-4 transition-all duration-300 ${getStepStatus(2) === 'current' ? 'scale-105' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepStatus(2) === 'completed' ? 'bg-primary text-white' :
                                    getStepStatus(2) === 'current' ? 'bg-primary text-white' :
                                        'border border-primary text-gray-600'
                                    }`}>
                                    {getStepStatus(2) === 'completed' ? '✓' : '2'}
                                </div>
                                <div className={`${getStepStatus(2) === 'current' ? 'font-semibold' : ''}`}>
                                    <p className="text-sm">Project Difficulty</p>
                                    {watchedValues.deadline && (
                                        <p className="text-xs text-gray-600">
                                            {new Date(watchedValues.deadline).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className={`flex items-center gap-4 transition-all duration-300 ${getStepStatus(3) === 'current' ? 'scale-105' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepStatus(3) === 'completed' ? 'bg-primary text-white' :
                                    getStepStatus(3) === 'current' ? 'bg-primary text-white' :
                                        'border border-primary text-gray-600'
                                    }`}>
                                    {getStepStatus(3) === 'completed' ? '✓' : '3'}
                                </div>
                                <div className={`${getStepStatus(3) === 'current' ? 'font-semibold' : ''}`}>
                                    <p className="text-sm">Select team member</p>
                                    {watchedValues.description && (
                                        <p className="text-xs text-gray-600 line-clamp-2">{watchedValues.description.substring(0, 30)}...</p>
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

// Character Section
const CharSection = () => {
    const { currentSection, setCurrentSection, selectedCharacter, setSelectedCharacter, projectData } = useProjectSetup();
    const [loading, setLoading] = useState(false);

    const characters = [
        {
            id: '1',
            name: 'Easy',
            image_url: '/assets/char1.png',
            bossName: 'Zen Master'
        },
        {
            id: '2',
            name: 'Medium',
            image_url: '/assets/char2.png',
            bossName: 'Warrior Chief'
        },
        {
            id: '3',
            name: 'Hard',
            image_url: '/assets/char3.png',
            bossName: 'Lightning Lord'
        },
    ];

    const form = useForm<UserSetupFormData>({
        resolver: zodResolver(userSetupSchema),
        defaultValues: {
            character: selectedCharacter
        },
        mode: 'onChange',
    });

    const { formState: { errors }, setValue } = form;

    const handleCharacterSelect = (characterId: string) => {
        setSelectedCharacter(characterId);
        setValue('character', characterId, { shouldValidate: true });
        // Auto progress to next section after selection
        setTimeout(() => setCurrentSection(3), 1500);
    };

    const getStepStatus = (step: number) => {
        if (step === 1) return projectData.projectName && projectData.deadline && projectData.description ? 'completed' : 'upcoming';
        if (step === 2) return selectedCharacter ? 'completed' : 'current';
        if (step === 3) return 'upcoming';
        return 'upcoming';
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

                        <div className="flex items-start gap-12">
                            <div className="flex-1 space-y-6">
                                <div className="flex gap-8 justify-center">
                                    {characters.map((character) => (
                                        <CharacterCard
                                            key={character.id}
                                            id={character.id}
                                            name={character.name}
                                            imageSrc={character.image_url}
                                            bossName={character.bossName}
                                            isSelected={selectedCharacter === character.id}
                                            onClick={() => handleCharacterSelect(character.id)}
                                        />
                                    ))}
                                </div>

                                {errors.character && (
                                    <p className="text-sm text-red-500 text-center">{errors.character.message}</p>
                                )}
                            </div>

                            <div className="relative overflow-hidden">
                                <div className="relative h-[220dvh] -translate-y-[28%] overflow-hidden flex items-center justify-center">
                                    <div className="w-full max-w-xs space-y-8 px-8">
                                        <div className="space-y-10">
                                            <div className={`flex items-center gap-4 transition-all duration-300 ${getStepStatus(1) === 'current' ? 'scale-105' : ''}`}>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepStatus(1) === 'completed' ? 'bg-primary text-white' :
                                                    getStepStatus(1) === 'current' ? 'bg-primary text-white' :
                                                        'border border-primary text-gray-600'
                                                    }`}>
                                                    {getStepStatus(1) === 'completed' ? '✓' : '1'}
                                                </div>
                                                <div className={`${getStepStatus(1) === 'current' ? 'font-semibold' : ''}`}>
                                                    <p className="text-sm">Project Detail</p>
                                                    {projectData.projectName && (
                                                        <p className="text-xs text-gray-600 truncate">{projectData.projectName}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className={`flex items-center gap-4 transition-all duration-300 ${getStepStatus(2) === 'current' ? 'scale-105' : ''}`}>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepStatus(2) === 'completed' ? 'bg-primary text-white' :
                                                    getStepStatus(2) === 'current' ? 'bg-primary text-white' :
                                                        'border border-primary text-gray-600'
                                                    }`}>
                                                    {getStepStatus(2) === 'completed' ? '✓' : '2'}
                                                </div>
                                                <div className={`${getStepStatus(2) === 'current' ? 'font-semibold' : ''}`}>
                                                    <p className="text-sm">Project Difficulty</p>
                                                    {projectData.deadline && (
                                                        <p className="text-xs text-gray-600">
                                                            {new Date(projectData.deadline).toLocaleDateString()}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className={`flex items-center gap-4 transition-all duration-300 ${getStepStatus(3) === 'current' ? 'scale-105' : ''}`}>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepStatus(3) === 'completed' ? 'bg-primary text-white' :
                                                    getStepStatus(3) === 'current' ? 'bg-primary text-white' :
                                                        'border border-primary text-gray-600'
                                                    }`}>
                                                    {getStepStatus(3) === 'completed' ? '✓' : '3'}
                                                </div>
                                                <div className={`${getStepStatus(3) === 'current' ? 'font-semibold' : ''}`}>
                                                    <p className="text-sm">Select team member</p>
                                                    {projectData.description && (
                                                        <p className="text-xs text-gray-600 line-clamp-2">{projectData.description.substring(0, 30)}...</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Invite Section
const InviteSection = () => {
    const { currentSection, projectData, selectedCharacter, collaborators, setCollaborators } = useProjectSetup();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const form = useForm<InviteFormData>({
        resolver: zodResolver(inviteSchema),
        defaultValues: {
            searchQuery: ''
        },
        mode: 'onChange',
    });

    const { register } = form;

    // Filter users based on search query
    React.useEffect(() => {
        if (searchQuery.length > 0) {
            const filtered = mockUsers.filter(user =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.role.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(filtered);
            setShowResults(true);
        } else {
            setSearchResults([]);
            setShowResults(false);
        }
    }, [searchQuery]);

    const handleAddCollaborator = (user) => {
        if (!collaborators.find(c => c.id === user.id)) {
            setCollaborators([...collaborators, user]);
        }
    };

    const handleRemoveCollaborator = (userId) => {
        setCollaborators(collaborators.filter(c => c.id !== userId));
    };

    const getStepStatus = (step: number) => {
        if (step === 1) return projectData.projectName && projectData.deadline && projectData.description ? 'completed' : 'upcoming';
        if (step === 2) return selectedCharacter ? 'completed' : 'upcoming';
        if (step === 3) return 'current';
        return 'upcoming';
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
                            <div className="flex items-start gap-2">
                                <Sparkle
                                    fill="black"
                                    className="mt-1 flex-shrink-0 text-black"
                                />
                                <div className="flex-1 space-y-2">
                                    <div className="flex gap-x-2 relative">
                                        <Input
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search team member by name or email..."
                                            className="max-w-sm"
                                        />

                                        {/* Search Results Dropdown */}
                                        {showResults && searchResults.length > 0 && (
                                            <div className="absolute top-full left-0 right-0 mt-1 max-w-sm bg-white border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                                <div className="p-2">
                                                    <p className="text-xs text-gray-500 mb-2">Search Results</p>
                                                    {searchResults.map(user => (
                                                        <UserSearchResult
                                                            key={user.id}
                                                            user={user}
                                                            onAdd={handleAddCollaborator}
                                                            isAdded={collaborators.some(c => c.id === user.id)}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Added Collaborators */}
                                    {collaborators.length > 0 && (
                                        <div className="max-w-sm space-y-3">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-gray-700">Team Members ({collaborators.length})</p>
                                            </div>
                                            <div className="grid grid-cols-1 gap-2">
                                                {collaborators.map(user => (
                                                    <CollaboratorCard
                                                        key={user.id}
                                                        user={user}
                                                        onRemove={handleRemoveCollaborator}
                                                    />
                                                ))}
                                            </div>
                                        </div>
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
                            <div className={`flex items-center gap-4 transition-all duration-300 ${getStepStatus(1) === 'current' ? 'scale-105' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepStatus(1) === 'completed' ? 'bg-primary text-white' :
                                    getStepStatus(1) === 'current' ? 'bg-primary text-white' :
                                        'border border-primary text-gray-600'
                                    }`}>
                                    {getStepStatus(1) === 'completed' ? '✓' : '1'}
                                </div>
                                <div className={`${getStepStatus(1) === 'current' ? 'font-semibold' : ''}`}>
                                    <p className="text-sm">Project Detail</p>
                                    {projectData.projectName && (
                                        <p className="text-xs text-gray-600 truncate">{projectData.projectName}</p>
                                    )}
                                </div>
                            </div>

                            <div className={`flex items-center gap-4 transition-all duration-300 ${getStepStatus(2) === 'current' ? 'scale-105' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepStatus(2) === 'completed' ? 'bg-primary text-white' :
                                    getStepStatus(2) === 'current' ? 'bg-primary text-white' :
                                        'border border-primary text-gray-600'
                                    }`}>
                                    {getStepStatus(2) === 'completed' ? '✓' : '2'}
                                </div>
                                <div className={`${getStepStatus(2) === 'current' ? 'font-semibold' : ''}`}>
                                    <p className="text-sm">Project Difficulty</p>
                                    {projectData.deadline && (
                                        <p className="text-xs text-gray-600">
                                            {new Date(projectData.deadline).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className={`flex items-center gap-4 transition-all duration-300 ${getStepStatus(3) === 'current' ? 'scale-105' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepStatus(3) === 'completed' ? 'bg-primary text-white' :
                                    getStepStatus(3) === 'current' ? 'bg-primary text-white' :
                                        'border border-primary text-gray-600'
                                    }`}>
                                    {getStepStatus(3) === 'completed' ? '✓' : '3'}
                                </div>
                                <div className={`${getStepStatus(3) === 'current' ? 'font-semibold' : ''}`}>
                                    <p className="text-sm">Select team member</p>
                                    {collaborators.length > 0 && (
                                        <p className="text-xs text-gray-600">{collaborators.length} member(s) added</p>
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

// Main Project Component
const ProjectSetup = () => {
    const [currentSection, setCurrentSection] = useState(1);
    const [projectData, setProjectData] = useState({});
    const [selectedCharacter, setSelectedCharacter] = useState('');
    const [collaborators, setCollaborators] = useState([]);

    const contextValue = {
        currentSection,
        setCurrentSection,
        projectData,
        setProjectData,
        selectedCharacter,
        setSelectedCharacter,
        collaborators,
        setCollaborators,
    };

    return (
        <ProjectSetupContext.Provider value={contextValue}>
            <div>
                {currentSection === 1 && <HeroSection />}
                {currentSection === 2 && <CharSection />}
                {currentSection === 3 && <InviteSection />}
            </div>
        </ProjectSetupContext.Provider>
    );
};

export default ProjectSetup;
