import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { AIImage } from '@/types/image'
import Image from 'next/image'
import { format } from 'date-fns'

interface ImageModalProps {
  image: AIImage | null
  isOpen: boolean
  onClose: () => void
}

export function ImageModal({ image, isOpen, onClose }: ImageModalProps) {
  if (!image) return null

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gradient-to-br from-black/80 to-gray-900/90" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                <div className="absolute right-4 top-4">
                  <button
                    type="button"
                    className="rounded-md p-2 text-gray-400 hover:text-gray-500 focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="relative h-96 mb-4">
                  <Image
                    src={image.imageUrl}
                    alt={image.title}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  {image.title}
                </Dialog.Title>

                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Generated on {format(new Date(image.generationDate), 'PPP')}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Using {image.aiModel}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {image.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}