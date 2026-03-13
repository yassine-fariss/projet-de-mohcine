import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Instagram } from 'lucide-react';
import logoUrl from '../assets/logo.png';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link to="/" className="block mb-4">
                            <img src={logoUrl} alt="Revo Productions" className="h-16 md:h-24 w-auto mix-blend-screen object-contain -ml-4" />
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Production Vidéo & Création Digitale de haute qualité à Casablanca.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Liens Rapides</h4>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-white/60 hover:text-brand-gold text-sm transition-colors">{t('nav.home')}</Link></li>
                            <li><Link to="/services" className="text-white/60 hover:text-brand-gold text-sm transition-colors">{t('nav.services')}</Link></li>
                            <li><Link to="/about" className="text-white/60 hover:text-brand-gold text-sm transition-colors">{t('nav.about')}</Link></li>
                            <li><Link to="/contact" className="text-white/60 hover:text-brand-gold text-sm transition-colors">{t('nav.contact')}</Link></li>
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Nos Services</h4>
                        <ul className="space-y-3">
                            <li><Link to="/portfolio/videography" className="text-white/60 hover:text-brand-gold text-sm transition-colors">Vidéographie</Link></li>
                            <li><Link to="/portfolio/photography" className="text-white/60 hover:text-brand-gold text-sm transition-colors">Photographie</Link></li>
                            <li><Link to="/portfolio/montage-reels" className="text-white/60 hover:text-brand-gold text-sm transition-colors">Montage & Reels</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Contact</h4>
                        <ul className="space-y-3 text-sm text-white/60">
                            <li>Casablanca, Maroc</li>
                            <li>0625254219</li>
                            <li>Revoproductionsteam@gmail.com</li>
                        </ul>
                        <div className="flex space-x-4 mt-6">
                            <a
                                href="https://www.instagram.com/revo__productions?igsh=ZDRvbml4c2M4ajZv"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-gold transition-colors"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-white/40 text-xs text-center md:text-left">
                        &copy; {new Date().getFullYear()} Revo Productions. Tous droits réservés.
                    </p>
                    <div className="mt-4 md:mt-0 space-x-4">
                        <Link to="#" className="text-white/40 hover:text-white text-xs transition-colors">Mentions Légales</Link>
                        <Link to="#" className="text-white/40 hover:text-white text-xs transition-colors">Politique de Confidentialité</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
