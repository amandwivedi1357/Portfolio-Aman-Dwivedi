"use client";

import { useState } from 'react';
import Home from '@/app/page';
import About from '@/app/about/page';
import Skills from '@/app/skills/page';
import Projects from '@/app/projects/page';

export function SinglePageContent() {
  return (
    <div className="scroll-container">
      <section id="home">
        <Home />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="projects">
        <Projects />
      </section>
    </div>
  );
}