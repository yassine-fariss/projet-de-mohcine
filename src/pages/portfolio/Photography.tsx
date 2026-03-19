import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../../components/AnimatedSection';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import SEO from '../../components/SEO';

const weddingPhotos = [
    '/Photo/weddings/DSC01111-1.jpg.jpeg',
    '/Photo/weddings/DSC01117-1.jpg (1).jpeg',
    '/Photo/weddings/DSC01117-1.jpg.jpeg',
    '/Photo/weddings/DSC01123-1.jpg.jpeg',
    '/Photo/weddings/DSC01208-1.jpg.jpeg',
    '/Photo/weddings/DSC01230-1.jpg.jpeg',
    '/Photo/weddings/DSC01291-1.jpg (1).jpeg',
    '/Photo/weddings/DSC01291-1.jpg.jpeg',
    '/Photo/weddings/DSC01292-1.jpg.jpeg',
    '/Photo/weddings/DSC06294.jpg',
    '/Photo/weddings/DSC06296.jpg',
    '/Photo/weddings/DSC06298.jpg',
    '/Photo/weddings/DSC06299.jpg',
    '/Photo/weddings/DSC06302.jpg',
    '/Photo/weddings/DSC06307.jpg',
    '/Photo/weddings/DSC06311.jpg',
    '/Photo/weddings/DSC06320.jpg',
    '/Photo/weddings/DSC06321.jpg',
    '/Photo/weddings/DSC06326.jpg',
    '/Photo/weddings/DSC06328.jpg',
    '/Photo/weddings/DSC06330.jpg',
    '/Photo/weddings/DSC06341.jpg',
    '/Photo/weddings/DSC06389.jpg',
    '/Photo/weddings/DSC06397.jpg',
    '/Photo/weddings/DSC09108copy.jpg.jpeg',
    '/Photo/weddings/DSC09116copy.jpg.jpeg',
    '/Photo/weddings/DSC09124copy.jpg.jpeg',
    '/Photo/weddings/DSC09124copy2Crop.jpg.jpeg',
    '/Photo/weddings/DSC09135copy2Crop.jpg (1).jpeg',
    '/Photo/weddings/DSC09135copy2Crop.jpg.jpeg',
    '/Photo/weddings/DSC09156copy2Crop.jpg.jpeg',
    '/Photo/weddings/DSC09187copy2Crop.jpg.jpeg',
    '/Photo/weddings/DSC09198copy.jpg.jpeg',
    '/Photo/weddings/DSC09205copy.jpg.jpeg',
    '/Photo/weddings/DSC09306.jpg.jpeg',
    '/Photo/weddings/DSC09446.jpg.jpeg',
    '/Photo/weddings/DSC09447.jpg.jpeg',
    '/Photo/weddings/DSC09485.jpg.jpeg',
    '/Photo/weddings/WhatsApp Image 2026-02-27 at 15.11.31.jpeg',
];

const commercialPhotos = [
    '/Photo/commercial photos/finale.jpg.jpeg',
    '/Photo/commercial photos/GH801057-Panorama.JPG.jpeg',
    '/Photo/commercial photos/GH801095-Panorama.JPG.jpeg',
    '/Photo/commercial photos/GH801109-Panorama.JPG.jpeg',
    '/Photo/commercial photos/GH801123.JPG.jpeg',
    '/Photo/commercial photos/ghaziphotoghraphie06.jpg.jpeg',
];

const portraitPhotos = [
    '/Photo/portrait photos/DSC06314-Modifier.jpg',
    '/Photo/portrait photos/DSC06395-Modifier.jpg',
    '/Photo/portrait photos/DSC06552-Modifier.jpg',
    '/Photo/portrait photos/DSC_1280-Edit.jpg',
    '/Photo/portrait photos/ghaziphotoghraphiesalé.jpg',
];

const caftanPhotos = [
    '/caftan/DSC02910_result.jpg.jpeg',
    '/caftan/DSC02919_result.jpg.jpeg',
    '/caftan/DSC02927_result.jpg.jpeg',
    '/caftan/DSC02935_result.jpg.jpeg',
    '/caftan/DSC02992_result.jpg.jpeg',
    '/caftan/DSC03036_result.jpg.jpeg',
    '/caftan/DSC03055_result.jpg.jpeg',
];

const jewelryPhotos = [
    '/jewelry/2024-02-03 11-10-42 (B,R8,S4).jpg',
    '/jewelry/24ab-4f68-bae8-76b162c5fc5e.jpg',
    '/jewelry/4991640a-24ab-4f68-162c5fc5e.jpg',
    '/jewelry/4991640a-24ab-4f68-bae8-76b162c5fc5e.jpg',
];

const schoolPhotos = [
    '/school/DSC_4880.jpg.jpeg',
    '/school/DSC_4934.jpg.jpeg',
    '/school/DSC_4985.jpg.jpeg',
    '/school/DSC_5018.jpg.jpeg',
    '/school/DSC_5104.jpg.jpeg',
    '/school/DSC_5130.jpg.jpeg',
    '/school/DSC_5427.jpg.jpeg',
    '/school/Img761.jpg.jpeg',
    '/school/Img772.jpg.jpeg',
    '/school/Img774.jpg.jpeg',
    '/school/Img778.jpg.jpeg',
    '/school/Img835.jpg.jpeg',
    '/school/Img867.jpg.jpeg',
    '/school/Img875.jpg.jpeg',
];

function PhotoCard({ photo, index, onClick }: { photo: string, index: number, onClick: () => void }) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <AnimatedSection delay={index * 0.05}>
            <div
                className={`group relative cursor-pointer overflow-hidden border border-border-subtle hover:border-brand-gold/40 transition-all duration-700 break-inside-avoid bg-background mb-4 rounded-xl luxury-shadow-sm ${!isLoaded ? 'animate-pulse min-h-[300px]' : ''
                    }`}
                onClick={onClick}
            >
                {/* Loader Spinner (Subtle) */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border border-brand-gold/20 border-t-brand-gold rounded-full animate-spin" />
                    </div>
                )}

                <img
                    src={photo}
                    alt={`Portfolio ${index + 1}`}
                    onLoad={() => setIsLoaded(true)}
                    className={`w-full h-auto object-cover transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                        } group-hover:scale-110`}
                    loading="lazy"
                />

                {/* Cinematic Overlay */}
                <div className={`absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500 ${isLoaded ? '' : 'hidden'}`} />
                <div className={`absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isLoaded ? '' : 'hidden'}`}>
                    <div className="w-16 h-16 rounded-full border border-brand-gold/50 text-brand-gold flex items-center justify-center bg-black/30 backdrop-blur-md transform scale-90 group-hover:scale-100 transition-all duration-500">
                        <Maximize2 className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

export default function Photography() {
    const { t } = useTranslation();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<'wedding' | 'commercial' | 'portrait' | 'caftan' | 'jewelry' | 'school' | null>(null);

    const getPhotos = () => {
        if (activeTab === 'wedding') return weddingPhotos;
        if (activeTab === 'commercial') return commercialPhotos;
        if (activeTab === 'portrait') return portraitPhotos;
        if (activeTab === 'caftan') return caftanPhotos;
        if (activeTab === 'jewelry') return jewelryPhotos;
        return [];
    };

    const currentPhotos = getPhotos();

    const openLightbox = (index: number) => setSelectedIndex(index);
    const closeLightbox = () => setSelectedIndex(null);

    const goPrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedIndex((prev) => (prev !== null ? (prev - 1 + currentPhotos.length) % currentPhotos.length : null));
    };

    const goNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % currentPhotos.length : null));
    };

    const getTitle = () => {
        if (activeTab === 'wedding') return t('photography.collection.wedding');
        if (activeTab === 'commercial') return t('photography.collection.commercial');
        if (activeTab === 'portrait') return t('photography.collection.portrait');
        if (activeTab === 'caftan') return t('photography.collection.caftan');
        if (activeTab === 'jewelry') return t('photography.collection.jewelry');
        if (activeTab === 'school') return t('photography.collection.school');
        return t('photography.page_title');
    };

    return (
        <div className="min-h-screen bg-background pt-12 pb-24 transition-colors duration-500">
            <SEO 
                title={`${getTitle()} | Photographie | Revo Productions`}
                description="Parcourez notre portfolio de photographie : mariage, événements, portraits, caftans et commerciaux par nos photographes professionnels à Casablanca."
                keywords="photographe professionnel casablanca, photographie mariage maroc, shooting caftan, photographe commercial"
            />
            {/* Header */}
            <section className="container mx-auto px-6 mb-16 md:mb-20 pt-12 md:pt-24 text-center md:text-left">
                <AnimatedSection>
                    <div className="max-w-4xl mx-auto md:mx-0">
                        <h1 className="text-3xl md:text-7xl font-bold text-foreground mb-6 uppercase tracking-cinematic">
                            {getTitle()}
                        </h1>
                        <div className="w-16 md:w-24 h-[1px] bg-brand-gold mb-8 md:mb-10 mx-auto md:mx-0" />
                        <p className="text-lg md:text-xl text-muted leading-relaxed font-light tracking-premium px-4 md:px-0">
                            {t('photography.desc')}
                        </p>
                    </div>
                </AnimatedSection>
            </section>

            {/* Back Button (Only when a collection is active) */}
            {activeTab && (
                <section className="container mx-auto px-6 mb-12">
                    <AnimatedSection delay={0.1}>
                        <button
                            onClick={() => setActiveTab(null)}
                            className="inline-flex items-center space-x-2 text-brand-gold hover:text-white transition-colors group"
                        >
                            <ChevronLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                            <span className="font-bold uppercase tracking-widest text-sm">{t('photography.back')}</span>
                        </button>
                    </AnimatedSection>
                </section>
            )}

            {/* Collection Selection Cards (Only when no collection is active) */}
            {!activeTab && (
                <section className="container mx-auto px-6 mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        {/* Wedding Collection Card */}
                        <AnimatedSection delay={0.1}>
                            <div
                                onClick={() => { setActiveTab('wedding'); setSelectedIndex(null); }}
                                className="group relative aspect-[4/5] cursor-pointer overflow-hidden border border-border-subtle hover:border-brand-gold/40 transition-all duration-1000 rounded-2xl bg-background luxury-shadow-sm"
                            >
                                <img
                                    src={weddingPhotos[0]}
                                    alt="Wedding Collection Preview"
                                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-700" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-cinematic uppercase luxury-text-glow">Wedding</h2>
                                    <div className="w-8 h-[1px] bg-brand-gold transition-all duration-700 group-hover:w-20" />
                                    <p className="mt-6 text-white/50 text-xs uppercase tracking-[0.3em] font-medium opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-2 group-hover:translate-y-0">{t('photography.explore')}</p>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Portrait Collection Card */}
                        <AnimatedSection delay={0.2}>
                            <div
                                onClick={() => { setActiveTab('portrait'); setSelectedIndex(null); }}
                                className="group relative aspect-[4/5] cursor-pointer overflow-hidden border border-border-subtle hover:border-brand-gold/40 transition-all duration-1000 rounded-2xl bg-background luxury-shadow-sm"
                            >
                                <img
                                    src={portraitPhotos[0]}
                                    alt="Portrait Collection Preview"
                                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-700" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-cinematic uppercase luxury-text-glow">Portrait</h2>
                                    <div className="w-8 h-[1px] bg-brand-gold transition-all duration-700 group-hover:w-20" />
                                    <p className="mt-6 text-white/50 text-xs uppercase tracking-[0.3em] font-medium opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-2 group-hover:translate-y-0">{t('photography.explore')}</p>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Commercial Collection Card */}
                        <AnimatedSection delay={0.3}>
                            <div
                                onClick={() => { setActiveTab('commercial'); setSelectedIndex(null); }}
                                className="group relative aspect-[4/5] cursor-pointer overflow-hidden border border-border-subtle hover:border-brand-gold/40 transition-all duration-1000 rounded-2xl bg-background luxury-shadow-sm"
                            >
                                <img
                                    src={commercialPhotos[0]}
                                    alt="Commercial Collection Preview"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-700" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-cinematic uppercase luxury-text-glow">Commercial</h2>
                                    <div className="w-8 h-[1px] bg-brand-gold transition-all duration-700 group-hover:w-20" />
                                    <p className="mt-6 text-white/50 text-xs uppercase tracking-[0.3em] font-medium opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-2 group-hover:translate-y-0">{t('photography.explore')}</p>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Caftan Collection Card */}
                        <AnimatedSection delay={0.4}>
                            <div
                                onClick={() => { setActiveTab('caftan'); setSelectedIndex(null); }}
                                className="group relative aspect-[4/5] cursor-pointer overflow-hidden border border-border-subtle hover:border-brand-gold/40 transition-all duration-1000 rounded-2xl bg-background luxury-shadow-sm"
                            >
                                <img
                                    src={caftanPhotos[0]}
                                    alt="Caftan Collection Preview"
                                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-700" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-cinematic uppercase luxury-text-glow">Caftan</h2>
                                    <div className="w-8 h-[1px] bg-brand-gold transition-all duration-700 group-hover:w-20" />
                                    <p className="mt-6 text-white/50 text-xs uppercase tracking-[0.3em] font-medium opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-2 group-hover:translate-y-0">{t('photography.explore')}</p>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Jewelry Collection Card */}
                        <AnimatedSection delay={0.5}>
                            <div
                                onClick={() => { setActiveTab('jewelry'); setSelectedIndex(null); }}
                                className="group relative aspect-[4/5] cursor-pointer overflow-hidden border border-border-subtle hover:border-brand-gold/40 transition-all duration-1000 rounded-2xl bg-background luxury-shadow-sm"
                            >
                                <img
                                    src={jewelryPhotos[2]}
                                    alt="Jewelry Collection Preview"
                                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-700" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-cinematic uppercase luxury-text-glow">Jewelry</h2>
                                    <div className="w-8 h-[1px] bg-brand-gold transition-all duration-700 group-hover:w-20" />
                                    <p className="mt-6 text-white/50 text-xs uppercase tracking-[0.3em] font-medium opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-2 group-hover:translate-y-0">{t('photography.explore')}</p>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* School Collection Card */}
                        <AnimatedSection delay={0.6}>
                            <div
                                onClick={() => { setActiveTab('school'); setSelectedIndex(null); }}
                                className="group relative aspect-[4/5] cursor-pointer overflow-hidden border border-border-subtle hover:border-brand-gold/40 transition-all duration-1000 rounded-2xl bg-background luxury-shadow-sm"
                            >
                                {/* Ambient Blurred Background to fill margins */}
                                <img
                                    src={schoolPhotos[6]}
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-cover blur-[30px] opacity-70 scale-125 transition-transform duration-1000 group-hover:scale-150"
                                />
                                <img
                                    src={schoolPhotos[6]}
                                    alt="School Collection Preview"
                                    className="absolute inset-0 w-full h-full object-contain object-center transition-transform duration-1000 group-hover:scale-105 z-10"
                                />
                                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-700 z-20" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-30">
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-cinematic uppercase luxury-text-glow">School</h2>
                                    <div className="w-8 h-[1px] bg-brand-gold transition-all duration-700 group-hover:w-20" />
                                    <p className="mt-6 text-white/50 text-xs uppercase tracking-[0.3em] font-medium opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-2 group-hover:translate-y-0">{t('photography.explore')}</p>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>
            )}

            {/* Masonry Grid (Only when a collection is active) */}
            {activeTab && (
                <section className="container mx-auto px-6">
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
                        {currentPhotos.map((photo, index) => (
                            <PhotoCard
                                key={`${activeTab}-${index}`}
                                photo={photo}
                                index={index}
                                onClick={() => openLightbox(index)}
                            />
                        ))}
                    </div>
                </section>
            )}

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
                        src={currentPhotos[selectedIndex]}
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
                        {selectedIndex + 1} / {currentPhotos.length}
                    </div>
                </div>
            )}
        </div>
    );
}
