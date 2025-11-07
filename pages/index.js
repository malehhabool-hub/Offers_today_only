import { useState } from 'react'
import Head from 'next/head'
import OfferDesigner from '@/components/OfferDesigner'
import MediaLibrary from '@/components/MediaLibrary'
import ImageEditor from '@/components/ImageEditor'
import CollageMaker from '@/components/CollageMaker'
import DesignTemplates from '@/components/DesignTemplates'
import TextEditor from '@/components/TextEditor'
import ElementsLibrary from '@/components/ElementsLibrary'
import Header from '@/components/Header'

export default function Home() {
  const [activeTab, setActiveTab] = useState('designer')
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [uploadedFiles, setUploadedFiles] = useState([])

  const tabs = [
    { id: 'designer', name: '🎨 مصمم العروض', icon: '🎨' },
    { id: 'templates', name: '📋 القوالب', icon: '📋' },
    { id: 'editor', name: '✨ محرر الصور', icon: '✨' },
    { id: 'collage', name: '🖼️ الكولاج', icon: '🖼️' },
    { id: 'text', name: '✏️ النصوص', icon: '✏️' },
    { id: 'elements', name: '🎨 العناصر', icon: '🎨' },
    { id: 'library', name: '📚 المكتبة', icon: '📚' },
  ]

  return (
    <>
      <Head>
        <title>منصة التصميم الإبداعية | Creative Design Platform</title>
        <meta name="description" content="منصة شاملة للتصميم الإبداعي بميزات ذكية احترافية" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              ✨ منصة التصميم الإبداعية الذكية
            </h1>
            <p className="text-gray-600">
              أداة احترافية شاملة للتصميم والإبداع - مستوحاة من أفضل المنصات العالمية
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8 border-b border-gray-200 bg-white rounded-t-lg shadow-md overflow-x-auto">
            <nav className="flex gap-2 p-2" aria-label="Tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-lg shadow-lg p-6 min-h-[600px]">
            {activeTab === 'designer' && (
              <OfferDesigner selectedMedia={selectedMedia} />
            )}
            {activeTab === 'templates' && (
              <DesignTemplates onSelectTemplate={(template) => console.log('Selected template:', template)} />
            )}
            {activeTab === 'editor' && (
              <ImageEditor 
                selectedMedia={selectedMedia} 
                onClose={() => setSelectedMedia(null)} 
              />
            )}
            {activeTab === 'collage' && (
              <CollageMaker mediaLibrary={uploadedFiles} />
            )}
            {activeTab === 'text' && (
              <TextEditor onAddText={(text) => console.log('Added text:', text)} />
            )}
            {activeTab === 'elements' && (
              <ElementsLibrary onAddElement={(element) => console.log('Added element:', element)} />
            )}
            {activeTab === 'library' && (
              <MediaLibrary 
                onSelectMedia={setSelectedMedia}
                onUploadedFilesChange={setUploadedFiles}
              />
            )}
          </div>

          {/* Features Highlight */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-6 shadow-md">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="text-xl font-bold text-purple-900 mb-2">ذكاء اصطناعي</h3>
              <p className="text-purple-800 text-sm">
                إزالة الخلفية تلقائياً وتحسين الصور بالذكاء الاصطناعي
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg p-6 shadow-md">
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">أدوات احترافية</h3>
              <p className="text-blue-800 text-sm">
                مجموعة كاملة من أدوات التصميم والتحرير الاحترافية
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-lg p-6 shadow-md">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-xl font-bold text-green-900 mb-2">سريع وسهل</h3>
              <p className="text-green-800 text-sm">
                واجهة بسيطة وسريعة مع معاينة فورية للتغييرات
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
