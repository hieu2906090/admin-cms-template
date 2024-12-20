import { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import MobileSidebar from './Sidebar/MobileSidebar'
import DesktopSidebar from './Sidebar/DesktopSidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(savedDarkMode)
    if (savedDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem('darkMode', String(newDarkMode))
    document.documentElement.classList.toggle('dark')
  }

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
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
} 