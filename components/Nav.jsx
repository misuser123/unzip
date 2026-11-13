'use client';

import { useEffect, useState } from 'react';
import { NAV, ME } from '../app/data';

export default function Nav() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    NAV.forEach(l => {
      const el = document.getElementById(l.href.slice(1));
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header className="nav">
      <div className="nav__in">
        <a className="brand" href="#top" aria-label="Bharat Saini — home">
          <span className="brand__mark">BS</span>
          <span className="brand__name">bharat</span>
        </a>
        <nav className="seg" aria-label="Primary">
          {NAV.map(l => (
            <a key={l.href} href={l.href} className={active === l.href.slice(1) ? 'is-active' : undefined}>
              {l.label}
            </a>
          ))}
        </nav>
        <a className="btn btn--outline" href={ME.resume} target="_blank" rel="noreferrer">
          Résumé
        </a>
      </div>
    </header>
  );
}
