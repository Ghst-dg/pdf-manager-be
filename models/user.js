const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	pdfFiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PDF' }],
});

userSchema.methods.addPDF = function (pdfId) {
	this.pdfFiles.push(pdfId);
};

module.exports = mongoose.model('User', userSchema);