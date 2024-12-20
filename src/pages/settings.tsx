import Layout from '@/components/common/Layout'
import SettingsTabs from '@/components/pages/settings/SettingsTabs'

export default function Settings() {
  return (
    <Layout>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Settings</h1>
      <SettingsTabs />
    </Layout>
  )
} 