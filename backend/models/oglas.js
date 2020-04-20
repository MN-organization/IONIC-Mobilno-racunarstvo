const mongoose = require('mongoose');

const oglasSchema = mongoose.Schema({
    naslov: String,
    opis: String,
    cena: Number,
    marka: String,
    model: String,
    godiste: Number,
    kilometraza: Number,
    vrstaGoriva: String,
    snaga: Number,
    kubikaza: Number,
    menjac: String,
    slika: [],
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
});

module.exports = mongoose.model("Oglas", oglasSchema);
