import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Logo from './Logo'
import NavigationItems from './NavigationItems'

interface MobileSidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function MobileSidebar({ sidebarOpen, setSidebarOpen }: MobileSidebarProps) {
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
        <div className="fixed inset-0 flex">
          <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
              <Logo collapsed={false} />
              <nav className="flex flex-1 flex-col">
                <NavigationItems collapsed={false} />
              </nav>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition.Root>
  )
} 