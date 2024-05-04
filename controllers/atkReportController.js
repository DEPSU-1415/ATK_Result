// atkReportController.js
const ATKReport = require('../models/atkReport');
const User = require('../models/User')

module.exports = async (req, res) => {
    try {
        let user = await User.findById(req.session.userId);

        if (!user) {
            return res.status(400).send('User not found');
        }
        
        const username = user.username;
        const { testResult, dateTime } = req.body;
        const image = req.file; // Multer handles the file upload

        if (!image) {
            return res.status(400).send('No image uploaded');
        }

        const imagePath = `/uploads/${image.filename}`; // Path for HTML access

        await ATKReport.create({
            username: username,
            image: imagePath,
            testResult,
            dateTime
        });

        console.log('Username:', username);
        console.log('Image Path:', imagePath);
        console.log('Test Result:', testResult);
        console.log('Date Time:', dateTime);

        res.redirect('/home'); // Redirect after successful upload
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
};
