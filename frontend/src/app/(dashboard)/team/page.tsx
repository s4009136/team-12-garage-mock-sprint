'use client'

import type { Metadata } from 'next'
import Image from 'next/image'
import { useState } from 'react'

import seongsooImage from './teamImages/seongsoo.jpeg'
import judyImage from './teamImages/judy.jpg'
import loganImage from './teamImages/logan.jpg'
import shaunImage from './teamImages/shaun.jpeg'
import patrickImage from './teamImages/patrick.jpg'
import defaultImage from './teamImages/default.jpg'



export default function TeamPage() {
  const teamInfo = [
    {
      image: seongsooImage,
      name: 'Seongsoo Kim',
      role: 'Project Manager',
      blurb: 'Contributed to the planning, development, and testing of the project while supporting the team',
    }, 
    {
      image: judyImage,
      name: 'Judy Ayoubi',
      role: 'Developer',
      blurb: 'Contributing to developing and testing the project. Main languages: Python, C++.',
    }, 
    {
      image: loganImage,
      name: 'Logan Gunawan',
      role: 'Developer',
      blurb: 'Contributes to the building of the project. Main languages: Python, C#.',
    }, 
    {
      image: shaunImage,
      name: 'Shaun John Stanley',
      role: 'Business Analyst',
      blurb: 'Contributed to requirements, scope definition, gathering and documentation to support the team development process.',
    }, 
    {
      image: patrickImage,
      name: 'Patrick Holland',
      role: 'User Experience',
      blurb: 'Followed the requirements engineering and user experience, design processes for the Login page and the Team dashboard page.',
    },
  ]

  const positions = [
    'col-start-1 row-start-1',
    'col-start-3 row-start-1',
    'col-start-2 row-start-2',
    'col-start-1 row-start-3',
    'col-start-3 row-start-3',
  ]

  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  return (
  <div className="space-y-6">
    <div className="rounded-lg border border-zinc-200 bg-[#C9D6DF] p-4 shadow-sm dark:border-zinc-800">
      <h1 className="text-2xl font-bold tracking-tight text-center text-zinc-800">
        Team 12 - Telstra AI Hologram & Digital Presence
      </h1>
    </div>

    <div className="grid grid-cols-3 gap-6">
      {teamInfo.map(({ image, name, role, blurb }, index) => {
        const isExpanded = expandedCard === name
        const isLong = blurb.length > 80

        return (
          <div
            key={name}
            className={`${positions[index]} rounded-lg p-6`}
          >
            <Image
              src={image}
              alt={`${name}'s profile picture`}
              width={160}
              height={160}
              className="rounded-full object-cover"
            />

            <h2 className="text-lg font-semibold">{name}</h2>

            <p className="text-sm text-zinc-500">{role}</p>

            <p className="mt-4 text-sm">
              {isExpanded || !isLong
                ? blurb
                : `${blurb.slice(0, 80)}...`}
            </p>

            {isLong && (
              <button
                onClick={() =>
                  setExpandedCard(isExpanded ? null : name)
                }
                className="mt-2 text-sm font-medium underline"
              >
                {isExpanded ? 'View less' : 'View more...'}
              </button>
            )}
          </div>
        )
      })}
    </div>
  </div>
)
}