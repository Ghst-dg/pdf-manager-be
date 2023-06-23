const PDF = require('../models/pdf');

exports.addComment = async (req, res) => {

	try 
	{
		const { pdfId, userName, comment } = req.body;
		const pdf = await PDF.findById(pdfId);

	if (!pdf) 
    {
		return res.status(404).json({ message: 'PDF not found' });
    }

    const newComment = 
    {
		userName,
		comment,
		date: new Date(),
    };

    pdf.comments.push(newComment);
    await pdf.save();
    return res.status(200).json({ message: 'Comment added successfully' });
	} 

	catch (error) 
	{
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}

};
