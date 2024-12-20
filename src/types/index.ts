export interface Project {
  id: string
  name: string
  description?: string
  config: Record<string, any>
  createdAt: Date
}

export interface SidebarLink {
  name: string
  href: string
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element
} 