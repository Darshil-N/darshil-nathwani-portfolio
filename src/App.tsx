import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import TouchFeedback from './components/TouchFeedback';
import { markHeroVisited, markSiteReady } from './lib/siteReady';
import { TransitionOverlay, TransitionProvider } from './components/PageTransition';
import './styles/optimizations.css';

const Index          = lazy(() => import('./pages/Index'));
const NotFound       = lazy(() => import('./pages/NotFound'));
const ProjectsPage   = lazy(() => import('./pages/ProjectsPage'));
const ProjectsBookPage = lazy(() => import('./pages/ProjectsBookPage'));

const IS_HOME = window.location.pathname === '/';
const queryClient = new QueryClient();

const Fallback = () => (
  <div className="min-h-screen bg-[#0B0B0C] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border border-white/20 border-t-[#A3E635] animate-spin" />
  </div>
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={
      <Suspense fallback={<Fallback />}><Index /></Suspense>
    } />
    <Route path="/projects/list" element={
      <Suspense fallback={<Fallback />}><ProjectsPage /></Suspense>
    } />
    <Route path="/projects" element={
      <Suspense fallback={<Fallback />}><ProjectsBookPage /></Suspense>
    } />
    <Route path="/project2" element={<Navigate to="/projects" replace />} />
    <Route path="/project"  element={<Navigate to="/projects" replace />} />
    <Route path="*" element={
      <Suspense fallback={<Fallback />}><NotFound /></Suspense>
    } />
  </Routes>
);

const App = () => {
  const [initialLoad, setInitialLoad] = useState(!IS_HOME);

  useEffect(() => {
    let stop: (() => void) | undefined;
    const ric = (window as unknown as { requestIdleCallback?: (f: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const start = () => import('./lib/easter').then((m) => { stop = m.installEggs(); });
    const id = ric ? ric(start, { timeout: 6000 }) : window.setTimeout(start, 4000);
    return () => { stop?.(); if (!ric) window.clearTimeout(id); };
  }, []);

  useEffect(() => {
    if (IS_HOME) {
      markSiteReady();
    } else {
      // Direct visits to non-home routes run LoadingScreen instead of HeroOrbit's loader,
      // so navigating back home afterwards should skip HeroOrbit's loader.
      markHeroVisited();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TouchFeedback />
        {initialLoad && !IS_HOME && (
          <LoadingScreen
            onReveal={() => {
              markSiteReady();
              markHeroVisited();
            }}
            onComplete={() => setInitialLoad(false)}
          />
        )}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <TransitionProvider>
            {/* The overlay sits above everything — always in the DOM */}
            <TransitionOverlay />
            <AppRoutes />
          </TransitionProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
