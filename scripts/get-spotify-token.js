// Script to get Spotify refresh token
// Run this once to get your refresh token

const CLIENT_ID = '0014c9c4c453469588ec7f6366d280db'
const CLIENT_SECRET = '76d3e994b0f34cc69974aa78c84ec216'
const REDIRECT_URI = 'https://example.com/callback' // Generic secure URL that Spotify accepts
const SCOPES = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-top-read',
  'playlist-read-private',
  'playlist-read-collaborative'
].join(' ')

console.log('\n🎵 Spotify Token Setup Guide\n')

console.log('1. Go to Spotify Developer Dashboard: https://developer.spotify.com/dashboard')
console.log('2. Create or select your app')
console.log('3. Add this redirect URI to your app settings:', REDIRECT_URI)
console.log('\n4. Visit this authorization URL:\n')

const authUrl = `https://accounts.spotify.com/authorize?` +
  `client_id=${CLIENT_ID}&` +
  `response_type=code&` +
  `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
  `scope=${encodeURIComponent(SCOPES)}`

console.log(authUrl)

console.log('\n5. After authorization, you\'ll be redirected to:', REDIRECT_URI)
console.log('6. Copy the "code" parameter from the URL')
console.log('7. Run: node scripts/exchange-token.js YOUR_CODE_HERE')
console.log('\n💡 The authorization code expires quickly, so use it immediately!\n')
