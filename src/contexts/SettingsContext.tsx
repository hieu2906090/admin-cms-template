import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type ThemeMode = 'light' | 'dark' | 'system'

interface SettingsContextType {
  isDenseLayout: boolean
  toggleDenseLayout: () => void
  isDarkMode: boolean
  themeMode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
  toggleDarkMode: () => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [isDenseLayout, setIsDenseLayout] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('denseLayout') !== 'true'
    }
    return true
  })

  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('themeMode') as ThemeMode) || 'system'
    }
    return 'system'
  })

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('themeMode')
      if (savedMode === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      return savedMode === 'dark'
    }
    return false
  })

  useEffect(() => {
    localStorage.setItem('denseLayout', String(!isDenseLayout))
    document.documentElement.classList.toggle('dense-layout', isDenseLayout)
  }, [isDenseLayout])

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode)
    
    const updateTheme = () => {
      if (themeMode === 'system') {
        const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setIsDarkMode(systemIsDark)
        document.documentElement.classList.toggle('dark', systemIsDark)
      } else {
        const isDark = themeMode === 'dark'
        setIsDarkMode(isDark)
        document.documentElement.classList.toggle('dark', isDark)
      }
    }

    updateTheme()

    if (themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = () => updateTheme()
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    }
  }, [themeMode])

  const toggleDenseLayout = () => {
    setIsDenseLayout(prev => !prev)
  }

  const toggleDarkMode = () => {
    const newMode = isDarkMode ? 'light' : 'dark'
    setThemeMode(newMode)
  }

  return (
    <SettingsContext.Provider value={{ 
      isDenseLayout, 
      toggleDenseLayout, 
      isDarkMode, 
      themeMode,
      setThemeMode,
      toggleDarkMode 
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
} 