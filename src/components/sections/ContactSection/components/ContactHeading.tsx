'use client';

import { motion } from 'framer-motion';

interface ContactHeadingProps {
  title: string;
  subtitle?: string;
}

export function ContactHeading({ title, subtitle }: ContactHeadingProps) {
  return (
    <div className="space-y-6 text-center lg:space-y-8">
      {/* Main Headline */}
      <motion.h2
        className="relative"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        {/* Background Text Effect - daha hafif */}
        <div className="pointer-events-none absolute inset-0 scale-110 transform select-none text-4xl font-black text-red-500/10 md:text-6xl lg:text-7xl">
          {title}
        </div>

        {/* Main Text */}
        <div className="relative z-10 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          <motion.span
            className="inline-block bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          >
            {title}
          </motion.span>
        </div>

        {/* Glow Effect - daha hafif */}
        <div className="absolute inset-0 animate-pulse text-3xl font-black text-red-500 opacity-10 blur-xl sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </div>
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.div
          className="relative mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
        >
          <p className="gaming-text-shadow px-4 text-lg font-medium leading-relaxed text-gray-200 md:text-xl lg:text-2xl">
            <motion.span
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              {subtitle}
            </motion.span>
          </p>

          {/* Subtitle Accent Line */}
          <motion.div
            className="mx-auto mt-4 h-1 rounded-full bg-gradient-to-r from-transparent via-red-500 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '100px', opacity: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </div>
  );
}
