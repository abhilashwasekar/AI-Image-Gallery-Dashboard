import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { AIModel } from '@/types/image'

const models: { id: AIModel; name: string }[] = [
  { id: 'Stable Diffusion', name: 'Stable Diffusion' },
  { id: 'DALL-E', name: 'DALL-E' },
  { id: 'Midjourney', name: 'Midjourney' },
]

interface ModelFilterProps {
  selected: AIModel | null
  onChange: (model: AIModel | null) => void
}

export function ModelFilter({ selected, onChange }: ModelFilterProps) {
  const selectedModel = selected ? models.find(m => m.id === selected) : null

  return (
    <Listbox value={selectedModel} onChange={(value) => onChange(value?.id || null)}>
      <div className="relative">
        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white dark:bg-gray-700 py-2.5 pl-3 pr-10 text-left border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
          <span className="block truncate text-gray-900 dark:text-white">
            {selectedModel?.name || 'All Models'}
          </span>
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
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Listbox.Option
              className={({ active }) =>
                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                  active ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'
                }`
              }
              value={null}
            >
              {({ selected }) => (
                <>
                  <span className="block truncate">All Models</span>
                  {selected && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 dark:text-blue-400">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Listbox.Option>
            {models.map((model) => (
              <Listbox.Option
                key={model.id}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'
                  }`
                }
                value={model}
              >
                {({ selected }) => (
                  <>
                    <span className="block truncate">{model.name}</span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 dark:text-blue-400">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}