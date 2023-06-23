const User = require('../models/user');

async function sharePDF(req, res) {
	const { userEmail, pdfId } = req.body;

	if (!userEmail)
	{
		return res.status(400).json({ message: 'User email not provided' });
	}

	try 
	{
		const receivingUser = await User.findOne({ email: userEmail });

		if (!receivingUser) 
		{
			return res.status(404).json({ message: 'User not found' });
		}

		receivingUser.pdfFiles.push(pdfId);
		await receivingUser.save();
		return res.status(200).json({ message: 'PDF shared successfully' });
	} 

	catch (error) 
	{
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}

}

module.exports = { sharePDF };