"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';  // Assuming you have a utility for class merging

const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Skills', href: '/skills' },
  { name: 'Contact', href: '/contact' }
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState('/');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-white hover:text-blue-300 transition-colors">
              Your Name
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex space-x-4">
            {NAV_ITEMS.map((item) => (
              <NavItem 
                key={item.href}
                href={item.href}
                isActive={activeSection === item.href}
                onClick={() => setActiveSection(item.href)}
              >
                {item.name}
              </NavItem>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button 
              type="button" 
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ 
  href, 
  children, 
  isActive, 
  onClick 
}: { 
  href: string; 
  children: React.ReactNode; 
  isActive?: boolean; 
  onClick?: () => void;
}) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={cn(
        "relative px-3 py-2 text-sm font-medium transition-colors duration-300 ease-in-out",
        isActive 
          ? "text-white" 
          : "text-gray-300 hover:text-white"
      )}
    >
      {children}
      {isActive && (
        <motion.div 
          layoutId="navbar-active-item"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
}