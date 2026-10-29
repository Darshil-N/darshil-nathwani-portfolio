import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, lazy, Suspense, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import TouchFeedback from './components/TouchFeedback';
import { markSiteReady, LOADING_MS } from './lib/siteReady';
import './styles/optimizations.css';

const Index = lazy(() => import('./pages/Index'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));

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
        <Route path="/projects" element={
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
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Show loading screen on EVERY page load/refresh
    const id = setTimeout(() => {
      setInitialLoad(false);
      markSiteReady(); // intro animations (e.g. hero decrypt) wait for this
    }, LOADING_MS); // Match the loading screen's duration
    return () => clearTimeout(id);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TouchFeedback />
        {initialLoad && <LoadingScreen />}
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

