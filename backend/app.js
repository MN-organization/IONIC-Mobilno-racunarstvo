const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("./middleware/chek-auth");
const objectId = require("mongodb").ObjectId;

const app = express();

app.use(bodyParser.json());

const Oglas = require("./models/oglas");
const User = require("./models/user");
const SacuvaniOglasi = require("./models/sacuvaniOglasi");

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

    const queryObject = url.parse(req.url, true).query;

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
            poruka: "Oglas uspesno izbrisan"
        });
    });
});

app.put("/oglasi/:id", checkAuth, (req, res, next) => {
    Oglas.updateOne({_id: mongoose.Types.ObjectId(req.params.id), user: mongoose.Types.ObjectId(req.token.userId)}, req.body).then(podaci => {
        console.log(podaci.nModified);
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
    // console.log(oglas);
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

app.get("/moji_oglasi", checkAuth, (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.token.userId);
    Oglas.find({user: id}).then(podaci => {
        res.status(200).json({
            poruka: "sve ok, polo kida",
            oglasi: podaci
        });
    });
});

app.get("/sacuvani_oglasi",checkAuth,(req, res, next) => {
    const id = mongoose.Types.ObjectId(req.token.userId);
    let ids;
    SacuvaniOglasi.findOne({user: id}).then(podaci => {
        console.log(podaci);
        ids=podaci.oglasi;
        console.log(podaci.oglasi);
        // let idsKonvertovan=[];
        // for (let id in ids){
        //     idsKonvertovan.push(mongoose.Types.ObjectId(id));
        // }
       // console.log(idsKonvertovan);
        Oglas.find({_id:  {$in:ids}}).then(podaci => {
            console.log(podaci);
            res.status(200).json({
                poruka: "vraceni sacuvani oglasi",
                oglasi: podaci
            });
        });
    });


    });

    app.put("/sacuvani_oglasi",checkAuth,(req, res, next) => {
        console.log(req.body);
        const id = mongoose.Types.ObjectId(req.token.userId);
        const idOglas=mongoose.Types.ObjectId(req.body.oglasID);
        console.log(idOglas)
        SacuvaniOglasi.updateOne({user: id},{$push : {"oglasi" : idOglas}},{ upsert:true }).then(podaci => {
            //console.log(podaci);
            res.status(200).json({
                poruka: "sacuvan oglas"
            });
        });
});

app.put("/sacuvani_oglasi_delete", checkAuth, (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.token.userId);
    const idOglas = mongoose.Types.ObjectId(req.body.oglasID);
    console.log(idOglas)
    SacuvaniOglasi.updateOne({user: id}, {$pull: {"oglasi": idOglas}}).then(podaci => {
        //console.log(podaci);
        res.status(200).json({
            poruka: "obrisan oglas"
        });
    });


});


module.exports = app;
