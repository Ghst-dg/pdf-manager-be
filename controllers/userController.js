const User = require('../models/user');
const PDF = require('../models/pdf');

exports.getUser = async (req, res) => {

	try 
	{
		const userId = req.user.userId;
		const user = await User.findById(userId);

	if (!user)
	{
		return res.status(404).json({ message: 'User not found' });
	}

	res.json({ name: user.name, email: user.email, pdfs: user.pdfFiles });
	} 

	catch (error)
	{
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}

};

