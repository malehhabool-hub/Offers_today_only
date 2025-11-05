const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024 // 10MB default
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|avi|mov/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and videos are allowed!'));
    }
  }
});

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Offers Design Platform API is running',
    timestamp: new Date().toISOString()
  });
});

// Upload media files
app.post('/api/upload', upload.array('files', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const files = req.files.map(file => ({
      id: file.filename.split('.')[0],
      name: file.originalname,
      filename: file.filename,
      path: `/uploads/${file.filename}`,
      type: file.mimetype,
      size: file.size,
      uploadedAt: new Date().toISOString()
    }));

    res.json({
      success: true,
      message: `${files.length} file(s) uploaded successfully`,
      files
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload files' });
  }
});

// Get all uploaded files
app.get('/api/media', (req, res) => {
  try {
    const files = fs.readdirSync(uploadsDir);
    const mediaFiles = files
      .filter(file => !file.startsWith('.'))
      .map(file => {
        const stats = fs.statSync(path.join(uploadsDir, file));
        return {
          id: file.split('.')[0],
          filename: file,
          path: `/uploads/${file}`,
          size: stats.size,
          uploadedAt: stats.birthtime.toISOString()
        };
      });

    res.json({ files: mediaFiles });
  } catch (error) {
    console.error('Error reading media:', error);
    res.status(500).json({ error: 'Failed to retrieve media files' });
  }
});

// Delete a file
app.delete('/api/media/:id', (req, res) => {
  try {
    const { id } = req.params;
    const files = fs.readdirSync(uploadsDir);
    const fileToDelete = files.find(file => file.startsWith(id));

    if (!fileToDelete) {
      return res.status(404).json({ error: 'File not found' });
    }

    fs.unlinkSync(path.join(uploadsDir, fileToDelete));
    res.json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// Export offer (placeholder for future implementation)
app.post('/api/offers/export', (req, res) => {
  try {
    const { offerData, format = 'png' } = req.body;
    
    // This is a placeholder - in production, you would:
    // 1. Generate image/video using canvas or headless browser
    // 2. Apply AI enhancements if requested
    // 3. Save and return the file URL
    
    res.json({
      success: true,
      message: 'Offer export initiated',
      data: {
        ...offerData,
        exportedAt: new Date().toISOString(),
        format
      }
    });
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Failed to export offer' });
  }
});

// AI Features (placeholder endpoints)
app.post('/api/ai/enhance-image', (req, res) => {
  res.json({
    success: true,
    message: 'AI image enhancement will be implemented with Replicate/Stability AI',
    placeholder: true
  });
});

app.post('/api/ai/generate-text', (req, res) => {
  res.json({
    success: true,
    message: 'AI text generation will be implemented with OpenAI GPT',
    placeholder: true
  });
});

app.post('/api/ai/text-to-speech', (req, res) => {
  res.json({
    success: true,
    message: 'Text-to-speech will be implemented with ElevenLabs/Azure',
    placeholder: true
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    error: error.message || 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📁 Uploads directory: ${uploadsDir}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
});

module.exports = app;
