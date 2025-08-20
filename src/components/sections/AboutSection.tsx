'use client';

import { motion } from 'framer-motion';
import { Target, Award, Zap, Users } from 'lucide-react';

interface Value {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface AboutSectionProps {
  title?: string;
  content?: string;
  image?: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

export default function AboutSection({
  title = 'Hakkımızda',
  content = 'AIM Agency olarak, e-spor dünyasında profesyonel hizmetler sunan bir ajansız. Oyuncularımızın ve takımlarımızın başarısı için sürekli çalışıyor, onların kariyerlerinde fark yaratacak çözümler sunuyoruz.',
  image,
  stats
}: AboutSectionProps) {
  const values: Value[] = [
    {
      icon: Target,
      title: 'Mükemmellik',
      description: 'Her projede en yüksek kalite standartlarını hedefliyoruz.'
    },
    {
      icon: Award,
      title: 'Başarı',
      description: 'Oyuncularımızın ve takımlarımızın başarısı bizim başarımızdır.'
    },
    {
      icon: Zap,
      title: 'İnovasyon',
      description: 'Sürekli gelişim ve yenilikçi yaklaşımlarla sektörde öncüyüz.'
    },
    {
      icon: Users,
      title: 'Takım Çalışması',
      description: 'Güçlü ekip ruhu ile birlikte daha büyük başarılar elde ediyoruz.'
    }
  ];

  return (
    <section className="section-padding bg-gaming-darker">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-gaming font-bold mb-6">
                <span className="text-gaming-primary">{title}</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                {content}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-400">
                2020 yılında kurulan ajansımız, kısa sürede e-spor dünyasında 
                saygın bir konum elde etti. Şampiyonluk seviyesindeki performansımız 
                ve müşteri memnuniyetine odaklı yaklaşımımızla sektörde öncü olmaya 
                devam ediyoruz.
              </p>
              <p className="text-gray-400">
                Vizyonumuz, Türkiye'nin en büyük gaming ajansı olmak ve 
                uluslararası arenada ülkemizi başarıyla temsil etmektir.
              </p>
            </div>
          </motion.div>

          {/* Values Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {values.map((value: Value, index: number) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="gaming-card p-6 text-center hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gaming-primary/20 rounded-full">
                      <Icon className="w-6 h-6 text-gaming-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}