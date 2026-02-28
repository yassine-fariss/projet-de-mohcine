import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Video, Camera, Scissors, MonitorSmartphone, ArrowRight, CheckCircle, Play } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import Button from '../components/Button';
import AnimatedSection from '../components/AnimatedSection';
import ServiceCard from '../components/ServiceCard';

const homeVideos = [
    { src: '/video/Skoooda.mp4', title: 'Skoooda', category: 'Corporate', seekTime: 2 },
    { src: '/video/WhatsApp Video 2026-02-27 at 15.11.30.mp4', title: 'Production Cinématique', category: 'Événementiel', seekTime: 3 },
    { src: '/video/WhatsApp Video 2026-02-27 at 15.37.14.mp4', title: 'Reportage Visuel', category: 'Clip', seekTime: 2 },
];

function useVideoThumbnail(src: string, seekTime: number) {
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    useEffect(() => {
        const vid = document.createElement('video');
        vid.crossOrigin = 'anonymous';
        vid.preload = 'metadata';
        vid.muted = true;
        vid.playsInline = true;
        vid.src = src;
        vid.addEventListener('seeked', () => {
            const canvas = document.createElement('canvas');
            canvas.width = vid.videoWidth;
            canvas.height = vid.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) { ctx.drawImage(vid, 0, 0); setThumbnail(canvas.toDataURL('image/jpeg', 0.8)); }
            vid.src = '';
        }, { once: true });
        vid.addEventListener('loadedmetadata', () => {
            const t = Math.min(seekTime, vid.duration - 0.1);
            vid.currentTime = t > 0 ? t : 0;
        }, { once: true });
        return () => { vid.src = ''; };
    }, [src, seekTime]);
    return thumbnail;
}

function HomeVideoCard({ video, index }: { video: typeof homeVideos[0]; index: number }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);
    const thumbnail = useVideoThumbnail(video.src, video.seekTime);
    const handlePlay = () => { videoRef.current?.play(); setPlaying(true); };
    return (
        <AnimatedSection delay={index * 0.15}>
            <div
                className="group relative overflow-hidden bg-black border border-white/5 hover:border-[#C6A75E]/60 hover:shadow-[0_0_30px_rgba(198,167,94,0.12)] transition-all duration-300"
                style={{ aspectRatio: '16/9' }}
            >
                <video
                    ref={videoRef}
                    src={video.src}
                    poster={thumbnail ?? undefined}
                    preload="none"
                    controls={playing}
                    onPause={() => setPlaying(false)}
                    onEnded={() => setPlaying(false)}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {!playing && (
                    <div
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer bg-black/50 group-hover:bg-black/30 transition-all duration-300"
                        onClick={handlePlay}
                    >
                        <div className="w-14 h-14 rounded-full border-2 border-[#C6A75E] bg-black/50 backdrop-blur-sm flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#C6A75E]/20">
                            <Play className="w-6 h-6 text-[#C6A75E] ml-0.5" />
                        </div>
                        <div className="absolute bottom-5 left-5 text-left z-10">
                            <h3 className="text-white font-semibold text-base drop-shadow-lg">{video.title}</h3>
                            <p className="text-[#C6A75E] text-xs mt-0.5 uppercase tracking-widest">{video.category}</p>
                        </div>
                    </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C6A75E]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
            </div>
        </AnimatedSection>
    );
}

export default function Home() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with optimized loading */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
                    style={{
                        backgroundImage: "url('/hero_background.png')",
                        backgroundSize: 'cover'
                    }}
                />

                {/* Dark Overlay (70% opacity) */}
                <div className="absolute inset-0 bg-black/70" />

                <div className="container relative z-10 mx-auto px-6 text-center">
                    <AnimatedSection delay={0.2}>
                        <div className="inline-block">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-tight mb-4">
                                Production Vidéo <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-brand-gold">
                                    & Création Digitale
                                </span>
                            </h1>
                            {/* Subtle Gold Accent Line */}
                            <div className="w-32 h-1.5 bg-[#C6A75E] mx-auto mb-10 rounded-full" />
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.4}>
                        <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto mb-12 drop-shadow-lg">
                            À Casablanca.
                        </p>
                    </AnimatedSection>

                    <AnimatedSection delay={0.6}>
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                            <Link to="/portfolio/videography">
                                <Button variant="primary">
                                    {t('hero.btn.portfolio')}
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button variant="outline">
                                    {t('hero.btn.contact')}
                                </Button>
                            </Link>
                        </div>
                    </AnimatedSection>
                </div>

                {/* Subtle bottom fade to black */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
            </section>

            {/* Services Preview Section */}
            <section className="py-24 bg-black relative">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Nos Expertises</h2>
                            <div className="w-24 h-1 bg-brand-gold mx-auto" />
                        </div>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <ServiceCard
                            title="Vidéographie"
                            description="Des productions cinématographiques pour vos événements, publicités et communication d'entreprise."
                            icon={<Video className="w-10 h-10" />}
                            linkTo="/portfolio/videography"
                            delay={0.1}
                        />
                        <ServiceCard
                            title="Photographie"
                            description="Capturer l'essence de votre marque à travers des portraits, produits et reportages photo de haute qualité."
                            icon={<Camera className="w-10 h-10" />}
                            linkTo="/portfolio/photography"
                            delay={0.2}
                        />
                        <ServiceCard
                            title="Montage & Reels"
                            description="Montage dynamique et adapté aux formats courts pour les réseaux sociaux."
                            icon={<Scissors className="w-10 h-10" />}
                            linkTo="/portfolio/montage-reels"
                            delay={0.3}
                        />
                        <ServiceCard
                            title="Web Design"
                            description="Création de sites vitrines professionnels, élégants et performants."
                            icon={<MonitorSmartphone className="w-10 h-10" />}
                            linkTo="/portfolio/web-design"
                            delay={0.4}
                        />
                    </div>
                </div>
            </section>

            {/* Portfolio Preview Section */}
            <section className="py-24 bg-[#050505]">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Dernières Réalisations</h2>
                                <div className="w-24 h-1 bg-brand-gold" />
                            </div>
                            <Link to="/portfolio/videography" className="hidden md:inline-flex text-brand-gold hover:text-white transition-colors items-center space-x-2">
                                <span>Tout voir</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {homeVideos.map((video, i) => (
                            <HomeVideoCard key={video.src} video={video} index={i} />
                        ))}
                    </div>
                    <div className="mt-12 text-center md:hidden">
                        <Link to="/portfolio/videography" className="inline-flex text-brand-gold hover:text-white transition-colors items-center space-x-2">
                            <span>Tout voir</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-24 bg-black">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Pourquoi Nous Choisir</h2>
                            <div className="w-24 h-1 bg-brand-gold mx-auto" />
                        </div>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {[
                            { title: "Qualité Cinématographique", desc: "Notre équipement nous permet de délivrer un rendu haut de gamme." },
                            { title: "Équipe Experte", desc: "Des professionnels passionnés par l'image et l'innovation digitale." },
                            { title: "Accompagnement Sur Mesure", desc: "Nous adaptons nos services à vos besoins spécifiques." }
                        ].map((feature, i) => (
                            <AnimatedSection key={i} delay={0.1 * i} className="flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full border border-brand-gold flex items-center justify-center mb-6">
                                    <CheckCircle className="w-8 h-8 text-brand-gold" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                                <p className="text-white/60 leading-relaxed">{feature.desc}</p>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
