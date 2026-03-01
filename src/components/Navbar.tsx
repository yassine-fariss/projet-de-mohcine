import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, ChevronDown, Video, Camera, Scissors, MonitorSmartphone } from 'lucide-react';
import logoUrl from '../assets/logo.png';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const portfolioItems = [
    { label: 'Vidéographie', to: '/portfolio/videography', icon: <Video className="w-4 h-4" /> },
    { label: 'Photographie', to: '/portfolio/photography', icon: <Camera className="w-4 h-4" /> },
    { label: 'Reels & Montage', to: '/portfolio/montage-reels', icon: <Scissors className="w-4 h-4" /> },
    { label: 'Web Design', to: '/portfolio/web-design', icon: <MonitorSmartphone className="w-4 h-4" /> },
];

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const { theme } = useTheme();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobilePortfolioOpen, setIsMobilePortfolioOpen] = useState(false);
    const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
    const portfolioRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown on route change
    useEffect(() => {
        setIsPortfolioOpen(false);
        setIsMobileMenuOpen(false);
        setIsMobilePortfolioOpen(false);
    }, [location]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (portfolioRef.current && !portfolioRef.current.contains(e.target as Node)) {
                setIsPortfolioOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lng;
    };

    const isPortfolioActive = location.pathname.startsWith('/portfolio');

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md py-4 shadow-lg border-b border-white/5' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img src={logoUrl} alt="Revo Production" className={`h-12 md:h-16 w-auto mix-blend-screen object-contain transition-all duration-500 ${theme === 'light' ? 'invert' : ''}`} />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/" className="text-sm uppercase tracking-wide hover:text-brand-gold transition-colors">
                        {t('nav.home')}
                    </Link>
                    <Link to="/services" className="text-sm uppercase tracking-wide hover:text-brand-gold transition-colors">
                        {t('nav.services')}
                    </Link>

                    {/* Portfolio Dropdown */}
                    <div className="relative" ref={portfolioRef}>
                        <button
                            onClick={() => setIsPortfolioOpen((v) => !v)}
                            className={`flex items-center gap-1.5 text-sm uppercase tracking-wide hover:text-brand-gold transition-colors ${isPortfolioActive ? 'text-brand-gold' : 'text-foreground'
                                }`}
                        >
                            Nos Portfolio
                            <ChevronDown
                                className={`w-4 h-4 transition-transform duration-300 ${isPortfolioOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {/* Dropdown panel */}
                        <div
                            className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-background/95 border border-brand-gold/20 backdrop-blur-md shadow-2xl transition-all duration-300 origin-top ${isPortfolioOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
                                }`}
                        >
                            {/* Gold top accent */}
                            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

                            <div className="py-2">
                                {portfolioItems.map((item) => (
                                    <Link
                                        key={item.to}
                                        to={item.to}
                                        className={`flex items-center gap-3 px-5 py-3 text-sm hover:bg-brand-gold/10 hover:text-brand-gold transition-colors group ${location.pathname === item.to ? 'text-brand-gold bg-brand-gold/5' : 'text-foreground/80'
                                            }`}
                                    >
                                        <span className="text-brand-gold/60 group-hover:text-brand-gold transition-colors">
                                            {item.icon}
                                        </span>
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link to="/about" className="text-sm uppercase tracking-wide hover:text-brand-gold transition-colors">
                        {t('nav.about')}
                    </Link>
                    <Link to="/contact" className="text-sm uppercase tracking-wide hover:text-brand-gold transition-colors">
                        {t('nav.contact')}
                    </Link>

                    {/* Language Switcher */}
                    <div className="relative group">
                        <button className="flex items-center space-x-1 text-sm hover:text-brand-gold transition-colors">
                            <Globe className="w-4 h-4" />
                            <span className="uppercase">{i18n.language}</span>
                        </button>
                        <div className="absolute right-0 mt-2 w-24 bg-background border border-brand-gold/30 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                            <button onClick={() => changeLanguage('fr')} className="block w-full text-left px-4 py-2 text-sm hover:bg-brand-gold/20 hover:text-brand-gold">FR</button>
                            <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-2 text-sm hover:bg-brand-gold/20 hover:text-brand-gold">EN</button>
                            <button onClick={() => changeLanguage('ar')} className="block w-full text-left px-4 py-2 text-sm hover:bg-brand-gold/20 hover:text-brand-gold">AR</button>
                        </div>
                    </div>

                    <div className="pl-4 border-l border-white/10">
                        <ThemeToggle />
                    </div>
                </div>

                {/* Mobile menu and toggle */}
                <div className="flex items-center space-x-4 md:hidden">
                    <ThemeToggle />
                    <button
                        className="text-foreground hover:text-brand-gold"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-background/97 backdrop-blur-md border-t border-white/10 py-6 px-6 flex flex-col space-y-4">
                    <Link to="/" className="text-lg uppercase tracking-wide hover:text-brand-gold transition-colors">
                        {t('nav.home')}
                    </Link>
                    <Link to="/services" className="text-lg uppercase tracking-wide hover:text-brand-gold transition-colors">
                        {t('nav.services')}
                    </Link>

                    {/* Mobile Portfolio Accordion */}
                    <div>
                        <button
                            onClick={() => setIsMobilePortfolioOpen((v) => !v)}
                            className={`flex items-center justify-between w-full text-lg uppercase tracking-wide hover:text-brand-gold transition-colors ${isPortfolioActive ? 'text-brand-gold' : ''
                                }`}
                        >
                            Nos Portfolio
                            <ChevronDown
                                className={`w-5 h-5 transition-transform duration-300 ${isMobilePortfolioOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {isMobilePortfolioOpen && (
                            <div className="mt-3 ml-4 flex flex-col space-y-3 border-l border-brand-gold/30 pl-4">
                                {portfolioItems.map((item) => (
                                    <Link
                                        key={item.to}
                                        to={item.to}
                                        className={`flex items-center gap-2 text-base hover:text-brand-gold transition-colors ${location.pathname === item.to ? 'text-brand-gold' : 'text-foreground/70'
                                            }`}
                                    >
                                        <span className="text-brand-gold/60">{item.icon}</span>
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link to="/about" className="text-lg uppercase tracking-wide hover:text-brand-gold transition-colors">
                        {t('nav.about')}
                    </Link>
                    <Link to="/contact" className="text-lg uppercase tracking-wide hover:text-brand-gold transition-colors">
                        {t('nav.contact')}
                    </Link>

                    <div className="flex space-x-4 pt-4 border-t border-white/10">
                        <button onClick={() => { changeLanguage('fr'); setIsMobileMenuOpen(false); }} className={`uppercase ${i18n.language === 'fr' ? 'text-brand-gold' : 'text-foreground'}`}>FR</button>
                        <button onClick={() => { changeLanguage('en'); setIsMobileMenuOpen(false); }} className={`uppercase ${i18n.language === 'en' ? 'text-brand-gold' : 'text-foreground'}`}>EN</button>
                        <button onClick={() => { changeLanguage('ar'); setIsMobileMenuOpen(false); }} className={`uppercase ${i18n.language === 'ar' ? 'text-brand-gold' : 'text-foreground'}`}>AR</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
