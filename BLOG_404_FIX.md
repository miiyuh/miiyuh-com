# Blog Post 404 & Gallery Empty Fix - Vercel Environment Setup

## Issues Fixed

1. ✅ Blog posts return 404 on Vercel but work locally
2. ✅ Gallery shows empty on Vercel with error: `connect ECONNREFUSED 127.0.0.1:3000`

Both issues were caused by incorrect API URLs pointing to localhost instead of the Vercel deployment URL.

## Root Cause

The code was trying to fetch from `http://localhost:3000` on Vercel, which doesn't exist in the serverless environment.

## Code Fixes Applied

1. **Gallery Page**: Converted from server-side to client-side rendering to avoid URL resolution issues
2. **Gallery Loader**: Updated to use relative URLs (`/api/gallery-frontend`) for client-side calls
3. **Blog Post Page**: Updated to use `VERCEL_URL` as fallback for API calls
4. **Environment Variable Handling**: Improved fallback logic for Vercel deployments

## Key Changes Made

### Gallery Page (`src/app/(frontend)/gallery/page.tsx`)

- Changed from server-side (`async function`) to client-side (`'use client'`) rendering
- Added proper loading states and error handling
- Uses relative API URLs which work reliably on Vercel

### Gallery Loader (`src/utils/gallery-loader.ts`)

- Simplified to use relative URLs (`/api/gallery-frontend`) instead of absolute URLs
- Removed complex environment variable logic that was causing issues on Vercel

### Blog Post Pages

- Enhanced environment variable fallback logic
- Added timeouts and better error handling

## Required Environment Variables for Vercel

Set these in your Vercel Dashboard (Project Settings → Environment Variables):

### 1. Database Connection
```
DATABASE_URI=mongodb+srv://miiyuh:K4zuh4Yo1m1y4!@cluster0.lhkzvev.mongodb.net/?retryWrites=true&w=majority&appName=cluster0
```

### 2. PayloadCMS Configuration
```
PAYLOAD_SECRET=ZjZ0nuJ03SP3PPnp8Nfo44++J28FpOa7sQOrNzpj5xM=
NEXT_PUBLIC_PAYLOAD_URL=https://miiyuh-com-git-payload-integration-miiyuhs-projects.vercel.app
```

**Important**: The `NEXT_PUBLIC_PAYLOAD_URL` can now be omitted since the code will automatically use the Vercel URL, but setting it explicitly is still recommended.

### 3. Vercel Blob Storage
```
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_TAvt1iz2uKISUWtC_AFD6br4rpANfKX7hdmNdtvHq4oHTd9
```

### 4. Preview/Draft Mode (Optional)
```
PREVIEW_SECRET=GI2q4szByMSIvQIQFLpABqJTEc3vMYxTB+F1odrj0AI=
```

## Critical Fix Required

**The `NEXT_PUBLIC_PAYLOAD_URL` must be updated from `http://localhost:3000` to your actual Vercel deployment URL.**

## Steps to Fix

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `miiyuh-com-git-payload-integration`
3. Go to **Settings** → **Environment Variables**
4. Add/Update the environment variables above
5. **Trigger a new deployment** after adding the environment variables

## Debug Endpoint

After deployment, test this endpoint to verify the configuration:
```
https://miiyuh-com-git-payload-integration-miiyuhs-projects.vercel.app/api/debug
```

This will show:
- Which environment variables are present
- If PayloadCMS can initialize
- If the database connection works
- If test queries succeed

## Expected Debug Output (Success)
```json
{
  "environment": "production",
  "vercel": true,
  "env_vars": {
    "DATABASE_URI": true,
    "PAYLOAD_SECRET": true,
    "BLOB_READ_WRITE_TOKEN": true,
    "NEXT_PUBLIC_PAYLOAD_URL": "https://your-app.vercel.app"
  },
  "payload_config": {
    "config_exists": true,
    "payload_initialized": true,
    "database_connected": true,
    "test_query_results": 1
  }
}
```

## If Debug Shows Errors

- **`payload_initialized: false`** → Check PAYLOAD_SECRET and database connection
- **`database_connected: false`** → Check DATABASE_URI and MongoDB Atlas permissions
- **`test_query_results: 0`** → Database is empty or user collection missing

## After Fixing Environment Variables

The blog posts should work at:
- `/blog/aot-review`
- `/blog/read-books`
