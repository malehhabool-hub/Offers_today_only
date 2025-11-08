import { useState } from 'react'

export default function TextEditor({ onAddText }) {
  const [textState, setTextState] = useState({
    content: '',
    fontFamily: 'Cairo',
    fontSize: 24,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'center',
    color: '#000000',
    backgroundColor: 'transparent',
    shadow: false,
    outline: false,
    outlineColor: '#ffffff',
    letterSpacing: 0,
    lineHeight: 1.5,
  })

  const fonts = [
    'Cairo',
    'Tajawal',
    'Amiri',
    'Almarai',
    'Noto Kufi Arabic',
    'Readex Pro',
    'El Messiri',
    'Rubik',
    'Roboto',
    'Arial'
  ]

  const textPresets = [
    {
      name: 'عنوان رئيسي',
      style: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#1a202c',
        textAlign: 'center'
      }
    },
    {
      name: 'عنوان فرعي',
      style: {
        fontSize: 32,
        fontWeight: '600',
        color: '#4a5568',
        textAlign: 'center'
      }
    },
    {
      name: 'نص عادي',
      style: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#2d3748',
        textAlign: 'right'
      }
    },
    {
      name: 'تسمية توضيحية',
      style: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#718096',
        textAlign: 'center',
        fontStyle: 'italic'
      }
    }
  ]

  const handleChange = (field, value) => {
    setTextState(prev => ({ ...prev, [field]: value }))
  }

  const applyPreset = (preset) => {
    setTextState(prev => ({ ...prev, ...preset.style }))
  }

  const addTextToCanvas = () => {
    if (textState.content.trim()) {
      if (onAddText) {
        onAddText(textState)
      }
      alert('تم إضافة النص إلى التصميم!')
    } else {
      alert('الرجاء إدخال نص أولاً')
    }
  }

  const getPreviewStyle = () => {
    return {
      fontFamily: textState.fontFamily,
      fontSize: `${textState.fontSize}px`,
      fontWeight: textState.fontWeight,
      fontStyle: textState.fontStyle,
      textAlign: textState.textAlign,
      color: textState.color,
      backgroundColor: textState.backgroundColor,
      letterSpacing: `${textState.letterSpacing}px`,
      lineHeight: textState.lineHeight,
      textShadow: textState.shadow ? '2px 2px 4px rgba(0,0,0,0.3)' : 'none',
      WebkitTextStroke: textState.outline ? `2px ${textState.outlineColor}` : 'none',
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Editor Panel */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">✏️ محرر النصوص</h3>

          {/* Text Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              النص
            </label>
            <textarea
              value={textState.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="اكتب النص هنا..."
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Quick Presets */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              أنماط جاهزة
            </label>
            <div className="grid grid-cols-2 gap-2">
              {textPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => applyPreset(preset)}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Font Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الخط
            </label>
            <select
              value={textState.fontFamily}
              onChange={(e) => handleChange('fontFamily', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              {fonts.map(font => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              حجم الخط: {textState.fontSize}px
            </label>
            <input
              type="range"
              min="12"
              max="120"
              value={textState.fontSize}
              onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Text Style Buttons */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              التنسيق
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => handleChange('fontWeight', textState.fontWeight === 'bold' ? 'normal' : 'bold')}
                className={`flex-1 px-3 py-2 rounded font-bold ${
                  textState.fontWeight === 'bold' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                B
              </button>
              <button
                onClick={() => handleChange('fontStyle', textState.fontStyle === 'italic' ? 'normal' : 'italic')}
                className={`flex-1 px-3 py-2 rounded italic ${
                  textState.fontStyle === 'italic' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                I
              </button>
              <button
                onClick={() => handleChange('shadow', !textState.shadow)}
                className={`flex-1 px-3 py-2 rounded ${
                  textState.shadow ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                ظل
              </button>
              <button
                onClick={() => handleChange('outline', !textState.outline)}
                className={`flex-1 px-3 py-2 rounded ${
                  textState.outline ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                حدود
              </button>
            </div>
          </div>

          {/* Text Alignment */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              المحاذاة
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => handleChange('textAlign', 'right')}
                className={`flex-1 px-3 py-2 rounded ${
                  textState.textAlign === 'right' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                ⬅️
              </button>
              <button
                onClick={() => handleChange('textAlign', 'center')}
                className={`flex-1 px-3 py-2 rounded ${
                  textState.textAlign === 'center' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                ↕️
              </button>
              <button
                onClick={() => handleChange('textAlign', 'left')}
                className={`flex-1 px-3 py-2 rounded ${
                  textState.textAlign === 'left' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                ➡️
              </button>
            </div>
          </div>

          {/* Colors */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                لون النص
              </label>
              <input
                type="color"
                value={textState.color}
                onChange={(e) => handleChange('color', e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                لون الخلفية
              </label>
              <input
                type="color"
                value={textState.backgroundColor === 'transparent' ? '#ffffff' : textState.backgroundColor}
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {textState.outline && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                لون الحدود
              </label>
              <input
                type="color"
                value={textState.outlineColor}
                onChange={(e) => handleChange('outlineColor', e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer"
              />
            </div>
          )}

          {/* Advanced Options */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تباعد الحروف: {textState.letterSpacing}px
            </label>
            <input
              type="range"
              min="-5"
              max="20"
              value={textState.letterSpacing}
              onChange={(e) => handleChange('letterSpacing', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ارتفاع السطر: {textState.lineHeight}
            </label>
            <input
              type="range"
              min="0.8"
              max="3"
              step="0.1"
              value={textState.lineHeight}
              onChange={(e) => handleChange('lineHeight', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={addTextToCanvas}
            className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            ➕ إضافة النص
          </button>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">👁️ المعاينة</h3>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 min-h-[300px] flex items-center justify-center">
            {textState.content ? (
              <div style={getPreviewStyle()} className="max-w-full break-words p-4">
                {textState.content}
              </div>
            ) : (
              <div className="text-gray-400 text-center">
                <div className="text-4xl mb-2">✏️</div>
                <p>اكتب نصاً لرؤية المعاينة</p>
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">💡 نصائح النصوص</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• استخدم الأنماط الجاهزة للحصول على نتائج سريعة</li>
              <li>• جرب الخطوط المختلفة لإيجاد الأنسب</li>
              <li>• استخدم الظل والحدود لجعل النص أوضح</li>
              <li>• اختر ألوان متناسقة مع تصميمك</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
