const mongoose = require('mongoose');

const containerSchema = mongoose.Schema({
    geolocation: {
        type: String,
    },
    operator: {
        type: Object,
    }
})

module.exports = mongoose.model('Container', containerSchema);