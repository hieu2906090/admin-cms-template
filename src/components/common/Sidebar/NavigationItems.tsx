import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  HomeIcon,
  CogIcon,
  DocumentDuplicateIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline'

interface NavigationItemsProps {
  collapsed: boolean
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Projects', href: '/projects', icon: DocumentDuplicateIcon },
  { name: 'Demo Components', href: '/demo', icon: BeakerIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
]

export default function NavigationItems({ collapsed }: NavigationItemsProps) {
  const router = useRouter()

  return (
    <ul role="list" className="flex flex-1 flex-col gap-y-7">
      <li>
        <ul role="list" className="-mx-2 space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`
                  group flex rounded-md p-2 text-sm leading-6
                  ${collapsed ? 'justify-center' : 'gap-x-3'}
                  ${router.pathname === item.href
                    ? 'bg-gray-50 text-indigo-600'
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                  }
                `}
              >
                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                {!collapsed && <span className="flex-1">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  )
} 