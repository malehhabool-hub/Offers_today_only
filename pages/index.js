import { useState } from 'react'
import Head from 'next/head'
import OfferDesigner from '@/components/OfferDesigner'
import MediaLibrary from '@/components/MediaLibrary'
import Header from '@/components/Header'

export default function Home() {
  const [activeTab, setActiveTab] = useState('designer')
  const [selectedMedia, setSelectedMedia] = useState(null)

  return (
    <>
      <Head>
        <title>منصة تصميم العروض | Offers Design Platform</title>
        <meta name="description" content="منصة إبداعية لتصميم العروض الترويجية" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Navigation Tabs */}
          <div className="mb-8 border-b border-gray-200">
            <nav className="flex gap-4" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('designer')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'designer'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                🎨 مصمم العروض
              </button>
              <button
                onClick={() => setActiveTab('library')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'library'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📚 مكتبة الوسائط
              </button>
            </nav>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {activeTab === 'designer' && (
              <OfferDesigner selectedMedia={selectedMedia} />
            )}
            {activeTab === 'library' && (
              <MediaLibrary onSelectMedia={setSelectedMedia} />
            )}
          </div>
        </main>
      </div>
    </>
  )
}
