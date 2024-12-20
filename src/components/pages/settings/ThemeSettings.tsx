import { useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import { useSettings } from '@/contexts/SettingsContext'
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'

export default function ThemeSettings() {
  const { isDarkMode, themeMode, setThemeMode } = useSettings()
  const [isLoading, setIsLoading] = useState(true)
  const [systemTheme, setSystemTheme] = useState<'dark' | 'light'>('light')

  // Detect system theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light')
    
    const handler = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? 'dark' : 'light')
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Simulate loading for skeleton effect
  setTimeout(() => setIsLoading(false), 1000)

  return (
    <Card>
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          Appearance
        </h2>
        
        <div className="space-y-6">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4">
                {/* Light Mode Option */}
                <button
                  onClick={() => setThemeMode('light')}
                  className={`relative group rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 ${themeMode === 'light' ? 'ring-2 ring-indigo-600' : ''}`}
                >
                  {/* Preview Window */}
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-white border border-gray-200">
                    {/* Window Header */}
                    <div className="h-4 bg-gray-100 border-b border-gray-200 flex items-center px-1.5 space-x-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                    </div>
                    {/* Window Content */}
                    <div className="p-1.5 space-y-1">
                      <div className="h-1 w-8 bg-gray-200 rounded"></div>
                      <div className="h-1 w-12 bg-gray-200 rounded"></div>
                      <div className="h-1 w-10 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  {/* Label */}
                  <div className={`mt-2 text-xs font-medium ${themeMode === 'light' ? 'text-indigo-600' : 'text-gray-900 dark:text-gray-100'}`}>
                    Light
                  </div>
                  {/* Selection Indicator */}
                  {themeMode === 'light' && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>

                {/* Dark Mode Option */}
                <button
                  onClick={() => setThemeMode('dark')}
                  className={`relative group rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 ${themeMode === 'dark' ? 'ring-2 ring-indigo-600' : ''}`}
                >
                  {/* Preview Window */}
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-900 border border-gray-700">
                    {/* Window Header */}
                    <div className="h-4 bg-gray-800 border-b border-gray-700 flex items-center px-1.5 space-x-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                    </div>
                    {/* Window Content */}
                    <div className="p-1.5 space-y-1">
                      <div className="h-1 w-8 bg-gray-700 rounded"></div>
                      <div className="h-1 w-12 bg-gray-700 rounded"></div>
                      <div className="h-1 w-10 bg-gray-700 rounded"></div>
                    </div>
                  </div>
                  {/* Label */}
                  <div className={`mt-2 text-xs font-medium ${themeMode === 'dark' ? 'text-indigo-600' : 'text-gray-900 dark:text-gray-100'}`}>
                    Dark
                  </div>
                  {/* Selection Indicator */}
                  {themeMode === 'dark' && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>

                {/* System Option */}
                <button
                  onClick={() => setThemeMode('system')}
                  className={`relative group rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 ${themeMode === 'system' ? 'ring-2 ring-indigo-600' : ''}`}
                >
                  {/* Preview Window */}
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-r from-white to-gray-900 border border-gray-200 dark:border-gray-700">
                    {/* Window Header */}
                    <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-1.5 space-x-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                    </div>
                    {/* Window Content */}
                    <div className="p-1.5 space-y-1">
                      <div className="h-1 w-8 bg-gradient-to-r from-gray-200 to-gray-700 rounded"></div>
                      <div className="h-1 w-12 bg-gradient-to-r from-gray-200 to-gray-700 rounded"></div>
                      <div className="h-1 w-10 bg-gradient-to-r from-gray-200 to-gray-700 rounded"></div>
                    </div>
                  </div>
                  {/* Label */}
                  <div className={`mt-2 text-xs font-medium ${themeMode === 'system' ? 'text-indigo-600' : 'text-gray-900 dark:text-gray-100'}`}>
                    System
                  </div>
                  {/* Selection Indicator */}
                  {themeMode === 'system' && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 bg-white dark:bg-gray-700 rounded-full shadow-sm">
                    {themeMode === 'system' ? (
                      <ComputerDesktopIcon className="h-4 w-4 text-indigo-600" />
                    ) : isDarkMode ? (
                      <MoonIcon className="h-4 w-4 text-indigo-600" />
                    ) : (
                      <SunIcon className="h-4 w-4 text-indigo-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900 dark:text-gray-100">
                      {themeMode === 'system' 
                        ? `System (${systemTheme})`
                        : themeMode === 'dark'
                        ? 'Dark appearance'
                        : 'Light appearance'
                      }
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {themeMode === 'system'
                        ? 'Automatically matches system theme'
                        : isDarkMode 
                        ? 'Optimized for low-light environments'
                        : 'Optimized for daylight viewing'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  )
} 