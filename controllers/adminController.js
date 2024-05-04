//adminController.js
const ATKReport = require('../models/atkReport');

module.exports = async (req, res) => {
    try {
        const submissions = await ATKReport.find({});
        res.render('admin', { submissions });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to retrieve reports');
    }
};
