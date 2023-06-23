const User = require('../models/user');
const PDF = require('../models/pdf');

exports.uploadPDF = async (req, res) => {

	try 
	{
		const userId = req.user.userId;
		const { email } = await User.findById(userId).select('email');
		const { originalname, path } = req.file;
		const filename = originalname.split('.').slice(0, -1).join('.');
		const pdf = new PDF({
			adminEmail: email,
			originalname,
			filename,
			filePath: path,
			});
		await pdf.save();
		await User.findByIdAndUpdate(userId, { $push: { pdfFiles: pdf._id } });
			res.status(200).json({ message: 'PDF uploaded successfully' });
		} 

		catch (error) 
		{
			console.error(error);
			res.status(500).json({ message: 'Server error' });
		}

};