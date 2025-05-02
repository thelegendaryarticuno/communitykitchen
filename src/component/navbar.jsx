// Navbar.jsx
import { motion } from 'framer-motion';
import logo from '../images/logo.png';

function Navbar() {
    return (
        <header className="backdrop-blur-lg bg-[#FFFFFF]/10 py-4 px-6 flex items-center justify-between border-b border-[#FFFFFF]/20 h-24 flex-shrink-0">
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="h-35 w-auto object-contain mt-6" />
            </div>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#34755A]/30 backdrop-blur-lg rounded-full p-2 border border-[#FFFFFF]/20 hover:bg-[#34755A]/40 transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FFFFFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </motion.button>
        </header>
    );
}

export default Navbar;
