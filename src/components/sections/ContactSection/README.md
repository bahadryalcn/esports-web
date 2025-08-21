# ContactSection with Social Media Icons

Bu bileşen artık hem Lucide ikonları hem de sosyal medya SVG ikonları desteklemektedir.

## Kullanım

### Sosyal Medya İkonları

Contact Information eklerken `icon` alanına aşağıdaki değerler verilebilir:

```typescript
// Sosyal medya ikonları
const socialMediaContactInfo = [
  {
    icon: 'youtube',
    label: 'YouTube',
    value: 'AIM Agency Gaming',
    href: 'https://youtube.com/@aimagency'
  },
  {
    icon: 'twitch',
    label: 'Twitch',
    value: 'aimagency',
    href: 'https://twitch.tv/aimagency'
  },
  {
    icon: 'twitter', // veya 'x'
    label: 'Twitter/X',
    value: '@aimagency',
    href: 'https://twitter.com/aimagency'
  },
  {
    icon: 'instagram',
    label: 'Instagram',
    value: '@aimagency',
    href: 'https://instagram.com/aimagency'
  },
  {
    icon: 'tiktok',
    label: 'TikTok',
    value: '@aimagency',
    href: 'https://tiktok.com/@aimagency'
  },
  {
    icon: 'discord',
    label: 'Discord',
    value: 'AIM Agency',
    href: 'https://discord.gg/aimagency'
  },
  {
    icon: 'kick',
    label: 'Kick',
    value: 'aimagency',
    href: 'https://kick.com/aimagency'
  },
  {
    icon: 'linkedin',
    label: 'LinkedIn',
    value: 'AIM Agency',
    href: 'https://linkedin.com/company/aimagency'
  },
  {
    icon: 'facebook',
    label: 'Facebook',
    value: 'AIM Agency',
    href: 'https://facebook.com/aimagency'
  }
];
```

### Geleneksel İkonlar

Lucide ikonları da kullanılmaya devam edilebilir:

```typescript
import { Mail, Phone, MapPin } from 'lucide-react';

const traditionalContactInfo = [
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
```

### Karışık Kullanım

Her iki tür ikonu birlikte kullanabilirsiniz:

```typescript
const mixedContactInfo = [
  {
    icon: Mail,
    label: 'E-mail',
    value: 'info@aimagency.com',
    href: 'mailto:info@aimagency.com'
  },
  {
    icon: 'youtube',
    label: 'YouTube',
    value: 'AIM Agency Gaming',
    href: 'https://youtube.com/@aimagency'
  },
  {
    icon: 'linkedin',
    label: 'LinkedIn',
    value: 'AIM Agency',
    href: 'https://linkedin.com/company/aimagency'
  }
];
```

## Layout Özellikleri

- **Responsive Grid**: Mobilde tek sütun, büyük ekranlarda 2 sütun
- **Kompakt Tasarım**: Daha küçük ikonlar ve metin boyutları
- **Otomatik Hizalama**: İçerik otomatik olarak grid'e yerleştirilir

## Özellikler

- **Otomatik Renk**: Her sosyal medya platformu için özel renkler
- **Hover Efektleri**: Platforma özel hover renkleri
- **SVG Filtreleri**: Footer'daki aynı güzel görünüm
- **Responsive**: Tüm ekran boyutlarında uyumlu
- **TypeScript**: Tam tip güvenliği
- **Grid Layout**: 2 sütunlu düzen büyük ekranlarda

## Desteklenen Platformlar

- YouTube (kırmızı)
- Twitch (mor)
- Twitter/X (mavi)
- Instagram (pembe)
- TikTok (siyah)
- Discord (indigo)
- Kick (yeşil)
- LinkedIn (mavi)
- Facebook (mavi)

## TinaCMS Entegrasyonu

TinaCMS'te icon alanına string olarak platform adını yazmanız yeterli:

```yaml
- label: "YouTube"
  value: "AIM Agency Gaming"
  href: "https://youtube.com/@aimagency"
  icon: "youtube"

- label: "LinkedIn"
  value: "AIM Agency"
  href: "https://linkedin.com/company/aimagency"
  icon: "linkedin"
```
