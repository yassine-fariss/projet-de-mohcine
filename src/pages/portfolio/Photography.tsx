import { useState } from 'react';
import AnimatedSection from '../../components/AnimatedSection';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
    '/Photo/DSC01111-1.jpg.jpeg',
    '/Photo/DSC01117-1.jpg (1).jpeg',
    '/Photo/DSC01117-1.jpg.jpeg',
    '/Photo/DSC01123-1.jpg.jpeg',
    '/Photo/DSC01208-1.jpg.jpeg',
    '/Photo/DSC01230-1.jpg.jpeg',
    '/Photo/DSC01291-1.jpg (1).jpeg',
    '/Photo/DSC01291-1.jpg.jpeg',
    '/Photo/DSC01292-1.jpg.jpeg',
    '/Photo/DSC09108copy.jpg.jpeg',
    '/Photo/DSC09116copy.jpg.jpeg',
    '/Photo/DSC09124copy.jpg.jpeg',
    '/Photo/DSC09124copy2Crop.jpg.jpeg',
    '/Photo/DSC09135copy2Crop.jpg (1).jpeg',
    '/Photo/DSC09135copy2Crop.jpg.jpeg',
    '/Photo/DSC09156copy2Crop.jpg.jpeg',
    '/Photo/DSC09187copy2Crop.jpg.jpeg',
    '/Photo/DSC09198copy.jpg.jpeg',
    '/Photo/DSC09205copy.jpg.jpeg',
    '/Photo/DSC09306.jpg.jpeg',
    '/Photo/DSC09446.jpg.jpeg',
    '/Photo/DSC09447.jpg.jpeg',
    '/Photo/DSC09485.jpg.jpeg',
    '/Photo/WhatsApp Image 2026-02-27 at 15.11.31.jpeg',
];

export default function Photography() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => setSelectedIndex(index);
    const closeLightbox = () => setSelectedIndex(null);

    const goPrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
    };

    const goNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
    };

    return (
        <div className="min-h-screen bg-black pt-12 pb-24">
            {/* Header */}
            <section className="container mx-auto px-6 mb-16 pt-12 md:pt-24">
                <AnimatedSection>
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Photographie</h1>
                        <div className="w-24 h-1 bg-brand-gold mb-6" />
                        <p className="text-xl text-white/60 leading-relaxed">
                            Immortalisons vos moments. Portraits professionnels, architecture, et photographie de produits.
                        </p>
                    </div>
                </AnimatedSection>
            </section>

            {/* Masonry Grid */}
            <section className="container mx-auto px-6">
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                    {photos.map((photo, index) => (
                        <AnimatedSection key={index} delay={index * 0.05}>
                            <div
                                className="group relative cursor-pointer overflow-hidden border border-white/5 hover:border-brand-gold/50 transition-colors break-inside-avoid"
                                onClick={() => openLightbox(index)}
                            >
                                <img
                                    src={photo}
                                    alt={`Portfolio ${index + 1}`}
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-300" />
                                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-14 h-14 rounded-full border border-brand-gold text-brand-gold flex items-center justify-center bg-black/50 backdrop-blur-sm transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                        <Maximize2 className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </section>

            {/* Lightbox Viewer */}
            {selectedIndex !== null && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
                    onClick={closeLightbox}
                >
                    {/* Close */}
                    <div
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer bg-black/50 rounded-full p-2 z-50"
                        onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                    >
                        <X className="w-8 h-8" />
                    </div>

                    {/* Prev */}
                    <button
                        className="absolute left-4 md:left-8 text-white/60 hover:text-brand-gold transition-colors bg-black/50 rounded-full p-3 z-50"
                        onClick={goPrev}
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    {/* Image */}
                    <img
                        src={photos[selectedIndex]}
                        alt={`Aperçu HD ${selectedIndex + 1}`}
                        className="max-w-full max-h-full object-contain shadow-2xl border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    />

                    {/* Next */}
                    <button
                        className="absolute right-4 md:right-8 text-white/60 hover:text-brand-gold transition-colors bg-black/50 rounded-full p-3 z-50"
                        onClick={goNext}
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    {/* Counter */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm font-mono">
                        {selectedIndex + 1} / {photos.length}
                    </div>
                </div>
            )}
        </div>
    );
}
