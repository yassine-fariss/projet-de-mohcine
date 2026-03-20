import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../components/AnimatedSection';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';

export default function Contact() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would submit the form data to a backend endpoint
        console.log('Form submitted:', formData);
        alert(t('contact.form.success'));
        setFormData({ name: '', email: '', message: '' });
    };

    const WHATSAPP_NUMBER = '212625254219'; // Formatting for wa.me link
    const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

    return (
        <div className="min-h-screen bg-black pt-12">
            <SEO 
                title="Contactez Nous | Revo Production Casablanca"
                description="Prêt à donner vie à votre projet audiovisuel ? Contactez Revo Production à Casablanca. Réservez nos services de photographie et vidéo."
                keywords="contact revo production, agence vidéo casablanca, réserver vidéaste maroc"
            />
            {/* Header */}
            <section className="container mx-auto px-6 mb-16 pt-12 md:pt-24">
                <AnimatedSection>
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{t('contact.title')}</h1>
                        <div className="w-24 h-1 bg-brand-gold mb-6" />
                        <p className="text-xl text-white/60 leading-relaxed">
                            {t('contact.desc')}
                        </p>
                    </div>
                </AnimatedSection>
            </section>

            {/* Split Layout */}
            <section className="container mx-auto px-6 pb-32">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Contact Information (Left) */}
                    <div className="w-full lg:w-1/3 space-y-12">
                        <AnimatedSection delay={0.1}>
                            <div className="bg-[#050505] p-8 border border-white/10 hover:border-brand-gold/50 transition-colors h-full">
                                <h3 className="text-2xl font-bold text-white mb-8">{t('contact.info_title')}</h3>

                                <div className="space-y-8">
                                    <div className="flex items-start tracking-wide">
                                        <Phone className="w-6 h-6 text-brand-gold mr-4 mt-1" />
                                        <div>
                                            <h4 className="text-white/40 text-sm uppercase mb-1">{t('contact.phone')}</h4>
                                            <p className="text-white text-lg">0625254219</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start tracking-wide">
                                        <Mail className="w-6 h-6 text-brand-gold mr-4 mt-1" />
                                        <div className="break-all">
                                            <h4 className="text-white/40 text-sm uppercase mb-1">{t('contact.email')}</h4>
                                            <p className="text-white text-lg">Revoproductionsteam@gmail.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start tracking-wide">
                                        <MapPin className="w-6 h-6 text-brand-gold mr-4 mt-1" />
                                        <div>
                                            <h4 className="text-white/40 text-sm uppercase mb-1">{t('contact.location')}</h4>
                                            <p className="text-white text-lg">{t('why_us.support.location_val', 'Casablanca, Maroc')}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 pt-12 border-t border-white/10">
                                    <a
                                        href={WHATSAPP_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center justify-center w-full bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 px-6 py-4 transition-all duration-300 space-x-3"
                                    >
                                        <MessageCircle className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                                        <span className="font-semibold uppercase tracking-wider text-sm">{t('contact.whatsapp')}</span>
                                    </a>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>

                    {/* Contact Form (Right) */}
                    <div className="w-full lg:w-2/3">
                        <AnimatedSection delay={0.2} className="h-full">
                            <form onSubmit={handleSubmit} className="bg-white/5 p-8 lg:p-12 border border-white/10 flex flex-col h-full">
                                <h3 className="text-2xl font-bold text-white mb-8">{t('contact.form_title')}</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div className="flex flex-col">
                                        <label htmlFor="name" className="text-white/40 text-sm uppercase tracking-wider mb-2">{t('contact.form.name')}</label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                            placeholder={t('contact.form.name_placeholder')}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="email" className="text-white/40 text-sm uppercase tracking-wider mb-2">{t('contact.form.email')}</label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                            placeholder={t('contact.form.email_placeholder')}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col mb-12 flex-grow">
                                    <label htmlFor="message" className="text-white/40 text-sm uppercase tracking-wider mb-2">{t('contact.form.message')}</label>
                                    <textarea
                                        id="message"
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={6}
                                        className="bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors resize-none flex-grow"
                                        placeholder={t('contact.form.message_placeholder')}
                                    />
                                </div>

                                <div>
                                    <Button type="submit" variant="primary" icon={<Send className="w-4 h-4" />}>
                                        {t('contact.form.submit')}
                                    </Button>
                                </div>
                            </form>
                        </AnimatedSection>
                    </div>

                </div>
            </section>
        </div>
    );
}
