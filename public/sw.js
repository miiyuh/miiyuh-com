// Service Worker for miiyuh.com
const CACHE_NAME = 'miiyuh-v1.0.0'
const STATIC_CACHE_NAME = 'miiyuh-static-v1.0.0'

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/aboutme',
  '/gallery', 
  '/socials',
  '/blog',
  '/assets/img/logo_miiyuh_text_white_v2.png',
  '/assets/img/kazuha.png',
  'https://rsms.me/inter/inter.css'
]

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache first for static assets
  cacheFirst: [
    /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
    /\.(?:css|js)$/,
    /\/assets\//
  ],
  
  // Network first for dynamic content
  networkFirst: [
    /\/api\//,
    /\/blog/,
    /\.json$/
  ],
  
  // Stale while revalidate for pages
  staleWhileRevalidate: [
    /^\//
  ]
}

self.addEventListener('install', (event) => {
  console.log('Service Worker installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      console.log('Caching static assets')
      return cache.addAll(STATIC_ASSETS)
    })
  )
  
  // Skip waiting to activate immediately
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...')
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old caches
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  
  // Claim clients to start controlling them immediately
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-GET requests
  if (request.method !== 'GET') return
  
  // Skip external requests (except for specific domains)
  if (url.origin !== self.location.origin && 
      !url.origin.includes('rsms.me') && 
      !url.origin.includes('fonts.googleapis.com')) {
    return
  }
  
  // Determine cache strategy
  let strategy = 'networkFirst' // default
  
  for (const [strategyName, patterns] of Object.entries(CACHE_STRATEGIES)) {
    if (patterns.some(pattern => pattern.test(url.pathname))) {
      strategy = strategyName
      break
    }
  }
  
  event.respondWith(handleRequest(request, strategy))
})

async function handleRequest(request, strategy) {
  const cache = await caches.open(CACHE_NAME)
  
  switch (strategy) {
    case 'cacheFirst':
      return cacheFirst(request, cache)
    case 'networkFirst':
      return networkFirst(request, cache)
    case 'staleWhileRevalidate':
      return staleWhileRevalidate(request, cache)
    default:
      return fetch(request)
  }
}

async function cacheFirst(request, cache) {
  const cachedResponse = await cache.match(request)
  if (cachedResponse) {
    return cachedResponse
  }
  
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch {
    console.log('Network failed, serving offline page if available')
    return cache.match('/offline') || new Response('Offline', { status: 503 })
  }
}

async function networkFirst(request, cache) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch {
    console.log('Network failed, trying cache')
    const cachedResponse = await cache.match(request)
    return cachedResponse || new Response('Offline', { status: 503 })
  }
}

async function staleWhileRevalidate(request, cache) {
  const cachedResponse = await cache.match(request)
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  }).catch(() => {
    console.log('Network failed for:', request.url)
  })
  
  // Return cached version immediately, update in background
  return cachedResponse || fetchPromise
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Background sync triggered')
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  // Handle any offline actions that need to be synced
  console.log('Performing background sync...')
}

// Push notifications (if needed in the future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const options = {
      body: event.data.text(),
      icon: '/assets/img/logo_miiyuh_text_white_v2.png',
      badge: '/assets/img/logo_miiyuh_text_white_v2.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    }
    
    event.waitUntil(
      self.registration.showNotification('miiyuh.com', options)
    )
  }
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification click received.')
  
  event.notification.close()
  
  event.waitUntil(
    clients.openWindow('https://miiyuh.com')
  )
})
