import { useState, useRef } from 'react'

export default function OfferDesigner({ selectedMedia }) {
  const [offerData, setOfferData] = useState({
    title: '',
    discount: '',
    description: '',
    validUntil: '',
    backgroundColor: '#667eea',
    textColor: '#ffffff',
    fontSize: 'medium'
  })
  const [previewMode, setPreviewMode] = useState(false)
  const canvasRef = useRef(null)

  const handleInputChange = (field, value) => {
    setOfferData(prev => ({ ...prev, [field]: value }))
  }

  const exportOffer = () => {
    alert('سيتم تصدير العرض قريباً!')
  }

  const fontSizeMap = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    xlarge: 'text-2xl'
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Editor Panel */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">✏️ محرر التصميم</h2>
        
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            عنوان العرض
          </label>
          <input
            type="text"
            value={offerData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="مثال: عرض خاص لفترة محدودة"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Discount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            نسبة الخصم
          </label>
          <input
            type="text"
            value={offerData.discount}
            onChange={(e) => handleInputChange('discount', e.target.value)}
            placeholder="مثال: 50%"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الوصف
          </label>
          <textarea
            value={offerData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="اكتب تفاصيل العرض هنا..."
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Valid Until */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            صالح حتى
          </label>
          <input
            type="date"
            value={offerData.validUntil}
            onChange={(e) => handleInputChange('validUntil', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Color Pickers */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              لون الخلفية
            </label>
            <input
              type="color"
              value={offerData.backgroundColor}
              onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
              className="w-full h-12 rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              لون النص
            </label>
            <input
              type="color"
              value={offerData.textColor}
              onChange={(e) => handleInputChange('textColor', e.target.value)}
              className="w-full h-12 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            حجم الخط
          </label>
          <select
            value={offerData.fontSize}
            onChange={(e) => handleInputChange('fontSize', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="small">صغير</option>
            <option value="medium">متوسط</option>
            <option value="large">كبير</option>
            <option value="xlarge">كبير جداً</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            👁️ {previewMode ? 'إخفاء المعاينة' : 'معاينة'}
          </button>
          <button
            onClick={exportOffer}
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            💾 تصدير
          </button>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">👁️ المعاينة المباشرة</h2>
        
        <div
          ref={canvasRef}
          className="relative w-full aspect-square rounded-lg shadow-xl overflow-hidden"
          style={{
            backgroundColor: offerData.backgroundColor,
            color: offerData.textColor
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            {/* Discount Badge */}
            {offerData.discount && (
              <div className="mb-6 animate-pulse">
                <div className="inline-block px-8 py-4 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="text-6xl font-bold">{offerData.discount}</span>
                </div>
              </div>
            )}

            {/* Title */}
            {offerData.title && (
              <h3 className={`font-bold mb-4 ${fontSizeMap[offerData.fontSize] || 'text-base'} ${offerData.fontSize === 'xlarge' ? 'text-4xl' : ''}`}>
                {offerData.title}
              </h3>
            )}

            {/* Description */}
            {offerData.description && (
              <p className="mb-6 opacity-90 max-w-md">
                {offerData.description}
              </p>
            )}

            {/* Valid Until */}
            {offerData.validUntil && (
              <div className="mt-auto">
                <p className="text-sm opacity-75">
                  ⏰ صالح حتى: {new Date(offerData.validUntil).toLocaleDateString('ar-SA')}
                </p>
              </div>
            )}

            {/* Decorative Elements */}
            <div className="absolute top-4 left-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">💡 نصائح التصميم</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• استخدم ألوان متناسقة للحصول على تصميم احترافي</li>
            <li>• اجعل نسبة الخصم واضحة وكبيرة</li>
            <li>• أضف تاريخ انتهاء لخلق شعور بالعجلة</li>
            <li>• اختصر النص واجعله مباشراً</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
