import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../../components/AnimatedSection';
import { Play } from 'lucide-react';
import SEO from '../../components/SEO';

const reels = [
    {
        src: '/reels/H D REEL 19-02  (1).mp4',
        title: 'Reel Impact 1',
        category: 'Social Media',
        seekTime: 1,
    },
    {
        src: '/reels/H D REEL 2 28-02 (1).mp4',
        title: 'Reel Impact 2',
        category: 'Digital',
        seekTime: 1,
    },
    {
        src: '/reels/H D REEL 2 VR 5  (1).mp4',
        title: 'Reel Impact 3',
        category: 'Motion',
        seekTime: 1,
    },
    {
        src: '/reels/HD vr 6 reel 2  (1).mp4',
        title: 'Reel Impact 4',
        category: 'Social Media',
        seekTime: 1,
    },
    {
        src: '/reels/WhatsApp Video 2026-03-01 at 21.38.55.mp4',
        title: 'Reel Impact 5',
        category: 'Modern Production',
        seekTime: 1,
    },
    {
        src: '/reels/Whatsapp Video 2026-03-03 At 06.10.07.mp4',
        title: 'Reel Impact 6',
        category: 'Cinematic Montage',
        seekTime: 2,
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

        const capture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = vid.videoWidth;
            canvas.height = vid.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
                setThumbnail(canvas.toDataURL('image/jpeg', 0.8));
            }
            vid.src = '';
        };

        vid.addEventListener('seeked', capture, { once: true });
        vid.addEventListener('loadedmetadata', () => {
            const t = Math.min(seekTime, vid.duration - 0.1);
            vid.currentTime = t > 0 ? t : 0;
        }, { once: true });

        return () => { vid.src = ''; };
    }, [src, seekTime]);

    return thumbnail;
}

function ReelCard({ reel, index }: { reel: typeof reels[0]; index: number }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);
    const thumbnail = useVideoThumbnail(reel.src, reel.seekTime);

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setPlaying(true);
        }
    };

    const handlePause = () => setPlaying(false);

    return (
        <AnimatedSection delay={index * 0.1}>
            <div
                className="group relative overflow-hidden bg-background border border-border-subtle transition-all duration-1000 hover:border-brand-gold/40 rounded-2xl luxury-shadow-sm"
                style={{ aspectRatio: '9 / 16' }}
            >
                {/* Native HTML5 Video */}
                <video
                    ref={videoRef}
                    src={reel.src}
                    poster={thumbnail ?? undefined}
                    preload="none"
                    controls={playing}
                    onPause={handlePause}
                    onEnded={handlePause}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Play overlay */}
                {!playing && (
                    <div
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer bg-black/60 transition-all duration-500 group-hover:bg-black/40"
                        onClick={handlePlay}
                    >
                        {!thumbnail && (
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/60" />
                        )}

                        {/* Luxury play button */}
                        <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full border border-brand-gold bg-black/30 backdrop-blur-md flex items-center justify-center mb-4 transform transition-all duration-500 group-hover:scale-105 group-hover:bg-brand-gold/10 group-hover:shadow-[0_0_20px_rgba(198,167,94,0.3)]">
                            <Play className="w-5 h-5 md:w-6 md:h-6 text-brand-gold ml-0.5 fill-brand-gold/20" />
                        </div>

                        {/* Discreet Title Overlay */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center w-full px-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <p className="text-white/80 text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-medium mb-1">Cinématographique</p>
                            <h3 className="text-white font-bold text-xs md:text-sm tracking-widest uppercase">{reel.title}</h3>
                        </div>
                    </div>
                )}

                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" />
            </div>
        </AnimatedSection>
    );
}

export default function MontageReels() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background pt-12 pb-24 transition-colors duration-500">
            <SEO 
                title="Montage & Reels Instagram | Revo Productions"
                description="Boostez votre présence digitale avec nos montages vidéo dynamiques et Reels Instagram percutants créés par nos experts en contenu."
                keywords="montage vidéo, reels instagram, contenu digital, monteur vidéo maroc"
            />
            {/* Header */}
            <section className="container mx-auto px-6 mb-16 md:mb-20 pt-12 md:pt-24 text-center md:text-left">
                <AnimatedSection>
                    <div className="max-w-3xl mx-auto md:mx-0">
                        <h1 className="text-3xl md:text-7xl font-bold text-foreground mb-6 uppercase tracking-cinematic">{t('montage.page_title')}</h1>
                        <div className="w-16 md:w-24 h-[1px] bg-brand-gold mb-8 md:mb-10 mx-auto md:mx-0" />
                        <p className="text-lg md:text-xl text-muted leading-relaxed font-light tracking-premium px-4 md:px-0">
                            {t('montage.desc')}
                        </p>
                    </div>
                </AnimatedSection>
            </section>

            {/* Reels Grid */}
            <section className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
                    {reels.map((reel, index) => (
                        <ReelCard key={reel.src} reel={reel} index={index} />
                    ))}
                </div>
            </section>
        </div>
    );
}
