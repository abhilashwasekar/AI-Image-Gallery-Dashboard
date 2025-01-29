import { format } from 'date-fns'
import { AIImage } from '@/types/image'
import Image from 'next/image'

interface ImageCardProps {
  image: AIImage
  onClick: () => void
}

export function ImageCard({ image, onClick }: ImageCardProps) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer animate-fade-in hover:shadow-2xl border border-gray-200 dark:border-gray-700"
      onClick={onClick}
    >
      <div className="relative h-48">
        <Image
          src={image.imageUrl}
          alt={image.title}
          fill
          className="object-cover transition-opacity hover:opacity-90"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate">
          {image.title}
        </h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {format(new Date(image.generationDate), 'PPP')}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {image.aiModel}
          </p>
          <div className="flex flex-wrap gap-2">
            {image.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}