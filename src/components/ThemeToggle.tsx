import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-full bg-white/5 border border-white/10 hover:border-brand-gold/50 transition-all duration-300 group"
            aria-label="Toggle Theme"
        >
            <div className="relative w-6 h-6">
                <Sun
                    className={`absolute inset-0 w-6 h-6 text-brand-gold transition-all duration-500 transform ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
                        }`}
                />
                <Moon
                    className={`absolute inset-0 w-6 h-6 text-brand-gold transition-all duration-500 transform ${theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'
                        }`}
                />
            </div>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-full bg-brand-gold/0 group-hover:bg-brand-gold/5 blur-md transition-colors duration-300" />
        </button>
    );
};

export default ThemeToggle;
