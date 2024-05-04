// controllers/editReportController.js
const ATKReport = require('../models/atkReport');

exports.get = async (req, res) => {
    try {
        const report = await ATKReport.findById(req.params.id);
        if (!report) {
            return res.status(404).send('Report not found');
        }
        res.render('editReport', { report });  // Ensure you have an 'editReport.ejs' file for this view
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving the report');
    }
};

exports.post = async (req, res) => {
    const { testResult, dateTime } = req.body;
    try {
        await ATKReport.findByIdAndUpdate(req.params.id, {
            testResult,
            dateTime: new Date(dateTime)
        });
        req.flash('message', 'Report successfully updated');
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating the report');
    }
};
