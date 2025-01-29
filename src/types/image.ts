export interface AIImage {
  id: string
  title: string
  imageUrl: string
  generationDate: string
  aiModel: string
  tags: string[]
}

export type AIModel = 'Stable Diffusion' | 'DALL-E' | 'Midjourney'