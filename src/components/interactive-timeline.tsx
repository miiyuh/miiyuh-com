'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ScrollAnimation } from './scroll-animations'

interface TimelineEvent {
  year: string
  title: string
  description: string
  category: 'education' | 'work' | 'personal' | 'achievement'
  icon: string
}

interface InteractiveTimelineProps {
  events: TimelineEvent[]
  className?: string
}

const categoryColors = {
  education: 'bg-blue-500/20 border-blue-500/30 text-blue-600',
  work: 'bg-green-500/20 border-green-500/30 text-green-600', 
  personal: 'bg-purple-500/20 border-purple-500/30 text-purple-600',
  achievement: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-600'
}

const defaultEvents: TimelineEvent[] = [
  {
    year: '2024',
    title: 'Web Development Journey',
    description: 'Started building modern web applications with React and Next.js',
    category: 'education',
    icon: '💻'
  },
  {
    year: '2023',
    title: 'Creative Photography',
    description: 'Began exploring digital photography and visual storytelling',
    category: 'personal',
    icon: '📸'
  },
  {
    year: '2022',
    title: 'Design Excellence',
    description: 'Developed skills in UI/UX design and digital art creation',
    category: 'achievement',
    icon: '🎨'
  },
  {
    year: '2021',
    title: 'Community Building',
    description: 'Started engaging with online creative communities and collaboration',
    category: 'work',
    icon: '🤝'
  }
]

export const InteractiveTimeline = ({ 
  events = defaultEvents, 
  className = '' 
}: InteractiveTimelineProps) => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)

  return (
    <div className={`relative ${className}`}>
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#8B5A2B]/30 via-[#8B5A2B]/60 to-[#8B5A2B]/30" />
      
      {/* Events */}
      <div className="space-y-8">
        {events.map((event, index) => (
          <ScrollAnimation
            key={event.year}
            animation="slideLeft"
            delay={index * 0.2}
            className="relative"
          >
            {/* Timeline Dot */}
            <motion.div
              className="absolute left-6 w-4 h-4 rounded-full bg-[#8B5A2B] border-4 border-[#FAF3E0] z-10 cursor-pointer"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                scale: hoveredEvent === event.year ? 1.2 : 1,
                boxShadow: hoveredEvent === event.year ? '0 0 20px rgba(139, 90, 43, 0.5)' : '0 0 0px rgba(139, 90, 43, 0)'
              }}
              onHoverStart={() => setHoveredEvent(event.year)}
              onHoverEnd={() => setHoveredEvent(null)}
              onClick={() => setSelectedEvent(event)}
            />
            
            {/* Event Card */}
            <motion.div
              className="ml-16 group cursor-pointer"
              whileHover={{ x: 8 }}
              onClick={() => setSelectedEvent(event)}
            >
              <div className="bg-[#FAF3E0]/5 backdrop-blur-sm border border-[#8B5A2B]/20 rounded-lg p-6 hover:bg-[#FAF3E0]/10 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{event.icon}</span>
                      <span className={`px-2 py-1 rounded-full text-xs border ${categoryColors[event.category]}`}>
                        {event.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif text-[#8B5A2B] mb-1 group-hover:text-[#A0662F] transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-[#8B5A2B]/70 text-sm mb-2">
                      {event.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-mono font-bold text-[#8B5A2B]">
                      {event.year}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </ScrollAnimation>
        ))}
      </div>
      
      {/* Selected Event Modal */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-[#FAF3E0] rounded-lg p-8 max-w-md w-full border border-[#8B5A2B]/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <span className="text-4xl mb-4 block">{selectedEvent.icon}</span>
              <h2 className="text-2xl font-serif text-[#8B5A2B] mb-2">
                {selectedEvent.title}
              </h2>
              <p className="text-lg font-mono text-[#8B5A2B]/80 mb-4">
                {selectedEvent.year}
              </p>
              <p className="text-[#8B5A2B]/70 mb-6">
                {selectedEvent.description}
              </p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm border ${categoryColors[selectedEvent.category]} mb-6`}>
                {selectedEvent.category}
              </span>
              <div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-6 py-2 bg-[#8B5A2B] text-[#FAF3E0] rounded-lg hover:bg-[#A0662F] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
