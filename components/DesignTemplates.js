import { useState } from 'react'

export default function DesignTemplates({ onSelectTemplate }) {
  const [category, setCategory] = useState('all')
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const templates = [
    // Social Media Templates
    {
      id: 'social-story-1',
      name: 'قصة إنستغرام - عرض خاص',
      category: 'social',
      size: '1080x1920',
      preview: {
        bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        layout: 'story'
      }
    },
    {
      id: 'social-post-1',
      name: 'منشور سوشيال ميديا',
      category: 'social',
      size: '1080x1080',
      preview: {
        bgColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        layout: 'square'
      }
    },
    {
      id: 'social-cover-1',
      name: 'غلاف فيسبوك',
      category: 'social',
      size: '1200x630',
      preview: {
        bgColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        layout: 'wide'
      }
    },
    // Offers Templates
    {
      id: 'offer-sale-1',
      name: 'عرض تخفيضات',
      category: 'offers',
      size: '1200x1200',
      preview: {
        bgColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        layout: 'square'
      }
    },
    {
      id: 'offer-flash-1',
      name: 'عرض فلاش',
      category: 'offers',
      size: '1080x1920',
      preview: {
        bgColor: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)',
        layout: 'story'
      }
    },
    {
      id: 'offer-special-1',
      name: 'عرض خاص',
      category: 'offers',
      size: '1080x1080',
      preview: {
        bgColor: 'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
        layout: 'square'
      }
    },
    // Event Templates
    {
      id: 'event-invitation-1',
      name: 'دعوة حدث',
      category: 'events',
      size: '1080x1350',
      preview: {
        bgColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        layout: 'portrait'
      }
    },
    {
      id: 'event-announcement-1',
      name: 'إعلان حدث',
      category: 'events',
      size: '1200x1200',
      preview: {
        bgColor: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        layout: 'square'
      }
    },
    // Business Templates
    {
      id: 'business-card-1',
      name: 'بطاقة عمل رقمية',
      category: 'business',
      size: '1080x1920',
      preview: {
        bgColor: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
        layout: 'story'
      }
    },
    {
      id: 'business-promo-1',
      name: 'إعلان تجاري',
      category: 'business',
      size: '1200x628',
      preview: {
        bgColor: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        layout: 'wide'
      }
    },
  ]

  const categories = [
    { id: 'all', name: 'الكل', icon: '🎨' },
    { id: 'social', name: 'سوشيال ميديا', icon: '📱' },
    { id: 'offers', name: 'العروض', icon: '🎁' },
    { id: 'events', name: 'الفعاليات', icon: '🎉' },
    { id: 'business', name: 'أعمال', icon: '💼' },
  ]

  const filteredTemplates = category === 'all' 
    ? templates 
    : templates.filter(t => t.category === category)

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template)
    if (onSelectTemplate) {
      onSelectTemplate(template)
    }
  }

  const useTemplate = () => {
    if (selectedTemplate) {
      alert(`جاري تحميل القالب: ${selectedTemplate.name}`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">📋 قوالب التصميم</h2>
        <button
          onClick={useTemplate}
          disabled={!selectedTemplate}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          استخدام القالب
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
              category === cat.id
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            onClick={() => handleSelectTemplate(template)}
            className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer border-2 ${
              selectedTemplate?.id === template.id
                ? 'border-primary-600 ring-2 ring-primary-200'
                : 'border-transparent'
            }`}
          >
            <div
              className={`relative ${
                template.preview.layout === 'story' ? 'aspect-[9/16]' :
                template.preview.layout === 'portrait' ? 'aspect-[4/5]' :
                template.preview.layout === 'wide' ? 'aspect-[1.91/1]' :
                'aspect-square'
              }`}
              style={{ background: template.preview.bgColor }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <div className="text-4xl mb-2">✨</div>
                  <div className="text-sm font-medium opacity-90">معاينة القالب</div>
                </div>
              </div>
              {selectedTemplate?.id === template.id && (
                <div className="absolute top-2 right-2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white">
                  ✓
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-1">{template.name}</h3>
              <p className="text-sm text-gray-500">{template.size}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
        <h3 className="font-bold text-purple-900 mb-3 text-lg">✨ قوالب احترافية جاهزة</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-800">
          <div>
            <div className="font-semibold mb-2">🎨 مميزات القوالب:</div>
            <ul className="space-y-1">
              <li>• تصاميم احترافية جاهزة</li>
              <li>• قابلة للتعديل بالكامل</li>
              <li>• مناسبة لجميع المنصات</li>
              <li>• ألوان متناسقة</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">📱 فئات القوالب:</div>
            <ul className="space-y-1">
              <li>• منشورات السوشيال ميديا</li>
              <li>• عروض ترويجية</li>
              <li>• دعوات وفعاليات</li>
              <li>• تصاميم تجارية</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-3xl font-bold text-primary-600">{templates.length}</div>
          <div className="text-sm text-gray-600 mt-1">قالب متاح</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-3xl font-bold text-green-600">{categories.length - 1}</div>
          <div className="text-sm text-gray-600 mt-1">فئة مختلفة</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-3xl font-bold text-blue-600">∞</div>
          <div className="text-sm text-gray-600 mt-1">إمكانيات التخصيص</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-3xl font-bold text-purple-600">HD</div>
          <div className="text-sm text-gray-600 mt-1">جودة عالية</div>
        </div>
      </div>
    </div>
  )
}
