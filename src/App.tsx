import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, lazy, Suspense, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import TouchFeedback from './components/TouchFeedback';
import { markSiteReady, LOADING_MS } from './lib/siteReady';
import './styles/optimizations.css';

const Index = lazy(() => import('./pages/Index'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
// the project archive as a book is the main /projects page; the classic list lives on at /projects/list
const ProjectsBookPage = lazy(() => import('./pages/ProjectsBookPage'));
// the home page's hero carries its own loading screen, so the site-wide one stays out of the way there
const IS_HOME = window.location.pathname === '/';

const queryClient = new QueryClient();

const Fallback = () => (
  <div className="min-h-screen bg-[#080808] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border border-white/20 border-t-[#A3E635] animate-spin" />
  </div>
);

const RoutesWithTransition = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <Suspense fallback={<Fallback />}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <Index />
            </motion.div>
          </Suspense>
        } />
        <Route path="/projects/list" element={
          <Suspense fallback={<Fallback />}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <ProjectsPage />
            </motion.div>
          </Suspense>
        } />
        <Route path="/projects" element={
          <Suspense fallback={<Fallback />}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <ProjectsBookPage />
            </motion.div>
          </Suspense>
        } />
        <Route path="/project2" element={<Navigate to="/projects" replace />} />
        <Route path="/project" element={<Navigate to="/projects" replace />} />
        <Route path="*" element={
          <Suspense fallback={<Fallback />}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <NotFound />
            </motion.div>
          </Suspense>
        } />
      </Routes>
    </AnimatePresence>
  );
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const App = () => {
  const [initialLoad, setInitialLoad] = useState(!IS_HOME);

  // the easter eggs load once the page is idle, so they never compete with the first paint
  useEffect(() => {
    let stop: (() => void) | undefined;
    const ric = (window as unknown as { requestIdleCallback?: (f: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const start = () => import('./lib/easter').then((m) => { stop = m.installEggs(); });
    const id = ric ? ric(start, { timeout: 6000 }) : window.setTimeout(start, 4000);
    return () => { stop?.(); if (!ric) window.clearTimeout(id); };
  }, []);

  useEffect(() => {
    // on the home page the hero runs its own loader; sections waiting on the signal can start straight away
    if (IS_HOME) {
      markSiteReady();
      return;
    }
    // Show loading screen on EVERY page load/refresh
    // The loader hands over to the hero's own lime panel at LOADING_MS - 700, so it can go a moment later.
    const id = setTimeout(() => setInitialLoad(false), LOADING_MS - 550);
    // The hero's entrance starts as the lime panel begins to lift away (the loader's REVEAL_AT),
    // not after it has gone, so the reveal and the name arriving are one motion with no empty beat.
    const ready = setTimeout(markSiteReady, LOADING_MS - 700);
    return () => {
      clearTimeout(id);
      clearTimeout(ready);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TouchFeedback />
        {initialLoad && !IS_HOME && <LoadingScreen />}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <RoutesWithTransition />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

