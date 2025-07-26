import { Calendar, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
export const ProjectItem = () => {
    const [isActive, setIsActive] = useState(false);
    return (
        <div
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
            className="group relative flex cursor-pointer flex-col justify-between gap-4 pb-4 md:flex-row"
        >
            <div className="flex items-start gap-4">
                <div className="relative mt-2 size-4">
                    <img src="/icons/diamonx.svg" alt="Diamond" className="h-full w-full object-cover" />
                </div>
                <div className="max-w-xs">
                    <h4 className="text-lg font-medium">Web Development Project</h4>
                    <p className="text-sm text-neutral-600 transition-all duration-500 group-hover:translate-x-2">
                        Build a modern e-commerce platform with React and Node.js
                    </p>
                </div>
            </div>
            <div className="flex flex-row items-end justify-between gap-4 pr-4 pl-8 md:flex-col md:justify-start md:pr-4 md:pl-0">
                <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span className="text-xs">24 Oct 2025</span>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="size-4" />
                    <span className="text-xs">05</span>
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
