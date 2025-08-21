'use client';

import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { ContactFormProps, ContactFormData } from '../types';

export function ContactForm({
  title = 'Mesaj Gönder',
  subtitle = 'Proje detaylarınızı bizimle paylaşın',
  onSubmit,
  contentAlignment = 'left',
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default behavior
        console.log('Form submitted:', formData);
      }

      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      className="border-gaming-primary/20 hover:border-gaming-primary/40 hover:shadow-gaming-primary/10 rounded-3xl border bg-black/20 p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-xl md:p-10"
    >
      {/* Form Header - Minimalist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        className="mb-8 space-y-3"
      >
        <h3 className="font-gaming text-3xl font-bold text-white md:text-4xl">
          {title}
        </h3>
        {subtitle && (
          <p className="max-w-md text-lg leading-relaxed text-gray-400">
            {subtitle}
          </p>
        )}
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            className="space-y-2"
          >
            <Label htmlFor="name" className="text-sm text-gray-300">
              İsim
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Adınız Soyadınız"
              className="border-gaming-primary/30 focus:border-gaming-primary rounded-xl bg-gaming-darker/50 px-4 py-3 text-white transition-all duration-300 placeholder:text-gray-500 focus:bg-gaming-darker/70"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
            className="space-y-2"
          >
            <Label htmlFor="email" className="text-sm text-gray-300">
              E-mail
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className="border-gaming-primary/30 focus:border-gaming-primary rounded-xl bg-gaming-darker/50 px-4 py-3 text-white transition-all duration-300 placeholder:text-gray-500 focus:bg-gaming-darker/70"
              required
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
          className="space-y-2"
        >
          <Label htmlFor="subject" className="text-sm text-gray-300">
            Konu
          </Label>
          <Input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Mesaj konusu"
            className="border-gaming-primary/30 focus:border-gaming-primary rounded-xl bg-gaming-darker/50 px-4 py-3 text-white transition-all duration-300 placeholder:text-gray-500 focus:bg-gaming-darker/70"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
          className="space-y-2"
        >
          <Label htmlFor="message" className="text-sm text-gray-300">
            Mesaj
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="Mesajınızı buraya yazın..."
            className="border-gaming-primary/30 focus:border-gaming-primary min-h-[120px] resize-none rounded-xl bg-gaming-darker/50 px-4 py-4 text-white transition-all duration-300 placeholder:text-gray-500 focus:bg-gaming-darker/70"
            required
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: 'easeOut' }}
          className="pt-4"
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="from-gaming-primary hover:from-gaming-primary/90 hover:shadow-gaming-primary/25 w-full transform rounded-xl bg-gradient-to-r to-red-600 px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:to-red-600/90 hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                <span>Gönderiliyor...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Send className="h-5 w-5" />
                <span>Mesaj Gönder</span>
              </div>
            )}
          </Button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}
