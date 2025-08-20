# AIM Agency - E-Sports Website

Modern ve özelleştirilebilir e-spor takımı web sitesi. Kapsamlı admin paneli ile site içeriğinin tamamını yönetebilirsiniz.

## 🚀 Özellikler

- **Tamamen Yönetilebilir**: Admin panelinden her şeyi düzenleyin
- **Dinamik Bileşenler**: Sayfa bileşenlerini CMS ile ekleyin/çıkarın
- **SEO Yönetimi**: Sayfa başına tam SEO kontrolü
- **Site Ayarları**: Global ayarlar (favicon, logolar, renkler, vb.)
- **İçerik Esnekliği**: Dinamik anasayfa ve sayfa oluşturucuları
- **Gerçek Zamanlı Güncellemeler**: Canlı önizleme ve anında güncellemeler
- **Çoklu Dil**: Türkçe/İngilizce desteği

## 🛠 Teknoloji Yığını

### Core Framework
- **Next.js 15.4.5** with App Router
- **React 19.1.1** with latest features
- **JavaScript** (TypeScript kullanılmıyor)

### UI & Styling
- **ShadCN UI** components
- **TweakCN Gaming Theme**
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

### CMS & Content Management
- **Decap CMS** as primary CMS
- **Custom Admin Panel** for advanced controls
- **React DnD** for drag-and-drop components

### State Management
- **TanStack Query (React Query) v5** for data fetching
- **Zustand** for global state management
- **SWR** for real-time features

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js 18+
- pnpm (önerilen) veya npm

### Kurulum

1. **Bağımlılıkları yükleyin:**
```bash
pnpm install
# veya
npm install
```

2. **Development server'ı başlatın:**
```bash
pnpm dev
# veya
npm run dev
```

3. **Tarayıcınızda açın:**
```
http://localhost:3000
```

4. **Admin paneline erişin:**
```
http://localhost:3000/admin
```

### ShadCN UI Gaming Theme Kurulumu

Gaming temasını yüklemek için:
```bash
pnpm dlx shadcn@latest add https://tweakcn.com/r/themes/cmdq4fy4m000204l2eip2hfov
```

## 📁 Proje Yapısı

```
esport-web/
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/             # React bileşenleri
│   │   ├── ui/                 # ShadCN bileşenleri
│   │   ├── layout/             # Layout bileşenleri
│   │   ├── sections/           # Sayfa bölümleri
│   │   └── admin/              # Admin paneli bileşenleri
│   ├── lib/                    # Utility fonksiyonları
│   └── styles/                 # CSS dosyaları
├── content/                    # CMS içeriği
├── public/                     # Statik dosyalar
│   ├── admin/                  # Decap CMS admin
│   ├── locales/                # Çeviri dosyaları
│   └── uploads/                # Kullanıcı yüklemeleri
└── ...config files
```

## 🎨 Customization

### Renk Teması
`tailwind.config.js` dosyasında gaming renklerini özelleştirebilirsiniz:

```javascript
gaming: {
  primary: '#00ff88',    // Ana renk
  secondary: '#ff0066',  // İkincil renk
  accent: '#9333ea',     // Vurgu rengi
  dark: '#0a0a0a',       // Koyu arka plan
  darker: '#050505',     // Daha koyu arka plan
}
```

### Content Management
- **Decap CMS**: `/admin` - Temel içerik yönetimi
- **Custom Admin**: `/admin/dashboard` - Gelişmiş yönetim paneli
- **Page Builder**: Sürükle-bırak sayfa oluşturucu

## 🌐 Deployment

### Vercel (Önerilen)
1. GitHub'a push edin
2. Vercel'e bağlayın
3. Otomatik deploy

### Netlify
1. GitHub'a push edin
2. Netlify'a bağlayın
3. Build komutları:
   - Build: `pnpm build`
   - Publish: `out`

## 📖 Documentation

Detaylı dokümantasyon için `.cursor/rules/project-setup.mdc` dosyasına bakın.

## 🤝 Contributing

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

## 📝 License

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- Email: info@aimagency.com
- Website: [aimagency.com](https://aimagency.com)
- GitHub: [github.com/aimagency](https://github.com/aimagency)

---

**Made with ♥ for gamers by AIM Agency**