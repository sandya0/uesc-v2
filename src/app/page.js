"use client";

import React from 'react';
import Hero from './components/Hero';
import AboutUS from './components/AboutUS';
import LoadingScreen from './components/LoadingScreen';
import { ReactLenis } from 'lenis/react';
import Debate from './components/Debate';
import Scrabble from './components/Scrabble';
import MUN from './components/MUN';
import Speech from './components/Speech';
import JoinUs from './components/JoinUs';
import Slogan from './components/Slogan';
import Footer from './components/Footer';

const App = () => {
  return (
    <ReactLenis root>
      <div>
        <Hero />
        <AboutUS />
        <Debate />
        <Scrabble />
        <MUN />
        <Speech />
        <JoinUs />
        <Slogan />
        <Footer />
      </div>
    </ReactLenis>
  )
}

export default App