import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AmbientBackground } from './components/ambient/AmbientBackground';
import { ToastContainer } from './components/common/Toast';
import { Navigation } from './components/navigation/Navigation';
import { Landing } from './pages/Landing';
import { Onboarding } from './pages/Onboarding';
import { Home } from './pages/Home';
import { CurrentRoom } from './pages/CurrentRoom';
import { MemoryTrail } from './pages/MemoryTrail';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';
import { useStore } from './store/useStore';

function AppContent() {
  const onboardingComplete = useStore((state) => state.onboardingComplete);
  const location = useLocation();
  
  const showNavigation = onboardingComplete && 
    !location.pathname.includes('/onboarding') && 
    !location.pathname.includes('/current/') &&
    location.pathname !== '/';
  
  return (
    <>
      <AmbientBackground />
      <ToastContainer />
      {showNavigation && <Navigation />}
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Landing page - always accessible */}
          <Route path="/" element={<Landing />} />
          
          <Route path="/onboarding" element={<Onboarding />} />
          
          <Route
            path="/home"
            element={
              onboardingComplete ? (
                <Home />
              ) : (
                <Navigate to="/onboarding" replace />
              )
            }
          />
          
          <Route
            path="/current/:id"
            element={
              onboardingComplete ? (
                <CurrentRoom />
              ) : (
                <Navigate to="/onboarding" replace />
              )
            }
          />
          
          <Route
            path="/memory"
            element={
              onboardingComplete ? (
                <MemoryTrail />
              ) : (
                <Navigate to="/onboarding" replace />
              )
            }
          />
          
          <Route
            path="/profile"
            element={
              onboardingComplete ? (
                <Profile />
              ) : (
                <Navigate to="/onboarding" replace />
              )
            }
          />
          
          <Route
            path="/settings"
            element={
              onboardingComplete ? (
                <Settings />
              ) : (
                <Navigate to="/onboarding" replace />
              )
            }
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
