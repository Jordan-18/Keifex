const express = require('express');
const app = express();
const Minio = require('minio');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Konfigurasi MinIO
const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'your-access-key',
  secretKey: 'your-secret-key'
});

// Konfigurasi multer untuk mengunggah file
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads')
  },
  filename: function(req, file, cb) {
    const filename = uuidv4();
    const ext = file.originalname.split('.').pop();
    cb(null, `${filename}.${ext}`);
  }
});

const upload = multer({ storage: storage });

// Endpoint untuk mengunggah file
app.post('/upload', upload.single('file'), function(req, res) {
  const file = req.file;
  const bucketName = 'your-bucket-name';
  const objectName = file.filename;
  const filePath = file.path;
  const metaData = { 'Content-Type': file.mimetype };

  // Mengunggah file ke bucket MinIO
  minioClient.fPutObject(bucketName, objectName, filePath, metaData, function(err, etag) {
    if (err) return console.log(err);
    console.log('File uploaded successfully.');
    res.send('File uploaded successfully.');
  });
});

app.listen(3000, function() {
  console.log('Server is running on port 3000');
});