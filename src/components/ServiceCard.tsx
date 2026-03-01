import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ServiceCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    linkTo: string;
    image?: string;
    delay?: number;
}

export default function ServiceCard({ title, description, icon, linkTo, image, delay = 0 }: ServiceCardProps) {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay }}
            className="h-full"
        >
            <Link
                to={linkTo}
                className="group relative block h-full overflow-hidden border border-white/10 bg-black/50 transition-all duration-700 hover:border-brand-gold/40 flex flex-col"
            >
                {/* Background Image with Dark Overlay */}
                {image && (
                    <div className="absolute inset-0 z-0">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-all duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    </div>
                )}

                {/* Content Overlay */}
                <div className="relative z-10 p-8 flex flex-col h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="text-brand-gold mb-6 relative z-10 transform transition-transform duration-500 group-hover:-translate-y-1">
                        {icon}
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 relative z-10 tracking-tight">{title}</h3>
                    <p className="text-white/60 leading-relaxed mb-8 flex-grow relative z-10 text-sm md:text-base font-light">{description}</p>

                    <div className="mt-auto inline-flex items-center text-sm font-bold tracking-[0.2em] uppercase text-white group-hover:text-brand-gold transition-colors relative z-10">
                        <span>{t('portfolio.view_all')}</span>
                        <ArrowRight className="ml-3 w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                    </div>
                </div>

                {/* Accent Line */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </Link>
        </motion.div>
    );
}
