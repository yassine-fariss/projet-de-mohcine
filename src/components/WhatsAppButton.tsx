import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
    // Replace with the actual phone number
    const phoneNumber = "212625254219"; // Main contact number
    const message = "Bonjour Revo Productions, je souhaite avoir plus d'informations sur vos services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-2 pl-4 pr-5 py-3 md:py-4 bg-[#25D366] text-white rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] transition-all duration-300 group"
            aria-label="Contact us on WhatsApp"
        >
            <div className="relative">
                <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
                {/* Pulsing effect on icon */}
                <span className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping pointer-events-none" />
            </div>

            <span className="font-medium text-sm md:text-base tracking-wide whitespace-nowrap">
                Contact Us
            </span>

            {/* Tooltip */}
            <span className="absolute right-full mr-4 px-4 py-2 bg-white text-black text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
                Contactez-nous sur WhatsApp
            </span>

            {/* Pulsing effect */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
        </motion.a>
    );
}
