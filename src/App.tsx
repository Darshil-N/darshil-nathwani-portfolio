import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, lazy, Suspense, useState } from 'react';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

// Lazy load pages for code splitting
const Index = lazy(() => import('./pages/Index'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));

const queryClient = new QueryClient();

const RoutesWithTransition = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <Suspense fallback={<div className="min-h-screen bg-dark flex items-center justify-center text-purple">Loading...</div>}>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <Index />
            </motion.div>
          </Suspense>
        } />
        <Route path="/projects" element={
          <Suspense fallback={<div className="min-h-screen bg-dark flex items-center justify-center text-purple">Loading...</div>}>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <ProjectsPage />
            </motion.div>
          </Suspense>
        } />
        {/* REMOVE AchievementsPage route */}
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={
          <Suspense fallback={<div className="min-h-screen bg-dark flex items-center justify-center text-purple">Loading...</div>}>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
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
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

const App = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Hidden admin shortcut: Ctrl+Alt+L
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setShowAdminLogin(true);
      }
      
      // ESC to close any admin modal
      if (e.key === 'Escape') {
        setShowAdminLogin(false);
        setShowAdminDashboard(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAdminLogin = () => {
    setShowAdminLogin(false);
    setShowAdminDashboard(true);
  };

  const handleAdminClose = () => {
    setShowAdminLogin(false);
    setShowAdminDashboard(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <RoutesWithTransition />
        </BrowserRouter>
        
        {/* Admin System */}
        <AdminLogin 
          isOpen={showAdminLogin}
          onClose={() => setShowAdminLogin(false)}
          onLogin={handleAdminLogin}
        />
        <AdminDashboard 
          isOpen={showAdminDashboard}
          onClose={handleAdminClose}
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
