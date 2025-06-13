'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { ScrollAnimation } from './scroll-animations'

interface Skill {
  name: string
  level: number // 0-100
  category: 'technical' | 'creative' | 'soft' | 'hobby'
  icon: string
}

interface SkillsRadarProps {
  skills?: Skill[]
  className?: string
}

const defaultSkills: Skill[] = [
  { name: 'React/Next.js', level: 85, category: 'technical', icon: '⚛️' },
  { name: 'TypeScript', level: 80, category: 'technical', icon: '🔷' },
  { name: 'UI/UX Design', level: 90, category: 'creative', icon: '🎨' },
  { name: 'Photography', level: 75, category: 'creative', icon: '📸' },
  { name: 'Problem Solving', level: 88, category: 'soft', icon: '🧩' },
  { name: 'Communication', level: 82, category: 'soft', icon: '💬' },
  { name: 'Gaming', level: 95, category: 'hobby', icon: '🎮' },
  { name: 'Music', level: 70, category: 'hobby', icon: '🎵' }
]

const categoryColors = {
  technical: '#3B82F6',
  creative: '#8B5CF6',
  soft: '#10B981',
  hobby: '#F59E0B'
}

export const SkillsRadar = ({ 
  skills = defaultSkills, 
  className = '' 
}: SkillsRadarProps) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  
  const size = 300
  const center = size / 2
  const maxRadius = center - 40
  
  // Create concentric circles for the radar background
  const circles = [20, 40, 60, 80, 100].map(percentage => 
    (maxRadius * percentage) / 100
  )

  // Convert skill level to radius
  const getRadius = (level: number) => (maxRadius * level) / 100

  // Get angle for each skill (evenly distributed)
  const getAngle = (index: number) => (index * 360) / skills.length

  // Convert polar coordinates to cartesian
  const polarToCartesian = (angle: number, radius: number) => {
    const radians = (angle - 90) * (Math.PI / 180)
    return {
      x: center + radius * Math.cos(radians),
      y: center + radius * Math.sin(radians)
    }
  }

  return (
    <ScrollAnimation animation="scale" className={className}>
      <div className="bg-[#FAF3E0]/5 backdrop-blur-sm border border-[#8B5A2B]/20 rounded-xl p-6">
        <h3 className="text-2xl font-serif text-[#8B5A2B] text-center mb-6">Skills & Interests</h3>
        
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Radar Chart */}
          <div className="relative">
            <svg
              ref={svgRef}
              width={size}
              height={size}
              className="filter drop-shadow-lg"
            >
              {/* Background Grid */}
              <defs>
                <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(139, 90, 43, 0.1)" />
                  <stop offset="100%" stopColor="rgba(139, 90, 43, 0.05)" />
                </radialGradient>
              </defs>
              
              {/* Concentric Circles */}
              {circles.map((radius, index) => (
                <circle
                  key={index}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke="rgba(139, 90, 43, 0.2)"
                  strokeWidth="1"
                />
              ))}
              
              {/* Axis Lines */}
              {skills.map((_, index) => {
                const angle = getAngle(index)
                const end = polarToCartesian(angle, maxRadius)
                return (
                  <line
                    key={index}
                    x1={center}
                    y1={center}
                    x2={end.x}
                    y2={end.y}
                    stroke="rgba(139, 90, 43, 0.2)"
                    strokeWidth="1"
                  />
                )
              })}
              
              {/* Skill Points and Connections */}
              <motion.path
                d={`M ${skills.map((skill, index) => {
                  const angle = getAngle(index)
                  const radius = getRadius(skill.level)
                  const point = polarToCartesian(angle, radius)
                  return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
                }).join(' ')} Z`}
                fill="rgba(139, 90, 43, 0.1)"
                stroke="rgba(139, 90, 43, 0.5)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              
              {/* Individual Skill Points */}
              {skills.map((skill, index) => {
                const angle = getAngle(index)
                const radius = getRadius(skill.level)
                const point = polarToCartesian(angle, radius)
                const labelPoint = polarToCartesian(angle, maxRadius + 20)
                
                return (
                  <g key={skill.name}>
                    {/* Skill Point */}
                    <motion.circle
                      cx={point.x}
                      cy={point.y}
                      r={hoveredSkill === skill.name ? 8 : 6}
                      fill={categoryColors[skill.category]}
                      stroke="#FAF3E0"
                      strokeWidth="2"
                      className="cursor-pointer"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onClick={() => setSelectedSkill(skill)}
                      whileHover={{ scale: 1.3 }}
                    />
                    
                    {/* Skill Label */}
                    <text
                      x={labelPoint.x}
                      y={labelPoint.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-xs font-sans fill-[#8B5A2B] cursor-pointer"
                      onClick={() => setSelectedSkill(skill)}
                    >
                      <tspan x={labelPoint.x} dy="0">{skill.icon}</tspan>
                      <tspan x={labelPoint.x} dy="12" className="text-[10px]">{skill.name}</tspan>
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>
          
          {/* Legend */}
          <div className="space-y-4">
            <h4 className="font-serif text-[#8B5A2B] mb-4">Categories</h4>
            {Object.entries(categoryColors).map(([category, color]) => (
              <div key={category} className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-[#8B5A2B] capitalize text-sm">
                  {category}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Selected Skill Details */}
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-[#FAF3E0]/10 rounded-lg border border-[#8B5A2B]/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedSkill.icon}</span>
                <div>
                  <h4 className="font-serif text-[#8B5A2B] text-lg">{selectedSkill.name}</h4>
                  <p className="text-[#8B5A2B]/70 text-sm capitalize">{selectedSkill.category}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-mono font-bold text-[#8B5A2B]">
                  {selectedSkill.level}%
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-[#8B5A2B]/50 hover:text-[#8B5A2B] text-sm"
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </ScrollAnimation>
  )
}
