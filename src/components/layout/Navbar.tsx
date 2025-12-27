'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import Button from '@/components/ui/Button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/projects', label: 'Projetos' },
    { href: '/about', label: 'Sobre' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-fjord-blue border-b border-fjord-blue-light shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-viking-gold font-montserrat font-bold text-2xl hover:text-glacial-cyan transition-colors">
          <span className="text-6xl text-viking-gold">ᛞ</span> Dagaz.Dev
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'font-montserrat font-semibold text-runic-white hover:text-glacial-cyan transition-colors pb-1 border-b-2',
                    pathname === link.href ? 'text-glacial-cyan border-glacial-cyan' : 'border-transparent'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button variant="primary" size="sm" as="a" href="https://github.com/rpinetti" target="_blank" rel="noopener noreferrer">
            GitHub
          </Button>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-runic-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-fjord-blue pb-4">
          <ul className="flex flex-col items-center gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'font-montserrat font-semibold text-runic-white hover:text-glacial-cyan transition-colors py-2 block',
                    pathname === link.href ? 'text-glacial-cyan' : ''
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Button variant="primary" size="sm" as="a" href="https://github.com/seu_username_github" target="_blank" rel="noopener noreferrer">
                GitHub
              </Button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;