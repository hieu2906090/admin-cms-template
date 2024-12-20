import { useState } from 'react'
import Layout from '@/components/common/Layout'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Badge from '@/components/ui/Badge'
import Alert from '@/components/ui/Alert'
import Spinner from '@/components/ui/Spinner'
import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Tooltip from '@/components/ui/Tooltip'
import { useToast } from '@/components/ui/Toast/ToastContext'
import Modal from '@/components/ui/Modal'
import SweetAlert from '@/components/ui/SweetAlert'

export default function DemoComponents() {
  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSweetAlertOpen, setIsSweetAlertOpen] = useState(false)
  const [sweetAlertType, setSweetAlertType] = useState<'success' | 'error' | 'warning' | 'info'>('info')
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md')

  const tabItems = [
    {
      key: 'tab1',
      title: 'Tab 1',
      content: <div className="p-4">Content for Tab 1</div>,
    },
    {
      key: 'tab2',
      title: 'Tab 2',
      content: <div className="p-4">Content for Tab 2</div>,
    },
  ]

  const handleToastClick = (type: 'success' | 'error' | 'warning' | 'info') => {
    showToast(
      `${type.charAt(0).toUpperCase() + type.slice(1)} Toast`,
      'This is a demo message',
      type
    )
  }

  const simulateLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  const showSweetAlert = (type: 'success' | 'error' | 'warning' | 'info') => {
    setSweetAlertType(type)
    setIsSweetAlertOpen(true)
  }

  return (
    <Layout>
      <div className="mx-auto max-w-7xl space-y-8">
        <h1 className="text-3xl font-bold">Component Demo</h1>

        <Card className="p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">Buttons</h2>
            <div className="flex gap-4 flex-wrap">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button disabled>Disabled</Button>
              <Button onClick={simulateLoading} disabled={isLoading}>
                {isLoading && <Spinner size="sm" variant="white" className="mr-2" />}
                {isLoading ? 'Loading...' : 'Click Me'}
              </Button>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Badges</h2>
            <div className="flex gap-4 flex-wrap">
              <Badge variant="default">Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Form Controls</h2>
            <div className="space-y-4 max-w-md">
              <Input label="Text Input" placeholder="Enter some text" />
              <Input label="With Error" error="This field is required" />
              <Select
                label="Select Option"
                options={[
                  { id: 1, label: 'Option 1', value: '1' },
                  { id: 2, label: 'Option 2', value: '2' },
                ]}
                value={{ id: 1, label: 'Option 1', value: '1' }}
                onChange={() => {}}
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Alerts</h2>
            <div className="space-y-4">
              <Alert title="Info Alert" message="This is an info message" variant="info" />
              <Alert title="Success Alert" message="This is a success message" variant="success" />
              <Alert title="Warning Alert" message="This is a warning message" variant="warning" />
              <Alert title="Error Alert" message="This is an error message" variant="error" />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Toasts</h2>
            <div className="flex gap-4 flex-wrap">
              <Button onClick={() => handleToastClick('success')}>Show Success Toast</Button>
              <Button onClick={() => handleToastClick('error')}>Show Error Toast</Button>
              <Button onClick={() => handleToastClick('warning')}>Show Warning Toast</Button>
              <Button onClick={() => handleToastClick('info')}>Show Info Toast</Button>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Tooltips</h2>
            <div className="flex gap-4 items-center">
              <Tooltip content="Top tooltip">
                <Button>Hover me (Top)</Button>
              </Tooltip>
              <Tooltip content="Bottom tooltip" position="bottom">
                <Button>Hover me (Bottom)</Button>
              </Tooltip>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Tabs</h2>
            <Tabs items={tabItems} />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Modals & Alerts</h2>
            <div className="flex gap-4 flex-wrap">
              <Button onClick={() => setIsModalOpen(true)}>
                Default Modal (md)
              </Button>
              <Button onClick={() => {
                setModalSize('sm')
                setIsModalOpen(true)
              }}>
                Small Modal
              </Button>
              <Button onClick={() => {
                setModalSize('lg')
                setIsModalOpen(true)
              }}>
                Large Modal
              </Button>
              <Button onClick={() => {
                setModalSize('xl')
                setIsModalOpen(true)
              }}>
                Extra Large Modal
              </Button>
              <Button onClick={() => {
                setModalSize('full')
                setIsModalOpen(true)
              }}>
                Full Width Modal
              </Button>
              <Button onClick={() => showSweetAlert('success')}>
                Success Alert
              </Button>
              <Button onClick={() => showSweetAlert('error')}>
                Error Alert
              </Button>
              <Button onClick={() => showSweetAlert('warning')}>
                Warning Alert
              </Button>
              <Button onClick={() => showSweetAlert('info')}>
                Info Alert
              </Button>
            </div>
          </section>

          {/* Modal Example */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Example Modal"
            size={modalSize}
          >
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                This is an example modal dialog. Current size: {modalSize}
              </p>
              <div className="mt-4">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>
                Save Changes
              </Button>
            </div>
          </Modal>

          {/* SweetAlert Example */}
          <SweetAlert
            isOpen={isSweetAlertOpen}
            onClose={() => setIsSweetAlertOpen(false)}
            title={`${sweetAlertType.charAt(0).toUpperCase() + sweetAlertType.slice(1)} Alert`}
            message="This is a SweetAlert-style dialog example."
            type={sweetAlertType}
            showCancel
            onConfirm={() => console.log('Confirmed!')}
          />
        </Card>
      </div>
    </Layout>
  )
} 