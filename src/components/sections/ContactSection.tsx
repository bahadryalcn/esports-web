'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { ContactFormData } from '@/types';

interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
}

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  showForm?: boolean;
}

export default function ContactSection({
  title = 'İletişim',
  subtitle = 'Bizimle iletişime geçin',
  showForm = true
}: ContactSectionProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactInfo: ContactInfo[] = [
    {
      icon: Mail,
      label: 'E-mail',
      value: 'info@aimagency.com',
      href: 'mailto:info@aimagency.com'
    },
    {
      icon: Phone,
      label: 'Telefon',
      value: '+90 555 123 45 67',
      href: 'tel:+905551234567'
    },
    {
      icon: MapPin,
      label: 'Adres',
      value: 'İstanbul, Türkiye',
      href: '#'
    }
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Form submission logic will be implemented
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="section-padding bg-gaming-dark/50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-gaming font-bold mb-6">
            <span className="neon-text">{title}</span>
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">İsim</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Adınız Soyadınız"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Konu</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Mesaj konusu"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mesaj</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Mesajınızı buraya yazın..."
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full md:w-auto group bg-gaming-primary hover:bg-gaming-primary/80 text-white"
              >
                <span>Mesaj Gönder</span>
                <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                İletişim Bilgileri
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Profesyonel e-spor hizmetleri için bizimle iletişime geçin. 
                Deneyimli ekibimiz sizlere en iyi hizmeti sunmak için burada.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info: ContactInfo, index: number) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="p-3 bg-gaming-primary/20 rounded-lg">
                      <Icon className="w-6 h-6 text-gaming-primary" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{info.label}</p>
                      {info.href !== '#' ? (
                        <a
                          href={info.href}
                          className="text-white hover:text-gaming-primary transition-colors duration-300"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white">{info.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map placeholder */}
            <div className="gaming-card p-6">
              <h4 className="text-lg font-bold text-white mb-4">Konumumuz</h4>
              <div className="h-48 bg-gaming-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-gaming-primary/50 text-6xl">🗺️</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}