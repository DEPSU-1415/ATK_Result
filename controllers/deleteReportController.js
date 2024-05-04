//deleteReportController.js
const ATKReport = require('../models/atkReport');

module.exports = async (req, res) => {
    console.log("Attempting to delete report with ID:", req.params.id);
    try {
        const result = await ATKReport.findOneAndDelete({ _id: req.params.id });
        if (!result) {
            console.log("No report found with ID:", req.params.id);
            return res.status(404).send('No report found');
        }
        console.log("Deleted report:", result);
        req.flash('message', 'Report successfully deleted');
        res.redirect('/admin');
    } catch (error) {
        console.error("Error during deletion:", error);
        res.status(500).send('Failed to delete the report');
    }
};
