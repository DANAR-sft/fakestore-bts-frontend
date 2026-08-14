import React from 'react';
import { ShoppingBag, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-slate-700">
            <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm">FakeStore BTS v2</span>
            <span className="text-slate-400">|</span>
            <span className="text-xs text-slate-500">Frontend Developer Recruitment Assessment</span>
          </div>

          <div className="flex items-center space-x-6 text-xs text-slate-500">
            <a
              href="https://fakeapi.platzi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-600 flex items-center gap-1 transition-colors"
            >
              <span>Platzi Fake Store API</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <span className="flex items-center gap-1">
              Built with React & Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
