import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { GlassPanel } from '../components/common/GlassPanel';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { useState } from 'react';

export function Settings() {
  const navigate = useNavigate();
  const settings = useStore((state) => state.settings);
  const updateSettings = useStore((state) => state.updateSettings);
  const resetApp = useStore((state) => state.resetApp);
  const [showResetModal, setShowResetModal] = useState(false);
  
  const handleReset = () => {
    resetApp();
    setShowResetModal(false);
    navigate('/onboarding');
  };
  
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          <h1 className="text-4xl font-bold">Settings</h1>
        </motion.div>
        
        <div className="space-y-6">
          {/* Motion */}
          <GlassPanel>
            <h2 className="text-xl font-bold mb-4">Motion</h2>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Reduced Motion</div>
                <div className="text-sm text-white/60">
                  Minimize animations and transitions
                </div>
              </div>
              <button
                onClick={() =>
                  updateSettings({
                    accessibility: {
                      ...settings.accessibility,
                      reducedMotion: !settings.accessibility.reducedMotion,
                    },
                  })
                }
                className={`w-14 h-8 rounded-full transition-colors ${
                  settings.accessibility.reducedMotion
                    ? 'bg-violet-500'
                    : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white transition-transform ${
                    settings.accessibility.reducedMotion
                      ? 'translate-x-7'
                      : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </GlassPanel>
          
          {/* Accessibility */}
          <GlassPanel>
            <h2 className="text-xl font-bold mb-4">Accessibility</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Larger Text</div>
                  <div className="text-sm text-white/60">
                    Increase font sizes throughout the app
                  </div>
                </div>
                <button
                  onClick={() =>
                    updateSettings({
                      accessibility: {
                        ...settings.accessibility,
                        largeText: !settings.accessibility.largeText,
                      },
                    })
                  }
                  className={`w-14 h-8 rounded-full transition-colors ${
                    settings.accessibility.largeText
                      ? 'bg-violet-500'
                      : 'bg-white/20'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-white transition-transform ${
                      settings.accessibility.largeText
                        ? 'translate-x-7'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">High Contrast</div>
                  <div className="text-sm text-white/60">
                    Increase contrast for better visibility
                  </div>
                </div>
                <button
                  onClick={() =>
                    updateSettings({
                      accessibility: {
                        ...settings.accessibility,
                        highContrast: !settings.accessibility.highContrast,
                      },
                    })
                  }
                  className={`w-14 h-8 rounded-full transition-colors ${
                    settings.accessibility.highContrast
                      ? 'bg-violet-500'
                      : 'bg-white/20'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-white transition-transform ${
                      settings.accessibility.highContrast
                        ? 'translate-x-7'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </GlassPanel>
          
          {/* Data */}
          <GlassPanel>
            <h2 className="text-xl font-bold mb-4">Data</h2>
            <div className="mb-4">
              <p className="text-sm text-white/60 mb-4">
                DRIFT is a frontend prototype. Your data stays in this browser.
              </p>
              <Button
                variant="secondary"
                onClick={() => setShowResetModal(true)}
              >
                Reset My DRIFT Experience
              </Button>
            </div>
          </GlassPanel>
        </div>
      </div>
      
      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Reset DRIFT Experience?"
      >
        <div className="space-y-4">
          <p className="text-white/80">
            This will clear your local memories, anchors and preferences.
            This action cannot be undone.
          </p>
          
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => setShowResetModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleReset}
              className="flex-1"
            >
              Reset
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
