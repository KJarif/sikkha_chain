import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

gsap.registerPlugin(ScrollTrigger)

const Report: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const filtersRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)
  const chartsRef = useRef<HTMLDivElement>(null)
  const analyticsRef = useRef<HTMLDivElement>(null)
  const certificatesRef = useRef<HTMLDivElement>(null)
  
  // State for filters and data
  const [selectedInstitution, setSelectedInstitution] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [showFullHash, setShowFullHash] = useState(false)
  const [copied, setCopied] = useState(false)
  const [timeRange, setTimeRange] = useState('This Year')

  // Mock full wallet address
  const fullWalletAddress = '0xca6c8f5a2b1e3d4c5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0cba9'

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(fullWalletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  // Mock data for charts
  const institutionData = [
    { name: 'ShikkhaChain University', valid: 45, revoked: 3, total: 48 },
    { name: 'Blockchain Academy', valid: 32, revoked: 2, total: 34 },
    { name: 'Tech Institute', valid: 28, revoked: 1, total: 29 },
    { name: 'Digital College', valid: 22, revoked: 4, total: 26 },
  ]

  const monthlyData = [
    { month: 'Jan', issued: 12, revoked: 1 },
    { month: 'Feb', issued: 19, revoked: 0 },
    { month: 'Mar', issued: 15, revoked: 2 },
    { month: 'Apr', issued: 22, revoked: 1 },
    { month: 'May', issued: 28, revoked: 3 },
    { month: 'Jun', issued: 31, revoked: 1 },
  ]

  const credentialTypes = [
    { name: 'Certificates', value: 45, color: '#22c55e' },
    { name: 'Diplomas', value: 30, color: '#3b82f6' },
    { name: 'Degrees', value: 35, color: '#f59e0b' },
    { name: 'Professional', value: 27, color: '#ef4444' },
  ]

  const mockCertificates = [
    {
      id: '1',
      hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
      studentName: 'Ahsan Farabi',
      course: 'Blockchain Fundamentals',
      institution: 'ShikkhaChain University',
      issueDate: '2025-01-15',
      status: 'Valid',
      grade: 'A+'
    },
    {
      id: '2',
      hash: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c',
      studentName: 'Sarah Johnson',
      course: 'Smart Contracts Development',
      institution: 'Blockchain Academy',
      issueDate: '2025-01-20',
      status: 'Valid',
      grade: 'A'
    },
    {
      id: '3',
      hash: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
      studentName: 'Mike Chen',
      course: 'Cryptocurrency Economics',
      institution: 'Tech Institute',
      issueDate: '2025-01-10',
      status: 'Revoked',
      grade: 'B+'
    }
  ]

  const institutions = ['All', 'ShikkhaChain University', 'Blockchain Academy', 'Tech Institute', 'Digital College']

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced hero section animations
      const tl = gsap.timeline()
      
      tl.fromTo('.report-title', 
        { y: 100, opacity: 0, rotateX: 45 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0,
          duration: 1.4, 
          ease: 'power4.out',
          delay: 0.2
        }
      )
      .fromTo('.report-subtitle', 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power3.out' 
        }, '-=0.7'
      )

      // Floating background elements
      gsap.to('.floating-report', {
        y: -20,
        x: 10,
        rotation: 5,
        duration: 4,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.6,
          from: 'random'
        }
      })

      // Filter section animations
      gsap.fromTo('.filter-card', 
        { y: 60, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: filtersRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Charts animation
      gsap.fromTo('.chart-container', 
        { y: 80, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: chartsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Analytics cards animation
      gsap.fromTo('.analytics-card', 
        { x: -50, opacity: 0, rotateY: 15 },
        { 
          x: 0, 
          opacity: 1, 
          rotateY: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: analyticsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Certificate list animation
      gsap.fromTo('.certificate-item', 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: certificatesRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Horizontal scroll analytics section
      if (horizontalRef.current) {
        const horizontalContainer = horizontalRef.current.querySelector('.horizontal-flex') as HTMLElement | null
        if (horizontalContainer) {
          const panels = horizontalRef.current.querySelectorAll('.horizontal-analytics-panel')
          const panelCount = panels ? panels.length : 1
          // With an extra buffer screen at the end, the total scroll distance spans panelCount steps.
          // Snap exactly to each panel index (0..panelCount-1) but not to the trailing buffer.
          const snapPoints = Array.from({ length: panelCount }, (_, i) => i / Math.max(panelCount, 1))

          gsap.to(horizontalContainer, {
            x: () => -(horizontalContainer.scrollWidth - window.innerWidth),
            ease: 'none',
            scrollTrigger: {
              trigger: horizontalRef.current,
              pin: true,
              scrub: 0.5, // Smooth scrubbing
              end: () => "+=" + (horizontalContainer.scrollWidth - window.innerWidth),
              anticipatePin: 1,
              invalidateOnRefresh: true,
              // Snap to each panel (avoid snapping to the buffer)
              snap: {
                snapTo: snapPoints,
                duration: 0.8,
                delay: 0.1,
                ease: 'power2.inOut'
              },
              onUpdate: (self) => {
                // Smoother parallax effect
                gsap.to('.horizontal-analytics-panel', {
                  backgroundPositionX: `${-50 + self.progress * 100}%`,
                  duration: 0.1, // Faster response for smoother effect
                  ease: 'none'
                })
              },
              onRefresh: () => {
                // Ensure smooth recalculation on resize
                if (horizontalContainer) {
                  gsap.set(horizontalContainer, { clearProps: 'x' })
                }
              }
            }
          })
        }
      }

      // Interactive elements
      const buttons = document.querySelectorAll('.report-button')
      buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.03,
            y: -3,
            duration: 0.3,
            ease: 'power2.out'
          })
        })
        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          })
        })
      })

      // Wallet display animation
      const walletDisplay = document.querySelector('.wallet-display')
      if (walletDisplay) {
        walletDisplay.addEventListener('click', () => {
          gsap.to(walletDisplay, {
            scale: 0.95,
            duration: 0.1,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
          })
        })
      }

      // Report title hover animation
      const reportTitle = document.querySelector('.report-title')
      if (reportTitle) {
        const handleMouseEnter = () => {
          gsap.to('.report-title span', {
            y: -8,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
            stagger: 0.05
          })
        }

        const handleMouseLeave = () => {
          gsap.to('.report-title span', {
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
            stagger: 0.03
          })
        }

        reportTitle.addEventListener('mouseenter', handleMouseEnter)
        reportTitle.addEventListener('mouseleave', handleMouseLeave)

        return () => {
          reportTitle.removeEventListener('mouseenter', handleMouseEnter)
          reportTitle.removeEventListener('mouseleave', handleMouseLeave)
        }
      }

      // Custom cursor
      const cursor = document.createElement('div')
      cursor.className = 'report-cursor'
      cursor.style.cssText = `
        position: fixed;
        width: 18px;
        height: 18px;
        background: rgba(249, 115, 22, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
      `
      document.body.appendChild(cursor)

      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX - 9,
          y: e.clientY - 9,
          duration: 0.3,
          ease: 'power2.out'
        })
      }

      document.addEventListener('mousemove', moveCursor)

      return () => {
        document.removeEventListener('mousemove', moveCursor)
        if (cursor.parentNode) {
          cursor.parentNode.removeChild(cursor)
        }
      }
    })

    return () => ctx.revert()
  }, [])

  const filteredCertificates = mockCertificates.filter(cert => {
    const matchesInstitution = selectedInstitution === 'All' || cert.institution === selectedInstitution
    const matchesSearch = cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.course.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesInstitution && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header/Hero Section */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white py-20 overflow-hidden">
        {/* Floating background elements */}
        <div className="floating-report absolute top-12 right-20 w-20 h-20 bg-white bg-opacity-20 rounded-full blur-sm"></div>
        <div className="floating-report absolute top-40 left-16 w-14 h-14 bg-yellow-400 bg-opacity-30 rounded-full blur-sm"></div>
        <div className="floating-report absolute bottom-24 right-40 w-24 h-24 bg-white bg-opacity-15 rounded-full blur-md"></div>
        <div className="floating-report absolute bottom-40 left-20 w-10 h-10 bg-orange-300 bg-opacity-40 rounded-full"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="report-title text-5xl md:text-7xl font-black mb-4 tracking-tight cursor-pointer select-none">
            <div className="text-white">
              <span className="inline-block">C</span>
              <span className="inline-block">E</span>
              <span className="inline-block">R</span>
              <span className="inline-block">T</span>
              <span className="inline-block">I</span>
              <span className="inline-block">F</span>
              <span className="inline-block">I</span>
              <span className="inline-block">C</span>
              <span className="inline-block">A</span>
              <span className="inline-block">T</span>
              <span className="inline-block">E</span>
            </div>
            <div className="block text-yellow-300 bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text">
              <span className="inline-block">R</span>
              <span className="inline-block">E</span>
              <span className="inline-block">P</span>
              <span className="inline-block">O</span>
              <span className="inline-block">R</span>
              <span className="inline-block">T</span>
              <span className="inline-block">S</span>
            </div>
          </h1>
          <p className="report-subtitle text-xl md:text-2xl text-orange-100 max-w-2xl mx-auto font-light">
            Comprehensive analytics and insights into blockchain certificate issuance
          </p>
          
          {/* Wallet Connection Display */}
          <div 
            className="wallet-display mt-8 inline-flex items-center gap-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3 cursor-pointer hover:bg-opacity-30 transition-all duration-300"
            onClick={() => setShowFullHash(!showFullHash)}
          >
            <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium font-mono text-black">
              Connected: {showFullHash ? fullWalletAddress : '0xca6c...cba9'}
            </span>
            <button
              onClick={copyToClipboard}
              className="text-2xl hover:scale-110 transition-transform duration-200"
              title={copied ? 'Copied!' : 'Copy address'}
            >
              {copied ? '✅' : '🔗'}
            </button>
            <span className="text-lg text-black hover:scale-110 transition-transform duration-200 cursor-pointer">
              {showFullHash ? '🙈' : '👁️'}
            </span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 max-w-7xl">
        {/* Filters Section */}
        <section ref={filtersRef} className="mb-16">
          <div className="filter-card bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden border border-orange-100">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-50"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl mb-4">
                  <span className="text-2xl text-white">🔍</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Search & Filter</h2>
                <p className="text-gray-600">Find specific certificates and analyze data patterns</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Institution</label>
                  <select
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 text-gray-800"
                    value={selectedInstitution}
                    onChange={(e) => setSelectedInstitution(e.target.value)}
                  >
                    {institutions.map(inst => (
                      <option key={inst} value={inst}>{inst}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
                  <input
                    type="text"
                    placeholder="Search by student name or course..."
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 text-gray-800"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Time Range</label>
                  <select
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 text-gray-800"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                  >
                    <option value="This Week">This Week</option>
                    <option value="This Month">This Month</option>
                    <option value="This Year">This Year</option>
                    <option value="All Time">All Time</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics Cards */}
        <section ref={analyticsRef} className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="analytics-card bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">✅</span>
                </div>
                <span className="text-2xl font-bold text-green-600">127</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Total Valid</h3>
              <p className="text-xs text-gray-500">+12% from last month</p>
            </div>

            <div className="analytics-card bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">❌</span>
                </div>
                <span className="text-2xl font-bold text-red-600">10</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Revoked</h3>
              <p className="text-xs text-gray-500">-5% from last month</p>
            </div>

            <div className="analytics-card bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">🏛️</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Institutions</h3>
              <p className="text-xs text-gray-500">Active partners</p>
            </div>

            <div className="analytics-card bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">📈</span>
                </div>
                <span className="text-2xl font-bold text-purple-600">94%</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Success Rate</h3>
              <p className="text-xs text-gray-500">Verification accuracy</p>
            </div>
          </div>
        </section>

        {/* Horizontal Analytics Showcase */}
        <section ref={horizontalRef} className="relative h-screen overflow-hidden mb-16">
          <div className="horizontal-flex flex h-full w-[500vw]">
            {/* Institution Statistics Panel */}
            <div className="horizontal-analytics-panel w-screen h-full flex items-center justify-center bg-gradient-to-br from-green-600 to-emerald-700 text-white relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="text-center max-w-4xl mx-auto p-8 relative z-10">
                <div className="mb-6">
                  <div className="text-6xl md:text-8xl mb-4">📊</div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">Institution Analytics</h2>
                  <p className="text-lg md:text-xl opacity-90 mb-8">Certificate status distribution across institutions</p>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={institutionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                      <XAxis 
                        dataKey="name" 
                        tick={{fontSize: 12, fill: '#ffffff'}} 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        axisLine={{stroke: 'rgba(255,255,255,0.5)'}}
                        tickLine={{stroke: 'rgba(255,255,255,0.5)'}}
                      />
                      <YAxis 
                        tick={{fill: '#ffffff'}}
                        axisLine={{stroke: 'rgba(255,255,255,0.5)'}}
                        tickLine={{stroke: 'rgba(255,255,255,0.5)'}}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="valid" fill="#10b981" name="Valid" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="revoked" fill="#ef4444" name="Revoked" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Credential Types Panel */}
            <div className="horizontal-analytics-panel w-screen h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="text-center max-w-4xl mx-auto p-8 relative z-10">
                <div className="mb-6">
                  <div className="text-6xl md:text-8xl mb-4">🎯</div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">Credential Distribution</h2>
                  <p className="text-lg md:text-xl opacity-90 mb-8">Breakdown of issued credential types across the platform</p>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={credentialTypes}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({name, percent}) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                        labelLine={{stroke: '#ffffff'}}
                      >
                        {credentialTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Monthly Trends Panel */}
            <div className="horizontal-analytics-panel w-screen h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-700 text-white relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="text-center max-w-4xl mx-auto p-8 relative z-10">
                <div className="mb-6">
                  <div className="text-6xl md:text-8xl mb-4">📈</div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">Growth Trends</h2>
                  <p className="text-lg md:text-xl opacity-90 mb-8">Monthly certificate issuance and revocation patterns</p>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                      <XAxis 
                        dataKey="month" 
                        tick={{fill: '#ffffff'}}
                        axisLine={{stroke: 'rgba(255,255,255,0.5)'}}
                        tickLine={{stroke: 'rgba(255,255,255,0.5)'}}
                      />
                      <YAxis 
                        tick={{fill: '#ffffff'}}
                        axisLine={{stroke: 'rgba(255,255,255,0.5)'}}
                        tickLine={{stroke: 'rgba(255,255,255,0.5)'}}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="issued" 
                        stroke="#10b981" 
                        strokeWidth={4}
                        name="Issued"
                        dot={{fill: '#10b981', strokeWidth: 3, r: 8}}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="revoked" 
                        stroke="#ef4444" 
                        strokeWidth={4}
                        name="Revoked"
                        dot={{fill: '#ef4444', strokeWidth: 3, r: 8}}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Performance Metrics Panel */}
            <div className="horizontal-analytics-panel w-screen h-full flex items-center justify-center bg-gradient-to-br from-orange-600 to-red-700 relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="text-center max-w-4xl mx-auto p-6 relative z-10 text-black">
                <div className="mb-6">
                  <div className="text-6xl md:text-8xl mb-4">🚀</div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">Platform Metrics</h2>
                  <p className="text-lg md:text-xl opacity-90 mb-6">Real-time platform performance and success indicators</p>
                </div>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 md:p-6">
                    <div className="text-4xl md:text-5xl mb-2">⚡</div>
                    <div className="text-3xl md:text-4xl font-bold mb-1">127</div>
                    <div className="text-sm md:text-lg opacity-90">Active Certificates</div>
                    <div className="text-xs md:text-sm opacity-70 mt-1">+12% this month</div>
                  </div>
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 md:p-6">
                    <div className="text-4xl md:text-5xl mb-2">🎓</div>
                    <div className="text-3xl md:text-4xl font-bold mb-1">4</div>
                    <div className="text-sm md:text-lg opacity-90">Partner Institutions</div>
                    <div className="text-xs md:text-sm opacity-70 mt-1">Verified & Active</div>
                  </div>
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 md:p-6">
                    <div className="text-4xl md:text-5xl mb-2">📊</div>
                    <div className="text-3xl md:text-4xl font-bold mb-1">94%</div>
                    <div className="text-sm md:text-lg opacity-90">Success Rate</div>
                    <div className="text-xs md:text-sm opacity-70 mt-1">Verification accuracy</div>
                  </div>
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 md:p-6">
                    <div className="text-4xl md:text-5xl mb-2">🔐</div>
                    <div className="text-3xl md:text-4xl font-bold mb-1">100%</div>
                    <div className="text-sm md:text-lg opacity-90">Security Score</div>
                    <div className="text-xs md:text-sm opacity-70 mt-1">Blockchain secured</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Extra space for proper scrolling */}
            <div className="w-screen h-full flex-shrink-0"></div>
          </div>
        </section>

        {/* Certificates List */}
        <section ref={certificatesRef}>
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl mb-4">
                <span className="text-2xl text-white">📋</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Recent Certificates</h2>
              <p className="text-gray-600">Latest certificate records matching your filters</p>
            </div>

            {filteredCertificates.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-xl text-gray-500 mb-2">No certificates match your filters</p>
                <p className="text-gray-400">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCertificates.map((cert) => (
                  <div key={cert.id} className="certificate-item group bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="grid md:grid-cols-4 gap-4 items-center">
                      <div>
                        <h4 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{cert.studentName}</h4>
                        <p className="text-sm text-gray-600">{cert.course}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">{cert.institution}</p>
                        <p className="text-xs text-gray-500">Grade: {cert.grade}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{new Date(cert.issueDate).toLocaleDateString()}</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          cert.status === 'Valid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {cert.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 font-mono">
                          {cert.hash.substring(0, 10)}...{cert.hash.substring(cert.hash.length - 8)}
                        </p>
                        <button className="report-button text-orange-600 hover:text-orange-800 text-sm font-semibold mt-1 transition-colors">
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-700 to-orange-800 text-white py-12 shadow-inner">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-4">
            <span className="text-2xl font-bold">SHIKKHA</span>
            <span className="text-yellow-400 text-2xl font-bold">CHAIN</span>
          </div>
          <p className="text-orange-100 text-sm">
            © 2025 ShikkhaChain — A Blockchain Platform for Verifiable Credentials.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Report
