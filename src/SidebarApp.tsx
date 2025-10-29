import { useState, useEffect } from "react";
import { ViralifyLogo } from "@/components/ViralifyLogo";
import { TabNavigation } from "@/components/sidebar/TabNavigation";
import { AnalyzeTab } from "@/components/sidebar/AnalyzeTab";
import { ViralTab } from "@/components/sidebar/ViralTab";
import { CreateTab } from "@/components/sidebar/CreateTab";
import { LibraryTab } from "@/components/sidebar/LibraryTab";
import { SettingsTab } from "@/components/sidebar/SettingsTab";

const SidebarApp = () => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [activeTab, setActiveTab] = useState("analyze");

  // Listen for messages from parent window
  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data.action === 'urlExtracted') {
        setCurrentUrl(event.data.url);
      }
    });
  }, []);

  const handleExtract = () => {
    // Request URL from parent window
    window.parent.postMessage({ action: 'extractUrl' }, '*');
  };

  // Listen for tab switch from remix
  useEffect(() => {
    const handleRemix = () => {
      setActiveTab('create');
    };
    window.addEventListener('switch-to-create', handleRemix);
    return () => window.removeEventListener('switch-to-create', handleRemix);
  }, []);

  return (
    <div className="h-full bg-gradient-to-b from-[#5B2C8A] via-[#3D1F6B] to-[#2B1550] overflow-y-auto">
      {/* Decorative shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-500 rounded-full opacity-70" 
             style={{ filter: 'blur(1px)' }} />
        <div className="absolute top-1/3 -right-8 w-24 h-24 bg-cyan-400 rounded-full opacity-70" 
             style={{ filter: 'blur(1px)' }} />
        <div className="absolute -bottom-8 left-1/4 w-28 h-28 bg-yellow-400 rounded-full opacity-70" 
             style={{ filter: 'blur(1px)' }} />
      </div>

      <div className="relative z-10 p-4 h-full flex flex-col">
        {/* Logo */}
        <div className="text-center mb-3">
          <ViralifyLogo className="mx-auto mb-1 scale-[1.2]" />
          <p className="text-xs text-white font-black uppercase tracking-wide"
             style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.5)" }}>
            Create Viral Content
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-4">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          <div style={{ display: activeTab === 'analyze' ? 'block' : 'none' }}>
            <AnalyzeTab 
              currentUrl={currentUrl} 
              onExtractUrl={handleExtract}
            />
          </div>
          
          <div style={{ display: activeTab === 'viral' ? 'block' : 'none' }}>
            <ViralTab />
          </div>
          
          <div style={{ display: activeTab === 'create' ? 'block' : 'none' }}>
            <CreateTab />
          </div>
          
          <div style={{ display: activeTab === 'library' ? 'block' : 'none' }}>
            <LibraryTab />
          </div>
          
          <div style={{ display: activeTab === 'settings' ? 'block' : 'none' }}>
            <SettingsTab />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarApp;
