'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ScrollAnimation } from './scroll-animations'

interface Track {
  name: string
  artist: string
  album?: string
  image?: string
  url?: string
  isPlaying?: boolean
}

interface MusicTasteProps {
  className?: string
}

// Mock data - in a real app, this would come from Spotify/Last.fm API
const mockTracks: Track[] = [
  {
    name: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    isPlaying: false
  },
  {
    name: "Stairway to Heaven",
    artist: "Led Zeppelin", 
    album: "Led Zeppelin IV",
    isPlaying: false
  },
  {
    name: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
    isPlaying: true
  },
  {
    name: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    album: "Appetite for Destruction",
    isPlaying: false
  },
  {
    name: "Imagine",
    artist: "John Lennon",
    album: "Imagine",
    isPlaying: false
  }
]

const musicGenres = [
  { name: 'Rock', percentage: 85, icon: '🎸' },
  { name: 'Electronic', percentage: 70, icon: '🎛️' },
  { name: 'Jazz', percentage: 45, icon: '🎷' },
  { name: 'Classical', percentage: 60, icon: '🎼' },
  { name: 'Pop', percentage: 55, icon: '🎤' },
  { name: 'Ambient', percentage: 75, icon: '🌊' }
]

export const MusicTaste = ({ className = '' }: MusicTasteProps) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Simulate finding currently playing track
    const playingTrack = mockTracks.find(track => track.isPlaying)
    if (playingTrack) {
      setCurrentTrack(playingTrack)
      setIsPlaying(true)
    }
  }, [])

  return (
    <ScrollAnimation animation="fadeUp" className={className}>
      <div className="bg-[#FAF3E0]/5 backdrop-blur-sm border border-[#8B5A2B]/20 rounded-xl p-6">
        <h3 className="text-2xl font-serif text-[#8B5A2B] mb-6 flex items-center gap-2">
          <span>🎵</span>
          Music Taste
        </h3>

        {/* Currently Playing */}
        {currentTrack && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-[#8B5A2B]/10 rounded-lg border border-[#8B5A2B]/20"
          >
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                className="w-8 h-8 bg-[#8B5A2B] rounded-full flex items-center justify-center"
              >
                <span className="text-[#FAF3E0] text-xs">♪</span>
              </motion.div>
              <div className="flex-1">
                <p className="text-[#8B5A2B] font-medium text-sm">Now Playing</p>
                <p className="text-[#8B5A2B]/70 text-xs">
                  {isPlaying ? 'Currently listening' : 'Recently played'}
                </p>
              </div>
              <motion.div
                animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
                className="text-green-500"
              >
                {isPlaying ? '●' : '○'}
              </motion.div>
            </div>
            
            <div className="ml-11">
              <h4 className="text-[#8B5A2B] font-medium">{currentTrack.name}</h4>
              <p className="text-[#8B5A2B]/70 text-sm">{currentTrack.artist}</p>
              {currentTrack.album && (
                <p className="text-[#8B5A2B]/50 text-xs">{currentTrack.album}</p>
              )}
            </div>
          </motion.div>
        )}

        {/* Music Genres */}
        <div className="space-y-4">
          <h4 className="text-lg font-serif text-[#8B5A2B] mb-4">Favorite Genres</h4>
          {musicGenres.map((genre, index) => (
            <motion.div
              key={genre.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="text-lg">{genre.icon}</span>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#8B5A2B] text-sm font-medium">{genre.name}</span>
                  <span className="text-[#8B5A2B]/70 text-xs">{genre.percentage}%</span>
                </div>
                <div className="w-full bg-[#8B5A2B]/20 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-[#8B5A2B] to-[#A0662F] h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${genre.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Tracks */}
        <div className="mt-6">
          <h4 className="text-lg font-serif text-[#8B5A2B] mb-4">Recent Tracks</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {mockTracks.slice(0, 4).map((track, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-2 rounded hover:bg-[#8B5A2B]/10 transition-colors cursor-pointer"
              >
                <div className="w-2 h-2 bg-[#8B5A2B]/40 rounded-full" />
                <div className="flex-1 min-w-0">
                  <p className="text-[#8B5A2B] text-sm truncate">{track.name}</p>
                  <p className="text-[#8B5A2B]/70 text-xs truncate">{track.artist}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Connect Music Services */}
        <div className="mt-6 pt-4 border-t border-[#8B5A2B]/20">
          <p className="text-[#8B5A2B]/70 text-xs text-center">
            Music data simulated • Connect Spotify/Last.fm for live data
          </p>
        </div>
      </div>
    </ScrollAnimation>
  )
}
