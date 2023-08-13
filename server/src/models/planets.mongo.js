const mongoose = require("mongoose");

const planetSchena = new mongoose.Schema({
    keplerName: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Planet', planetSchena);