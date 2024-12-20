import { useState } from 'react'
import { useRouter } from 'next/router'
import { 
  Bars3Icon, 
  MoonIcon, 
  SunIcon, 
  MagnifyingGlassIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void
  isSidebarCollapsed: boolean
  toggleSidebar: () => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}

export default function Header({ 
  setSidebarOpen, 
  isSidebarCollapsed, 
  toggleSidebar,
  isDarkMode,
  toggleDarkMode 
}: HeaderProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const router = useRouter()
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    initials: 'JD'
  }

  const handleLogout = () => {
    // Add your logout logic here
    router.push('/login')
  }

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Sidebar collapse button - visible on desktop */}
      <button
        type="button"
        className="hidden lg:block -m-2.5 p-2.5 text-gray-700"
        onClick={toggleSidebar}
      >
        <span className="sr-only">
          {isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        </span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* Search */}
        <div className="relative flex flex-1 items-center">
          <MagnifyingGlassIcon 
            className="pointer-events-none absolute left-3 h-5 w-5 text-gray-400" 
            aria-hidden="true" 
          />
          <input
            type="search"
            placeholder="Search..."
            className={`
              block h-10 w-full rounded-md border-0 py-1.5 pl-10 pr-3 
              text-gray-900 ring-1 ring-inset ring-gray-300 
              placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
              focus:ring-indigo-600 sm:text-sm sm:leading-6
              ${isSearchFocused ? 'w-full' : 'w-48 transition-all duration-300 focus:w-full'}
            `}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </div>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Dark mode toggle */}
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
            onClick={toggleDarkMode}
          >
            <span className="sr-only">Toggle dark mode</span>
            {isDarkMode ? (
              <SunIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <MoonIcon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>

          {/* User menu */}
          <Menu as="div" className="relative">
            <Menu.Button className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
                <span className="text-sm font-medium text-white">{user.initials}</span>
              </div>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={`
                        px-3 py-1 text-sm leading-6 
                        ${active ? 'bg-gray-50' : ''}
                      `}
                    >
                      <div className="font-semibold text-gray-900">{user.name}</div>
                      <div className="text-gray-500 text-xs">{user.email}</div>
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`
                        block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900
                        ${active ? 'bg-gray-50' : ''}
                      `}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  )
} 