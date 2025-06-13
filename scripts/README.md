# Spotify Token Scripts

## Files

- `get-spotify-token.js` - Generates the authorization URL for Spotify OAuth
- `exchange-token.js` - Exchanges authorization code for refresh token

## Usage

1. Run `node get-spotify-token.js` to get the authorization URL
2. Visit the URL, authorize the app, and get the code from the redirect
3. Run `node exchange-token.js YOUR_CODE` to get the refresh token
4. Add the refresh token to your `.env.local` file

## Required Environment Variables

```bash
NEXT_PUBLIC_SPOTIFY_CLIENT_ID="your_client_id"
NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET="your_client_secret"
NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN="your_refresh_token"
```

## Spotify App Settings

Make sure to add this redirect URI in your Spotify app settings:
```
http://localhost:3000/callback
```

## Required Scopes

The app requests these Spotify scopes:
- `user-read-currently-playing`
- `user-read-playback-state`
- `user-top-read`
- `playlist-read-private`
- `playlist-read-collaborative`
