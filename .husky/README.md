# Husky Git Hooks

Bu proje Husky kullanarak aşağıdaki Git hooks'larını otomatik olarak çalıştırır:

## Pre-commit Hook

Commit yapmadan önce çalışır:

- **Prettier**: Kod formatı düzeltme
- **ESLint**: Kod kalitesi kontrolleri
- **TypeScript**: Type checking

## Pre-push Hook

Push yapmadan önce çalışır:

- **TypeScript**: Type checking
- **Build**: Production build testi

## Commit Message Hook

Commit mesajı formatını kontrol eder:

- Format: `type(scope): description`
- Geçerli tipler: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Örnek: `feat(auth): add user login functionality`

## Hooks'ları Atlama

Acil durumda hooks'ları atlamak için:

```bash
git commit --no-verify -m "emergency fix"
git push --no-verify
```

⚠️ **Dikkat**: Hooks'ları atlamak kod kalitesini düşürebilir!
