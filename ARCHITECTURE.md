# المعمارية المقترحة (High-level)

1) Frontend
   - Next.js (React) مع Tailwind CSS للواجهة.
   - مكونات: Dashboard, MediaLibrary, AIImageEditor, Composer (timeline), PublishModal.

2) Backend
   - Node.js + Express.
   - Queue (مستقبلاً): BullMQ + Redis لمعالجة الفيديو عبر FFmpeg.
   - Storage: Cloudinary أو S3 + CDN.
   - DB: PostgreSQL أو SQLite للمشروع التجريبي.
   - Auth: OAuth + JWT.

3) Integrations (أمثلة افتراضية في السكفولد)
   - Image: Replicate / remove.bg / Stability (أمثلة استدعاء).
   - TTS / Voice-cloning: ElevenLabs / Azure Neural TTS (أمثلة استدعاء افتراضية).
   - Video composition: FFmpeg (Docker أو محلي).

4) تفعيل "أصوات المشاهير"
   - في السكفولد يوجد متغير بيئة FORCE_ENABLE_CELEB_VOICES لتمكين الميزة فورياً.
   - السكفولد يتضمن نقاط نهاية لإدارة الأصوات (رفع ملف صوتي، تفعيل/تعطيل، استخدام صوت في توليد TTS).
   - ملاحظة: تفعيل فوري قانونياً مسؤوليتك كما أكدت؛ النظام سيسمح بالاستخدام في الإنتاج إذا كان المتغير مفعلًا.