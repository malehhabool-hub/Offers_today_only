export default function Header() {
  return (
    <header className="gradient-bg text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-3xl">🎁</div>
            <div>
              <h1 className="text-2xl font-bold">منصة تصميم العروض</h1>
              <p className="text-sm opacity-90">صمم عروضك الترويجية بإبداع</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
              ⚙️ الإعدادات
            </button>
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
              👤 الحساب
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
