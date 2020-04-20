const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("./middleware/chek-auth");

const app = express();

app.use(bodyParser.json());

const Oglas = require("./models/oglas");
const User = require("./models/user");

const url = require('url');

mongoose.connect("mongodb+srv://admin:admin@cluster0-kf5r1.mongodb.net/test?retryWrites=true&w=majority")
    .then(() => {
        console.log('Connected to database!');
    }).catch(() => {
    console.log('Connection failed!');
});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");//paziti da bude ovako isto
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
    next();
});


app.get("/oglasi/pretraga", (req, res, next) => {

    console.log(req.url);
    const queryObject = url.parse(req.url, true).query;
    console.log(queryObject);
    console.log(queryObject.marka);

    //let query = { $and: [] };
    //if (queryObject.marka) { query.$and.push({marka: queryObject.marka}); }/////////// full zapis za slozenije upite


    let query = {};
    if (queryObject.marka) query.marka = queryObject.marka;
    if (queryObject.model) query.model = queryObject.model;
    if (queryObject.gorivo) query.vrstaGoriva = queryObject.gorivo;

    if (queryObject.cenaOd && queryObject.cenaDo){
        query.cena = {$gte: +queryObject.cenaOd,$lte: +queryObject.cenaDo};
    }else{
        if (queryObject.cenaOd) query.cena = {$gte: +queryObject.cenaOd};
        if (queryObject.cenaDo) query.cena = {$lte: +queryObject.cenaDo};
    }

    if (queryObject.kmOd && queryObject.kmDo){
        query.kilometraza = {$gte: +queryObject.kmOd,$lte: +queryObject.kmDo};
    }else{
        if (queryObject.kmOd) query.kilometraza = {$gte: +queryObject.kmOd};
        if (queryObject.kmDo) query.kilometraza = {$lte: +queryObject.kmDo};
    }

    if (queryObject.ccmOd && queryObject.ccmDo){
        query.kubikaza = {$gte: +queryObject.ccmOd,$lte: +queryObject.ccmDo};
    }else{
        if (queryObject.ccmOd) query.kubikaza = {$gte: +queryObject.ccmOd};
        if (queryObject.ccmDo) query.kubikaza = {$lte: +queryObject.ccmDo};
    }

    if (queryObject.snagaOd && queryObject.snagaDo){
        query.snaga = {$gte: +queryObject.snagaOd,$lte: +queryObject.snagaDo};
    }else{
        if (queryObject.snagaOd) query.snaga = {$gte: +queryObject.snagaOd};
        if (queryObject.snagaDo) query.snaga = {$lte: +queryObject.snagaDo};
    }

    if (queryObject.godOd && queryObject.godDo){
        query.godiste = {$gte: +queryObject.godOd,$lte: +queryObject.godDo};
    }else{
        if (queryObject.godOd) query.godiste = {$gte: +queryObject.godOd};
        if (queryObject.godDo) query.godiste = {$lte: +queryObject.godDo};
    }

    if (queryObject.menjac) query.menjac = queryObject.menjac;

    console.log(query);

    //console.log(req.query.params);

    //const querystring = require('querystring');
    //console.log(querystring.parse(req.query.params));


    //console.log(req.query.sear);

    // for (const key in  req.query){
    //    console.log(key,req.query[key]);
    //    console.log(' ');
    // }

    Oglas.find(query).then(podaci => {
        console.log(podaci);
        res.status(200).json({
            poruka: "sve ok, polo kida",
            oglas: podaci
        });
    });
});

app.get("/oglasi/:id", (req, res, next) => {
    Oglas.findById(req.params.id).then(podaci => {
        res.status(200).json({
            poruka: "sve ok, polo kida",
            oglas: podaci
        });
    });
});

app.delete("/oglasi/:id", (req, res, next) => {
    Oglas.deleteOne({_id: req.params.id}).then(podaci => {
        res.status(200).json({
            poruka: "Oglas uspesno izbrisan",
            oglas: podaci
        });
    });
});

app.put("/oglasi/:id", (req, res, next) => {
    console.log(req.body);
    Oglas.updateOne({_id: req.body.id}, req.body).then(podaci => {
        res.status(200).json({
            poruka: "Oglas uspesno izmenjen",
            oglas: podaci
        });
    });
});

app.get("/oglasi", (req, res, next) => {
    Oglas.find().then(podaci => {
        res.status(200).json({
            poruka: "sve ok, polo kida",
            oglasi: podaci
        });
    });
});


app.post("/oglasi/novi", checkAuth, (req, res, next) => {
    // req.body.oglas.userId = req.token.userId;
    let oglas = new Oglas({
        naslov: req.body.naslov,
        marka: req.body.marka,
        model: req.body.model,
        gorivo: req.body.gorivo,
        cena: req.body.cena,
        menjac: req.body.menjac,
        godiste: req.body.godiste,
        opis: req.body.opis,
        kilometraza: req.body.kilometraza,
        snaga: req.body.snaga,
        kubikaza: req.body.kubikaza,
        slika: req.body.slika,
        user: req.token.userId
    });
    // oglas.userId = req.token.userId;
    console.log(oglas);
    oglas.save().then(podaci => {
        oglas._id = podaci._id;
        res.status(200).json({
            poruka: "Uspesnooooooo!",
            oglas: oglas
        });
    });
});

app.post("/user/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 7).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save().then(user => {
            const token = jwt.sign({email: user.email, id: user._id}, 'marko_kastratovic_nemanja_kontic');
            res.status(200).json({
                token: token
            });
            }).catch(error => {
            res.status(409).json({
                error: "vec postoji user"
            });
        });
    });
});

app.post("/user/login", (req, res, next) => {
    let userZaVracanje;
    User.findOne({email: req.body.email}).then(user => {
        if(!user){
            return res.status(401).json({poruka: 'Autentikacija nije uspela'});
        }
        userZaVracanje = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(rezultat => {
        if(!rezultat){
            return res.status(401).json({poruka: 'Autentikacija nije uspela'});
        }
        const token = jwt.sign(
            {email: userZaVracanje.email, userId: userZaVracanje._id},
            'marko_kastratovic_nemanja_kontic',
            {expiresIn: 3600});
        res.status(200).json({
            token: token
            // expiresIn: 3600,
            // userId: userZaVracanje._id
        });
    }).catch(err => {
        return res.status(401).json({poruka: 'Autentikacija nije uspela'});
    });
});

module.exports = app;
