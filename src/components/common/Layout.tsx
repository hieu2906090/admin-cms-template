import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import MobileSidebar from './Sidebar/MobileSidebar'
import DesktopSidebar from './Sidebar/DesktopSidebar'
import { useSettings } from '@/contexts/SettingsContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const { isDenseLayout, isDarkMode, toggleDarkMode } = useSettings()

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col dark:bg-gray-900">
      <MobileSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />
      <DesktopSidebar collapsed={isSidebarCollapsed} />

      <div className={`flex flex-col flex-1 ${isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'}`}>
        <Header 
          setSidebarOpen={setSidebarOpen}
          isSidebarCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <main className="flex-1 py-10">
          <div className={`mx-auto ${isDenseLayout ? 'max-w-3xl px-4 sm:px-6 lg:px-8' : 'px-8 sm:px-12 lg:px-16'}`}>
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
} 