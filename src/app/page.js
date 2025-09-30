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
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setContentVisible(true);
    }, 100);
  };

  return (
    <ReactLenis root>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <div
        className={`transition-all duration-1000 ease-out ${
          contentVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
        }`}
      >
        <Hero isLoading={isLoading} />
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