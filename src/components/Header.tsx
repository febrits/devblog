import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAbout = location.pathname === '/about';

  return (
    <header className="border-b border-dark-border bg-dark-bg/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold text-text-primary hover:text-accent transition-colors"
        >
          Dev<span className="text-accent">Blog</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className={clsx(
              'text-sm font-medium transition-colors',
              isHome ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
            )}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={clsx(
              'text-sm font-medium transition-colors',
              isAbout ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
            )}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
