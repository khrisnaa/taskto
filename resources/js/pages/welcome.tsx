import { FAQ } from '@/components/blocks/faq';
import Footer from '@/components/footer';
import { Separator } from '@/components/ui/separator';
import { HeroMobile } from '@/components/welcome-page/hero-mobile';
import HeroSection from '@/components/welcome-page/hero-section';

export default function Welcome() {
    // const { auth } = usePage<SharedData>().props;

    return (
        <div>
            <HeroSection />
            <HeroMobile />
            <section className="min-h-screen space-y-4 bg-primary px-8 py-8 text-secondary md:px-12">
                <div className="flex items-center justify-start">
                    <div className="flex items-center gap-2">
                        <Separator />
                        <span className="font-playfair text-2xl font-medium">Taskto</span>
                    </div>
                </div>
                <div className="flex h-full flex-col items-center justify-center gap-4 md:flex-row">
                    <div className="flex-[1]">
                        <div className="flex justify-center text-4xl font-semibold md:justify-start md:text-6xl">
                            <span className="text-center md:text-start">The spark of idea</span>
                        </div>
                        <div className="relative flex h-[30dvh] w-full items-center justify-center overflow-hidden md:h-[70dvh]">
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
            <Footer />
        </div>
    );
}
