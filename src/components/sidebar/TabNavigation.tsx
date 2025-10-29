import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Sparkles, Library, Settings, Flame } from "lucide-react";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-5 bg-black/20 rounded-xl p-1"
                style={{ border: "2px solid black" }}>
        <TabsTrigger 
          value="analyze" 
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF006B] data-[state=active]:to-[#FFAA00] data-[state=active]:text-white rounded-lg font-bold text-xs"
        >
          <Zap className="w-4 h-4" />
          <span className="hidden sm:inline ml-1">Analyze</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="viral" 
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF0000] data-[state=active]:to-[#FF6B00] data-[state=active]:text-white rounded-lg font-bold text-xs"
        >
          <Flame className="w-4 h-4" />
          <span className="hidden sm:inline ml-1">Viral</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="create" 
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7B2FFF] data-[state=active]:to-[#B24AFF] data-[state=active]:text-white rounded-lg font-bold text-xs"
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline ml-1">Create</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="library" 
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FFAA00] data-[state=active]:to-[#FF6B00] data-[state=active]:text-white rounded-lg font-bold text-xs"
        >
          <Library className="w-4 h-4" />
          <span className="hidden sm:inline ml-1">Library</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="settings" 
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#6B2FFF] data-[state=active]:to-[#9B4AFF] data-[state=active]:text-white rounded-lg font-bold text-xs"
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline ml-1">Settings</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
