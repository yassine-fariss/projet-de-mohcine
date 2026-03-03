import { useTranslation } from 'react-i18next';
import AnimatedSection from '../../components/AnimatedSection';
import { Video } from 'lucide-react';

const VideoPlaceholder = ({ index }: { index: number }) => {
    return (
        <AnimatedSection delay={index * 0.15}>
            <div className="group relative aspect-video overflow-hidden border border-white/5 bg-neutral-900/50 backdrop-blur-sm rounded-xl transition-all duration-700 hover:border-brand-gold/40 luxury-shadow-sm">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-brand-gold/30 flex flex-col items-center gap-4">
                        <Video className="w-12 h-12 transition-transform duration-700 group-hover:scale-110 group-hover:text-brand-gold/50" />
                        <span className="text-[10px] uppercase tracking-widest font-medium">Video Cinema {index + 1}</span>
                    </div>
                </div>

                {/* Overlay glow on hover */}
                <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Cinematic corner accents */}
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-brand-gold/20 transition-all duration-700 group-hover:w-16 group-hover:h-16 group-hover:border-brand-gold/40" />
                <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-brand-gold/20 transition-all duration-700 group-hover:w-16 group-hover:h-16 group-hover:border-brand-gold/40" />

                {/* Content Overlay that appears on hover */}
                <div className="absolute inset-0 flex items-end p-8 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div>
                        <h3 className="text-white font-bold text-xl mb-1 tracking-wide uppercase">Projet Cinématographique {index + 1}</h3>
                        <p className="text-brand-gold/60 text-[10px] uppercase tracking-[0.2em]">En attente de contenu</p>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default function VideoCinema() {
    const { t } = useTranslation();

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

            {/* Video Grid Placeholder */}
            <section className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <VideoPlaceholder key={index} index={index} />
                    ))}
                </div>
            </section>
        </div>
    );
}
