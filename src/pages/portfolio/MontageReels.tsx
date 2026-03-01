import { useRef, useState, useEffect } from 'react';
import AnimatedSection from '../../components/AnimatedSection';
import { Play } from 'lucide-react';

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
        <AnimatedSection delay={index * 0.15}>
            <div
                className="group relative overflow-hidden bg-black border border-white/5 transition-all duration-300 hover:border-[#C6A75E]/60 hover:shadow-[0_0_30px_rgba(198,167,94,0.12)]"
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
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Play overlay */}
                {!playing && (
                    <div
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer bg-black/50 transition-all duration-300 group-hover:bg-black/30"
                        onClick={handlePlay}
                    >
                        {!thumbnail && (
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/60" />
                        )}

                        <div className="relative z-10 w-14 h-14 rounded-full border-2 border-[#C6A75E] bg-black/50 backdrop-blur-sm flex items-center justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#C6A75E]/20">
                            <Play className="w-6 h-6 text-[#C6A75E] ml-1" />
                        </div>

                        <div className="absolute bottom-5 left-5 right-5 text-left z-10">
                            <h3 className="text-white font-semibold text-sm md:text-base leading-tight drop-shadow-lg truncate">{reel.title}</h3>
                            <p className="text-[#C6A75E] text-[10px] mt-0.5 uppercase tracking-widest">{reel.category}</p>
                        </div>
                    </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C6A75E]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
            </div>
        </AnimatedSection>
    );
}

export default function MontageReels() {
    return (
        <div className="min-h-screen bg-black pt-12 pb-24">
            {/* Header */}
            <section className="container mx-auto px-6 mb-16 pt-12 md:pt-24">
                <AnimatedSection>
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Montage & Reels</h1>
                        <div className="w-24 h-1 bg-[#C6A75E] mb-6" />
                        <p className="text-xl text-white/60 leading-relaxed">
                            Formats courts, dynamiques et optimisés. L'impact maximal pour vos réseaux sociaux.
                        </p>
                    </div>
                </AnimatedSection>
            </section>

            {/* Reels Grid */}
            <section className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {reels.map((reel, index) => (
                        <ReelCard key={reel.src} reel={reel} index={index} />
                    ))}
                </div>
            </section>
        </div>
    );
}
