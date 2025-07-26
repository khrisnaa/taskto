import { Calendar, Check, Circle } from 'lucide-react';
import { motion } from 'motion/react';

export interface Task {
    id: number;
    title: string;
    desc: string;
    complete: boolean;
    deadline: string;
    assignedTo: number;
    attachment?: string | null;
}

interface TaskItemProps {
    task: Task;
    onToggle: (id: number) => void;
}
export const TaskItem = ({ task, onToggle }: TaskItemProps) => {
    return (
        <div onClick={() => onToggle(task.id)} className="group relative flex cursor-pointer flex-col justify-between gap-4 pb-4 md:flex-row">
            <div className="flex items-start gap-4">
                <div className="relative mt-2 size-4">
                    {/* <img src="/icons/diamonx.svg" alt="Diamond" className="h-full w-full object-cover" /> */}
                    {task.complete ? <Check /> : <Circle />}
                </div>
                <div className="max-w-xs">
                    <h4 className="text-sm font-medium md:text-lg">{task.title}</h4>
                    <p className="text-sm text-neutral-600 transition-all duration-500 group-hover:translate-x-2">{task.desc}</p>
                </div>
            </div>
            <div className="flex flex-row items-end justify-between gap-4 pr-4 pl-8 md:flex-col md:justify-start md:pr-4 md:pl-0">
                <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span className="text-xs">24 Oct 2025</span>
                </div>
            </div>

            <motion.div
                className="absolute bottom-0 left-8 h-[2px] w-full bg-primary"
                style={{ originX: task.complete ? 0 : 1 }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: task.complete ? 1 : 0 }}
                transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                }}
            />
        </div>
    );
};
