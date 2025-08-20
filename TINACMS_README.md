# TinaCMS Kullanım Kılavuzu

## ✅ Kurulum Tamamlandı!

TinaCMS başarıyla kuruldu ve çalışıyor. Admin paneline erişim için:
- **URL:** `http://localhost:3000/admin/index.html`
- **Alternatif:** `http://localhost:3000/admin`

## 🚀 Hızlı Başlangıç

### 1. Geliştirme Sunucusunu Başlatma
```bash
npm run dev
```

### 2. Admin Paneline Erişim
Tarayıcınızda `http://localhost:3000/admin/index.html` adresine gidin.

### 3. Ana Sayfa Yönetimi
Ana sayfa içeriğini yönetmek için:
- **Yol:** `/admin/index.html` → Ana Sayfa
- **Dosya:** `content/homepage/index.json`

## 📋 İçerik Yönetimi

### Ana Sayfa (Homepage) ⭐ YENİ!
- **Yol:** `/admin/index.html` → Ana Sayfa
- **Dosya Konumu:** `content/homepage/index.json`
- **Alanlar:**
  - **Hero Bölümü:** Ana başlık, alt başlık, açıklama, arka plan görseli, CTA buton
  - **Hakkımızda Bölümü:** Başlık, içerik (rich-text), görsel
  - **Hizmetler Bölümü:** Başlık, alt başlık, hizmet öğeleri (JSON formatında)
  - **Haberler Bölümü:** Başlık, alt başlık, maksimum haber sayısı
  - **Oyuncular Bölümü:** Başlık, alt başlık, maksimum oyuncu sayısı
  - **Sponsorlar Bölümü:** Başlık, sponsor öğeleri (JSON formatında)

### Haberler (News)
- **Yol:** `/admin/index.html` → Haberler
- **Dosya Konumu:** `content/news/`
- **Alanlar:**
  - Başlık (zorunlu)
  - Açıklama (zorunlu)
  - Görsel
  - Kategori (Genel, Turnuva, Oyuncu, Takım, Teknoloji)
  - Yayın Tarihi (zorunlu)
  - İçerik (rich-text)
  - Öne Çıkan (ana sayfada gösterilsin mi?)

### Oyuncular (Players)
- **Yol:** `/admin/index.html` → Oyuncular
- **Dosya Konumu:** `content/players/`
- **Alanlar:**
  - Ad Soyad (zorunlu)
  - Takma Ad (zorunlu)
  - Fotoğraf
  - Pozisyon (IGL, Entry Fragger, Support, AWP, Rifler)
  - Takım
  - Yaş
  - Ülke
  - Biyografi (rich-text)
  - İstatistikler (kills, deaths, assists, kd_ratio)
  - Başarılar (rich-text - her başarıyı yeni satırda yazın)

### Maçlar (Matches)
- **Yol:** `/admin/index.html` → Maçlar
- **Dosya Konumu:** `content/matches/`
- **Alanlar:**
  - Başlık (zorunlu)
  - Turnuva
  - Maç Tarihi (zorunlu)
  - Takım 1 (zorunlu)
  - Takım 2 (zorunlu)
  - Skor 1
  - Skor 2
  - Durum (Yaklaşan, Canlı, Tamamlandı, İptal)
  - Oyun (CS2, Valorant, League of Legends, Dota 2, PUBG)
  - Açıklama (rich-text)

### Hizmetler (Services)
- **Yol:** `/admin/index.html` → Hizmetler
- **Dosya Konumu:** `content/services/`
- **Alanlar:**
  - Başlık (zorunlu)
  - Kısa Açıklama (zorunlu)
  - İkon
  - Detaylı İçerik (rich-text)
  - Özellikler (rich-text - her özelliği yeni satırda yazın)
  - Kategori (Oyuncu Yönetimi, Turnuva Organizasyonu, Sponsorluk, İçerik Üretimi, Eğitim)

### Site Ayarları (Settings)
- **Yol:** `/admin/index.html` → Site Ayarları
- **Dosya Konumu:** `content/settings/general.json`
- **Alanlar:**
  - Site Adı (zorunlu)
  - Site Açıklaması
  - Logo
  - Favicon
  - Ana Renk
  - İkincil Renk
  - İletişim Bilgileri (e-posta, telefon, adres)
  - Sosyal Medya (Twitter, Instagram, YouTube, Twitch)

### Sayfalar (Pages)
- **Yol:** `/admin/index.html` → Sayfalar
- **Dosya Konumu:** `content/pages/`
- **Alanlar:**
  - Sayfa Başlığı (zorunlu)
  - URL Slug (zorunlu)
  - SEO Başlığı
  - SEO Açıklaması
  - SEO Görseli
  - Sayfa İçeriği (rich-text)
  - Yayınlandı (sayfa yayınlansın mı?)

## ⚠️ Önemli Notlar

### 1. Windows Özel Notları
- Environment variable'lar için `set` komutu kullanılır
- Cross-env paketi yüklü (gerekirse)
- Git Bash kullanılıyorsa Unix komutları çalışır

### 2. Dosya Formatları
- **Markdown (.md):** Haberler, Oyuncular, Maçlar, Hizmetler, Sayfalar
- **JSON (.json):** Site Ayarları, Ana Sayfa

### 3. Görsel Yükleme
- Görseller `public/uploads/` klasörüne kaydedilir
- Önerilen boyutlar:
  - Haber görselleri: 1200x630px
  - Oyuncu fotoğrafları: 400x400px
  - Logo: 200x80px
  - Hero arka plan: 1920x1080px

### 4. Rich Text Editörü
- TinaCMS'in zengin metin editörü kullanılır
- Markdown formatında kaydedilir
- Görsel, video ve bağlantı eklenebilir

### 5. Liste Alanları
- `achievements` ve `features` alanları artık rich-text
- Her maddeyi yeni satırda yazın
- Markdown listesi formatında: `- Madde 1`

### 6. Ana Sayfa JSON Formatı ⭐
Ana sayfa için JSON formatında veri girişi:
```json
{
  "hero": {
    "title": "AIM AGENCY",
    "subtitle": "Profesyonel E-Spor Ajansı",
    "description": "Açıklama metni",
    "backgroundImage": "/uploads/hero/bg.jpg",
    "ctaText": "Buton Metni",
    "ctaLink": "/services"
  },
  "services": {
    "serviceItems": "[{\"title\":\"Hizmet 1\",\"description\":\"Açıklama\",\"icon\":\"/path/to/icon.svg\",\"link\":\"/services/1\"}]"
  }
}
```

## 🔧 Geliştirme İpuçları

### 1. Yerel Geliştirme
```bash
# TinaCMS ile birlikte Next.js'i başlat
npm run dev

# Sadece TinaCMS'i başlat
npx tinacms dev
```

### 2. Build İşlemi
```bash
# Production build
npm run build

# Sadece TinaCMS build
npx tinacms build
```

### 3. Environment Variables
`.env.local` dosyasına ekleyin (opsiyonel):
```
NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id
TINA_TOKEN=your_token
```

## 🐛 Sorun Giderme

### 1. TinaCMS Başlamıyor
- Node.js 18+ kullandığınızdan emin olun
- `npm install` komutunu çalıştırın
- Port 4001'in boş olduğundan emin olun

### 2. İçerik Güncellenmiyor
- Tarayıcı önbelleğini temizleyin
- Sayfayı yenileyin (Ctrl+F5)
- TinaCMS'i yeniden başlatın

### 3. Görsel Yüklenmiyor
- `public/uploads/` klasörünün yazma izni olduğundan emin olun
- Dosya boyutunun 10MB'dan küçük olduğundan emin olun
- Desteklenen formatlar: JPG, PNG, GIF, WebP

### 4. Windows Özel Sorunları
- Environment variable hatası: `set` komutu kullanın
- Path sorunları: Git Bash kullanın
- Port çakışması: Farklı port deneyin

### 5. Ana Sayfa JSON Hataları
- JSON formatını kontrol edin
- Tırnak işaretlerini doğru kullanın
- Escape karakterlerini unutmayın

## 📁 Proje Yapısı

```
esport-web/
├── tina/
│   └── config.js              # TinaCMS konfigürasyonu
├── content/
│   ├── homepage/              # Ana sayfa (YENİ!)
│   │   └── index.json
│   ├── news/                  # Haberler
│   ├── players/               # Oyuncular
│   ├── matches/               # Maçlar
│   ├── services/              # Hizmetler
│   ├── settings/              # Site ayarları
│   └── pages/                 # Dinamik sayfalar
├── src/
│   ├── app/
│   │   ├── page.js            # Ana sayfa (TinaCMS entegrasyonu)
│   │   └── admin/             # Admin sayfası
│   └── lib/
│       ├── hooks/             # TinaCMS hook'ları
│       └── tina-client.js     # TinaCMS client
└── public/
    └── uploads/               # Yüklenen dosyalar
```

## 🎯 Özellikler

- ✅ **Türkçe Arayüz**: Tam Türkçe admin paneli
- ✅ **Rich Text Editörü**: Zengin içerik oluşturma
- ✅ **Görsel Yönetimi**: Otomatik görsel optimizasyonu
- ✅ **SEO Kontrolü**: Her sayfa için SEO ayarları
- ✅ **Kategori Sistemi**: Organize içerik yönetimi
- ✅ **Dinamik Sayfalar**: Admin panelinden sayfa oluşturma
- ✅ **Site Ayarları**: Logo, renkler, iletişim bilgileri
- ✅ **Ana Sayfa Yönetimi**: Tüm bileşenleri düzenleyebilme (YENİ!)

## 🚀 Sonraki Adımlar

1. **Ana Sayfa Düzenleme**: Admin panelinden ana sayfa bileşenlerini düzenleyin
2. **İçerik Ekleme**: Haberler, oyuncular, maçlar ekleyin
3. **Görsel Yükleme**: Logo ve görselleri yükleyin
4. **Site Ayarları**: Renkleri ve iletişim bilgilerini güncelleyin
5. **Sayfa Oluşturma**: Dinamik sayfalar oluşturun

## 📞 Destek

Sorunlarınız için:
- TinaCMS Dokümantasyonu: https://tina.io/docs
- GitHub Issues: Proje repository'sinde issue açın
- E-posta: info@aimagency.com

---

**🎉 TinaCMS başarıyla kuruldu ve ana sayfa yönetimi aktif!** 