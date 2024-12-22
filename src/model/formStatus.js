const mongoose = require("mongoose");

const formStatusSchema = new mongoose.Schema({
    status: {
        type: Boolean,
        default: true,
    },
    autoUpdatedAt: {
        type: Date,
    }
})

module.exports = mongoose.model('FormStatus', formStatusSchema)