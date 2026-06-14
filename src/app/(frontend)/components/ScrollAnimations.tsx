'use client'

import { useEffect } from 'react'

export default function ScrollAnimations() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { root: null, rootMargin: '0px', threshold: 0.15 },
    )

    const elements = document.querySelectorAll('.reveal')
    elements.forEach((el) => observer.observe(el))

    const heroImg = document.getElementById('hero-img')
    const onScroll = () => {
      if (heroImg && window.scrollY < window.innerHeight) {
        heroImg.style.transform = `translateY(${window.scrollY * 0.3}px) scale(1.05)`
      }
    }
    window.addEventListener('scroll', onScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return null
}
