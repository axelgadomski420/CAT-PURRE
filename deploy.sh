#!/bin/zsh

echo "🚀 Deploying CAT PURRE..."

# Build frontend
echo "📦 Building Next.js..."
npm run build

# Build mobile
echo "📱 Building Mobile App..."
cd mobile && npm run build && cd ..

# Deploy to Vercel (frontend)
echo "☁️ Deploying to Vercel..."
vercel --prod

# Deploy backend to Railway/Render
echo "🚂 Deploying backend..."
# Add your backend deployment commands

echo "✅ Deployment complete!"
