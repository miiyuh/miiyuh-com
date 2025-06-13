// Script to exchange authorization code for refresh token
// Usage: node scripts/exchange-token.js YOUR_AUTH_CODE

const https = require('https')
const querystring = require('querystring')

const CLIENT_ID = '0014c9c4c453469588ec7f6366d280db'
const CLIENT_SECRET = '76d3e994b0f34cc69974aa78c84ec216'
const REDIRECT_URI = 'https://example.com/callback'

const authCode = process.argv[2]

if (!authCode) {
  console.error('❌ Please provide the authorization code')
  console.log('Usage: node scripts/exchange-token.js YOUR_AUTH_CODE')
  process.exit(1)
}

const postData = querystring.stringify({
  grant_type: 'authorization_code',
  code: authCode,
  redirect_uri: REDIRECT_URI
})

const options = {
  hostname: 'accounts.spotify.com',
  port: 443,
  path: '/api/token',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData),
    'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
  }
}

const req = https.request(options, (res) => {
  let data = ''
  
  res.on('data', (chunk) => {
    data += chunk
  })
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data)
      
      if (response.error) {
        console.error('❌ Error:', response.error_description || response.error)
        return
      }
      
      console.log('\n✅ Success! Here are your tokens:\n')
      console.log('Access Token:', response.access_token)
      console.log('\n🔑 Refresh Token (add this to your .env.local):')
      console.log(response.refresh_token)
      console.log('\n📝 Add this line to your .env.local file:')
      console.log(`NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN="${response.refresh_token}"`)
      console.log('\n💡 The access token expires in', response.expires_in, 'seconds')
      console.log('💡 The refresh token can be used to get new access tokens\n')
      
    } catch (error) {
      console.error('❌ Failed to parse response:', error)
      console.log('Raw response:', data)
    }
  })
})

req.on('error', (error) => {
  console.error('❌ Request failed:', error)
})

req.write(postData)
req.end()
