import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Project } from '@/types'
import Layout from '@/components/common/Layout'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { user } = useAuth()

  const fetchProjects = async () => {
    try {
      if (!user) {
        throw new Error('Authentication required')
      }

      setLoading(true)
      const projectsRef = collection(db, 'projects')
      const snapshot = await getDocs(projectsRef)
      
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[]
      
      setProjects(projectsData)
      setError(null)
    } catch (err: any) {
      console.error('Error fetching projects:', err)
      
      if (err.code === 'permission-denied' || err.message.includes('Missing or insufficient permissions')) {
        await router.replace('/login')
        return
      }
      
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchProjects()
    }
  }, [user])

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Error loading projects</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        
        <div className="mt-8">
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
        </div>
      </div>
    </Layout>
  )
} 