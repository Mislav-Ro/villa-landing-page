import { useEffect, useState } from 'react'

export default function ImageCarousel() {
  const [images, setImages] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Load images from the Villa Esquel folder
    const loadImages = async () => {
      try {
        // You'll need to add your image filenames here
        // Since we can't dynamically read directory contents in Next.js,
        // we'll define the image list manually
        const imageList = [
          'villa1.jpg',
          'villa2.jpg',
          'villa3.jpg',
          'villa4.jpg',
          'villa5.jpg',
          'villa6.jpg',
          'villa7.jpg',
          'villa8.jpg',
          'villa9.jpg',
          'villa10.jpg'
          // Add more image filenames as needed
        ]

        // Filter out images that don't exist by attempting to load them
        const validImages = []
        for (const imageName of imageList) {
          try {
            const img = new Image()
            await new Promise((resolve, reject) => {
              img.onload = resolve
              img.onerror = reject
              img.src = `/Villa Esquel/${imageName}`
            })
            validImages.push(`/Villa Esquel/${imageName}`)
          } catch (e) {
            // Image doesn't exist, skip it
            console.log(`Image not found: ${imageName}`)
          }
        }

        setImages(validImages)
        setLoading(false)
      } catch (err) {
        setError('Failed to load images')
        setLoading(false)
      }
    }

    loadImages()
  }, [])

  useEffect(() => {
    // Keyboard navigation
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious()
      } else if (event.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [images.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  if (loading) {
    return (
      <div className="w-full max-h-[320px] lg:max-h-[400px] xl:max-h-[480px] bg-gray-200 rounded-2xl flex items-center justify-center aspect-[3/2]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading images...</p>
        </div>
      </div>
    )
  }

  if (error || images.length === 0) {
    return (
      <div className="w-full max-h-[320px] lg:max-h-[400px] xl:max-h-[480px] bg-gray-200 rounded-2xl flex items-center justify-center aspect-[3/2]">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-gray-500">No images available</p>
          <p className="text-sm text-gray-400 mt-2">
            Please add images to the /public/Villa Esquel/ folder
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Main Image Display */}
      <div className="relative overflow-hidden rounded-2xl shadow-lg group bg-gray-100 max-w-5xl mx-auto">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img 
                src={image} 
                alt={`Villa Esquel ${index + 1}`}
                className="w-full aspect-[3/2] object-cover max-h-[320px] lg:max-h-[400px] xl:max-h-[480px]"
                style={{ height: 'auto', maxWidth: '100%' }}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Dots Indicator */}
        {images.length > 1 && images.length <= 10 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2 px-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentIndex 
                  ? 'border-blue-500 scale-105 shadow-lg' 
                  : 'border-gray-300 hover:border-gray-400 hover:scale-102'
              }`}
            >
              <img 
                src={image} 
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Navigation Instructions */}
      {images.length > 1 && (
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Use arrow keys or click thumbnails to navigate • {images.length} photos
          </p>
        </div>
      )}
    </div>
  )
}
