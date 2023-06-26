const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const authenticateToken = require('./middleware/authMiddleware');
const multer = require('multer');
const pdfController = require('./controllers/uploadController');
const shareController = require('./controllers/shareController');
const searchController = require('./controllers/searchController');
const commentController = require('./controllers/commentController');
const cors = require('cors');
require('dotenv').config();
app.use(cors());

const connectionString = process.env.DATABASE_URL;
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});
const upload = multer({ storage });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/register', authController.registerUser);
app.post('/login', authController.loginUser);
app.get('/user', authenticateToken, userController.getUser);
app.post('/upload', authenticateToken, upload.single('pdf'), pdfController.uploadPDF);
app.post('/share', authenticateToken, shareController.sharePDF);
app.get('/pdf/:id', searchController.getPDFById);
app.post('/pdf/comment', authenticateToken, commentController.addComment);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});