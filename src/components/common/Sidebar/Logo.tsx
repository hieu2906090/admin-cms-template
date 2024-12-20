interface LogoProps {
  collapsed: boolean
}

export default function Logo({ collapsed }: LogoProps) {
  return (
    <div className={`flex h-16 shrink-0 items-center ${collapsed ? 'justify-center px-0' : 'px-2'}`}>
      <img
        src="/images/logo.png"
        alt="Company Logo"
        className={`${collapsed ? 'h-8 w-8' : 'h-8 w-auto'}`}
      />
      {!collapsed && (
        <div className="ml-2 font-semibold text-xl">
          <span className="text-green-600">green</span>
          <span className="text-blue-600">vital</span>
          <span className="text-gray-800">hub</span>
        </div>
      )}
    </div>
  )
} 