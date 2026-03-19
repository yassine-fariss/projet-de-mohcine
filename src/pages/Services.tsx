import { useTranslation } from 'react-i18next';
import AnimatedSection from '../components/AnimatedSection';
import { Video, Camera, Scissors } from 'lucide-react';
import SEO from '../components/SEO';

export default function Services() {
    const { t } = useTranslation();

    const services = [
        {
            id: 'videography',
            title: t('services.videography.title'),
            desc: t('services.videography.desc'),
            icon: <Video className="w-8 h-8 text-brand-gold" />,
            image: '/service_videographie.png',
        },
        {
            id: 'photography',
            title: t('services.photography.title'),
            desc: t('services.photography.desc'),
            icon: <Camera className="w-8 h-8 text-brand-gold" />,
            image: '/service_photographie.png',
        },
        {
            id: 'montage',
            title: t('services.montage.title'),
            desc: t('services.montage.desc'),
            icon: <Scissors className="w-8 h-8 text-brand-gold" />,
            image: '/service_montage.png',
        }
    ];

    return (
        <div className="min-h-screen bg-[#050505] pt-12 pb-24">
            <SEO 
                title="Nos Services | Revo Productions"
                description="Nos services de production : vidéographie, photographie professionnelle, montage vidéo et création de Reels pour votre communication digitale."
                keywords="services vidéo, photographie professionnelle, montage vidéo, reels instagram"
            />
            <section className="container mx-auto px-6 mb-24 pt-12 md:pt-24">
                <AnimatedSection>
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            {t('services.page_title')}
                        </h1>
                        <p className="text-xl text-white/60 leading-relaxed">
                            {t('services.page_desc')}
                        </p>
                    </div>
                </AnimatedSection>
            </section>

            <div className="container mx-auto px-6 space-y-32">
                {services.map((service, index) => (
                    <AnimatedSection key={service.id} delay={0.1}>
                        <div className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>

                            {/* Image side */}
                            <div className="w-full md:w-1/2">
                                <div className="relative group overflow-hidden">
                                    {/* Outer gold border frame (decorative, offset) */}
                                    <div className="absolute -inset-2 border border-brand-gold/20 z-0 pointer-events-none" />

                                    {/* Image */}
                                    <div className="relative overflow-hidden border border-white/10 group-hover:border-brand-gold/50 transition-colors duration-500">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-72 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        {/* Dark gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                                        {/* Icon badge bottom-left */}
                                        <div className="absolute bottom-5 left-5 flex items-center gap-3 z-10">
                                            <div className="w-10 h-10 rounded-full bg-black/70 border border-brand-gold/60 backdrop-blur-sm flex items-center justify-center">
                                                {service.icon}
                                            </div>
                                        </div>

                                        {/* Gold bottom line */}
                                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Text side */}
                            <div className="w-full md:w-1/2 space-y-6">
                                <div className="flex items-center space-x-4">
                                    <span className="text-brand-gold font-mono text-xl opacity-50">0{index + 1}</span>
                                    <div className="h-px bg-white/20 w-12" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white">{service.title}</h2>
                                <p className="text-lg text-white/70 leading-relaxed">{service.desc}</p>
                            </div>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    );
}
