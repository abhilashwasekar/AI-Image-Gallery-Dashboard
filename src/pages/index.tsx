import { useState, useEffect } from 'react'
import { SearchBar } from '@/components/SearchBar'
import { ModelFilter } from '@/components/ModelFilter'
import { ImageCard } from '@/components/ImageCard'
import { ImageModal } from '@/components/ImageModal'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ImageSkeleton } from '@/components/ImageSkeleton'
import { AIImage, AIModel } from '@/types/image'
import imagesData from '@/data/images.json'

export default function Home() {
  const [images, setImages] = useState<AIImage[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null)
  const [selectedImage, setSelectedImage] = useState<AIImage | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Simulate API loading
    const loadImages = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setImages(imagesData.images)
      setLoading(false)
    }
    loadImages()
  }, [])

  const filteredImages = images.filter(image => {
    const matchesSearch = image.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesModel = !selectedModel || image.aiModel === selectedModel
    return matchesSearch && matchesModel
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8 p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-white">
            AI Image Gallery
          </h1>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <ModelFilter selected={selectedModel} onChange={setSelectedModel} />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <ImageSkeleton key={i} />
            ))}
          </div>
        ) : filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <ImageCard
                key={image.id}
                image={image}
                onClick={() => {
                  setSelectedImage(image)
                  setIsModalOpen(true)
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No images found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        <ImageModal
          image={selectedImage}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedImage(null)
          }}
        />

        <footer className="text-center py-6 mt-8 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
          <p>© 2023 AI Image Gallery. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}