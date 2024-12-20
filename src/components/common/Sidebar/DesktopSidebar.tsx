import Logo from './Logo'
import NavigationItems from './NavigationItems'

interface DesktopSidebarProps {
  collapsed: boolean
}

export default function DesktopSidebar({ collapsed }: DesktopSidebarProps) {
  return (
    <div className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col
      ${collapsed ? 'lg:w-20' : 'lg:w-72'}`}
    >
      <div className={`flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white pb-4
        ${collapsed ? 'px-2' : 'px-6'}`}>
        <Logo collapsed={collapsed} />
        <nav className="flex flex-1 flex-col">
          <NavigationItems collapsed={collapsed} />
        </nav>
      </div>
    </div>
  )
} 