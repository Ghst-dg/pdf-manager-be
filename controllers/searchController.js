const PDF = require('../models/pdf');

exports.getPDFById = async (req, res) => {

    try 
    {
        const pdf = await PDF.findById(req.params.id);
        if (!pdf) 
        {
            return res.status(404).json({ message: 'PDF not found' });
        }

        return res.json({ pdf });
    } 

    catch (error) 
    {
        console.error('Error retrieving PDF:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

};
