import { useRef, useState, useEffect } from 'react';
import AnimatedSection from '../../components/AnimatedSection';
import { Play } from 'lucide-react';

const videos = [
    {
        src: '/video/Skoooda.mp4',
        title: 'Skoooda',
        category: 'Corporate',
        seekTime: 2,
    },
    {
        src: '/video/WhatsApp Video 2026-02-27 at 15.11.30.mp4',
        title: 'Production Cinématique',
        category: 'Événementiel',
        seekTime: 3,
    },
    {
        src: '/video/WhatsApp Video 2026-02-27 at 15.37.14.mp4',
        title: 'Reportage Visuel',
        category: 'Clip',
        seekTime: 2,
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

function VideoCard({ video, index }: { video: typeof videos[0]; index: number }) {
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
                className="group relative overflow-hidden bg-black border border-white/5 transition-all duration-300 hover:border-[#C6A75E]/60 hover:shadow-[0_0_30px_rgba(198,167,94,0.12)]"
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
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Play overlay */}
                {!playing && (
                    <div
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer bg-black/50 transition-all duration-300 group-hover:bg-black/30"
                        onClick={handlePlay}
                    >
                        {/* Thumbnail bg fallback if poster not yet ready */}
                        {!thumbnail && (
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/60" />
                        )}

                        {/* Gold play button */}
                        <div className="relative z-10 w-16 h-16 rounded-full border-2 border-[#C6A75E] bg-black/50 backdrop-blur-sm flex items-center justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#C6A75E]/20">
                            <Play className="w-7 h-7 text-[#C6A75E] ml-1" />
                        </div>

                        {/* Title & category */}
                        <div className="absolute bottom-5 left-5 text-left z-10">
                            <h3 className="text-white font-semibold text-base leading-tight drop-shadow-lg">{video.title}</h3>
                            <p className="text-[#C6A75E] text-xs mt-0.5 uppercase tracking-widest">{video.category}</p>
                        </div>
                    </div>
                )}

                {/* Gold bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C6A75E]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
            </div>
        </AnimatedSection>
    );
}

export default function Videography() {
    return (
        <div className="min-h-screen bg-black pt-12 pb-24">
            {/* Header */}
            <section className="container mx-auto px-6 mb-16 pt-12 md:pt-24">
                <AnimatedSection>
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Vidéographie</h1>
                        <div className="w-24 h-1 bg-[#C6A75E] mb-6" />
                        <p className="text-xl text-white/60 leading-relaxed">
                            Découvrez nos dernières productions vidéo. Qualité cinématographique, storytelling percutant.
                        </p>
                    </div>
                </AnimatedSection>
            </section>

            {/* Video Grid */}
            <section className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video, index) => (
                        <VideoCard key={video.src} video={video} index={index} />
                    ))}
                </div>
            </section>
        </div>
    );
}
