import { ProjectItem } from '@/components/home-page/project-item';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { projects } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const FILTERS = [
    { key: 'all', label: 'All Project' },
    { key: 'ongoing', label: 'Ongoing' },
    { key: 'complete', label: 'Complete' },
];

interface SelectedState {
    active: boolean;
    key: string;
}

const Index = () => {
    const [selected, setSelected] = useState<SelectedState>({ active: false, key: 'all' });

    const filteredProjects = projects
        .filter((project) => {
            if (selected.key === 'all') return true;
            if (selected.key === 'ongoing') return !project.is_finished;
            if (selected.key === 'complete') return project.is_finished;
            return true;
        })
        .sort((a, b) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();
            return dateB - dateA;
        });

    return (
        <div className="flex min-h-screen flex-col gap-0 overflow-hidden px-8 pt-16 md:h-screen md:flex-row md:gap-32 md:px-12">
            <section className="flex flex-[1] flex-col overflow-hidden">
                <div className="space-y-4">
                    <h1 className="text-4xl font-semibold">Welcome back, Dede</h1>
                    <p className="max-w-lg">
                        Ready to level up your productivity? Complete tasks, earn XP, and climb the leaderboards with your team.
                    </p>
                </div>
                <div className="flex items-center justify-between gap-8 overflow-hidden">
                    <div className="relative flex items-center justify-center overflow-hidden">
                        <div className="relative aspect-[1/3] h-[60dvh] md:aspect-[2/3] md:h-[120dvh]">
                            <img src="/assets/char4.png" className="h-full w-full object-cover object-top" />
                        </div>
                    </div>
                    <div className="relative flex h-full w-full max-w-md flex-col justify-center gap-6">
                        <div className="absolute -top-12 left-0 md:top-16">
                            <h3 className="text-2xl font-semibold">The Jomock</h3>
                        </div>

                        <h3 className="text-5xl font-medium uppercase">Level 1</h3>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <p>Current XP</p>
                                <span>150</span>
                            </div>
                            <Progress value={80} />
                        </div>
                        <Button onClick={() => window.location.href = route('project.index')}>
                            <Plus className="size-4" />
                            New Project
                        </Button>
                    </div>
                </div>
            </section>
            <section className="flex-[1]">
                <div className="px-0 md:px-12">
                    {/* <div className="relative flex items-center pb-4">
                        <Input
                            className="rounded-none border-x-0 border-t-0 border-b border-neutral-400 shadow-none focus:ring-0 focus-visible:ring-0"
                            placeholder="Search your project here..."
                        />
                        <Search className="absolute right-0 size-4" />
                    </div> */}
                    <div className="flex gap-8 p-4 text-sm">
                        {FILTERS.map((filter, i) => (
                            <HoverWord
                                selected={selected}
                                onClick={() => setSelected({ active: true, key: filter.key })}
                                wordKey={filter.key}
                                onSelecChange={setSelected}
                            >
                                {filter.label}
                            </HoverWord>
                        ))}
                    </div>
                    <ScrollArea className="h-[80dvh] w-full pb-12">
                        <div className="flex flex-col gap-8 pt-8">
                            {filteredProjects.map((project, i) => (
                                <ProjectItem project={project} key={project.id} />
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </section>
        </div>
    );
};
export default Index;

interface HoverWordProps {
    children: React.ReactNode;
    wordKey: string;
    onClick?: () => void;
    onSelecChange?: (value: SelectedState) => void;
    selected?: SelectedState;
}

export const HoverWord = ({ children, wordKey, onClick, onSelecChange, selected }: HoverWordProps) => {
    const isActive = selected?.key === wordKey;
    return (
        <span className="relative inline-block cursor-pointer">
            <span
                onClick={onClick}
                onMouseEnter={() => onSelecChange?.({ active: true, key: wordKey })}
                onMouseLeave={() => onSelecChange?.({ active: false, key: wordKey })}
                className={cn('relative font-medium', isActive ? 'text-neutral-700' : 'text-neutral-500')}
            >
                {children}
            </span>
            <motion.div
                className="absolute bottom-0 left-0 h-[2px] w-full bg-primary"
                style={{ originX: isActive ? 0 : 1 }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isActive ? 1 : 0 }}
                transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                }}
            />
        </span>
    );
};
