import { FAQ } from '@/components/blocks/faq';
import { Separator } from '@/components/ui/separator';
import HeroSection from '@/components/welcome-page.tsx/hero-section';

export default function Welcome() {
    // const { auth } = usePage<SharedData>().props;

    return (
        <div>
            <HeroSection />
            <section className="h-screen bg-primary px-12 py-8 text-secondary">
                <div className="flex items-center justify-start">
                    <div className="flex items-center gap-2">
                        <Separator />
                        <span className="font-playfair text-2xl font-medium">Taskto</span>
                    </div>
                </div>
                <div className="flex h-full items-center justify-center gap-4">
                    <div className="flex-[1]">
                        <div className="flex flex-col text-6xl font-semibold">The spark of idea</div>
                        <div className="relative flex h-[70dvh] w-full items-center justify-center overflow-hidden">
                            <div className="relative overflow-hidden">
                                <img src="/assets/monster2-white.png" alt="Monster" className="h-full w-full object-cover" />
                            </div>
                        </div>
                    </div>
                    <div className="flex-[1]">
                        <FAQ />
                    </div>
                </div>
            </section>
        </div>
    );
}
