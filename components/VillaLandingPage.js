import ImageCarousel from './ImageCarousel'
import AvailabilityCalendar from './AvailabilityCalendar'
import ContactForm from './ContactForm'
import GoogleMapsLocation from './GoogleMapsLocation'

export default function VillaLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="w-full text-center pt-12 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            Welcome to Villa Esquel
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            A luxurious retreat with breathtaking views and modern amenities, 
            nestled in the heart of beautiful Croatia.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Croatia, Europe
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Fully Equipped
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
              </svg>
              Year-Round Comfort
            </div>
          </div>
        </div>
      </header>

      {/* Image Carousel Section */}
      <section className="w-full px-6 mb-16">
        <div className="max-w-7xl mx-auto">
          <ImageCarousel />
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* Calendar and Contact Form Row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
          <div className="space-y-8">
            <AvailabilityCalendar />
          </div>
          <div className="space-y-8">
            <ContactForm />
          </div>
        </div>

        {/* Google Maps Location Section */}
        <div className="mb-12">
          <GoogleMapsLocation />
        </div>

        {/* Villa Features Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Villa Features & Amenities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature items */}
            <div className="flex items-start p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Swimming Pool</h3>
                <p className="text-sm text-gray-600">Private pool with stunning sea views</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m11 0H7m-7 0h2v-2h8v2H5v-2h2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Modern Kitchen</h3>
                <p className="text-sm text-gray-600">Fully equipped with premium appliances</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">WiFi & Entertainment</h3>
                <p className="text-sm text-gray-600">High-speed internet and smart TV</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Air Conditioning</h3>
                <p className="text-sm text-gray-600">Climate control in all rooms</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Prime Location</h3>
                <p className="text-sm text-gray-600">Close to beaches and attractions</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Private & Secure</h3>
                <p className="text-sm text-gray-600">Gated property with parking</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Book Your Stay?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Experience the perfect blend of luxury, comfort, and natural beauty at Villa Esquel. 
            Contact us today to check availability and make your reservation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a 
              href="mailto:mislavrogulj@gmail.com" 
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              mislavrogulj@gmail.com
            </a>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <p className="text-sm text-gray-400">
              © 2025 Villa Esquel. All rights reserved. | 
              <span className="ml-1">A Croatian hospitality experience</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
