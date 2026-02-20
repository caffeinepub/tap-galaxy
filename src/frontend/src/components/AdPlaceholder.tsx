import { DollarSign } from 'lucide-react';

interface AdPlaceholderProps {
  size: 'banner' | 'interstitial';
  position?: 'top' | 'bottom';
}

export function AdPlaceholder({ size, position }: AdPlaceholderProps) {
  if (size === 'banner') {
    return (
      <div className={`w-full bg-game-card/30 backdrop-blur-sm border-2 border-dashed border-game-border ${position === 'top' ? 'border-b' : 'border-t'}`}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-center gap-2 text-game-text-muted text-sm">
          <DollarSign className="w-4 h-4" />
          <span className="font-medium">Ad Placement Zone - Banner ({position})</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="game-card p-6 border-2 border-dashed border-game-accent/50">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <DollarSign className="w-8 h-8 text-game-accent" />
          <div>
            <div className="font-bold text-game-text-bright">Ad Placement Zone</div>
            <div className="text-sm text-game-text-muted mt-1">Interstitial Ad (Full Screen)</div>
          </div>
          <div className="text-xs text-game-text-muted/70 max-w-xs">
            This is where a full-screen ad would appear after each game session
          </div>
        </div>
      </div>
    </div>
  );
}
