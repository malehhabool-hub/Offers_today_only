import { useState } from 'react'

export default function ElementsLibrary({ onAddElement }) {
  const [category, setCategory] = useState('stickers')
  const [selectedElement, setSelectedElement] = useState(null)

  const categories = [
    { id: 'stickers', name: 'ملصقات', icon: '😊' },
    { id: 'shapes', name: 'أشكال', icon: '⬛' },
    { id: 'icons', name: 'أيقونات', icon: '⭐' },
    { id: 'badges', name: 'شارات', icon: '🏷️' },
    { id: 'frames', name: 'إطارات', icon: '🖼️' },
  ]

  const elements = {
    stickers: [
      { id: 's1', emoji: '⭐', name: 'نجمة' },
      { id: 's2', emoji: '❤️', name: 'قلب' },
      { id: 's3', emoji: '✨', name: 'بريق' },
      { id: 's4', emoji: '🎉', name: 'احتفال' },
      { id: 's5', emoji: '🎁', name: 'هدية' },
      { id: 's6', emoji: '🔥', name: 'نار' },
      { id: 's7', emoji: '💎', name: 'ماسة' },
      { id: 's8', emoji: '🌟', name: 'نجمة متوهجة' },
      { id: 's9', emoji: '💫', name: 'دوامة' },
      { id: 's10', emoji: '🎊', name: 'كونفيتي' },
      { id: 's11', emoji: '🏆', name: 'كأس' },
      { id: 's12', emoji: '🎯', name: 'هدف' },
      { id: 's13', emoji: '💰', name: 'نقود' },
      { id: 's14', emoji: '🛍️', name: 'تسوق' },
      { id: 's15', emoji: '🎈', name: 'بالون' },
      { id: 's16', emoji: '🌈', name: 'قوس قزح' },
    ],
    shapes: [
      { id: 'sh1', shape: 'circle', color: '#667eea', name: 'دائرة' },
      { id: 'sh2', shape: 'square', color: '#f56565', name: 'مربع' },
      { id: 'sh3', shape: 'triangle', color: '#48bb78', name: 'مثلث' },
      { id: 'sh4', shape: 'rectangle', color: '#ed8936', name: 'مستطيل' },
      { id: 'sh5', shape: 'star', color: '#ecc94b', name: 'نجمة' },
      { id: 'sh6', shape: 'heart', color: '#ed64a6', name: 'قلب' },
    ],
    icons: [
      { id: 'i1', emoji: '✓', name: 'صح' },
      { id: 'i2', emoji: '✗', name: 'خطأ' },
      { id: 'i3', emoji: '→', name: 'سهم يمين' },
      { id: 'i4', emoji: '←', name: 'سهم يسار' },
      { id: 'i5', emoji: '↑', name: 'سهم لأعلى' },
      { id: 'i6', emoji: '↓', name: 'سهم لأسفل' },
      { id: 'i7', emoji: '☆', name: 'نجمة فارغة' },
      { id: 'i8', emoji: '★', name: 'نجمة ممتلئة' },
      { id: 'i9', emoji: '♥', name: 'قلب' },
      { id: 'i10', emoji: '☀', name: 'شمس' },
      { id: 'i11', emoji: '☁', name: 'سحابة' },
      { id: 'i12', emoji: '☂', name: 'مظلة' },
    ],
    badges: [
      { id: 'b1', text: 'جديد', color: '#48bb78', name: 'شارة جديد' },
      { id: 'b2', text: 'عرض', color: '#ed8936', name: 'شارة عرض' },
      { id: 'b3', text: 'خصم', color: '#f56565', name: 'شارة خصم' },
      { id: 'b4', text: 'مجاني', color: '#667eea', name: 'شارة مجاني' },
      { id: 'b5', text: 'حصري', color: '#9f7aea', name: 'شارة حصري' },
      { id: 'b6', text: 'الأكثر مبيعاً', color: '#ecc94b', name: 'الأكثر مبيعاً' },
      { id: 'b7', text: 'محدود', color: '#f56565', name: 'شارة محدود' },
      { id: 'b8', text: 'مميز', color: '#38b2ac', name: 'شارة مميز' },
    ],
    frames: [
      { id: 'f1', style: 'solid', name: 'إطار صلب' },
      { id: 'f2', style: 'dashed', name: 'إطار متقطع' },
      { id: 'f3', style: 'dotted', name: 'إطار منقط' },
      { id: 'f4', style: 'double', name: 'إطار مزدوج' },
      { id: 'f5', style: 'rounded', name: 'إطار مستدير' },
      { id: 'f6', style: 'shadow', name: 'إطار بظل' },
    ],
  }

  const handleAddElement = (element) => {
    setSelectedElement(element)
    if (onAddElement) {
      onAddElement({ ...element, category })
    }
    alert(`تم إضافة: ${element.name}`)
  }

  const renderElement = (element) => {
    switch (category) {
      case 'stickers':
      case 'icons':
        return (
          <div className="text-6xl">
            {element.emoji}
          </div>
        )
      case 'shapes':
        return (
          <div
            className="w-16 h-16"
            style={{
              backgroundColor: element.color,
              borderRadius: element.shape === 'circle' ? '50%' : '0',
              clipPath: element.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' :
                        element.shape === 'star' ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' :
                        element.shape === 'heart' ? 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")' :
                        'none'
            }}
          />
        )
      case 'badges':
        return (
          <div
            className="px-4 py-2 rounded-full text-white font-bold text-sm"
            style={{ backgroundColor: element.color }}
          >
            {element.text}
          </div>
        )
      case 'frames':
        return (
          <div
            className="w-20 h-20 flex items-center justify-center"
            style={{
              border: element.style === 'solid' ? '4px solid #667eea' :
                      element.style === 'dashed' ? '4px dashed #667eea' :
                      element.style === 'dotted' ? '4px dotted #667eea' :
                      element.style === 'double' ? '6px double #667eea' :
                      '4px solid #667eea',
              borderRadius: element.style === 'rounded' ? '12px' : '0',
              boxShadow: element.style === 'shadow' ? '0 4px 6px rgba(0,0,0,0.3)' : 'none'
            }}
          >
            <span className="text-gray-400 text-xs">إطار</span>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">🎨 مكتبة العناصر</h2>
      </div>

      {/* Category Tabs */}
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

      {/* Elements Grid */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {elements[category]?.map(element => (
            <div
              key={element.id}
              onClick={() => handleAddElement(element)}
              className="aspect-square bg-gray-50 rounded-lg hover:bg-gray-100 border-2 border-gray-200 hover:border-primary-500 cursor-pointer transition-all flex flex-col items-center justify-center p-2 group"
            >
              <div className="mb-2">
                {renderElement(element)}
              </div>
              <div className="text-xs text-gray-600 text-center group-hover:text-primary-600 truncate w-full">
                {element.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
          <h3 className="font-bold text-purple-900 mb-3">✨ مكتبة عناصر غنية</h3>
          <ul className="text-sm text-purple-800 space-y-2">
            <li>• مئات العناصر الجاهزة للاستخدام</li>
            <li>• ملصقات وأيقونات متنوعة</li>
            <li>• أشكال وإطارات قابلة للتخصيص</li>
            <li>• شارات احترافية للعروض</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-3">🎯 كيفية الاستخدام</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>1. اختر الفئة المناسبة</li>
            <li>2. اضغط على العنصر لإضافته</li>
            <li>3. قم بتعديل الحجم والموقع</li>
            <li>4. احفظ التصميم النهائي</li>
          </ul>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map(cat => (
          <div key={cat.id} className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-3xl mb-2">{cat.icon}</div>
            <div className="text-2xl font-bold text-primary-600">
              {elements[cat.id]?.length || 0}
            </div>
            <div className="text-xs text-gray-600 mt-1">{cat.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
