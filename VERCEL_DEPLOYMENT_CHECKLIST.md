# Vercel Deployment Checklist for TinaCMS

## ✅ Completed Setup

### 1. TinaCloud Configuration
- [x] TinaCloud project created at app.tina.io
- [x] Client ID: `ebd6ca61-1ec0-4d06-8c35-6317b05f7c18`
- [x] Read Only Token: `d37074db11cbce17309250f4f1494f6785355d75`
- [x] Backend initialized with `npx @tinacms/cli init backend`

### 2. Environment Variables
- [x] `.env` file created with all required variables
- [x] `NEXT_PUBLIC_TINA_CLIENT_ID` configured
- [x] `TINA_TOKEN` configured
- [x] `TINA_PUBLIC_IS_LOCAL` set to `false` for production
- [x] Upstash KV configuration added
- [x] Cloudinary configuration added

### 3. TinaCMS Configuration
- [x] `tina/config.ts` updated for Vercel deployment
- [x] Branch configuration set to `main`
- [x] TinaCloud media store configured
- [x] Admin panel build output configured

### 4. Build Configuration
- [x] `package.json` build script updated to `"build": "tinacms build && next build"`
- [x] `vercel.json` configured for yarn and TinaCMS admin
- [x] Next.js config optimized for TinaCMS

### 5. API Routes
- [x] TinaCMS API route created at `/api/tina/[...route]`
- [x] Middleware configured for admin panel routing

## 🔧 Required Actions for Vercel Deployment

### 1. Vercel Dashboard Configuration
- [ ] Go to [vercel.com](https://vercel.com) and create/import project
- [ ] Connect GitHub repository
- [ ] Set build command to: `yarn build`
- [ ] Set output directory to: `.next`
- [ ] Set install command to: `yarn install`

### 2. Environment Variables in Vercel
Add these environment variables in Vercel dashboard:

```bash
# TinaCMS Configuration
NEXT_PUBLIC_TINA_CLIENT_ID=ebd6bc61-1ec0-4d06-8c35-6317b05f7c18
TINA_TOKEN=d37074db11cbce17309250f4f1494f6785355d75
TINA_PUBLIC_IS_LOCAL=false

# Vercel Environment
NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF=main
VERCEL_GIT_COMMIT_REF=main

# Upstash KV Configuration
UPSTASH_REDIS_REST_URL=https://equipped-owl-22028.upstash.io
UPSTASH_REDIS_REST_TOKEN=AVYMAAIncDFjYzJhYzYxMmFkZDY0Yjk0OTFiODE5NGViMGRlZmI0OXAxMjIwMjg
UPSTASH_REDIS_REST_READ_ONLY_TOKEN=AlYMAAIgcDE4DzbD0O-WX4CODCUiYD7mXqX74ZyrjRKNuqsPb6ZyJQ

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dtlbxu8ya
CLOUDINARY_API_KEY=671255211726649
CLOUDINARY_API_SECRET=IcBPNLBHiml3LPagPpWejhnp2c4

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
NODE_ENV=production
```

### 3. GitHub Repository Setup
- [ ] Ensure all changes are committed and pushed to `main` branch
- [ ] Verify `tina/tina-lock.json` is up to date and committed
- [ ] Check that `.env` is in `.gitignore`

### 4. Pre-Deployment Testing
- [ ] Test local build: `yarn build`
- [ ] Verify TinaCMS admin panel builds correctly
- [ ] Check that all environment variables are accessible

## 🚀 Deployment Steps

### 1. Initial Deployment
1. Push all changes to GitHub `main` branch
2. Deploy to Vercel (should happen automatically)
3. Monitor build logs for any errors
4. Verify TinaCMS admin panel is accessible at `/admin`

### 2. Post-Deployment Verification
- [ ] TinaCMS admin panel loads at `/admin`
- [ ] Content editing works correctly
- [ ] Media uploads function properly
- [ ] All pages render correctly
- [ ] Environment variables are accessible

### 3. Content Management
- [ ] Test creating new content in TinaCMS
- [ ] Verify content saves to GitHub repository
- [ ] Test media uploads to Cloudinary
- [ ] Verify content updates appear on live site

## 🔍 Troubleshooting

### Common Issues
1. **Build Failures**: Check environment variables in Vercel dashboard
2. **Admin Panel Not Loading**: Verify TinaCMS build completed successfully
3. **Content Not Saving**: Check TinaCloud token permissions
4. **Media Upload Issues**: Verify Cloudinary configuration

### Debug Commands
```bash
# Local testing
yarn build:tina
yarn build:next

# Check environment variables
echo $NEXT_PUBLIC_TINA_CLIENT_ID
echo $TINA_TOKEN

# Verify TinaCMS build
ls -la public/admin/
```

## 📚 Additional Resources

- [TinaCMS Vercel Deployment Guide](https://tina.io/docs/tina-cloud/deployment-options/vercel)
- [TinaCloud Documentation](https://tina.io/docs/tina-cloud)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)

## 🎯 Next Steps After Deployment

1. **Content Migration**: Import existing content into TinaCMS
2. **Team Training**: Train content editors on using TinaCMS
3. **Workflow Setup**: Configure editorial workflow and permissions
4. **Performance Monitoring**: Monitor site performance and optimize
5. **Backup Strategy**: Set up automated backups and version control
