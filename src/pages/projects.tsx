import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Layout from '@/components/common/Layout'

export default function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [projectConfig, setProjectConfig] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await addDoc(collection(db, 'projects'), {
        name: projectName,
        config: JSON.parse(projectConfig),
        createdAt: new Date()
      })
      
      setIsModalOpen(false)
      setProjectName('')
      setProjectConfig('')
    } catch (error) {
      console.error('Error adding project:', error)
    }
  }

  return (
    <Layout>
      <div className="mx-auto max-w-7xl">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Projects</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage your projects and their configurations
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Add Project
            </button>
          </div>
        </div>

        {/* Add Project Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
              <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Project Configuration (JSON)
                    </label>
                    <textarea
                      value={projectConfig}
                      onChange={(e) => setProjectConfig(e.target.value)}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
} 