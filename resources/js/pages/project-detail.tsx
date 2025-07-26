import { TaskItem } from '@/components/project/task-item';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, Plus } from 'lucide-react';
import { useState } from 'react';
const TASKS = [
    {
        id: 1,
        name: 'Design landing page',
        desc: 'Create a responsive landing page using Tailwind CSS',
        complete: false,
    },
    {
        id: 2,
        name: 'Fix login bug',
        desc: 'Resolve login redirect issue on Safari browser',
        complete: true,
    },
    {
        id: 3,
        name: 'Update user profile API',
        desc: 'Add phone number field and validation to the update endpoint',
        complete: false,
    },
    {
        id: 4,
        name: 'Write documentation',
        desc: 'Document setup instructions and API routes',
        complete: true,
    },
    {
        id: 5,
        name: 'Deploy to staging',
        desc: 'Push latest changes to the staging environment for testing',
        complete: false,
    },
];

interface Task {
    id: number;
    name: string;
    desc: string;
    complete: boolean;
}

const ProjectDetail = () => {
    const [tasks, setTasks] = useState<Task[]>(TASKS);

    const toggleComplete = (id: number) => {
        setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, complete: !task.complete } : task)));
    };
    return (
        <div className="gap-8 overflow-hidden p-8 md:h-screen md:p-12">
            <section className="flex flex-col justify-between gap-4 md:flex-row">
                <h1 className="text-xl font-semibold md:text-3xl">Web Development Project</h1>
                <div className="hidden justify-between gap-4 md:flex">
                    <Button variant="secondary">
                        <Check className="size-4" />
                        Mark As Done
                    </Button>
                    <Button>
                        <Plus className="size-4" />
                        New Task
                    </Button>
                </div>
            </section>
            <section className="flex w-full flex-col gap-8 md:flex-row md:gap-16">
                <div className="flex flex-col justify-between gap-0 md:flex-row md:gap-8">
                    <div className="relative flex items-center justify-center overflow-hidden">
                        <div className="relative aspect-square h-[40dvh] -translate-y-[10%] md:aspect-[3/3] md:h-[80dvh] md:-translate-y-[20%]">
                            <img src="/assets/monster3.png" className="h-full w-full scale-x-[-1] object-cover object-top" />
                        </div>
                    </div>

                    <div className="relative flex h-full w-full max-w-64 flex-col justify-center gap-4 md:gap-6">
                        <h3 className="text-sm font-medium uppercase md:text-base">(Hard)</h3>
                        <h3 className="text-base font-semibold uppercase md:text-2xl">Bussroom</h3>
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
