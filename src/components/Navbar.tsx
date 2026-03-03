import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, ChevronDown, Video, Camera, Scissors, Clapperboard } from 'lucide-react';
import logoUrl from '../assets/logo.png';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';



const Navbar = () => {
    const { t, i18n } = useTranslation();
    const { theme } = useTheme();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobilePortfolioOpen, setIsMobilePortfolioOpen] = useState(false);
    const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
    const portfolioRef = useRef<HTMLDivElement>(null);

    const portfolioItems = [
        { label: t('services.videography.title'), to: '/portfolio/videography', icon: <Video className="w-4 h-4" /> },
        { label: t('services.photography.title'), to: '/portfolio/photography', icon: <Camera className="w-4 h-4" /> },
        { label: t('services.montage.title'), to: '/portfolio/montage-reels', icon: <Scissors className="w-4 h-4" /> },
        { label: t('video_cinema.title'), to: '/portfolio/video-cinema', icon: <Clapperboard className="w-4 h-4" /> },
    ];

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
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-background/80 backdrop-blur-xl py-3 shadow-lg border-b border-border-subtle' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center group">
                    <img
                        src={logoUrl}
                        alt="Revo Production"
                        className={`h-9 md:h-16 w-auto object-contain transition-all duration-700 ${theme === 'light' ? 'invert brightness-0' : ''} group-hover:scale-105`}
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-10">
                    <Link to="/" className="text-[11px] uppercase tracking-[0.2em] font-medium hover:text-brand-gold transition-all duration-300">
                        {t('nav.home')}
                    </Link>
                    <Link to="/services" className="text-[11px] uppercase tracking-[0.2em] font-medium hover:text-brand-gold transition-all duration-300">
                        {t('nav.services')}
                    </Link>

                    {/* Portfolio Dropdown */}
                    <div className="relative" ref={portfolioRef}>
                        <button
                            onClick={() => setIsPortfolioOpen((v) => !v)}
                            className={`flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-medium hover:text-brand-gold transition-all duration-300 ${isPortfolioActive ? 'text-brand-gold' : 'text-foreground'
                                }`}
                        >
                            {t('nav.portfolio')}
                            <ChevronDown
                                className={`w-3.5 h-3.5 transition-transform duration-500 ${isPortfolioOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {/* Dropdown panel */}
                        <div
                            className={`absolute top-full left-1/2 -translate-x-1/2 mt-6 w-60 bg-background/95 border border-border-subtle backdrop-blur-xl shadow-2xl transition-all duration-500 origin-top rounded-xl overflow-hidden ${isPortfolioOpen ? 'opacity-100 scale-y-100 pointer-events-auto translate-y-0' : 'opacity-0 scale-y-95 pointer-events-none -translate-y-2'
                                }`}
                        >
                            {/* Gold top accent */}
                            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />

                            <div className="py-2">
                                {portfolioItems.map((item) => (
                                    <Link
                                        key={item.to}
                                        to={item.to}
                                        className={`flex items-center gap-4 px-6 py-4 text-[10px] uppercase tracking-widest hover:bg-brand-gold/5 hover:text-brand-gold transition-all duration-300 group ${location.pathname === item.to ? 'text-brand-gold bg-brand-gold/5' : 'text-foreground/70'
                                            }`}
                                    >
                                        <span className="text-brand-gold/40 group-hover:text-brand-gold transition-colors transform group-hover:scale-110 duration-300">
                                            {item.icon}
                                        </span>
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link to="/about" className="text-[11px] uppercase tracking-[0.2em] font-medium hover:text-brand-gold transition-all duration-300">
                        {t('nav.about')}
                    </Link>
                    <Link to="/contact" className="text-[11px] uppercase tracking-[0.2em] font-medium hover:text-brand-gold transition-all duration-300">
                        {t('nav.contact')}
                    </Link>

                    {/* Language Switcher */}
                    <div className="relative group pl-4 border-l border-border-subtle">
                        <button className="flex items-center space-x-2 text-[10px] tracking-widest font-bold hover:text-brand-gold transition-all duration-300">
                            <Globe className="w-3.5 h-3.5" />
                            <span className="uppercase">{i18n.language}</span>
                        </button>
                        <div className="absolute right-0 mt-4 w-28 bg-background/95 border border-border-subtle rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 p-2">
                            <button onClick={() => changeLanguage('fr')} className="block w-full text-left px-4 py-2.5 text-[10px] tracking-widest hover:bg-brand-gold/10 hover:text-brand-gold rounded-lg transition-colors">FRANÇAIS</button>
                            <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-2.5 text-[10px] tracking-widest hover:bg-brand-gold/10 hover:text-brand-gold rounded-lg transition-colors">ENGLISH</button>
                            <button onClick={() => changeLanguage('ar')} className="block w-full text-left px-4 py-2.5 text-[10px] tracking-widest hover:bg-brand-gold/10 hover:text-brand-gold rounded-lg transition-colors">ARABE</button>
                        </div>
                    </div>

                    <div className="pl-6">
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
                <div className="md:hidden absolute top-full left-0 w-full bg-background/98 backdrop-blur-2xl border-t border-border-subtle py-8 px-8 flex flex-col space-y-6 shadow-2xl h-[calc(100vh-64px)] overflow-y-auto">
                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl uppercase tracking-[0.2em] font-light hover:text-brand-gold transition-colors">
                        {t('nav.home')}
                    </Link>
                    <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className="text-xl uppercase tracking-[0.2em] font-light hover:text-brand-gold transition-colors">
                        {t('nav.services')}
                    </Link>

                    {/* Mobile Portfolio Accordion */}
                    <div>
                        <button
                            onClick={() => setIsMobilePortfolioOpen((v) => !v)}
                            className={`flex items-center justify-between w-full text-xl uppercase tracking-[0.2em] font-light hover:text-brand-gold transition-colors ${isPortfolioActive ? 'text-brand-gold' : ''
                                }`}
                        >
                            {t('nav.portfolio')}
                            <ChevronDown
                                className={`w-5 h-5 transition-transform duration-300 ${isMobilePortfolioOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {isMobilePortfolioOpen && (
                            <div className="mt-4 ml-4 flex flex-col space-y-4 border-l border-brand-gold/30 pl-6">
                                {portfolioItems.map((item) => (
                                    <Link
                                        key={item.to}
                                        to={item.to}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 text-sm tracking-widest uppercase hover:text-brand-gold transition-colors ${location.pathname === item.to ? 'text-brand-gold' : 'text-foreground/60'
                                            }`}
                                    >
                                        <span className="text-brand-gold/50">{item.icon}</span>
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-xl uppercase tracking-[0.2em] font-light hover:text-brand-gold transition-colors">
                        {t('nav.about')}
                    </Link>
                    <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-xl uppercase tracking-[0.2em] font-light hover:text-brand-gold transition-colors">
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
