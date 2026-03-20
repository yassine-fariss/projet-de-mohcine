import { useTranslation } from 'react-i18next';
import AnimatedSection from '../components/AnimatedSection';
import SEO from '../components/SEO';

export default function About() {
    const { t } = useTranslation();

    const team = [
        {
            name: 'Mohcine Rafik',
            role: t('role.videography'),
            image: '/teams/mohcine rafik.png',
            instagram: 'https://www.instagram.com/mohcine_rafi/',
        },
        {
            name: 'Abdessamad Ghazi',
            role: t('role.photographer'),
            image: '/teams/abdelsamad ghazi.webp',
            instagram: 'https://www.instagram.com/ghaziabdessamad?igsh=eTJxMjZ0NHd1cGUy',
        },
        {
            name: 'Othmane Haddach',
            role: t('role.editor'),
            image: null,
            instagram: 'https://www.instagram.com/oth_2.1?igsh=bGhsaXg3OGxoamZu',
        },
        {
            name: 'Soukaina Laanaya',
            role: t('role.social_media'),
            image: '/teams/soukaina .jpeg',
            instagram: 'https://www.instagram.com/ilus_marokea?igsh=ODdxdHljbDZvaDBp',
        },
    ];

    return (
        <div className="min-h-screen bg-black pt-12 pb-24">
            <SEO 
                title="À Propos | Revo Production"
                description="Découvrez l'équipe créative de Revo Production au Maroc. Nos experts en vidéographie, photographie et montage donnent vie à vos projets."
            />
            {/* Intro Section */}
            <section className="container mx-auto px-6 mb-32">
                <AnimatedSection>
                    <div className="max-w-4xl mx-auto text-center mt-12 md:mt-24">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
                            {t('about.hero_1')}<span className="text-brand-gold text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">{t('nav.portfolio')}</span>,<br />{t('about.hero_2')}
                        </h1>
                        <div className="w-24 h-1 bg-brand-gold mx-auto mb-10" />
                        <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-light">
                            {t('about.desc')}
                        </p>
                    </div>
                </AnimatedSection>
            </section>

            {/* Team Section */}
            <section className="container mx-auto px-6">
                <AnimatedSection>
                    <div className="mb-16 text-center md:text-left">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t('about.team')}</h2>
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
            </section>
        </div>
    );
}
