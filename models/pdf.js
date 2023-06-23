const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    date: { type: Date, default: Date.now },
    comment: { type: String, required: true },
});

const pdfSchema = new mongoose.Schema({
    adminEmail: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
    comments: [commentSchema],
    filePath: { type: String, required: true },
    filename: { type: String, required: true }
});

module.exports = mongoose.model('PDF', pdfSchema);
