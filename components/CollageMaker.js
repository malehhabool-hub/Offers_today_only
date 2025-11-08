import { useState, useRef } from 'react'
import Image from 'next/image'

export default function CollageMaker({ mediaLibrary = [] }) {
  const [selectedImages, setSelectedImages] = useState([])
  const [layout, setLayout] = useState('grid-2x2')
  const [spacing, setSpacing] = useState(10)
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [borderRadius, setBorderRadius] = useState(0)
  const canvasRef = useRef(null)

  const layouts = [
    { id: 'grid-2x2', name: '2×2', cols: 2, rows: 2, max: 4 },
    { id: 'grid-3x3', name: '3×3', cols: 3, rows: 3, max: 9 },
    { id: 'grid-2x3', name: '2×3', cols: 2, rows: 3, max: 6 },
    { id: 'vertical-3', name: 'عمودي 3', cols: 1, rows: 3, max: 3 },
    { id: 'horizontal-3', name: 'أفقي 3', cols: 3, rows: 1, max: 3 },
    { id: 'featured-left', name: 'مميز يسار', cols: 2, rows: 2, max: 4, featured: true },
  ]

  const currentLayout = layouts.find(l => l.id === layout)

  const addImage = (image) => {
    if (selectedImages.length < currentLayout.max) {
      setSelectedImages([...selectedImages, image])
    } else {
      alert(`يمكنك إضافة ${currentLayout.max} صور فقط في هذا التخطيط`)
    }
  }

  const removeImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index))
  }

  const clearAll = () => {
    setSelectedImages([])
  }

  const exportCollage = () => {
    alert('سيتم تصدير الكولاج قريباً!')
  }

  const getGridStyle = () => {
    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${currentLayout.cols}, 1fr)`,
      gridTemplateRows: `repeat(${currentLayout.rows}, 1fr)`,
      gap: `${spacing}px`,
      backgroundColor,
      borderRadius: `${borderRadius}px`,
      padding: `${spacing}px`,
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Controls Panel */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🎨 إعدادات الكولاج</h3>

          {/* Layout Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📐 التخطيط ({selectedImages.length}/{currentLayout.max})
            </label>
            <div className="grid grid-cols-2 gap-2">
              {layouts.map(l => (
                <button
                  key={l.id}
                  onClick={() => setLayout(l.id)}
                  className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                    layout === l.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>

          {/* Spacing Control */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              📏 المسافة بين الصور: {spacing}px
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={spacing}
              onChange={(e) => setSpacing(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Border Radius */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ⭕ استدارة الحواف: {borderRadius}px
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={borderRadius}
              onChange={(e) => setBorderRadius(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Background Color */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🎨 لون الخلفية
            </label>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-full h-12 rounded-lg cursor-pointer"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={clearAll}
              disabled={selectedImages.length === 0}
              className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
            >
              🗑️ مسح الكل
            </button>
            <button
              onClick={exportCollage}
              disabled={selectedImages.length === 0}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              💾 تصدير الكولاج
            </button>
          </div>
        </div>

        {/* Image Library */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-sm font-bold text-gray-700 mb-3">📚 المكتبة</h3>
          <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
            {mediaLibrary.filter(m => m.type?.startsWith('image/')).map((image, idx) => (
              <div
                key={idx}
                onClick={() => addImage(image)}
                className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all"
              >
                <img
                  src={image.url}
                  alt={`Image ${idx}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {mediaLibrary.filter(m => m.type?.startsWith('image/')).length === 0 && (
              <div className="col-span-2 text-center py-4 text-gray-500 text-sm">
                لا توجد صور في المكتبة
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Canvas Panel */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">👁️ معاينة الكولاج</h3>

          <div
            ref={canvasRef}
            className="relative w-full aspect-square overflow-hidden shadow-lg"
            style={getGridStyle()}
          >
            {Array.from({ length: currentLayout.max }).map((_, index) => (
              <div
                key={index}
                className="relative bg-gray-100 rounded overflow-hidden group"
                style={{ borderRadius: `${borderRadius}px` }}
              >
                {selectedImages[index] ? (
                  <>
                    <img
                      src={selectedImages[index].url}
                      alt={`Collage ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <div className="text-4xl mb-2">+</div>
                      <div className="text-xs">اضغط على صورة</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">💡 نصائح الكولاج</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• اختر تخطيط يناسب عدد الصور لديك</li>
              <li>• استخدم المسافات لفصل الصور بشكل واضح</li>
              <li>• جرب ألوان خلفية مختلفة للحصول على أفضل نتيجة</li>
              <li>• يمكنك إزالة أي صورة بالضغط على × عند تمرير الماوس</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
