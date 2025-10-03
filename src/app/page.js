"use client";

import React, { useState, Suspense } from 'react'
import Hero from './components/Hero'
import AboutUS from './components/AboutUS'
import LoadingScreen from './components/LoadingScreen'
import { ReactLenis } from 'lenis/react'

const Debate = React.lazy(() => import('./components/Debate'));
const Scrabble = React.lazy(() => import('./components/Scrabble'));
const MUN = React.lazy(() => import('./components/MUN'));
const Speech = React.lazy(() => import('./components/Speech'));
const JoinUs = React.lazy(() => import('./components/JoinUs'));
const Slogan = React.lazy(() => import('./components/Slogan'));
const Footer = React.lazy(() => import('./components/Footer'));

const App = () => {
  return (
    <ReactLenis root>
      <div>
        <Hero />
        <AboutUS />
        <Suspense fallback={<div>Loading...</div>}>
          <Debate />
          <Scrabble />
          <MUN />
          <Speech />
          <JoinUs />
          <Slogan />
          <Footer />
        </Suspense>
      </div>
    </ReactLenis>
  )
}

export default App