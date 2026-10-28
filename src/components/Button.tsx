import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'outline' | 'text';
    children: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
}

export default function Button({
    variant = 'primary',
    children,
    className = '',
    icon,
    ...props
}: ButtonProps) {

    const baseStyles = "relative inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 overflow-hidden";

    const variants = {
        primary: "bg-brand-red text-black px-8 py-4 hover:shadow-[0_0_20px_rgba(237,28,36,0.4)] hover:bg-white",
        outline: "border border-brand-red text-white px-8 py-4 hover:bg-brand-red/10",
        text: "text-white hover:text-brand-red px-4 py-2"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            <span className="relative z-10 flex items-center space-x-2">
                <span>{children}</span>
                {icon && <span>{icon}</span>}
            </span>
        </motion.button>
    );
}
