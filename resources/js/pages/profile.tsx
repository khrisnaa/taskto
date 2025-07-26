import HeroSection from '@/components/profile/hero-section';
import CharSection from '@/components/profile/char-section';

export default function Profile() {
    // const { auth } = usePage<SharedData>().props;

    return (
        <div>
            <HeroSection />
            <CharSection />
        </div>
    );
}
