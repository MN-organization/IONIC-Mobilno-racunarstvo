const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

const Oglas = require("./models/oglas");

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
        if (queryObject.cenaOd) query.kilometraza = {$gte: +queryObject.kmOd};
        if (queryObject.cenaDo) query.kilometraza = {$lte: +queryObject.kmDo};
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


app.post("/oglasi/novi", (req, res, next) => {
    console.log(req);
    const oglas = new Oglas(
        req.body
    );
    console.log(oglas);
    oglas.save().then(podaci => {
        oglas._id = podaci._id;
        res.status(200).json({
            poruka: "Uspesnooooooo!",
            oglas: oglas
        });
    });
});


module.exports = app;

// const oglasi = [
//    {
//       id: 0,
//       naslov: 'Mitsubishi Colt 1.3 NOV NOV CH',
//       opis: 'Prvi vlasnik, vozen do fakulteta, ko casa',
//       cena: 1500,
//       marka: 'Mitsubishi',
//       model: 'Colt',
//       godiste: 1997,
//       kilometraza: 280000,
//       vrstaGoriva: 'Benzin',
//       snaga: 75,
//       kubikaza: 1299,
//       menjac: 'DSG',
//       slika: [
//          'https://static.cargurus.com/images/site/2008/06/20/19/52/1997_mitsubishi_colt-pic-47314-1600x1200.jpeg',
//          'https://live.staticflickr.com/7897/33668483828_519380770a_b.jpg'
//       ]
//    },
//    {
//       id: 1,
//       naslov: 'VW Polo 1.2 TDI FULL NAVI upaljac',
//       opis: 'Prvi vlasnik, nije vozen, ko casa',
//       cena: 7000,
//       marka: 'VW',
//       model: 'Polo',
//       godiste: 2011,
//       kilometraza: 153560,
//       vrstaGoriva: 'Dizel',
//       snaga: 75,
//       kubikaza: 1199,
//       menjac: 'DSG',
//       slika: [
//          'https://media.autoweek.nl/m/lqryf7hbb7xc_800.jpg',
//          'https://i.ebayimg.com/00/s/NzY4WDEwMjQ=/z/VA8AAOSwUd9afXg9/$_86.JPG'
//       ]
//    },
//    {
//       id: 2,
//       naslov: 'VW Polo 1.2 TDI FULL NAVI upaljac',
//       opis: 'Prvi vlasnik, nije vozen, ko casa',
//       cena: 7000,
//       marka: 'VW',
//       model: 'Polo',
//       godiste: 2011,
//       kilometraza: 153560,
//       vrstaGoriva: 'Dizel',
//       snaga: 75,
//       kubikaza: 1199,
//       menjac: 'DSG',
//       slika: [
//          'https://i.ebayimg.com/00/s/NzY4WDEwMjQ=/z/VA8AAOSwUd9afXg9/$_86.JPG',
//          'https://media.autoweek.nl/m/lqryf7hbb7xc_800.jpg'
//       ]
//    },
//    {
//       id: 3,
//       naslov: 'VW Polo 1.2 TDI FULL NAVI upaljac',
//       opis: 'Prvi vlasnik, nije vozen, ko casa',
//       cena: 7000,
//       marka: 'VW',
//       model: 'Polo',
//       godiste: 2011,
//       kilometraza: 153560,
//       vrstaGoriva: 'Dizel',
//       snaga: 75,
//       kubikaza: 1199,
//       menjac: 'DSG',
//       slika: [
//          'https://media.autoweek.nl/m/lqryf7hbb7xc_800.jpg',
//          'https://i.ebayimg.com/00/s/NzY4WDEwMjQ=/z/VA8AAOSwUd9afXg9/$_86.JPG'
//       ]
//    }
// ];
