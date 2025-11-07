# 🚀 تشغيل المنصة على منافذ مخصصة | Running Platform on Custom Ports

## نظرة عامة | Overview

تم تكوين المنصة للعمل على أي منافذ متاحة بدلاً من المنافذ الافتراضية (3000 و 3001).

The platform is now configured to run on any available ports instead of the default ports (3000 and 3001).

---

## ⚙️ التكوين | Configuration

### الطريقة الأولى: استخدام ملف .env (موصى بها) | Method 1: Using .env File (Recommended)

1. **قم بتحرير ملف `.env`** | **Edit the `.env` file**:

```bash
# Frontend port - يمكنك تغيير هذا إلى أي منفذ متاح
FRONTEND_PORT=4000

# Backend port - يمكنك تغيير هذا إلى أي منفذ متاح
PORT=4001

# تأكد من تحديث CORS
ALLOWED_ORIGINS=http://localhost:4000

# تأكد من تحديث API URL
NEXT_PUBLIC_API_URL=http://localhost:4001
```

2. **شغل المنصة** | **Start the platform**:

```bash
# استخدام السكربت المخصص
./start-platform.sh

# أو يدوياً
npm run dev:all
```

---

### الطريقة الثانية: استخدام معاملات سطر الأوامر | Method 2: Using Command Line Arguments

```bash
# التشغيل على منافذ مخصصة مباشرة
./start-platform.sh 4000 4001

# المثال: Frontend على منفذ 5000 و Backend على منفذ 5001
./start-platform.sh 5000 5001

# المثال: Frontend على منفذ 8080 و Backend على منفذ 8081
./start-platform.sh 8080 8081
```

---

### الطريقة الثالثة: التشغيل اليدوي | Method 3: Manual Execution

#### تشغيل Backend على منفذ مخصص | Run Backend on Custom Port

```bash
PORT=4001 npm run server
```

#### تشغيل Frontend على منفذ مخصص | Run Frontend on Custom Port

```bash
FRONTEND_PORT=4000 npm run dev
```

---

## 📋 أمثلة على المنافذ الشائعة | Common Port Examples

### مثال 1: المنافذ 4000 و 4001
```bash
# في ملف .env
FRONTEND_PORT=4000
PORT=4001
ALLOWED_ORIGINS=http://localhost:4000
NEXT_PUBLIC_API_URL=http://localhost:4001

# أو عبر سطر الأوامر
./start-platform.sh 4000 4001
```

**الوصول | Access:**
- Frontend: http://localhost:4000
- Backend API: http://localhost:4001

---

### مثال 2: المنافذ 8080 و 8081
```bash
# في ملف .env
FRONTEND_PORT=8080
PORT=8081
ALLOWED_ORIGINS=http://localhost:8080
NEXT_PUBLIC_API_URL=http://localhost:8081

# أو عبر سطر الأوامر
./start-platform.sh 8080 8081
```

**الوصول | Access:**
- Frontend: http://localhost:8080
- Backend API: http://localhost:8081

---

### مثال 3: المنافذ 5000 و 5001
```bash
# في ملف .env
FRONTEND_PORT=5000
PORT=5001
ALLOWED_ORIGINS=http://localhost:5000
NEXT_PUBLIC_API_URL=http://localhost:5001

# أو عبر سطر الأوامر
./start-platform.sh 5000 5001
```

**الوصول | Access:**
- Frontend: http://localhost:5000
- Backend API: http://localhost:5001

---

## ✅ التحقق من تشغيل المنصة | Verifying Platform is Running

### فحص Backend | Check Backend

```bash
# اختبار صحة Backend
curl http://localhost:4001/api/health

# النتيجة المتوقعة:
# {"status":"ok","message":"Offers Design Platform API is running","timestamp":"..."}
```

### فحص Frontend | Check Frontend

```bash
# اختبار Frontend
curl -I http://localhost:4000

# أو افتح في المتصفح
open http://localhost:4000
```

---

## 🔍 إيجاد المنافذ المستخدمة | Finding Used Ports

### التحقق من المنفذ المستخدم | Check if Port is in Use

```bash
# التحقق من منفذ معين
lsof -i :4000    # للتحقق من Frontend
lsof -i :4001    # للتحقق من Backend

# أو استخدام netstat
netstat -an | grep LISTEN | grep 4000
```

### إيجاد منفذ متاح | Find Available Port

```bash
# البحث عن المنافذ المتاحة
# المنافذ الشائعة والآمنة للتطوير:
# 3000-3999, 4000-4999, 5000-5999, 8000-8999
```

---

## 🛑 إيقاف المنصة | Stopping the Platform

```bash
# استخدام السكربت المخصص
./stop-platform.sh

# أو يدوياً
pkill -f "node server/index.js"  # إيقاف Backend
pkill -f "next dev"              # إيقاف Frontend
```

---

## 🔧 استكشاف الأخطاء | Troubleshooting

### المنفذ مستخدم بالفعل | Port Already in Use

```bash
# إيجاد العملية التي تستخدم المنفذ
lsof -i :4000

# إنهاء العملية
kill -9 <PID>

# أو استخدام منفذ آخر
./start-platform.sh 5000 5001
```

### خطأ في الاتصال بـ API | API Connection Error

تأكد من تطابق المنافذ في التكوين:

```bash
# في ملف .env، تأكد من:
NEXT_PUBLIC_API_URL=http://localhost:[BACKEND_PORT]
ALLOWED_ORIGINS=http://localhost:[FRONTEND_PORT]
```

### Frontend لا يتصل بـ Backend | Frontend Can't Connect to Backend

1. تأكد من تشغيل Backend أولاً
2. تأكد من تطابق `NEXT_PUBLIC_API_URL` مع منفذ Backend
3. تأكد من تطابق `ALLOWED_ORIGINS` مع منفذ Frontend

```bash
# اختبار الاتصال
curl http://localhost:4001/api/health
```

---

## 📱 الوصول من أجهزة أخرى | Access from Other Devices

لتشغيل المنصة على الشبكة المحلية:

To run the platform on local network:

```bash
# احصل على عنوان IP الخاص بك
# Get your IP address
ipconfig getifaddr en0  # على Mac
ip addr show            # على Linux
ipconfig               # على Windows

# شغل Frontend على جميع الواجهات
# Run Frontend on all interfaces
FRONTEND_PORT=4000 next dev -H 0.0.0.0

# شغل Backend مع تحديث CORS
# Run Backend with updated CORS
# في .env، أضف IP الخاص بك إلى ALLOWED_ORIGINS
ALLOWED_ORIGINS=http://localhost:4000,http://192.168.1.10:4000
```

**الوصول من الأجهزة الأخرى | Access from Other Devices:**
- Frontend: http://[YOUR_IP]:4000
- Backend: http://[YOUR_IP]:4001

---

## 🎯 أفضل الممارسات | Best Practices

1. **استخدم منافذ فوق 1024** - المنافذ تحت 1024 تتطلب صلاحيات root
   **Use ports above 1024** - Ports below 1024 require root privileges

2. **تجنب المنافذ الشائعة** - مثل 80 (HTTP) و 443 (HTTPS)
   **Avoid common ports** - like 80 (HTTP) and 443 (HTTPS)

3. **استخدم منافذ متتالية** - مثل 4000/4001 أو 5000/5001
   **Use consecutive ports** - like 4000/4001 or 5000/5001

4. **وثق المنافذ المستخدمة** - في ملف README أو .env
   **Document ports used** - in README or .env file

---

## 🔒 ملاحظات الأمان | Security Notes

- لا تستخدم منافذ الإنتاج في التطوير
  Don't use production ports in development

- تأكد من تكوين CORS بشكل صحيح
  Ensure CORS is properly configured

- استخدم HTTPS في الإنتاج
  Use HTTPS in production

---

## 📞 المساعدة | Help

إذا واجهت مشاكل:
If you encounter issues:

1. تحقق من سجلات الأخطاء | Check error logs
2. تأكد من توفر المنافذ | Ensure ports are available
3. راجع التكوين في `.env` | Review configuration in `.env`
4. افتح Issue في المشروع | Open an issue in the project

---

**تم التحديث | Updated:** 2025-11-07
**الإصدار | Version:** 2.0.0
