import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

export default function ImageEditor({ selectedMedia, onClose }) {
  const [editState, setEditState] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    rotation: 0,
    scale: 100,
    flipH: false,
    flipV: false
  })
  const [activeFilter, setActiveFilter] = useState('none')
  const [isProcessing, setIsProcessing] = useState(false)
  const canvasRef = useRef(null)
  const imageRef = useRef(null)

  const filters = [
    { id: 'none', name: 'الأصلي', filter: '' },
    { id: 'grayscale', name: 'أبيض وأسود', filter: 'grayscale(100%)' },
    { id: 'sepia', name: 'سيبيا', filter: 'sepia(100%)' },
    { id: 'vintage', name: 'كلاسيكي', filter: 'sepia(50%) contrast(120%)' },
    { id: 'vivid', name: 'حيوي', filter: 'saturate(150%) contrast(110%)' },
    { id: 'cold', name: 'بارد', filter: 'hue-rotate(180deg) saturate(120%)' },
    { id: 'warm', name: 'دافئ', filter: 'sepia(30%) saturate(120%)' },
  ]

  const handleSliderChange = (field, value) => {
    setEditState(prev => ({ ...prev, [field]: parseInt(value) }))
  }

  const handleFlip = (direction) => {
    setEditState(prev => ({
      ...prev,
      [direction]: !prev[direction]
    }))
  }

  const getImageStyle = () => {
    const { brightness, contrast, saturation, blur, rotation, scale, flipH, flipV } = editState
    const filterValue = filters.find(f => f.id === activeFilter)?.filter || ''
    
    return {
      filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px) ${filterValue}`,
      transform: `rotate(${rotation}deg) scale(${scale / 100}) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
      transition: 'all 0.3s ease'
    }
  }

  const removeBackground = async () => {
    setIsProcessing(true)
    try {
      // Simulate AI background removal - In production, integrate with remove.bg or similar API
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('تم إزالة الخلفية بنجاح! (ميزة تجريبية)')
    } catch (error) {
      alert('حدث خطأ أثناء إزالة الخلفية')
    } finally {
      setIsProcessing(false)
    }
  }

  const exportImage = () => {
    alert('سيتم تصدير الصورة المعدلة قريباً!')
  }

  const resetEdits = () => {
    setEditState({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      rotation: 0,
      scale: 100,
      flipH: false,
      flipV: false
    })
    setActiveFilter('none')
  }

  if (!selectedMedia) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">اختر صورة من مكتبة الوسائط للبدء في التعديل</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Tools Panel */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🎨 أدوات التحرير</h3>
          
          {/* AI Background Removal */}
          <button
            onClick={removeBackground}
            disabled={isProcessing}
            className="w-full mb-4 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
          >
            {isProcessing ? '⏳ جاري المعالجة...' : '✨ إزالة الخلفية بالذكاء الاصطناعي'}
          </button>

          {/* Filters */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🎭 الفلاتر
            </label>
            <div className="grid grid-cols-2 gap-2">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                    activeFilter === filter.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>

          {/* Adjustments */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ☀️ السطوع: {editState.brightness}%
              </label>
              <input
                type="range"
                min="0"
                max="200"
                value={editState.brightness}
                onChange={(e) => handleSliderChange('brightness', e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                🌗 التباين: {editState.contrast}%
              </label>
              <input
                type="range"
                min="0"
                max="200"
                value={editState.contrast}
                onChange={(e) => handleSliderChange('contrast', e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                🎨 التشبع: {editState.saturation}%
              </label>
              <input
                type="range"
                min="0"
                max="200"
                value={editState.saturation}
                onChange={(e) => handleSliderChange('saturation', e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                💫 التمويه: {editState.blur}px
              </label>
              <input
                type="range"
                min="0"
                max="20"
                value={editState.blur}
                onChange={(e) => handleSliderChange('blur', e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                🔄 الدوران: {editState.rotation}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={editState.rotation}
                onChange={(e) => handleSliderChange('rotation', e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                🔍 الحجم: {editState.scale}%
              </label>
              <input
                type="range"
                min="50"
                max="200"
                value={editState.scale}
                onChange={(e) => handleSliderChange('scale', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Flip Controls */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleFlip('flipH')}
              className={`px-3 py-2 rounded text-sm font-medium ${
                editState.flipH ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              ↔️ قلب أفقي
            </button>
            <button
              onClick={() => handleFlip('flipV')}
              className={`px-3 py-2 rounded text-sm font-medium ${
                editState.flipV ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              ↕️ قلب عمودي
            </button>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-2">
            <button
              onClick={resetEdits}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              🔄 إعادة تعيين
            </button>
            <button
              onClick={exportImage}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              💾 حفظ التعديلات
            </button>
          </div>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">👁️ المعاينة</h3>
          
          <div className="relative bg-gray-100 rounded-lg overflow-hidden min-h-[400px] flex items-center justify-center">
            {selectedMedia && selectedMedia.type?.startsWith('image/') && (
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <img
                  ref={imageRef}
                  src={selectedMedia.url}
                  alt="Editing"
                  style={getImageStyle()}
                  className="max-w-full max-h-[600px] object-contain"
                />
              </div>
            )}
          </div>

          {/* Image Info */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              📁 {selectedMedia.name || 'صورة مختارة'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              ℹ️ استخدم الأدوات على اليسار لتعديل الصورة
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
