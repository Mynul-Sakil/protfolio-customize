"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-page border-t border-line py-12 text-slate z-10 relative">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="font-serif text-2xl font-semibold tracking-tight">
          Sabbir<span className="text-brass">.</span>
        </div>
        
        <div className="font-mono text-xs text-slate uppercase tracking-widest text-center md:text-left">
          &copy; {currentYear} Sabbir. All rights reserved.
        </div>
        
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-mono text-xs uppercase tracking-widest text-brass hover:text-ink transition-colors"
        >
          Back to Top
        </button>

      </div>
    </footer>
  );
}
