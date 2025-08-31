import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Regulator: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  
  // Form states
  const [formData, setFormData] = useState({
    institutionName: '',
    institutionCode: ''
  })
  const [guidelinesAccepted, setGuidelinesAccepted] = useState(false)
  const [institutions, setInstitutions] = useState<Array<{id: number, name: string, code: string}>>([
    { id: 1, name: 'ShikkhaChain University', code: 'SCU' },
    { id: 2, name: 'Blockchain Academy', code: 'BCA' },
    { id: 3, name: 'Tech Institute', code: 'TI' }
  ])
  const [showFullHash, setShowFullHash] = useState(false)
  const [copied, setCopied] = useState(false)

  // Mock full wallet address
  const fullWalletAddress = '0xca6c8f5a2b1e3d4c5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0cba9'

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the expand/collapse
    try {
      await navigator.clipboard.writeText(fullWalletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced hero section animations
      const tl = gsap.timeline()
      
      tl.fromTo('.regulator-title', 
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
      .fromTo('.regulator-subtitle', 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power3.out' 
        }, '-=0.7'
      )

      // Floating background elements
      gsap.to('.floating-regulator', {
        y: -15,
        x: 8,
        rotation: 3,
        duration: 4,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.6,
          from: 'random'
        }
      })

      // Enhanced form animations
      gsap.fromTo('.form-card', 
        { y: 80, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1.2, 
          ease: 'power4.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Staggered input field animations
      gsap.fromTo('.form-input', 
        { x: -30, opacity: 0 },
        { 
          x: 0, 
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Institution list animation
      gsap.fromTo('.institution-list', 
        { y: 60, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Institution item animations
      gsap.fromTo('.institution-item', 
        { x: 20, opacity: 0 },
        { 
          x: 0, 
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Button hover animations
      const buttons = document.querySelectorAll('.regulator-button')
      buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.02,
            y: -2,
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

      // Regulator title hover animations
      const regulatorTitle = document.querySelector('.regulator-title')
      if (regulatorTitle) {
        const handleMouseEnter = () => {
          gsap.to('.regulator-title', {
            scale: 1.03,
            rotateY: 3,
            duration: 0.6,
            ease: 'power3.out'
          })
          gsap.to('.regulator-title span', {
            y: -6,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
            stagger: 0.05
          })
        }

        const handleMouseLeave = () => {
          gsap.to('.regulator-title', {
            scale: 1,
            rotateY: 0,
            duration: 0.6,
            ease: 'power3.out'
          })
          gsap.to('.regulator-title span', {
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
            stagger: 0.03
          })
        }

        regulatorTitle.addEventListener('mouseenter', handleMouseEnter)
        regulatorTitle.addEventListener('mouseleave', handleMouseLeave)

        return () => {
          regulatorTitle.removeEventListener('mouseenter', handleMouseEnter)
          regulatorTitle.removeEventListener('mouseleave', handleMouseLeave)
        }
      }

      // Wallet hash expand/contract animation
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

      // Custom cursor for regulator section
      const cursor = document.createElement('div')
      cursor.className = 'regulator-cursor'
      cursor.style.cssText = `
        position: fixed;
        width: 16px;
        height: 16px;
        background: rgba(37, 99, 235, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
      `
      document.body.appendChild(cursor)

      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX - 8,
          y: e.clientY - 8,
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddInstitution = () => {
    if (!guidelinesAccepted) {
      alert('Please accept the regulatory guidelines.')
      return
    }
    if (!formData.institutionName.trim() || !formData.institutionCode.trim()) {
      alert('Please fill in all fields.')
      return
    }
    
    const newInstitution = {
      id: institutions.length + 1,
      name: formData.institutionName,
      code: formData.institutionCode.toUpperCase()
    }
    
    setInstitutions(prev => [...prev, newInstitution])
    setFormData({ institutionName: '', institutionCode: '' })
    setGuidelinesAccepted(false)
    
    // Animate the new item
    setTimeout(() => {
      const newItems = document.querySelectorAll('.institution-item:last-child')
      gsap.fromTo(newItems, 
        { scale: 0.8, opacity: 0, x: -20 },
        { scale: 1, opacity: 1, x: 0, duration: 0.5, ease: 'back.out(1.7)' }
      )
    }, 50)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header/Hero Section */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 overflow-hidden">
        {/* Floating background elements */}
        <div className="floating-regulator absolute top-10 right-16 w-16 h-16 bg-white bg-opacity-20 rounded-full blur-sm"></div>
        <div className="floating-regulator absolute top-32 left-20 w-12 h-12 bg-blue-300 bg-opacity-30 rounded-full blur-sm"></div>
        <div className="floating-regulator absolute bottom-20 right-32 w-20 h-20 bg-white bg-opacity-15 rounded-full blur-md"></div>
        <div className="floating-regulator absolute bottom-32 left-16 w-8 h-8 bg-blue-300 bg-opacity-40 rounded-full"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="regulator-title text-5xl md:text-7xl font-black mb-4 tracking-tight cursor-pointer select-none">
            <div className="text-white">
              <span className="inline-block">R</span>
              <span className="inline-block">E</span>
              <span className="inline-block">G</span>
              <span className="inline-block">U</span>
              <span className="inline-block">L</span>
              <span className="inline-block">A</span>
              <span className="inline-block">T</span>
              <span className="inline-block">O</span>
              <span className="inline-block">R</span>
            </div>
            <div className="block text-blue-300 bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text">
              <span className="inline-block">P</span>
              <span className="inline-block">A</span>
              <span className="inline-block">N</span>
              <span className="inline-block">E</span>
              <span className="inline-block">L</span>
            </div>
          </h1>
          <p className="regulator-subtitle text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto font-light">
            Manage and register institutions under verified regulatory guidelines
          </p>
          
          {/* Wallet Connection Display */}
          <div 
            className="wallet-display mt-8 inline-flex items-center gap-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3 cursor-pointer hover:bg-opacity-30 transition-all duration-300"
            onClick={() => setShowFullHash(!showFullHash)}
          >
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
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

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        {/* Institution Registration Section */}
        <section ref={formRef} className="mb-20">
          <div className="form-card bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden border border-gray-100">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-50"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl mb-6">
                  <span className="text-3xl text-white">🏛️</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-3">Register New Institution</h2>
                <p className="text-gray-600 text-lg">Add verified educational institutions to the blockchain network</p>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="form-input">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Institution Name</label>
                    <input
                      type="text"
                      placeholder="e.g., University of Excellence"
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-gray-800"
                      value={formData.institutionName}
                      onChange={(e) => handleInputChange('institutionName', e.target.value)}
                    />
                  </div>

                  <div className="form-input">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Institution Code</label>
                    <input
                      type="text"
                      placeholder="e.g., UIU"
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-gray-800 uppercase"
                      value={formData.institutionCode}
                      onChange={(e) => handleInputChange('institutionCode', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-input mb-8">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <input
                      type="checkbox"
                      id="guidelines"
                      className="mt-1 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      checked={guidelinesAccepted}
                      onChange={(e) => setGuidelinesAccepted(e.target.checked)}
                    />
                    <label htmlFor="guidelines" className="text-sm text-gray-700 leading-relaxed">
                      I confirm that this institution registration complies with the official{' '}
                      <button type="button" className="text-blue-600 font-semibold underline hover:text-blue-800 transition-colors">
                        regulatory guidelines
                      </button>.
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleAddInstitution}
                  className="regulator-button w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-5 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:shadow-xl"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>Add Institution</span>
                    <span className="text-xl">🏛️</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Institution List Section */}
        <section ref={listRef}>
          <div className="institution-list bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden border border-gray-100">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-30"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl mb-6">
                  <span className="text-3xl text-white">📋</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-3">Registered Institutions</h2>
                <p className="text-gray-600 text-lg">Currently verified institutions in the network</p>
              </div>

              <div className="max-w-3xl mx-auto">
                {institutions.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <span className="text-6xl mb-4 block">🏛️</span>
                    <p className="text-lg">No institutions registered yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {institutions.map((institution) => (
                      <div
                        key={institution.id}
                        className="institution-item group bg-gradient-to-r from-blue-50 to-white p-6 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                              {institution.code}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {institution.name}
                              </h3>
                              <p className="text-sm text-gray-600">Code: {institution.code}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                              Verified
                            </span>
                            <span className="text-2xl">✅</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-12 shadow-inner">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-4">
            <span className="text-2xl font-bold">SHIKKHA</span>
            <span className="text-blue-300 text-2xl font-bold">CHAIN</span>
          </div>
          <p className="text-blue-100 text-sm">
            © 2025 ShikkhaChain — A Blockchain Platform for Verifiable Credentials.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Regulator
