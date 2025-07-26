import { TaskItem } from '@/components/project/task-item';
import { TaskModal } from '@/components/project/task-modal';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePage } from '@inertiajs/react';
import { Check, Plus } from 'lucide-react';
import { useState } from 'react';

export const USERS = [
    { id: 1, name: 'Ayu' },
    { id: 2, name: 'Budi' },
    { id: 3, name: 'Citra' },
    { id: 4, name: 'Dewi' },
];

// export const TASKS = [
//     {
//         id: 1,
//         title: 'Design landing page',
//         desc: 'Create a responsive landing page using Tailwind CSS',
//         complete: false,
//         deadline: '2025-08-01',
//         assignedTo: 1, // Ayu
//         attachment: null,
//     },
//     {
//         id: 2,
//         title: 'Fix login bug',
//         desc: 'Resolve login redirect issue on Safari browser',
//         complete: true,
//         deadline: '2025-07-30',
//         assignedTo: 2, // Budi
//         attachment: 'bug_report.png',
//     },
//     {
//         id: 3,
//         title: 'Update user profile API',
//         desc: 'Add phone number field and validation to the update endpoint',
//         complete: false,
//         deadline: '2025-08-03',
//         assignedTo: 3, // Citra
//         attachment: null,
//     },
//     {
//         id: 4,
//         title: 'Write documentation',
//         desc: 'Document setup instructions and API routes',
//         complete: true,
//         deadline: '2025-07-28',
//         assignedTo: 4, // Dewi
//         attachment: 'docs.pdf',
//     },
//     {
//         id: 5,
//         title: 'Deploy to staging',
//         desc: 'Push latest changes to the staging environment for testing',
//         complete: false,
//         deadline: '2025-08-05',
//         assignedTo: 1, // Ayu
//         attachment: null,
//     },
// ];

export interface Task {
    id: number;
    title: string;
    desc: string;
    complete: boolean;
    deadline: string;
    assignedTo: number;
    attachment?: string | null;
}

const ProjectDetail = () => {
    const { tasks: TASKS, project } = usePage().props;

    console.log(project);


    const [tasks, setTasks] = useState<Task[]>(TASKS);

    console.log(TASKS);

    const toggleComplete = (id: number) => {
        setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, complete: !task.complete } : task)));
    };
    return (
        <div className="gap-8 overflow-hidden p-8 md:h-screen md:p-12">
            <section className="flex flex-col justify-between gap-4 md:flex-row">
                <h1 className="text-xl font-semibold md:text-3xl">{project.title}</h1>
                <div className="hidden justify-between gap-4 md:flex">
                    <Button variant="secondary">
                        <Check className="size-4" />
                        Mark As Done
                    </Button>
                    <TaskModal />
                </div>
            </section>
            <section className="flex w-full flex-col gap-8 md:flex-row md:gap-16">
                <div className="flex flex-col justify-between gap-0 md:flex-row md:gap-8">
                    <div className="relative flex items-center justify-center overflow-hidden">
                        <div className="relative aspect-square h-[40dvh] -translate-y-[10%] md:aspect-[3/3] md:h-[80dvh] md:-translate-y-[20%]">
                            <img src={project.difficulty.character.image_url} className="h-full w-full scale-x-[-1] object-cover object-top" />
                        </div>
                    </div>

                    <div className="relative flex h-full w-full max-w-64 flex-col justify-center gap-4 md:gap-6">
                        <h3 className="text-sm font-medium uppercase md:text-base">({project.difficulty.name})</h3>
                        <h3 className="text-base font-semibold uppercase md:text-2xl">{project.difficulty.character.name}</h3>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <p>Boss XP</p>
                                <span>150/1000</span>
                            </div>
                            <Progress value={80} />
                        </div>
                        <div className="space-x-4">
                            <span>2/8</span>
                            <span>Task Complete</span>
                        </div>
                    </div>
                </div>
                {/* Button On Mobile */}
                <div className="flex justify-between gap-4 md:hidden">
                    <Button variant="secondary">
                        <Check className="size-4" />
                        Mark As Done
                    </Button>
                    <Button>
                        <Plus className="size-4" />
                        New Task
                    </Button>
                </div>

                <ScrollArea className="h-[90dvh] w-full pb-12">
                    <div className="flex flex-col gap-8 pt-8">
                        {tasks
                            .sort((a, b) => Number(a.complete) - Number(b.complete))
                            .map((task, i) => (
                                <TaskItem key={task.id} task={task} onToggle={toggleComplete} />
                            ))}
                    </div>
                </ScrollArea>
            </section>
        </div>
    );
};
export default ProjectDetail;
