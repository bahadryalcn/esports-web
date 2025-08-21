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
  contentAlignment = 'left'
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
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
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="backdrop-blur-sm bg-black/20 border border-gaming-primary/20 rounded-3xl p-8 md:p-10 hover:border-gaming-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-gaming-primary/10"
    >
      {/* Form Header - Minimalist */}
      <motion.div variants={itemVariants} className="mb-8 space-y-3">
        <h3 className="text-3xl md:text-4xl font-gaming font-bold text-white">
          {title}
        </h3>
        {subtitle && (
          <p className="text-gray-400 leading-relaxed text-lg max-w-md">
            {subtitle}
          </p>
        )}
      </motion.div>

      {/* Form */}
      <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="name" className="text-gray-300 text-sm">İsim</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Adınız Soyadınız"
              className="bg-gaming-darker/50 border-gaming-primary/30 text-white placeholder:text-gray-500 focus:border-gaming-primary focus:bg-gaming-darker/70 transition-all duration-300 py-3 px-4 rounded-xl"
              required
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="email" className="text-gray-300 text-sm">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className="bg-gaming-darker/50 border-gaming-primary/30 text-white placeholder:text-gray-500 focus:border-gaming-primary focus:bg-gaming-darker/70 transition-all duration-300 py-3 px-4 rounded-xl"
              required
            />
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="subject" className="text-gray-300 text-sm">Konu</Label>
          <Input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Mesaj konusu"
            className="bg-gaming-darker/50 border-gaming-primary/30 text-white placeholder:text-gray-500 focus:border-gaming-primary focus:bg-gaming-darker/70 transition-all duration-300 py-3 px-4 rounded-xl"
            required
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="message" className="text-gray-300 text-sm">Mesaj</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="Mesajınızı buraya yazın..."
            className="bg-gaming-darker/50 border-gaming-primary/30 text-white placeholder:text-gray-500 focus:border-gaming-primary focus:bg-gaming-darker/70 transition-all duration-300 py-4 px-4 rounded-xl resize-none min-h-[120px]"
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full group bg-gaming-primary hover:bg-gaming-primary/80 text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-gaming-primary/30 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
          >
            <span className="text-lg">{isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}</span>
            <Send className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}
