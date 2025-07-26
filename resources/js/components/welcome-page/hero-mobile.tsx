import { MoveDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

export const HeroMobile = () => {
    return (
        <div className="flex h-screen flex-col items-center gap-2 p-8 pb-0 md:hidden">
            <div className="flex items-center gap-2">
                <div className="relative size-4">
                    <img src="/icons/diamonx.svg" alt="Diamond" className="h-full w-full object-cover" />
                </div>
                <span className="font-playfair text-2xl font-medium">Taskto</span>
                <div className="relative size-4">
                    <img src="/icons/diamonx.svg" alt="Diamond" className="h-full w-full object-cover" />
                </div>
            </div>
            <div className="h-8">
                <Separator orientation="vertical" className="bg-neutral-600" />
            </div>
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <h1 className="text-2xl font-semibold">Turn Tasks Into Adventures</h1>
                <p className="max-w-64 text-sm">With Taskto, every task is an adventure, and you’re the hero</p>
                <Button>Join & Play Now</Button>
            </div>

            <div className="relative flex w-full justify-center overflow-hidden">
                <div className="relative flex flex-col items-center gap-8">
                    <div className="flex flex-col gap-2 text-xl font-semibold">
                        <span>タ</span>
                        <span>ス</span>
                        <span>ク</span>
                        <span>ト</span>
                    </div>
                    <div className="h-64">
                        <Separator className="bg-neutral-600" orientation="vertical" />
                    </div>
                </div>
                <div className="relative">
                    <div className="relative h-[120dvh] -translate-y-[16%] overflow-hidden">
                        <img alt="Home Image" src="/assets/char2.png" className="h-full w-full object-cover object-top" />
                    </div>
                    <div className="absolute bottom-0 left-1/2 flex aspect-square w-[60%] -translate-x-1/2 translate-y-[55%] items-start justify-center rounded-full border border-neutral-600 bg-neutral-100 text-primary">
                        <div className="flex flex-col items-center justify-center p-5">
                            <span className="text-lg font-medium">FAQ</span>
                            <MoveDown className="size-4" />
                        </div>
                    </div>
                </div>
                <div className="relative flex flex-col items-center gap-8">
                    <div className="h-64">
                        <Separator className="bg-neutral-600" orientation="vertical" />
                    </div>
                    <div className="flex flex-col gap-2 text-xl font-semibold">
                        <span>タ</span>
                        <span>ス</span>
                        <span>ク</span>
                        <span>ト</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
