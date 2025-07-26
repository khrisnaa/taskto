import { Project } from '@/types';
import { router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Users, XCircle } from 'lucide-react';
import { useState } from 'react';

interface ProjectItemProps {
    project: Project;
}

export const ProjectItem = ({ project }: ProjectItemProps) => {
    const [isActive, setIsActive] = useState(false);

    // Format tanggal
    const formattedDate = project.due_date
        ? new Date(project.due_date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
        : 'No deadline';

    return (
        <div
            onClick={() => router.visit(`/projects`)}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
            className="group relative flex cursor-pointer flex-col justify-between gap-4 pb-4 md:flex-row"
        >
            <div className="flex items-start gap-4">
                <div className="relative mt-2 size-4">
                    <img src="/icons/diamonx.svg" alt="Diamond" className="h-full w-full object-cover" />
                </div>
                <div className="max-w-xs">
                    <h4 className="text-lg font-medium capitalize">{project.title}</h4>
                    <p className="text-sm text-neutral-600 transition-all duration-500 group-hover:translate-x-2">{project.description}</p>
                    <p className="mt-1 text-xs text-neutral-500 italic">Difficulty: {project.difficulty}</p>
                </div>
            </div>

            <div className="flex flex-row items-end justify-between gap-4 pr-4 pl-8 md:flex-col md:justify-start md:pr-4 md:pl-0">
                <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span className="text-xs">{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="size-4" />
                    <span className="text-xs">{project.is_public ? 'Public' : 'Private'}</span>
                </div>
                <div className="flex items-center gap-2">
                    {project.is_finished ? (
                        <>
                            <CheckCircle className="size-4 text-neutral-500" />
                            <span className="text-xs text-neutral-600">Finished</span>
                        </>
                    ) : (
                        <>
                            <XCircle className="size-4 text-neutral-500" />
                            <span className="text-xs text-neutral-600">Ongoing</span>
                        </>
                    )}
                </div>
            </div>

            <motion.div
                className="absolute bottom-0 left-8 h-[2px] w-full bg-primary"
                style={{ originX: isActive ? 0 : 1 }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isActive ? 1 : 0 }}
                transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                }}
            />
        </div>
    );
};
