const mongoose = require('mongoose');

const sacuvaniOglasiSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    oglasi: [{type: mongoose.Schema.Types.ObjectId, ref: "Oglas", required: true}]
});

module.exports = mongoose.model("SacuvaniOglasi", sacuvaniOglasiSchema);
