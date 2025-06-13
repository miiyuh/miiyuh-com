#!/usr/bin/env node

/**
 * Comprehensive testing and performance optimization script for miiyuh.com
 * This script runs various tests and optimizations to ensure peak performance
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

class WebsiteOptimizer {
  constructor() {
    this.projectRoot = process.cwd()
    this.results = {
      performance: {},
      accessibility: {},
      seo: {},
      errors: []
    }
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString()
    const prefix = {
      info: '📋',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      performance: '⚡'
    }[type]
    
    console.log(`${prefix} [${timestamp}] ${message}`)
  }

  async runImageOptimization() {
    this.log('Running image optimization analysis...', 'performance')
    
    const imageDir = path.join(this.projectRoot, 'public', 'assets', 'img')
    
    if (!fs.existsSync(imageDir)) {
      this.log('Image directory not found', 'warning')
      return
    }

    const images = fs.readdirSync(imageDir).filter(file => 
      /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(file)
    )

    this.log(`Found ${images.length} images to analyze`, 'info')

    for (const image of images) {
      const imagePath = path.join(imageDir, image)
      const stats = fs.statSync(imagePath)
      const sizeKB = Math.round(stats.size / 1024)

      if (sizeKB > 500) {
        this.log(`Large image detected: ${image} (${sizeKB}KB)`, 'warning')
        this.results.performance.largeImages = this.results.performance.largeImages || []
        this.results.performance.largeImages.push({ file: image, size: sizeKB })
      }

      // Check for modern format alternatives
      const baseName = path.parse(image).name
      const hasWebP = images.includes(`${baseName}.webp`)
      const hasAVIF = images.includes(`${baseName}.avif`)

      if (!hasWebP && !hasAVIF) {
        this.log(`Missing modern formats for: ${image}`, 'warning')
        this.results.performance.missingModernFormats = this.results.performance.missingModernFormats || []
        this.results.performance.missingModernFormats.push(image)
      }
    }
  }

  async analyzeBundleSize() {
    this.log('Analyzing bundle size...', 'performance')
    
    try {
      // Run Next.js build analysis
      const buildOutput = execSync('npm run build', { 
        cwd: this.projectRoot,
        encoding: 'utf8'
      })

      // Extract bundle size information
      const sizeMatches = buildOutput.match(/Size:\s+(\d+(?:\.\d+)?)\s*(kB|MB)/g)
      if (sizeMatches) {
        this.results.performance.bundleSizes = sizeMatches
        this.log(`Bundle analysis complete: ${sizeMatches.length} chunks analyzed`, 'success')
      }

    } catch (error) {
      this.log(`Bundle analysis failed: ${error.message}`, 'error')
      this.results.errors.push({ type: 'bundle', error: error.message })
    }
  }

  async checkAccessibility() {
    this.log('Running accessibility checks...', 'info')

    const components = [
      'src/components/accessibility-controls.tsx',
      'src/app/layout.tsx',
      'src/components/client-header.tsx'
    ]

    for (const component of components) {
      const componentPath = path.join(this.projectRoot, component)
      
      if (fs.existsSync(componentPath)) {
        const content = fs.readFileSync(componentPath, 'utf8')
        
        // Check for accessibility attributes
        const hasAriaLabels = content.includes('aria-label')
        const hasAriaDescribedBy = content.includes('aria-describedby')
        const hasRole = content.includes('role=')
        const hasAltText = content.includes('alt=')

        this.results.accessibility[component] = {
          hasAriaLabels,
          hasAriaDescribedBy,
          hasRole,
          hasAltText,
          score: [hasAriaLabels, hasAriaDescribedBy, hasRole, hasAltText].filter(Boolean).length
        }

        this.log(`Accessibility check for ${component}: ${this.results.accessibility[component].score}/4`, 'info')
      }
    }
  }

  async checkSEO() {
    this.log('Running SEO analysis...', 'info')

    const pages = [
      'src/app/page.tsx',
      'src/app/aboutme/page.tsx',
      'src/app/gallery/page.tsx',
      'src/app/socials/page.tsx',
      'src/app/blog/page.tsx'
    ]

    for (const page of pages) {
      const pagePath = path.join(this.projectRoot, page)
      
      if (fs.existsSync(pagePath)) {
        const content = fs.readFileSync(pagePath, 'utf8')
        
        const hasMetadata = content.includes('metadata') || content.includes('Head')
        const hasStructuredData = content.includes('StructuredData')
        const hasHeadings = /h[1-6]/i.test(content)
        const hasImageAlt = content.includes('alt=')

        this.results.seo[page] = {
          hasMetadata,
          hasStructuredData,
          hasHeadings,
          hasImageAlt,
          score: [hasMetadata, hasStructuredData, hasHeadings, hasImageAlt].filter(Boolean).length
        }

        this.log(`SEO check for ${page}: ${this.results.seo[page].score}/4`, 'info')
      }
    }

    // Check for sitemap and robots
    const hasSitemap = fs.existsSync(path.join(this.projectRoot, 'src/app/sitemap.ts'))
    const hasRobots = fs.existsSync(path.join(this.projectRoot, 'src/app/robots.ts'))
    const hasManifest = fs.existsSync(path.join(this.projectRoot, 'public/manifest.json'))

    this.results.seo.infrastructure = {
      hasSitemap,
      hasRobots,
      hasManifest,
      score: [hasSitemap, hasRobots, hasManifest].filter(Boolean).length
    }

    this.log(`SEO infrastructure: ${this.results.seo.infrastructure.score}/3`, 'info')
  }

  async checkPerformanceOptimizations() {
    this.log('Checking performance optimizations...', 'performance')

    const optimizations = {
      serviceWorker: fs.existsSync(path.join(this.projectRoot, 'public/sw.js')),
      lazyLoading: false,
      imageOptimization: false,
      codesplitting: false,
      caching: false
    }

    // Check for lazy loading implementation
    const components = fs.readdirSync(path.join(this.projectRoot, 'src/components'))
      .filter(file => file.endsWith('.tsx'))

    for (const component of components) {
      const content = fs.readFileSync(path.join(this.projectRoot, 'src/components', component), 'utf8')
      
      if (content.includes('lazy') || content.includes('Intersection')) {
        optimizations.lazyLoading = true
      }
      
      if (content.includes('OptimizedImage') || content.includes('next/image')) {
        optimizations.imageOptimization = true
      }
      
      if (content.includes('dynamic') || content.includes('React.lazy')) {
        optimizations.codesplitting = true
      }
      
      if (content.includes('cache') || content.includes('Cache')) {
        optimizations.caching = true
      }
    }

    this.results.performance.optimizations = optimizations
    const optimizationScore = Object.values(optimizations).filter(Boolean).length

    this.log(`Performance optimizations: ${optimizationScore}/${Object.keys(optimizations).length}`, 'performance')
  }

  async generateReport() {
    this.log('Generating comprehensive report...', 'info')

    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        performance: {
          total: Object.keys(this.results.performance).length,
          optimized: Object.values(this.results.performance.optimizations || {}).filter(Boolean).length
        },
        accessibility: {
          components: Object.keys(this.results.accessibility).length,
          averageScore: Object.values(this.results.accessibility).reduce((sum, comp) => sum + comp.score, 0) / Object.keys(this.results.accessibility).length || 0
        },
        seo: {
          pages: Object.keys(this.results.seo).length - 1, // -1 for infrastructure
          averageScore: Object.values(this.results.seo).filter(item => item.score !== undefined).reduce((sum, page) => sum + page.score, 0) / (Object.keys(this.results.seo).length - 1) || 0,
          infrastructureScore: this.results.seo.infrastructure?.score || 0
        }
      },
      detailed: this.results,
      recommendations: this.generateRecommendations()
    }

    // Save report to file
    const reportPath = path.join(this.projectRoot, 'optimization-report.json')
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))

    this.log(`Report saved to: ${reportPath}`, 'success')
    this.displaySummary(report)
  }

  generateRecommendations() {
    const recommendations = []

    // Performance recommendations
    if (this.results.performance.largeImages?.length > 0) {
      recommendations.push({
        category: 'Performance',
        priority: 'High',
        issue: 'Large images detected',
        solution: 'Compress images or convert to WebP/AVIF format',
        files: this.results.performance.largeImages.map(img => img.file)
      })
    }

    if (this.results.performance.missingModernFormats?.length > 0) {
      recommendations.push({
        category: 'Performance',
        priority: 'Medium',
        issue: 'Missing modern image formats',
        solution: 'Create WebP and AVIF versions of images',
        files: this.results.performance.missingModernFormats
      })
    }

    // Accessibility recommendations
    const lowAccessibilityScores = Object.entries(this.results.accessibility)
      .filter(([_, comp]) => comp.score < 3)

    if (lowAccessibilityScores.length > 0) {
      recommendations.push({
        category: 'Accessibility',
        priority: 'High',
        issue: 'Components with low accessibility scores',
        solution: 'Add missing aria-labels, alt text, and semantic roles',
        files: lowAccessibilityScores.map(([file]) => file)
      })
    }

    // SEO recommendations
    const lowSEOScores = Object.entries(this.results.seo)
      .filter(([key, page]) => key !== 'infrastructure' && page.score < 3)

    if (lowSEOScores.length > 0) {
      recommendations.push({
        category: 'SEO',
        priority: 'Medium',
        issue: 'Pages with incomplete SEO optimization',
        solution: 'Add missing metadata, structured data, or proper heading structure',
        files: lowSEOScores.map(([file]) => file)
      })
    }

    return recommendations
  }

  displaySummary(report) {
    console.log('\n' + '='.repeat(60))
    console.log('🚀 WEBSITE OPTIMIZATION REPORT SUMMARY')
    console.log('='.repeat(60))
    
    console.log(`\n📊 Performance Score: ${report.summary.performance.optimized}/${report.summary.performance.total}`)
    console.log(`♿ Accessibility Score: ${report.summary.accessibility.averageScore.toFixed(1)}/4.0`)
    console.log(`🔍 SEO Score: ${report.summary.seo.averageScore.toFixed(1)}/4.0`)
    console.log(`🏗️ SEO Infrastructure: ${report.summary.seo.infrastructureScore}/3`)

    if (report.recommendations.length > 0) {
      console.log('\n📋 TOP RECOMMENDATIONS:')
      report.recommendations.slice(0, 3).forEach((rec, index) => {
        console.log(`${index + 1}. [${rec.priority}] ${rec.category}: ${rec.issue}`)
        console.log(`   💡 ${rec.solution}`)
      })
    } else {
      console.log('\n✅ No critical issues found! Website is well optimized.')
    }

    console.log('\n' + '='.repeat(60))
  }

  async run() {
    this.log('Starting comprehensive website optimization analysis...', 'info')
    
    try {
      await this.runImageOptimization()
      await this.checkAccessibility()
      await this.checkSEO()
      await this.checkPerformanceOptimizations()
      await this.generateReport()
      
      this.log('Optimization analysis complete!', 'success')
    } catch (error) {
      this.log(`Analysis failed: ${error.message}`, 'error')
      console.error(error)
    }
  }
}

// Run the optimizer
if (require.main === module) {
  const optimizer = new WebsiteOptimizer()
  optimizer.run()
}

module.exports = WebsiteOptimizer
