'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ScrollAnimation } from './scroll-animations'

interface SpotifyTrack {
  id: string
  name: string
  artists: { name: string }[]
  album: {
    name: string
    images: { url: string; width: number; height: number }[]
  }
  external_urls: {
    spotify: string
  }
  preview_url?: string
}

interface SpotifyPlaylist {
  id: string
  name: string
  description: string
  images: { url: string }[]
  external_urls: {
    spotify: string
  }
  tracks: {
    total: number
  }
}

interface SpotifyArtist {
  id: string
  name: string
  genres: string[]
  images: { url: string }[]
  external_urls: {
    spotify: string
  }
  followers: {
    total: number
  }
}

interface LiveSpotifyProps {
  className?: string
  showCurrentlyPlaying?: boolean
  showTopTracks?: boolean
  showTopArtists?: boolean
  showPlaylists?: boolean
}

export function LiveSpotifyIntegration({
  className = '',
  showCurrentlyPlaying = true,
  showTopTracks = true,
  showTopArtists = true,
  showPlaylists = false
}: LiveSpotifyProps) {  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null)
  const [topTracks, setTopTracks] = useState<SpotifyTrack[]>([])
  const [topArtists, setTopArtists] = useState<SpotifyArtist[]>([])
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)// Spotify API configuration (these would be environment variables)
  const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
  const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
  const REFRESH_TOKEN = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN

  const getAccessToken = useCallback(async (): Promise<string | null> => {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: REFRESH_TOKEN!
        })
      })

      if (!response.ok) {
        throw new Error('Failed to refresh access token')
      }      const data = await response.json()
      return data.access_token
    } catch (error) {
      console.error('Error getting access token:', error)
      return null
    }
  }, [CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN])

  const spotifyFetch = useCallback(async (endpoint: string, token: string) => {
    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`)
    }

    return response.json()
  }, [])

  const initializeSpotifyData = useCallback(async () => {
    try {
      setIsLoading(true)
      const token = await getAccessToken()
      
      if (!token) {
        throw new Error('Failed to get access token')
      }

      // Fetch data concurrently
      const promises = []

      if (showCurrentlyPlaying) {
        promises.push(
          spotifyFetch('/me/player/currently-playing', token)
            .then(data => {
              if (data && data.item) {
                setCurrentTrack(data.item)
              }
            })
            .catch(() => {
              // No currently playing track is not an error
              setCurrentTrack(null)
            })
        )
      }

      if (showTopTracks) {
        promises.push(
          spotifyFetch('/me/top/tracks?limit=5&time_range=short_term', token)
            .then(data => setTopTracks(data.items))
        )
      }

      if (showTopArtists) {
        promises.push(
          spotifyFetch('/me/top/artists?limit=5&time_range=short_term', token)
            .then(data => setTopArtists(data.items))
        )
      }

      if (showPlaylists) {
        promises.push(
          spotifyFetch('/me/playlists?limit=5', token)
            .then(data => setPlaylists(data.items))
        )
      }

      await Promise.allSettled(promises)
      setError(null)
    } catch (error) {
      console.error('Error fetching Spotify data:', error)
      setError('Failed to load Spotify data')
    } finally {
      setIsLoading(false)
    }
  }, [showCurrentlyPlaying, showTopTracks, showTopArtists, showPlaylists, getAccessToken, spotifyFetch])

  useEffect(() => {
    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
      setError('Spotify API credentials not configured')
      setIsLoading(false)
      return
    }
    
    initializeSpotifyData()
  }, [CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, initializeSpotifyData])
  if (isLoading) {
    return (
      <div className={`bg-[#252525] rounded-lg p-6 border-l-4 border-green-500 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-[#1A1A1A] rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex space-x-3">
                <div className="w-12 h-12 bg-[#1A1A1A] rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-[#1A1A1A] rounded w-3/4"></div>
                  <div className="h-3 bg-[#1A1A1A] rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`bg-[#252525] rounded-lg p-6 border-l-4 border-red-500 ${className}`}>
        <h3 className="font-bold text-lg mb-3 text-[#FAF3E0] flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          spotify integration
        </h3>
        <p className="text-[#FAF3E0]/70 text-sm mb-4">{error}</p>
        <button
          onClick={initializeSpotifyData}
          className="text-green-400 hover:text-green-300 text-sm font-semibold"
        >
          try again
        </button>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Currently Playing */}
      {showCurrentlyPlaying && (
        <ScrollAnimation animation="fadeUp" delay={0}>
          <div className="bg-[#252525] rounded-lg p-6 border-l-4 border-green-500">
            <h3 className="font-bold text-lg mb-4 text-[#FAF3E0] flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
              now playing
            </h3>
            
            {currentTrack ? (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-4"
              >                {currentTrack.album.images[0] && (
                  <Image
                    src={currentTrack.album.images[0].url}
                    alt={`${currentTrack.album.name} cover`}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-lg shadow-md"
                  />
                )}
                <div className="flex-1">
                  <a
                    href={currentTrack.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FAF3E0] font-semibold hover:text-green-400 transition-colors"
                  >
                    {currentTrack.name}
                  </a>
                  <p className="text-[#FAF3E0]/70 text-sm">
                    by {currentTrack.artists.map(artist => artist.name).join(', ')}
                  </p>
                  <p className="text-[#FAF3E0]/50 text-xs">
                    {currentTrack.album.name}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-xs font-medium">LIVE</span>
                </div>
              </motion.div>
            ) : (
              <p className="text-[#FAF3E0]/60 text-sm italic">
                nothing playing right now
              </p>
            )}
          </div>
        </ScrollAnimation>
      )}

      {/* Top Tracks */}
      {showTopTracks && topTracks.length > 0 && (
        <ScrollAnimation animation="fadeUp" delay={200}>
          <div className="bg-[#252525] rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="font-bold text-lg mb-4 text-[#FAF3E0]">top tracks this month</h3>
            <div className="space-y-3">
              {topTracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 group"
                >
                  <span className="text-[#FAF3E0]/50 text-sm font-mono w-6">
                    #{index + 1}
                  </span>                  {track.album.images[2] && (
                    <Image
                      src={track.album.images[2].url}
                      alt={`${track.album.name} cover`}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <a
                      href={track.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FAF3E0] text-sm font-medium hover:text-blue-400 transition-colors truncate block"
                    >
                      {track.name}
                    </a>
                    <p className="text-[#FAF3E0]/60 text-xs truncate">
                      {track.artists.map(artist => artist.name).join(', ')}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      )}

      {/* Top Artists */}
      {showTopArtists && topArtists.length > 0 && (
        <ScrollAnimation animation="fadeUp" delay={400}>
          <div className="bg-[#252525] rounded-lg p-6 border-l-4 border-purple-500">
            <h3 className="font-bold text-lg mb-4 text-[#FAF3E0]">top artists this month</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {topArtists.map((artist, index) => (
                <motion.div
                  key={artist.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center group"
                >
                  <a
                    href={artist.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >                    {artist.images[0] && (
                      <Image
                        src={artist.images[0].url}
                        alt={artist.name}
                        width={150}
                        height={150}
                        className="w-full aspect-square object-cover rounded-full mb-2 group-hover:opacity-80 transition-opacity"
                      />
                    )}
                    <p className="text-[#FAF3E0] text-sm font-medium group-hover:text-purple-400 transition-colors">
                      {artist.name}
                    </p>
                    <p className="text-[#FAF3E0]/50 text-xs">
                      {artist.followers.total.toLocaleString()} followers
                    </p>
                  </a>
                </motion.div>
              ))}
            </div>          </div>
        </ScrollAnimation>
      )}

      {/* Playlists */}
      {showPlaylists && playlists.length > 0 && (
        <ScrollAnimation animation="fadeUp" delay={600}>
          <div className="bg-[#252525] rounded-lg p-6 border-l-4 border-yellow-500">
            <h3 className="font-bold text-lg mb-4 text-[#FAF3E0]">my playlists</h3>
            <div className="space-y-3">
              {playlists.map((playlist, index) => (
                <motion.div
                  key={playlist.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 group"
                >                  {playlist.images[0] && (
                    <Image
                      src={playlist.images[0].url}
                      alt={`${playlist.name} cover`}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <a
                      href={playlist.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FAF3E0] font-medium hover:text-yellow-400 transition-colors truncate block"
                    >
                      {playlist.name}
                    </a>
                    <p className="text-[#FAF3E0]/60 text-sm truncate">
                      {playlist.tracks.total} tracks
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      )}
    </div>
  )
}

export default LiveSpotifyIntegration
