import { useState } from 'react'
import Image from 'next/image'

export default function MediaLibrary({ onSelectMedia, onUploadedFilesChange }) {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files)
    setIsUploading(true)

    // TODO: In production, integrate with backend API endpoint
    // This currently simulates file upload for demo purposes
    // Replace with actual API call: await fetch('/api/upload', { method: 'POST', body: formData })
    setTimeout(() => {
      const newFiles = files.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
        size: file.size,
        uploadedAt: new Date().toISOString()
      }))

      const updatedFiles = [...uploadedFiles, ...newFiles]
      setUploadedFiles(updatedFiles)
      if (onUploadedFilesChange) {
        onUploadedFilesChange(updatedFiles)
      }
      setIsUploading(false)
    }, 1000)
  }

  const deleteFile = (id) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id))
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">📚 مكتبة الوسائط</h2>
        
        <label className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors cursor-pointer font-medium">
          ⬆️ رفع ملفات
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {isUploading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-blue-800">جاري رفع الملفات...</span>
          </div>
        </div>
      )}

      {uploadedFiles.length === 0 && !isUploading ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">لا توجد ملفات بعد</h3>
          <p className="text-gray-500">ابدأ برفع صور أو فيديوهات لمكتبتك</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {uploadedFiles.map((file) => (
            <div
              key={file.id}
              className="card-hover bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
            >
              <div className="aspect-video bg-gray-100 relative">
                {file.type.startsWith('image/') ? (
                  <Image
                    src={file.url}
                    alt={file.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <video
                    src={file.url}
                    className="w-full h-full object-cover"
                    controls
                  />
                )}
              </div>
              
              <div className="p-4">
                <h4 className="font-medium text-gray-800 truncate mb-2">
                  {file.name}
                </h4>
                <p className="text-sm text-gray-500 mb-3">
                  {formatFileSize(file.size)}
                </p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => onSelectMedia && onSelectMedia(file)}
                    className="flex-1 px-3 py-2 bg-primary-600 text-white text-sm rounded hover:bg-primary-700 transition-colors"
                  >
                    استخدام
                  </button>
                  <button
                    onClick={() => deleteFile(file.id)}
                    className="px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Storage Info */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-800">💾 التخزين المستخدم</h4>
            <p className="text-sm text-gray-600">
              {uploadedFiles.length} ملف • {formatFileSize(uploadedFiles.reduce((acc, file) => acc + file.size, 0))}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">المساحة المتاحة</p>
            <p className="font-semibold text-gray-800">غير محدودة</p>
          </div>
        </div>
      </div>
    </div>
  )
}
