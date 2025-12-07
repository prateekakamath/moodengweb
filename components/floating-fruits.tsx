"use client"

import type React from "react"
import { useEffect, useState } from "react"

interface Fruit {
  id: number
  src: string
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  scale: number
}

export function FloatingFruits() {
  const [fruits, setFruits] = useState<Fruit[]>([])
  const fruitSize = 80
  const fruitRadius = fruitSize / 2

  useEffect(() => {
    const fruitImages = [
      "/images/mango.png",
      "/images/dragonfruit.png",
      "/images/carrot.png",
      "/images/watermelon.png",
      "/images/banana.png",
      "/images/strawberry.png",
      "/images/durian.png",
      "/images/pineapple.png",
    ]

    const generatedFruits: Fruit[] = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      src: fruitImages[i % fruitImages.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      rotation: Math.random() * 360,
      scale: 1,
    }))

    setFruits(generatedFruits)

    const animationInterval = setInterval(() => {
      setFruits((prevFruits) => {
        const newFruits = prevFruits.map((fruit) => {
          let x = fruit.x + fruit.vx
          let y = fruit.y + fruit.vy
          let vx = fruit.vx
          let vy = fruit.vy
          const rotation = fruit.rotation + (vx * 5 + vy * 5)
          let scale = 1 + Math.sin(Date.now() * 0.003 + fruit.id) * 0.08

          // Bounce off edges with more exaggerated velocity change for cartoon feel
          if (x < 0 || x > 100) {
            vx = -vx * 0.9 + (Math.random() - 0.5) * 0.2
            x = Math.max(0, Math.min(100, x))
            scale = 1.15 // Squash on bounce
          }
          if (y < 0 || y > 100) {
            vy = -vy * 0.9 + (Math.random() - 0.5) * 0.2
            y = Math.max(0, Math.min(100, y))
            scale = 0.85 // Compress on bounce
          }

          return { ...fruit, x, y, vx, vy, rotation, scale }
        })

        // Check for overlaps and apply repulsion with more playful push
        for (let i = 0; i < newFruits.length; i++) {
          for (let j = i + 1; j < newFruits.length; j++) {
            const dx = newFruits[j].x - newFruits[i].x
            const dy = newFruits[j].y - newFruits[i].y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const minDistance = (fruitSize / 100) * 12

            if (distance < minDistance) {
              // Push fruits apart with more cartoon-style velocity
              const angle = Math.atan2(dy, dx)
              const pushDistance = (minDistance - distance) / 2

              newFruits[i].x -= Math.cos(angle) * pushDistance
              newFruits[i].y -= Math.sin(angle) * pushDistance
              newFruits[j].x += Math.cos(angle) * pushDistance
              newFruits[j].y += Math.sin(angle) * pushDistance

              newFruits[i].vx -= Math.cos(angle) * 0.15
              newFruits[i].vy -= Math.sin(angle) * 0.15
              newFruits[j].vx += Math.cos(angle) * 0.15
              newFruits[j].vy += Math.sin(angle) * 0.15
            }
          }
        }

        return newFruits
      })
    }, 50)

    return () => clearInterval(animationInterval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {fruits.map((fruit) => (
        <div
          key={fruit.id}
          className="absolute transition-none"
          style={
            {
              left: `${fruit.x}%`,
              top: `${fruit.y}%`,
              transform: `translate(-50%, -50%) rotate(${fruit.rotation}deg) scale(${fruit.scale})`,
            } as React.CSSProperties
          }
        >
          <img
            src={fruit.src || "/placeholder.svg"}
            alt="floating fruit"
            className="select-none"
            style={{
              width: `${fruitSize}px`,
              height: `${fruitSize}px`,
              opacity: 0.5,
            }}
          />
        </div>
      ))}
    </div>
  )
}
