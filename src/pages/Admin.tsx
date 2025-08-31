import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Admin: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const revokeRef = useRef<HTMLDivElement>(null)
  
  // Form states
  const [formData, setFormData] = useState({
    studentName: '',
    course: '',
    duration: '',
    grade: '',
    credentialType: '',
    institution: ''
  })
  const [revokeHash, setRevokeHash] = useState('')
  const [guidelinesAccepted, setGuidelinesAccepted] = useState(false)
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
      
      tl.fromTo('.admin-title', 
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
      .fromTo('.admin-subtitle', 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power3.out' 
        }, '-=0.7'
      )

      // Floating background elements
      gsap.to('.floating-admin', {
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

      // Revoke section animation
      gsap.fromTo('.revoke-card', 
        { y: 60, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: revokeRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Button hover animations
      const buttons = document.querySelectorAll('.admin-button')
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

      // Admin title hover animations
      const adminTitle = document.querySelector('.admin-title')
      if (adminTitle) {
        const handleMouseEnter = () => {
          gsap.to('.admin-title', {
            scale: 1.03,
            rotateY: 3,
            duration: 0.6,
            ease: 'power3.out'
          })
          gsap.to('.admin-title span', {
            y: -6,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
            stagger: 0.05
          })
        }

        const handleMouseLeave = () => {
          gsap.to('.admin-title', {
            scale: 1,
            rotateY: 0,
            duration: 0.6,
            ease: 'power3.out'
          })
          gsap.to('.admin-title span', {
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
            stagger: 0.03
          })
        }

        adminTitle.addEventListener('mouseenter', handleMouseEnter)
        adminTitle.addEventListener('mouseleave', handleMouseLeave)

        // Cleanup function
        return () => {
          adminTitle.removeEventListener('mouseenter', handleMouseEnter)
          adminTitle.removeEventListener('mouseleave', handleMouseLeave)
        }
      }

      // Custom cursor for admin section
      const cursor = document.createElement('div')
      cursor.className = 'admin-cursor'
      cursor.style.cssText = `
        position: fixed;
        width: 16px;
        height: 16px;
        background: rgba(34, 197, 94, 0.8);
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

  const handleIssueCertificate = () => {
    if (!guidelinesAccepted) {
      alert('Please accept the certificate issuance guidelines.')
      return
    }
    // Add certificate issuance logic here
    console.log('Issuing certificate:', formData)
  }

  const handleRevokeCertificate = () => {
    if (!revokeHash.trim()) {
      alert('Please enter a certificate hash.')
      return
    }
    // Add certificate revocation logic here
    console.log('Revoking certificate:', revokeHash)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header/Hero Section */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-20 overflow-hidden">
        {/* Floating background elements */}
        <div className="floating-admin absolute top-10 right-16 w-16 h-16 bg-white bg-opacity-20 rounded-full blur-sm"></div>
        <div className="floating-admin absolute top-32 left-20 w-12 h-12 bg-yellow-400 bg-opacity-30 rounded-full blur-sm"></div>
        <div className="floating-admin absolute bottom-20 right-32 w-20 h-20 bg-white bg-opacity-15 rounded-full blur-md"></div>
        <div className="floating-admin absolute bottom-32 left-16 w-8 h-8 bg-green-300 bg-opacity-40 rounded-full"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="admin-title text-5xl md:text-7xl font-black mb-4 tracking-tight cursor-pointer select-none">
            <div className="text-white">
              <span className="inline-block">A</span>
              <span className="inline-block">D</span>
              <span className="inline-block">M</span>
              <span className="inline-block">I</span>
              <span className="inline-block">N</span>
            </div>
            <div className="block text-yellow-400 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text">
              <span className="inline-block">P</span>
              <span className="inline-block">A</span>
              <span className="inline-block">N</span>
              <span className="inline-block">E</span>
              <span className="inline-block">L</span>
            </div>
          </h1>
          <p className="admin-subtitle text-xl md:text-2xl text-green-100 max-w-2xl mx-auto font-light">
            Issue and revoke academic certificates on the blockchain with enterprise-grade security
          </p>
          
          {/* Wallet Connection Display */}
          <div 
            className="wallet-display mt-8 inline-flex items-center gap-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3 cursor-pointer hover:bg-opacity-30 transition-all duration-300"
            onClick={() => setShowFullHash(!showFullHash)}
          >
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
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
        {/* Certificate Issuance Section */}
        <section ref={formRef} className="mb-20">
          <div className="form-card bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden border border-gray-100">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-50"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl mb-6">
                  <span className="text-3xl text-white">📜</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-3">Issue Certificate</h2>
                <p className="text-gray-600 text-lg">Create verifiable blockchain credentials</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="form-input">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Student Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Ahsan Farabi"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-gray-800"
                    value={formData.studentName}
                    onChange={(e) => handleInputChange('studentName', e.target.value)}
                  />
                </div>

                <div className="form-input">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Course</label>
                  <input
                    type="text"
                    placeholder="e.g., Blockchain Fundamentals"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-gray-800"
                    value={formData.course}
                    onChange={(e) => handleInputChange('course', e.target.value)}
                  />
                </div>

                <div className="form-input">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                  <select
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-gray-800"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                  >
                    <option value="">Select Duration</option>
                    <option value="1 Month">1 Month</option>
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months">6 Months</option>
                    <option value="1 Year">1 Year</option>
                    <option value="2 Years">2 Years</option>
                    <option value="3 Years">3 Years</option>
                    <option value="4 Years">4 Years</option>
                  </select>
                </div>

                <div className="form-input">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Grade</label>
                  <input
                    type="text"
                    placeholder="e.g., A+, Distinction, Passed"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-gray-800"
                    value={formData.grade}
                    onChange={(e) => handleInputChange('grade', e.target.value)}
                  />
                </div>

                <div className="form-input">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Credential Type</label>
                  <select
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-gray-800"
                    value={formData.credentialType}
                    onChange={(e) => handleInputChange('credentialType', e.target.value)}
                  >
                    <option value="">Select Credential Type</option>
                    <option value="Certificate">Certificate</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Degree">Degree</option>
                    <option value="Professional Certification">Professional Certification</option>
                  </select>
                </div>

                <div className="form-input">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Institution</label>
                  <select
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-gray-800"
                    value={formData.institution}
                    onChange={(e) => handleInputChange('institution', e.target.value)}
                  >
                    <option value="">Select Institution</option>
                    <option value="ShikkhaChain University">ShikkhaChain University</option>
                    <option value="Blockchain Academy">Blockchain Academy</option>
                    <option value="Tech Institute">Tech Institute</option>
                  </select>
                </div>
              </div>

              <div className="form-input mb-8">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <input
                    type="checkbox"
                    id="guidelines"
                    className="mt-1 w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                    checked={guidelinesAccepted}
                    onChange={(e) => setGuidelinesAccepted(e.target.checked)}
                  />
                  <label htmlFor="guidelines" className="text-sm text-gray-700 leading-relaxed">
                    I confirm this issuance complies with the{' '}
                    <button type="button" className="text-green-600 font-semibold underline hover:text-green-800 transition-colors">
                      certificate issuance guidelines
                    </button>.
                  </label>
                </div>
              </div>

              <button
                onClick={handleIssueCertificate}
                className="admin-button w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-5 rounded-xl text-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:shadow-xl"
              >
                <span className="flex items-center justify-center gap-2">
                  <span>Issue Certificate</span>
                  <span className="text-xl">⚡</span>
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Certificate Revocation Section */}
        <section ref={revokeRef}>
          <div className="revoke-card bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden border border-red-100">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-50"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-6">
                  <span className="text-3xl text-white">🚫</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-3">Revoke Certificate</h2>
                <p className="text-gray-600 text-lg">Permanently invalidate a blockchain credential</p>
              </div>

              <div className="max-w-md mx-auto">
                <div className="form-input mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Certificate Hash</label>
                  <input
                    type="text"
                    placeholder="Enter Certificate Hash (0x...)"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100 transition-all duration-300 text-gray-800 font-mono text-sm"
                    value={revokeHash}
                    onChange={(e) => setRevokeHash(e.target.value)}
                  />
                </div>

                <button
                  onClick={handleRevokeCertificate}
                  className="admin-button w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-5 rounded-xl text-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:shadow-xl"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>Revoke Certificate</span>
                    <span className="text-xl">⚠️</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-700 to-green-800 text-white py-12 shadow-inner">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-4">
            <span className="text-2xl font-bold">SHIKKHA</span>
            <span className="text-yellow-400 text-2xl font-bold">CHAIN</span>
          </div>
          <p className="text-green-100 text-sm">
            © 2025 ShikkhaChain — A Blockchain Platform for Verifiable Credentials.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Admin
