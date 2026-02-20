import { TapGame } from './TapGame';
import { AdPlaceholder } from './AdPlaceholder';
import { SiCaffeine } from 'react-icons/si';
import { Heart } from 'lucide-react';

export function GameLayout() {
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'tap-galaxy'
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-game-space-dark via-game-nebula to-game-space-dark relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="stars-layer-1"></div>
        <div className="stars-layer-2"></div>
        <div className="stars-layer-3"></div>
      </div>

      {/* Top Ad Banner */}
      <div className="relative z-10">
        <AdPlaceholder size="banner" position="top" />
      </div>

      {/* Main Game Content */}
      <main className="flex-1 relative z-10 flex items-center justify-center p-4">
        <TapGame />
      </main>

      {/* Bottom Ad Banner */}
      <div className="relative z-10">
        <AdPlaceholder size="banner" position="bottom" />
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-sm text-game-text-muted">
        <p className="flex items-center justify-center gap-1.5">
          Built with <Heart className="w-4 h-4 text-game-accent fill-game-accent animate-pulse" /> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-game-accent hover:text-game-accent-bright transition-colors font-semibold"
          >
            <SiCaffeine className="w-4 h-4" />
            caffeine.ai
          </a>
        </p>
        <p className="mt-1 text-xs">© {new Date().getFullYear()} Tap Galaxy. All rights reserved.</p>
      </footer>
    </div>
  );
}
