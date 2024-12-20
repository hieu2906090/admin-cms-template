import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

interface Option {
  id: string | number
  label: string
  value: any
}

interface SelectProps {
  options: Option[]
  value?: Option | null
  onChange: (value: Option) => void
  label?: string
  error?: string
}

export default function Select({ options, value, onChange, label, error }: SelectProps) {
  const selectedValue = value || options[0]

  return (
    <div className="w-full">
      {label && (
        <div className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </div>
      )}
      <Listbox value={selectedValue} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className={`
            relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left
            border ${error ? 'border-red-300' : 'border-gray-300'}
            shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500
            sm:text-sm
          `}>
            <span className="block truncate">{selectedValue.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                    }`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {option.label}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-indigo-600'
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
} 