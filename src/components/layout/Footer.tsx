import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-forge-gray border-t border-forge-gray-light py-16 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-16">
        <div className="flex flex-col gap-4">
          <h4 className="font-montserrat font-bold text-xl text-viking-gold">Dagaz.Dev</h4>
          <p className="font-lato text-sm text-forge-gray-light leading-relaxed max-w-xs">
            Inovação, Performance e Conhecimento Ancestral em SAP S/4HANA.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="https://github.com/seu_username_github" target="_blank" rel="noopener noreferrer" className="text-glacial-cyan hover:text-viking-gold transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {/* GitHub Icon SVG Path */}
              </svg>
            </a>
            <a href="https://linkedin.com/in/seu_linkedin" target="_blank" rel="noopener noreferrer" className="text-glacial-cyan hover:text-viking-gold transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {/* LinkedIn Icon SVG Path */}
              </svg>
            </a>
            <a href="https://twitter.com/seu_twitter" target="_blank" rel="noopener noreferrer" className="text-glacial-cyan hover:text-viking-gold transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {/* Twitter Icon SVG Path */}
              </svg>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h5 className="font-montserrat font-semibold text-sm text-glacial-cyan uppercase tracking-widest">Navegação</h5>
          <ul className="flex flex-col gap-2 font-lato text-sm">
            <li><Link href="/" className="text-forge-gray-light hover:text-glacial-cyan transition-colors hover:pl-1">Home</Link></li>
            <li><Link href="/blog" className="text-forge-gray-light hover:text-glacial-cyan transition-colors hover:pl-1">Blog</Link></li>
            <li><Link href="/projects" className="text-forge-gray-light hover:text-glacial-cyan transition-colors hover:pl-1">Projetos</Link></li>
            <li><Link href="/about" className="text-forge-gray-light hover:text-glacial-cyan transition-colors hover:pl-1">Sobre</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h5 className="font-montserrat font-semibold text-sm text-glacial-cyan uppercase tracking-widest">Recursos</h5>
          <ul className="flex flex-col gap-2 font-lato text-sm">
            <li><Link href="/rss.xml" className="text-forge-gray-light hover:text-glacial-cyan transition-colors hover:pl-1">RSS Feed</Link></li>
            <li><Link href="/newsletter" className="text-forge-gray-light hover:text-glacial-cyan transition-colors hover:pl-1">Newsletter</Link></li>
            <li><Link href="/sitemap.xml" className="text-forge-gray-light hover:text-glacial-cyan transition-colors hover:pl-1">Sitemap</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h5 className="font-montserrat font-semibold text-sm text-glacial-cyan uppercase tracking-widest">Legal</h5>
          <ul className="flex flex-col gap-2 font-lato text-sm">
            <li><Link href="/privacy" className="text-forge-gray-light hover:text-glacial-cyan transition-colors hover:pl-1">Política de Privacidade</Link></li>
            <li><Link href="/terms" className="text-forge-gray-light hover:text-glacial-cyan transition-colors hover:pl-1">Termos de Uso</Link></li>
            <li><Link href="/contact" className="text-forge-gray-light hover:text-glacial-cyan transition-colors hover:pl-1">Contato</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-forge-gray-light pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-forge-gray-light">
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} Dagaz.Dev. Todos os direitos reservados.
        </p>
        <p className="text-center md:text-right text-viking-gold">
          Forjado com ⚔️ e ❤️
        </p>
      </div>
    </footer>
  );
};

export default Footer;