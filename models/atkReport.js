//atkReport.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ATKReportSchema = new Schema({
    username: { type: String, required: true },
    image: { type: String, required: true }, // Store the path or URL to the image
    testResult: { type: String, enum: ['Positive', 'Negative'], required: true },
    dateTime: { type: Date, required: true }
});

const ATKReport = mongoose.model('ATKReport', ATKReportSchema);
module.exports = ATKReport;
