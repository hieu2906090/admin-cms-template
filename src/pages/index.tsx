import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Project } from '@/types'
import Layout from '@/components/common/Layout'

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsCollection = collection(db, 'projects')
      const projectsSnapshot = await getDocs(projectsCollection)
      const projectsList = projectsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setProjects(projectsList as Project[])
      setLoading(false)
    }

    fetchProjects()
  }, [])

  return (
    <Layout>
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        
        <div className="mt-8">
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project: any) => (
                <div
                  key={project.id}
                  className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400"
                >
                  <div className="min-w-0 flex-1">
                    <a href="#" className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900">{project.name}</p>
                      <p className="truncate text-sm text-gray-500">{project.description}</p>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
} 