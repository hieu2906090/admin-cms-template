import { useState } from 'react'
import { Tab } from '@headlessui/react'

interface TabItem {
  key: string
  title: string
  content: React.ReactNode
}

interface TabsProps {
  items: TabItem[]
  defaultIndex?: number
}

export default function Tabs({ items, defaultIndex = 0 }: TabsProps) {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex)

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
        {items.map((item) => (
          <Tab
            key={item.key}
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${
                selected
                  ? 'bg-white text-indigo-600 shadow'
                  : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
              }`
            }
          >
            {item.title}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-4">
        {items.map((item) => (
          <Tab.Panel
            key={item.key}
            className="rounded-xl bg-white p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {item.content}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
} 