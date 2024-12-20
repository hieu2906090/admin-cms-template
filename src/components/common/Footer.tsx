export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-3">
        <div className="py-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} GreenVitalHub. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 