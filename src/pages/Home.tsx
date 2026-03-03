import { Link } from 'react-router-dom';
import { Video, Camera, Scissors, ArrowRight, CheckCircle, Play } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button';
import AnimatedSection from '../components/AnimatedSection';
import ServiceCard from '../components/ServiceCard';

const homeVideos = (t: any) => [
    { src: '/video/Skoooda.mp4', title: 'Skoooda', category: t('category.corporate'), seekTime: 2 },
    { src: '/video/WhatsApp Video 2026-02-27 at 15.11.30.mp4', title: 'Production Cinématique', category: t('category.event'), seekTime: 3 },
    { src: '/video/WhatsApp Video 2026-02-27 at 15.37.14.mp4', title: 'Reportage Visuel', category: t('category.clip'), seekTime: 2 },
];

const teamData = (t: any) => [
    {
        name: 'Mohcine Rafik',
        role: t('role.videography'),
        image: '/teams/mohcine rafik.png',
        instagram: 'https://www.instagram.com/mohcine_rafi/',
    },
    {
        name: 'Abdessamad Ghazi',
        role: t('role.photography'),
        image: '/teams/abdelsamad ghazi.webp',
        instagram: 'https://www.instagram.com/ghaziabdessamad?igsh=eTJxMjZ0NHd1cGUy',
    },
    {
        name: 'Othmane Haddach',
        role: t('role.editing'),
        image: null,
        instagram: 'https://www.instagram.com/oth_2.1?igsh=bGhsaXg3OGxoamZu',
    },
    {
        name: 'Soukaina Laanaya',
        role: t('role.marketing'),
        image: '/teams/soukaina .jpeg',
        instagram: 'https://www.instagram.com/ilus_marokea?igsh=ODdxdHljbDZvaDBp',
    },
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

function HomeVideoCard({ video, index }: { video: any; index: number }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);
    const thumbnail = useVideoThumbnail(video.src, video.seekTime);
    const handlePlay = () => { videoRef.current?.play(); setPlaying(true); };
    return (
        <AnimatedSection delay={index * 0.15}>
            <div
                className="group relative overflow-hidden bg-background border border-border-subtle hover:border-[#C6A75E]/60 hover:shadow-[0_0_30px_rgba(198,167,94,0.12)] transition-all duration-300"
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
                        <div className="w-14 h-14 rounded-full border-2 border-[#C6A75E] bg-background/50 backdrop-blur-sm flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#C6A75E]/20">
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
    const videos = homeVideos(t);
    const team = teamData(t);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with optimized loading and subtle zoom */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] ease-out scale-110 animate-slow-zoom"
                    style={{
                        backgroundImage: "url('/videographer_hero.png')",
                    }}
                />

                {/* Dark Overlay (80% opacity for cinematic depth) */}
                <div className="absolute inset-0 bg-black/80 z-0" />

                <div className="container relative z-10 mx-auto px-6 text-center">
                    <AnimatedSection delay={0.2}>
                        <div className="inline-block w-full">
                            <h1 className="flex flex-col items-center gap-4 mb-8">
                                <span className="font-brand text-4xl md:text-6xl lg:text-8xl font-bold text-brand-gold luxury-text-glow luxury-text-glow-white uppercase tracking-[0.2em]">
                                    {t('hero.title1')}
                                </span>
                                <span className="font-luxury text-xl md:text-3xl lg:text-4xl text-white italic font-medium tracking-premium mt-2">
                                    {t('hero.title2')}
                                </span>
                            </h1>
                            {/* Elegant Gold Accent Line */}
                            <div className="w-16 md:w-48 h-[1px] bg-brand-gold/60 mx-auto mb-10 shadow-[0_0_15px_rgba(198,167,94,0.5)]" />
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.4}>
                        <p className="text-sm md:text-xl text-white/50 font-light max-w-2xl mx-auto mb-12 tracking-premium leading-relaxed uppercase px-4">
                            {t('hero.subtitle')}
                        </p>
                    </AnimatedSection>

                    <AnimatedSection delay={0.6}>
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                            <Link to="/portfolio/videography">
                                <Button variant="primary" className="px-10 py-6 tracking-widest uppercase text-xs">
                                    {t('hero.btn_portfolio')}
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button variant="outline" className="px-10 py-6 tracking-widest uppercase text-xs border-white/20 hover:border-brand-gold shadow-[0_10px_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_15px_50px_-5px_rgba(255,255,255,0.4)]">
                                    {t('hero.btn_contact')}
                                </Button>
                            </Link>
                        </div>
                    </AnimatedSection>
                </div>

                {/* Subtle bottom fade to background */}
                <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-background to-transparent z-10" />
            </section>

            {/* Services Preview Section */}
            <section className="py-24 bg-black relative">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t('services.title')}</h2>
                            <div className="w-24 h-1 bg-brand-gold mx-auto" />
                        </div>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ServiceCard
                            title={t('services.videography.title')}
                            description={t('services.videography.desc')}
                            icon={<Video className="w-10 h-10" />}
                            linkTo="/portfolio/videography"
                            image="/service_videographie.png"
                            delay={0.1}
                        />
                        <ServiceCard
                            title={t('services.photography.title')}
                            description={t('services.photography.desc')}
                            icon={<Camera className="w-10 h-10" />}
                            linkTo="/portfolio/photography"
                            image="/service_photographie.png"
                            delay={0.2}
                        />
                        <ServiceCard
                            title={t('services.montage.title')}
                            description={t('services.montage.desc')}
                            icon={<Scissors className="w-10 h-10" />}
                            linkTo="/portfolio/montage-reels"
                            image="/service_montage.png"
                            delay={0.3}
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
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t('portfolio.latest')}</h2>
                                <div className="w-24 h-1 bg-brand-gold" />
                            </div>
                            <Link to="/portfolio/videography" className="hidden md:inline-flex text-brand-gold hover:text-white transition-colors items-center space-x-2">
                                <span>{t('portfolio.view_all')}</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((video, i) => (
                            <HomeVideoCard key={video.src} video={video} index={i} />
                        ))}
                    </div>
                    <div className="mt-12 text-center md:hidden">
                        <Link to="/portfolio/videography" className="inline-flex text-brand-gold hover:text-white transition-colors items-center space-x-2">
                            <span>{t('portfolio.view_all')}</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Production Cinema Section */}
            <section className="py-24 bg-black relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 uppercase tracking-widest">{t('production_cinema.title')}</h2>
                            <div className="w-24 h-1 bg-brand-gold mx-auto mb-6" />
                            <p className="text-white/60 max-w-2xl mx-auto italic">
                                {t('production_cinema.subtitle')}
                            </p>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <div className="relative aspect-video max-w-5xl mx-auto group">
                            {/* Gold frame decoration */}
                            <div className="absolute -inset-4 border border-brand-gold/20 z-0 pointer-events-none" />

                            <div className="relative w-full h-full overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                                <video
                                    src="/production cinema/Tieser PFE RAFIK.mp4"
                                    className="w-full h-full object-cover"
                                    controls
                                    poster="/videographer_hero.png"
                                />

                                {/* Overlay glow on hover */}
                                <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>

                            {/* Cinematic accent lines */}
                            <div className="absolute -bottom-2 -right-2 w-24 h-24 border-b-2 border-r-2 border-brand-gold/30 pointer-events-none" />
                            <div className="absolute -top-2 -left-2 w-24 h-24 border-t-2 border-l-2 border-brand-gold/30 pointer-events-none" />
                        </div>
                    </AnimatedSection>
                </div>
            </section>



            {/* Clients Section */}
            <section className="py-24 bg-[#050505]">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t('clients.title')}</h2>
                            <div className="w-24 h-1 bg-brand-gold mx-auto" />
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <div className="bg-white rounded-3xl p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 items-center justify-items-center">
                                <img src="/clients/ICESCO-image.png" alt="ICESCO" className="h-16 md:h-24 w-auto object-contain opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-500" />
                                <img src="/clients/Marriott-Hotels-&amp-Resorts.webp" alt="Marriott" className="h-14 md:h-20 w-auto object-contain opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-500" />
                                <img src="/clients/mawazine.png" alt="Mawazine" className="h-16 md:h-24 w-auto object-contain opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-500" />
                                <img src="/clients/skoda-logo-png_seeklogo-177065.png" alt="Skoda" className="h-14 md:h-20 w-auto object-contain opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-500" />
                                <img src="/clients/client1.jpg" alt="Client 1" className="h-16 md:h-24 w-auto object-contain opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-500" />
                                <img src="/clients/client2.png" alt="Client 2" className="h-16 md:h-24 w-auto object-contain opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-500" />
                                <img src="/clients/images.png" alt="Client 3" className="h-14 md:h-20 w-auto object-contain opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-500" />
                                <img src="/clients/images (1).png" alt="Client 4" className="h-14 md:h-20 w-auto object-contain opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-500" />
                                <img src="/clients/images (2).png" alt="Client 5" className="h-14 md:h-20 w-auto object-contain opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-500" />
                                <img src="/clients/images.jpg" alt="Client 6" className="h-14 md:h-20 w-auto object-contain opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-500" />
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 bg-black">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <div className="mb-16 text-center md:text-left">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t('team.title')}</h2>
                            <div className="w-24 h-1 bg-brand-gold mx-auto md:mx-0" />
                        </div>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <AnimatedSection key={index} delay={0.1 * index}>
                                <a
                                    href={member.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative block overflow-hidden bg-neutral-900 aspect-[3/4] cursor-pointer"
                                >
                                    {/* Photo or gradient placeholder */}
                                    {member.image ? (
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-950" />
                                    )}

                                    {/* Dark gradient overlay bottom */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

                                    {/* Gold border on hover */}
                                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-gold/50 transition-colors duration-500 z-20" />

                                    {/* Name & role */}
                                    <div className="absolute bottom-0 left-0 w-full p-8 z-30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                                        <p className="text-brand-gold font-medium uppercase tracking-wider text-sm">{member.role}</p>
                                    </div>
                                </a>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-24 bg-black">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t('why_us.title')}</h2>
                            <div className="w-24 h-1 bg-brand-gold mx-auto" />
                        </div>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {[
                            { title: t('why_us.quality.title'), desc: t('why_us.quality.desc') },
                            { title: t('why_us.team.title'), desc: t('why_us.team.desc') },
                            { title: t('why_us.support.title'), desc: t('why_us.support.desc') }
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

