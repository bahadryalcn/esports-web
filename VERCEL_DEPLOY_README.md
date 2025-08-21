# 🚀 Vercel Deployment Guide - AIM Agency E-sports Website

## 📋 Ön Gereksinimler

### 1. Vercel Hesabı
- [Vercel](https://vercel.com) üzerinden ücretsiz hesap oluşturun
- GitHub hesabınızı bağlayın

### 2. TinaCMS Cloud Hesabı
- [TinaCMS Cloud](https://tina.io/cloud) üzerinden hesap oluşturun
- Proje oluşturun ve Client ID ile Token alın

## 🔧 Environment Variables

### Vercel Dashboard'da Environment Variables Ayarlayın:

```bash
# TinaCMS Configuration
NEXT_PUBLIC_TINA_CLIENT_ID=ebd6ca61-1ec0-4d06-8c35-6317b05f7c18
TINA_TOKEN=46e4f59463a446def1c19f6a72460429723f1ba7

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dtlbxu8ya
CLOUDINARY_API_KEY=671255211726649
CLOUDINARY_API_SECRET=IcBPNLBHiml3LPagPpWejhnp2c4

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://www.aim-agency.vercel.app
NODE_ENV=production

# TinaCMS Branch
GITHUB_BRANCH=master
VERCEL_GIT_COMMIT_REF=master
```

## 🚀 Deploy Adımları

### 1. GitHub'a Push
```bash
git add .
git commit -m "Vercel deployment preparation"
git push origin master
```

### 2. Vercel'e Import
1. Vercel Dashboard'a gidin
2. "New Project" tıklayın
3. GitHub repository'nizi seçin
4. Framework: Next.js seçin
5. Root Directory: `/` (varsayılan)
6. Build Command: `npm run build:vercel`
7. Output Directory: `.next`
8. Install Command: `npm install`

### 3. Environment Variables Ekleme
1. Project Settings > Environment Variables
2. Yukarıdaki tüm environment variables'ları ekleyin
3. Production, Preview ve Development için işaretleyin

### 4. Build & Deploy
1. "Deploy" butonuna tıklayın
2. Build sürecini bekleyin (5-10 dakika)
3. Deploy tamamlandığında URL alacaksınız

## ⚙️ Vercel Konfigürasyon

### Build Settings
- **Framework Preset**: Next.js
- **Build Command**: `npm run build:vercel`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node.js Version**: 18.x (otomatik)

### Function Settings
- **Max Duration**: 30 seconds (API routes için)

## 🔒 Güvenlik Ayarları

### Headers
- **X-Frame-Options**: SAMEORIGIN (admin panel için)
- **X-Content-Type-Options**: nosniff
- **Referrer-Policy**: origin-when-cross-origin

### Admin Panel Güvenliği
- `/admin` route'u için özel güvenlik ayarları
- TinaCMS admin paneli korunuyor

## 📱 Domain Ayarları

### Custom Domain
1. Vercel Dashboard > Domains
2. "Add Domain" tıklayın
3. `www.aim-agency.vercel.app` ekleyin
4. DNS ayarlarını yapın

### SSL Sertifikası
- Vercel otomatik olarak SSL sertifikası sağlar
- HTTPS zorunlu

## 🧪 Test Etme

### 1. Ana Site
- Ana sayfa yükleniyor mu?
- Responsive tasarım çalışıyor mu?
- Çoklu dil desteği aktif mi?

### 2. TinaCMS Admin Panel
- `/admin` route'u çalışıyor mu?
- Content editing aktif mi?
- Media upload çalışıyor mu?

### 3. API Routes
- `/api/news/resolve` çalışıyor mu?
- `/api/players/resolve` çalışıyor mu?
- `/api/settings` çalışıyor mu?

## 🚨 Sorun Giderme

### Build Hataları
```bash
# Local build test
npm run build:vercel

# TinaCMS build test
npx tinacms build

# Next.js build test
npm run build:next
```

### Environment Variables
- Tüm environment variables'ların doğru eklendiğinden emin olun
- Production, Preview ve Development için işaretlendiğinden emin olun

### TinaCMS Bağlantı Sorunları
- Client ID ve Token'ın doğru olduğundan emin olun
- Branch adının "master" olduğundan emin olun

## 📊 Performance Monitoring

### Vercel Analytics
- Page views
- Performance metrics
- Core Web Vitals
- Real-time monitoring

### TinaCMS Analytics
- Content editing activity
- User engagement
- Media usage

## 🔄 Continuous Deployment

### GitHub Integration
- Her push'ta otomatik deploy
- Preview deployments for PRs
- Branch-based deployments

### Environment Management
- Development: local development
- Preview: staging environment
- Production: live website

## 📞 Destek

### Vercel Support
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

### TinaCMS Support
- [TinaCMS Documentation](https://tina.io/docs)
- [TinaCMS Community](https://community.tina.io)

---

## ✅ Deployment Checklist

- [ ] Environment variables eklendi
- [ ] Build command ayarlandı
- [ ] Output directory belirlendi
- [ ] Domain ayarlandı
- [ ] SSL sertifikası aktif
- [ ] TinaCMS admin panel çalışıyor
- [ ] Ana site responsive
- [ ] API routes çalışıyor
- [ ] Çoklu dil desteği aktif
- [ ] Performance testleri geçildi

**🎉 Başarılı deployment sonrası siteniz https://www.aim-agency.vercel.app adresinde yayında olacak!**
