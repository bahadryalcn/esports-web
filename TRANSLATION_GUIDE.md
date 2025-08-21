# Next-Translate Localization Sistemi

Bu proje artık **next-translate** kullanarak daha stabil ve güvenilir bir localization sistemi kullanıyor.

## 🚀 Özellikler

- ✅ **Stabil Çalışma**: Next.js 15 ile uyumlu
- ✅ **TypeScript Desteği**: Tam tip güvenliği
- ✅ **Performanslı**: Otomatik kod bölme
- ✅ **SEO Dostu**: URL tabanlı dil değişimi
- ✅ **Kolay Kullanım**: Basit hook API'si

## 📁 Dosya Yapısı

```
locales/
├── en/                    # İngilizce çeviriler
│   ├── common.json       # Genel çeviriler
│   ├── homepage.json     # Ana sayfa çevirileri
│   ├── about.json        # Hakkımızda çevirileri
│   ├── news.json         # Haberler çevirileri
│   ├── players.json      # Oyuncular çevirileri
│   ├── matches.json      # Maçlar çevirileri
│   ├── contact.json      # İletişim çevirileri
│   └── services.json     # Hizmetler çevirileri
└── tr/                    # Türkçe çeviriler
    ├── common.json
    ├── homepage.json
    ├── about.json
    ├── news.json
    ├── players.json
    ├── matches.json
    ├── contact.json
    └── services.json
```

## ⚙️ Konfigürasyon

### i18n.js

```javascript
module.exports = {
  locales: ['en', 'tr'],
  defaultLocale: 'tr',
  localeDetection: true,
  pages: {
    '*': ['common'],
    '/': ['homepage'],
    '/about': ['about'],
    '/news': ['news'],
    // ... diğer sayfalar
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./locales/${lang}/${ns}.json`).then((m) => m.default),
};
```

### next.config.ts

```typescript
import nextTranslate from 'next-translate-plugin';

const nextConfig = {
  // ... diğer ayarlar
};

export default nextTranslate(nextConfig);
```

## 🎯 Kullanım

### 1. Hook Kullanımı

```typescript
import { useAppTranslation } from '@/lib/hooks/useTranslation';

export const MyComponent = () => {
  const { t, lang, isEnglish, isTurkish } = useAppTranslation();

  return (
    <div>
      <h1>{t('homepage:hero.title')}</h1>
      <p>{t('homepage:hero.subtitle')}</p>
      <button>{t('homepage:hero.learnMore')}</button>
    </div>
  );
};
```

### 2. Sayfa Props Güncelleme

**Eski (Hatalı):**

```typescript
interface PageProps {
  params: { locale: string };
}

export default async function Page({ params }: PageProps) {
  const data = await getData(params.locale); // ❌ Hata!
}
```

**Yeni (Doğru):**

```typescript
interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params; // ✅ Doğru!
  const data = await getData(locale);
}
```

### 3. Metadata Fonksiyonları

```typescript
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'tr' ? 'Başlık' : 'Title',
    description: locale === 'tr' ? 'Açıklama' : 'Description',
  };
}
```

## 📝 Çeviri Dosyaları

### JSON Yapısı

```json
{
  "hero": {
    "title": "Oyun Dünyasının Liderleri",
    "subtitle": "Profesyonel e-spor takımı ve oyun ajansı olarak...",
    "learnMore": "Daha Fazla",
    "contact": "İletişime Geç"
  },
  "stats": {
    "championships": "Şampiyonluk",
    "players": "Profesyonel Oyuncu",
    "projects": "Başarılı Proje"
  }
}
```

### Nested Objeler

```json
{
  "form": {
    "name": "Adınız",
    "email": "E-posta Adresiniz",
    "send": "Mesaj Gönder"
  },
  "info": {
    "title": "İletişim Bilgileri",
    "address": "Adres"
  }
}
```

## 🔧 Yeni Çeviri Ekleme

### 1. JSON Dosyasına Ekle

```json
// locales/tr/newpage.json
{
  "title": "Yeni Sayfa",
  "description": "Yeni sayfa açıklaması",
  "button": "Tıkla"
}
```

### 2. i18n.js'e Ekle

```javascript
pages: {
  '*': ['common'],
  '/': ['homepage'],
  '/newpage': ['newpage'], // ✅ Yeni sayfa
}
```

### 3. Component'te Kullan

```typescript
const { t } = useAppTranslation();

return (
  <div>
    <h1>{t('newpage:title')}</h1>
    <p>{t('newpage:description')}</p>
    <button>{t('newpage:button')}</button>
  </div>
);
```

## 🧪 Test

Test sayfası: `http://localhost:3000/tr/test-translation` veya `http://localhost:3000/en/test-translation`

## 🚨 Önemli Notlar

1. **Params Await**: Tüm sayfalarda `params` artık `Promise` olduğu için `await` kullanılmalı
2. **Hook Kullanımı**: Client component'lerde `useAppTranslation` hook'u kullanın
3. **Namespace**: Çeviri anahtarlarında `namespace:key` formatını kullanın
4. **Fallback**: Çeviri bulunamazsa anahtar döner

## 🔄 Dil Değiştirme

URL tabanlı dil değişimi:

- Türkçe: `/tr/...`
- İngilizce: `/en/...`

## 📚 Faydalı Linkler

- [Next-Translate Dokümantasyonu](https://github.com/aralroca/next-translate)
- [Next.js 15 App Router](https://nextjs.org/docs/app)
- [TypeScript](https://www.typescriptlang.org/)

## 🎉 Başarı!

Artık stabil ve güvenilir bir localization sisteminiz var! 🚀
