'use client'

import { ScrollAnimation } from './scroll-animations'
import { LiveSpotifyIntegration } from './live-spotify'

interface MusicTasteProps {
  className?: string
}

export const MusicTaste = ({ className = '' }: MusicTasteProps) => {
  return (
    <ScrollAnimation animation="fadeUp" className={className}>
      <LiveSpotifyIntegration 
        showCurrentlyPlaying={true}
        showTopTracks={true}
        showTopArtists={false}
        showPlaylists={false}
        className="h-full"
      />
    </ScrollAnimation>
  )
}
