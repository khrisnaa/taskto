import { MoveDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const HeroSection = () => {
    return (
        <section className="hidden h-screen overflow-hidden bg-neutral-100 px-12 md:flex">
            <div className="relative flex flex-1 items-center">
                <div className="absolute top-8 left-0 font-noto-jp text-xl font-semibold">
                    <div className="flex gap-2">
                        <span>タ</span>
                        <span>ス</span>
                        <span>ク</span>
                        <span>ト</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span>ス</span>
                        <span>ク</span>
                        <span>ト</span>
                    </div>
                </div>
                <div className="absolute bottom-8 left-0 text-xl font-semibold">
                    <div className="flex gap-2">
                        <span>タ</span>
                        <span>ス</span>
                        <span>ク</span>
                        <span>ト</span>
                    </div>
                </div>
                <div className="h-[50%] translate-y-[20%] bg-red-500">
                    <Separator orientation="vertical" className="bg-neutral-600" />
                </div>
                <div className="flex w-full items-center justify-center">
                    <div className="w-full max-w-xs space-y-4">
                        <div className="flex flex-col text-6xl font-semibold">
                            <span>Turn</span>
                            <span>Tasks</span>
                            <span>Into</span>
                            <span>Adventures</span>
                        </div>
                        <Separator className="bg-neutral-600" />
                        <p>Manage your tasks, level up with your team, and make every project feel like a game.</p>
                    </div>
                </div>
            </div>
            <div className="relative flex-[.6] overflow-hidden">
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
                <div className="relative h-[160dvh] -translate-y-[8%] overflow-hidden">
                    <img alt="Home Image" src="/assets/char2.png" className="h-full w-full object-cover object-top" />
                </div>
                <div className="absolute bottom-0 left-1/2 flex aspect-square w-[60%] -translate-x-1/2 translate-y-[55%] items-start justify-center rounded-full border border-neutral-600 bg-neutral-100 text-primary">
                    <div className="flex flex-col items-center justify-center p-5">
                        <span className="text-lg font-medium">FAQ</span>
                        <MoveDown className="size-4" />
                    </div>
                </div>
            </div>
            <div className="relative flex-1">
                <div className="absolute top-8 right-0 font-noto-jp text-xl font-semibold">
                    <div className="flex flex-row-reverse gap-2">
                        <span>タ</span>
                        <span>ス</span>
                        <span>ク</span>
                        <span>ト</span>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <span>ス</span>
                        <span>ク</span>
                        <span>ト</span>
                    </div>
                </div>

                <div className="flex h-full w-full items-center justify-center">
                    <div className="w-full max-w-xs space-y-4">
                        <p>With Taskto, every task is an adventure, and you’re the hero</p>
                        <Button className="cursor-pointer">Join & Play Now</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default HeroSection;
