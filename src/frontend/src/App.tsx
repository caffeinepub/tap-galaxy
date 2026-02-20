import { GameLayout } from './components/GameLayout';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <GameLayout />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
