# Apple Tarzı Gelişmiş Parallax Efektleri - Kullanım Kılavuzu

Bu kılavuz, AIM Agency e-spor websitesinde uygulanan Apple tarzı gelişmiş parallax efektlerinin nasıl kullanılacağını açıklar.

## 🚀 Özellikler

### ✨ Gelişmiş Parallax Hook'ları
- **useAdvancedParallax**: Tek katmanlı, özelleştirilebilir parallax
- **useMultiLayerParallax**: Çok katmanlı parallax efektleri
- **useStickyParallax**: Yapışkan parallax (Apple tarzı)

### 🎨 Görsel Efektler
- **Çok Katmanlı Arka Plan**: Farklı hızlarda hareket eden elementler
- **Yumuşak Geçişler**: Easing fonksiyonları ile doğal hareket
- **Floating Elements**: Yüzen geometrik şekiller ve gradient orbs
- **Responsive Design**: Mobil cihazlarda optimize edilmiş

## 📁 Dosya Yapısı

```
src/
├── lib/hooks/
│   └── useAdvancedParallax.ts          # Ana parallax hook'ları
├── components/sections/
│   ├── HeroSection/                     # Hero parallax
│   ├── ServicesSection.tsx              # Services parallax
│   ├── AboutSection/                    # About parallax
│   ├── PlayersSection.tsx               # Players parallax
│   ├── NewsSection.tsx                  # News parallax
│   ├── ContactSection/                  # Contact parallax
│   └── SponsorsSection/                 # Sponsors parallax
└── app/globals.css                      # Parallax CSS optimizasyonları
```

## 🎯 Kullanım Örnekleri

### 1. Basit Parallax (useAdvancedParallax)

```tsx
import { useAdvancedParallax } from '@/lib/hooks/useAdvancedParallax';

function MyComponent() {
  const { ref, offset, progress, isVisible } = useAdvancedParallax({
    speed: 0.5,                    // Hareket hızı
    direction: 'up',               // Yön: 'up', 'down', 'left', 'right'
    easing: 'ease-out',           // Geçiş tipi
    threshold: 0.1,               // Tetikleme eşiği
    rootMargin: '0px',            // Root margin
    triggerOnce: false            // Tek seferlik tetikleme
  });

  return (
    <div 
      ref={ref}
      className="transform-gpu"
      style={{
        transform: `translate3d(0, ${offset.y}px, 0)`
      }}
    >
      {/* İçerik */}
    </div>
  );
}
```

### 2. Çok Katmanlı Parallax (useMultiLayerParallax)

```tsx
import { useMultiLayerParallax } from '@/lib/hooks/useAdvancedParallax';

function MyComponent() {
  const { ref, offsets } = useMultiLayerParallax([
    { speed: 0.3, direction: 'up' },     // Ana arka plan
    { speed: 0.6, direction: 'up' },     // Orta katman
    { speed: 0.1, direction: 'down' }    // Ön katman
  ]);

  return (
    <div ref={ref}>
      {/* Ana arka plan */}
      <div 
        className="transform-gpu"
        style={{
          transform: `translate3d(0, ${offsets[0]}px, 0)`
        }}
      >
        Arka plan resmi
      </div>

      {/* Orta katman */}
      <div 
        className="transform-gpu"
        style={{
          transform: `translate3d(0, ${offsets[1]}px, 0)`
        }}
      >
        Gradient orbs
      </div>

      {/* Ön katman */}
      <div 
        className="transform-gpu"
        style={{
          transform: `translate3d(0, ${offsets[2]}px, 0)`
        }}
      >
        Floating elements
      </div>
    </div>
  );
}
```

### 3. Yapışkan Parallax (useStickyParallax)

```tsx
import { useStickyParallax } from '@/lib/hooks/useAdvancedParallax';

function MyComponent() {
  const { ref, isSticky, progress } = useStickyParallax(100);

  return (
    <div ref={ref}>
      {isSticky && (
        <div 
          className="fixed top-0 left-0 w-full z-50"
          style={{
            transform: `translateY(${progress * 100}px)`
          }}
        >
          Yapışkan header
        </div>
      )}
    </div>
  );
}
```

## 🎨 CSS Sınıfları

### Performans Optimizasyonları
```css
.transform-gpu          /* Hardware acceleration */
.parallax-layer        /* Parallax katmanı */
.parallax-smooth       /* Yumuşak geçişler */
.parallax-container    /* Parallax container */
```

### Responsive Design
```css
.parallax-mobile-optimized    /* Mobil optimizasyon */
.parallax-reduced-motion      /* Azaltılmış hareket */
```

## ⚡ Performans İpuçları

### 1. Hardware Acceleration
```tsx
// Her zaman transform-gpu kullanın
<div className="transform-gpu">
  {/* İçerik */}
</div>
```

### 2. Will-change Optimizasyonu
```tsx
// Sadece gerekli olduğunda will-change kullanın
const { ref, offset } = useAdvancedParallax({
  threshold: 0.1,  // Görünür olduğunda tetikle
  triggerOnce: false
});
```

### 3. Debounced Scroll Events
```tsx
// Hook otomatik olarak optimize edilmiştir
// Passive event listeners kullanır
// RequestAnimationFrame ile senkronize eder
```

## 📱 Mobil Optimizasyon

### Otomatik Mobil Optimizasyon
```tsx
// Mobil cihazlarda parallax otomatik olarak devre dışı kalır
// CSS media query ile kontrol edilir
@media (max-width: 768px) {
  .parallax-mobile-optimized {
    transform: none !important;
    will-change: auto;
  }
}
```

### Reduced Motion Desteği
```tsx
// Kullanıcı tercihlerine saygı gösterir
@media (prefers-reduced-motion: reduce) {
  .parallax-reduced-motion {
    transform: none !important;
    animation: none !important;
    transition: none !important;
  }
}
```

## 🔧 Özelleştirme

### Parallax Hızları
```tsx
// Farklı hızlar için
const slowParallax = useAdvancedParallax({ speed: 0.2 });
const mediumParallax = useAdvancedParallax({ speed: 0.5 });
const fastParallax = useAdvancedParallax({ speed: 0.8 });
```

### Easing Fonksiyonları
```tsx
// Farklı geçiş efektleri
const smoothParallax = useAdvancedParallax({ easing: 'ease-out' });
const bouncyParallax = useAdvancedParallax({ easing: 'ease-in-out' });
const linearParallax = useAdvancedParallax({ easing: 'linear' });
```

## 🎭 Görsel Efektler

### Floating Elements
```tsx
// Yüzen geometrik şekiller
<div className="absolute top-20 left-20 w-32 h-32 border border-red-500/10 rounded-full opacity-20" />
<div className="absolute bottom-32 right-32 w-24 h-24 border border-red-400/10 rounded-full opacity-15" />
```

### Gradient Orbs
```tsx
// Gradient blur efektleri
<div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-full blur-3xl" />
<div className="absolute bottom-40 left-20 w-64 h-64 bg-gradient-to-tl from-red-700/5 to-red-500/5 rounded-full blur-2xl" />
```

## 🚨 Sorun Giderme

### Parallax Çalışmıyor
1. `transform-gpu` class'ının eklendiğinden emin olun
2. `ref`'in doğru şekilde bağlandığını kontrol edin
3. Console'da hata olup olmadığını kontrol edin

### Performans Sorunları
1. Çok fazla parallax element kullanmayın
2. `will-change` property'sini optimize edin
3. Mobil cihazlarda test edin

### Smooth Scrolling Sorunları
1. CSS'te `scroll-behavior: smooth` olduğundan emin olun
2. Browser compatibility'yi kontrol edin
3. `prefers-reduced-motion` tercihini test edin

## 📚 Ek Kaynaklar

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [CSS Transform Performance](https://developers.google.com/web/fundamentals/design-and-ux/animations)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

## 🤝 Katkıda Bulunma

Bu parallax sistemi sürekli geliştirilmektedir. Önerileriniz ve katkılarınız için:

1. Issue açın
2. Pull request gönderin
3. Dokümantasyonu geliştirin

---

**Not**: Bu parallax sistemi modern tarayıcılarda en iyi performansı sağlar. Eski tarayıcılarda fallback olarak normal scroll davranışı kullanılır.
