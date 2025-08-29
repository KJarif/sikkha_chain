import React, { useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

const Header: React.FC = () => {
  const textRef = useRef<HTMLDivElement | null>(null)
  const leftTweenRef = useRef<gsap.core.Timeline | null>(null)
  const rightTweenRef = useRef<gsap.core.Timeline | null>(null)
  const leftText = 'Shikkha'
  const rightText = 'Chain'
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)
  const location = useLocation()
  const navRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({})

  const handleNavHover = (path: string, element: HTMLAnchorElement | null) => {
    const isCurrentPage = location.pathname === path
    if (isCurrentPage) return // Don't animate if already active
    
    setHoveredPath(path)
    if (element) {
      const tl = gsap.timeline()
      tl.to(element, { scale: 0.95, duration: 0.1, ease: 'power1.inOut' })
        .to(element, { scale: 1.08, duration: 0.15, ease: 'power1.inOut' })
        .to(element, { scale: 0.99, duration: 0.08, ease: 'power1.inOut' })
        .to(element, { scale: 1.03, duration: 0.12, ease: 'power1.inOut' })
        .to(element, { scale: 1.005, duration: 0.06, ease: 'power1.inOut' })
        .to(element, { scale: 1.01, duration: 0.08, ease: 'power1.inOut' })
    }
  }

  const handleNavLeave = (path: string, element: HTMLAnchorElement | null) => {
    const isCurrentPage = location.pathname === path
    if (isCurrentPage) return // Don't animate if already active
    
    setHoveredPath(null)
    if (element) {
      gsap.to(element, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      })
    }
  }

  const linkClass = (path: string) => {
    const isCurrentPage = location.pathname === path
    const isHovered = hoveredPath === path
    const shouldShowActive = hoveredPath ? isHovered : isCurrentPage
    
    return `px-4 py-2 transition-colors ${
      shouldShowActive 
        ? 'rounded-full bg-black text-white' 
        : 'rounded bg-[#FFD93D] text-black hover:bg-yellow-400'
    }`
  }

  const handleMouseEnter = () => {
    // prevent stacking tweens on repeated enters
    leftTweenRef.current?.kill()
    rightTweenRef.current?.kill()
    const root = textRef.current
    if (!root) return
    const leftWord = root.querySelector<HTMLSpanElement>('.logo-left')
    const rightWord = root.querySelector<HTMLSpanElement>('.logo-right')

    gsap.set([leftWord, rightWord], { display: 'inline-block', y: 0 })

    leftTweenRef.current = gsap.timeline()
      .to(leftWord, {
        y: -6,
        duration: 0.15,
        ease: 'power3.out',
      })
      .to(leftWord, {
        y: 0,
        duration: 0.1,
        ease: 'power3.in',
      })

    rightTweenRef.current = gsap.timeline({ delay: 0.1 })
      .to(rightWord, {
        y: -6,
        duration: 0.15,
        ease: 'power3.out',
      })
      .to(rightWord, {
        y: 0,
        duration: 0.1,
        ease: 'power3.in',
      })
  }

  const handleMouseLeave = () => {
    leftTweenRef.current?.kill()
    rightTweenRef.current?.kill()
    const root = textRef.current
    if (!root) return
    const leftWord = root.querySelector<HTMLSpanElement>('.logo-left')
    const rightWord = root.querySelector<HTMLSpanElement>('.logo-right')
    gsap.to([leftWord, rightWord], { y: 0, duration: 0.15, ease: 'power2.out' })
  }

  return (
    <nav className="flex items-center justify-between p-4 bg-transparent sticky top-0 z-10">
      <div className="flex-1">
        <div className="inline-block bg-black text-white px-3 py-2 text-2xl font-bold rounded-md select-none">
          <div
            ref={textRef}
            className="tracking-wide"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="logo-left">
              {leftText.split('').map((ch, i) => (
                <span key={`l-${i}`} className="logo-left-letter inline-block">
                  {ch}
                </span>
              ))}
            </span>
            <span className="inline-block mx-1" aria-hidden="true"> </span>
            <span className="logo-right">
              {rightText.split('').map((ch, i) => (
                <span key={`r-${i}`} className="logo-right-letter inline-block">
                  {ch}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-center space-x-4">
        <NavLink 
          ref={(el) => { navRefs.current['/'] = el }}
          to="/" 
          className={linkClass('/')}
          onMouseEnter={(e) => handleNavHover('/', e.currentTarget)}
          onMouseLeave={(e) => handleNavLeave('/', e.currentTarget)}
          end
        >
          Home
        </NavLink>
        <NavLink 
          ref={(el) => { navRefs.current['/admin'] = el }}
          to="/admin" 
          className={linkClass('/admin')}
          onMouseEnter={(e) => handleNavHover('/admin', e.currentTarget)}
          onMouseLeave={(e) => handleNavLeave('/admin', e.currentTarget)}
        >
          Admin
        </NavLink>
        <NavLink 
          ref={(el) => { navRefs.current['/regulator'] = el }}
          to="/regulator" 
          className={linkClass('/regulator')}
          onMouseEnter={(e) => handleNavHover('/regulator', e.currentTarget)}
          onMouseLeave={(e) => handleNavLeave('/regulator', e.currentTarget)}
        >
          Regulator
        </NavLink>
        <NavLink 
          ref={(el) => { navRefs.current['/report'] = el }}
          to="/report" 
          className={linkClass('/report')}
          onMouseEnter={(e) => handleNavHover('/report', e.currentTarget)}
          onMouseLeave={(e) => handleNavLeave('/report', e.currentTarget)}
        >
          Report
        </NavLink>
      </div>
      <div className="flex-1"></div>
    </nav>
  )
}

export default Header
