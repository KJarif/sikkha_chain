import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced hero section animations with stagger and smooth reveals
      const tl = gsap.timeline()
      
      // Logo reveal with typewriter effect
      tl.fromTo('.hero-title', 
        { y: 120, opacity: 0, rotateX: 45 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0,
          duration: 1.6, 
          ease: 'power4.out',
          delay: 0.3
        }
      )
      .fromTo('.hero-subtitle', 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          ease: 'power3.out' 
        }, '-=0.8'
      )
      .fromTo('.hero-cta', 
        { scale: 0.8, opacity: 0, y: 30 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0,
          duration: 1, 
          ease: 'back.out(1.7)' 
        }, '-=0.5'
      )

      // Floating background elements
      gsap.to('.floating-element', {
        y: -20,
        x: 10,
        rotation: 5,
        duration: 3,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.5,
          from: 'random'
        }
      })

      // Enhanced features animation with magnetic hover effect
      gsap.fromTo('.feature-card', 
        { y: 120, opacity: 0, scale: 0.85, rotateY: 15 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          rotateY: 0,
          duration: 1.2, 
          ease: 'power4.out',
          stagger: {
            each: 0.15,
            from: 'start'
          },
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
              gsap.to('.features-title', {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
              })
            }
          }
        }
      )

      // Advanced stats counter with number animation
      const statNumbers = document.querySelectorAll('.stat-number')
      statNumbers.forEach((stat) => {
        const finalValue = stat.textContent || '0'
        const numValue = parseInt(finalValue.replace(/\D/g, ''))
        
        gsap.fromTo(stat, 
          { scale: 0.3, opacity: 0, rotateX: 90 },
          { 
            scale: 1, 
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 75%',
              onEnter: () => {
                gsap.to({}, {
                  duration: 2,
                  ease: 'power2.out',
                  onUpdate: function() {
                    const progress = this.progress()
                    const currentValue = Math.round(numValue * progress)
                    stat.textContent = currentValue + (finalValue.includes('+') ? '+' : '')
                  }
                })
              }
            }
          }
        )
      })

      // Enhanced CTA section with parallax effect
      gsap.fromTo('.cta-content', 
        { y: 80, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Horizontal scroll section with enhanced parallax
      if (horizontalRef.current) {
        const horizontalContainer = horizontalRef.current.querySelector('.flex')
        if (horizontalContainer) {
          gsap.to(horizontalContainer, {
            x: () => -(horizontalContainer.scrollWidth - window.innerWidth),
            ease: 'none',
            scrollTrigger: {
              trigger: horizontalRef.current,
              pin: true,
              scrub: 2,
              end: () => "+=" + (horizontalContainer.scrollWidth - window.innerWidth),
              anticipatePin: 1,
              onUpdate: (self) => {
                // Add parallax effect to panels
                gsap.to('.horizontal-panel', {
                  backgroundPositionX: `${-50 + (self.progress * 100)}%`,
                  duration: 0.3
                })
              }
            }
          })
        }
      }

      // Mouse follower effect
      const cursor = document.createElement('div')
      cursor.className = 'custom-cursor'
      cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(255, 193, 7, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
      `
      document.body.appendChild(cursor)

      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX - 10,
          y: e.clientY - 10,
          duration: 0.3,
          ease: 'power2.out'
        })
      }

      document.addEventListener('mousemove', moveCursor)

      // Cleanup cursor on component unmount
      return () => {
        document.removeEventListener('mousemove', moveCursor)
        if (cursor.parentNode) {
          cursor.parentNode.removeChild(cursor)
        }
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        {/* Floating background elements */}
        <div className="floating-element absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full opacity-20 blur-sm"></div>
        <div className="floating-element absolute top-1/3 right-16 w-16 h-16 bg-gradient-to-br from-black to-gray-800 rounded-full opacity-15 blur-sm"></div>
        <div className="floating-element absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-400 rounded-full opacity-25 blur-sm"></div>
        <div className="floating-element absolute bottom-1/3 right-1/3 w-8 h-8 bg-black rounded-full opacity-20"></div>
        
        <div className="text-center max-w-5xl mx-auto z-10 relative">
          <div className="mb-8">
            <h1 className="hero-title text-7xl md:text-9xl font-black text-black mb-4 leading-none tracking-tight">
              SHIKKHA
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">CHAIN</span>
            </h1>
          </div>
          <p className="hero-subtitle text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            The future of education verification is here. Secure, transparent, and globally recognized blockchain-based credentials.
          </p>
          <div className="hero-cta flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group bg-black text-white px-12 py-5 rounded-full text-lg font-semibold hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <span className="mr-2">Get Started</span>
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </button>
            <button className="group border-2 border-black text-black px-12 py-5 rounded-full text-lg font-semibold hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105">
              <span className="mr-2">Learn More</span>
              <span className="inline-block transition-transform group-hover:translate-x-1">↗</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-32 px-6 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-50 blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto">
          <h2 className="features-title text-5xl md:text-7xl font-black text-center mb-20 text-black tracking-tight">
            WHY CHOOSE
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">SHIKKHACHAIN</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="feature-card group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-6 transition-transform duration-300">
                  <span className="text-3xl">🔗</span>
                </div>
                <h3 className="text-3xl font-bold mb-6 text-black group-hover:text-yellow-600 transition-colors">Blockchain Security</h3>
                <p className="text-gray-600 text-lg leading-relaxed">Secure and immutable educational records powered by cutting-edge blockchain technology. Your credentials are protected forever.</p>
              </div>
            </div>
            
            <div className="feature-card group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-6 transition-transform duration-300">
                  <span className="text-3xl">📚</span>
                </div>
                <h3 className="text-3xl font-bold mb-6 text-black group-hover:text-yellow-600 transition-colors">Smart Credentials</h3>
                <p className="text-gray-600 text-lg leading-relaxed">Verifiable digital certificates that employers and institutions can trust. Instant verification, global recognition.</p>
              </div>
            </div>
            
            <div className="feature-card group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-6 transition-transform duration-300">
                  <span className="text-3xl">🌐</span>
                </div>
                <h3 className="text-3xl font-bold mb-6 text-black group-hover:text-yellow-600 transition-colors">Global Access</h3>
                <p className="text-gray-600 text-lg leading-relaxed">Access your educational achievements from anywhere in the world. Borderless education verification.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Technology Showcase */}
      <section ref={horizontalRef} className="relative h-screen overflow-hidden">
        <div className="flex h-full w-[300vw]">
          <div className="horizontal-panel w-screen h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 text-white">
            <div className="text-center max-w-2xl">
              <h2 className="text-5xl font-bold mb-6">Blockchain Technology</h2>
              <p className="text-xl opacity-90">Immutable, secure, and transparent educational records</p>
              <div className="mt-8 text-6xl">⛓️</div>
            </div>
          </div>
          <div className="horizontal-panel w-screen h-full flex items-center justify-center bg-gradient-to-br from-green-600 to-teal-600 text-white">
            <div className="text-center max-w-2xl">
              <h2 className="text-5xl font-bold mb-6">Smart Contracts</h2>
              <p className="text-xl opacity-90">Automated verification and credential issuance</p>
              <div className="mt-8 text-6xl">📜</div>
            </div>
          </div>
          <div className="horizontal-panel w-screen h-full flex items-center justify-center bg-gradient-to-br from-orange-600 to-red-600 text-white">
            <div className="text-center max-w-2xl">
              <h2 className="text-5xl font-bold mb-6">Global Network</h2>
              <p className="text-xl opacity-90">Worldwide recognition and interoperability</p>
              <div className="mt-8 text-6xl">🌍</div>
            </div>
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center cta-content">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-8">
            Ready to Transform Education?
          </h2>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
            Join thousands of students and institutions already using ShikkhaChain to secure and verify educational achievements.
          </p>
          <div className="space-x-4">
            <button className="bg-yellow-400 text-black px-10 py-4 rounded-full text-xl font-semibold hover:bg-yellow-500 transition-colors">
              Start Your Journey
            </button>
            <button className="border-2 border-gray-400 text-gray-700 px-10 py-4 rounded-full text-xl font-semibold hover:border-black hover:text-black transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
