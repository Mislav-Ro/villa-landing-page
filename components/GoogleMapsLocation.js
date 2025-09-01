export default function GoogleMapsLocation() {
  const locationData = {
    name: "Villa Esquel",
    address: "Uvala Stivasnica 100e, Croatia",
    coordinates: {
      lat: 43.49868666241141,
      lng: 15.96955897569116
    },
    googleMapsUrl: "https://share.google/ORSTSYzB1usNgAnwW",
    appleMapsUrl: "https://maps.apple.com/?q=Villa+Esquel&ll=43.49868666241141,15.96955897569116"
  }

  const handleDirectionsClick = (platform) => {
    if (platform === 'google') {
      window.open(locationData.googleMapsUrl, '_blank', 'noopener,noreferrer')
    } else if (platform === 'apple') {
      window.open(locationData.appleMapsUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">Location</h2>
        <p className="text-gray-600">
          Villa Esquel is perfectly located to offer you both tranquility and easy access to local attractions. 
          Situated in beautiful Croatia, our villa provides stunning views and a peaceful retreat.
        </p>
      </div>
      
      <div className="relative mb-6">
        {/* Google Maps Embed */}
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md bg-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2649.225208017255!2d15.96955897569116!3d43.49868666241141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133517cbecd84377%3A0xc187617897e15b21!2sVilla%20Esquel!5e1!3m2!1sen!2shr!4v1756727389108!5m2!1sen!2shr"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
            title="Villa Esquel Location"
          ></iframe>
          
          {/* Loading overlay */}
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center rounded-lg">
            <div className="text-gray-500">
              <svg className="w-8 h-8 animate-spin mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <p className="text-sm">Loading map...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Location Details and Quick Actions */}
      <div className="space-y-4">
        {/* Address and Coordinates */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Address
              </h3>
              <p className="text-gray-600 mb-1">{locationData.address}</p>
              <p className="text-sm text-gray-500">
                Coordinates: {locationData.coordinates.lat.toFixed(6)}, {locationData.coordinates.lng.toFixed(6)}
              </p>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(locationData.address)}
              className="ml-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              title="Copy address"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Options */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
            </svg>
            Get Directions
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handleDirectionsClick('google')}
              className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors group"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C8.134 0 5 3.134 5 7c0 3.886 7 17 7 17s7-13.114 7-17c0-3.866-3.134-7-7-7zm0 10.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 3.5 12 3.5s3.5 1.57 3.5 3.5S13.93 10.5 12 10.5z"/>
              </svg>
              Google Maps
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
            
            <button
              onClick={() => handleDirectionsClick('apple')}
              className="flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors group"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Apple Maps
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-3 text-center">
            Choose your preferred navigation app for turn-by-turn directions
          </p>
        </div>

        {/* Additional Location Info */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Travel Information
          </h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• Located in beautiful coastal Croatia</p>
            <p>• Easy access to local beaches and attractions</p>
            <p>• Private parking available on-site</p>
            <p>• Nearest airport: Split (approximately 45 minutes drive)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
