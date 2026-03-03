import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../../components/AnimatedSection';
import { Play } from 'lucide-react';

const videoCinemaWorks = (t: any) => [
    {
        src: '/production cinema/La Main Gauche Trailer - Mohcine Rafik Copie 1.mp4',
        title: 'La Main Gauche Trailer',
        category: t('category.cinema'),
        seekTime: 5,
    },
    {
        src: '/production cinema/Whatsapp Video 2026-03-03 At 06.10.07 (1).mp4',
        title: 'Cinematic Production',
        category: t('category.cinema'),
        seekTime: 3,
    },
];

/** Extracts a single frame from a video URL at `seekTime` seconds using canvas. */
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

        return () => {
            vid.src = '';
        };
    }, [src, seekTime]);

    return thumbnail;
}

function VideoCard({ video, index }: { video: any; index: number }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);
    const thumbnail = useVideoThumbnail(video.src, video.seekTime);

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setPlaying(true);
        }
    };

    const handlePause = () => setPlaying(false);

    return (
        <AnimatedSection delay={index * 0.15}>
            <div
                className="group relative overflow-hidden bg-background border border-border-subtle transition-all duration-700 hover:border-brand-gold/40 luxury-shadow-sm rounded-xl"
                style={{ aspectRatio: '16 / 9' }}
            >
                {/* Native HTML5 Video */}
                <video
                    ref={videoRef}
                    src={video.src}
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
                        {/* Thumbnail bg fallback if poster not yet ready */}
                        {!thumbnail && (
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/60" />
                        )}

                        {/* Luxury play button */}
                        <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full border border-brand-gold bg-black/30 backdrop-blur-md flex items-center justify-center mb-4 md:mb-6 transform transition-all duration-500 group-hover:scale-105 group-hover:bg-brand-gold/10 group-hover:shadow-[0_0_20px_rgba(198,167,94,0.3)]">
                            <Play className="w-6 h-6 md:w-8 md:h-8 text-brand-gold ml-1 fill-brand-gold/20" />
                        </div>

                        {/* Title & category */}
                        <div className="text-center z-10 p-4 md:p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="text-white font-bold text-lg md:text-2xl leading-tight mb-2 tracking-wide uppercase drop-shadow-2xl">{video.title}</h3>
                            <div className="w-8 h-[1px] bg-brand-gold mx-auto mb-2 transition-all duration-500 group-hover:w-16" />
                            <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium">{video.category}</p>
                        </div>
                    </div>
                )}

                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" />
            </div>
        </AnimatedSection>
    );
}

export default function VideoCinema() {
    const { t } = useTranslation();
    const works = videoCinemaWorks(t);

    return (
        <div className="min-h-screen bg-background pt-12 pb-24 transition-colors duration-500">
            {/* Header */}
            <section className="container mx-auto px-6 mb-16 md:mb-20 pt-12 md:pt-24 text-center md:text-left">
                <AnimatedSection>
                    <div className="max-w-3xl mx-auto md:mx-0">
                        <h1 className="text-3xl md:text-7xl font-bold text-foreground mb-6 uppercase tracking-cinematic">
                            {t('video_cinema.title')}
                        </h1>
                        <div className="w-16 md:w-24 h-[1px] bg-brand-gold mb-8 md:mb-10 mx-auto md:mx-0" />
                        <p className="text-lg md:text-xl text-muted leading-relaxed font-light tracking-premium px-4 md:px-0">
                            {t('video_cinema.subtitle')}
                        </p>
                    </div>
                </AnimatedSection>
            </section>

            {/* Video Grid */}
            <section className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
                    {works.map((video, index) => (
                        <VideoCard key={video.src} video={video} index={index} />
                    ))}
                </div>
            </section>
        </div>
    );
}
