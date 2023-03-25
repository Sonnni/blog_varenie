const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.set('view engine', 'ejs');
server.use(express.static('public'));

server.get('/', function(req, res) {
    res.render('index');import express from 'express';
    import sessions from "express-session";
    import FileStore from 'session-file-store';
    import dotenv  from "dotenv";
    import { flash } from "express-flash-message";
    import cookieParser from 'cookie-parser';

    import {IndexController} from "./controllers/IndexController.js";
    import {UserController} from "./controllers/UserController.js";
    import {PostController} from "./controllers/PostController.js";

// doplnit ENV parametre zo suboru .env
    dotenv.config();

// Inicializacia aplikacie
    const app = express();

//соединить bootstrap 5
    app.use('/css/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.css'));

// schopnost parsovat JSON
    app.use(express.json());

// schopnost parsovat formularove data
    app.use(express.urlencoded({extended: true}));

// staticke subory (klientsky javascript, obrazky, favicon, ...) budu v adresari public
    app.use(express.static('public'));

// konfiguracia session
    app.use(sessions({
        name: "moje.session.id",
        secret: "tajne-heslo",
        saveUninitialized: true,
        cookie: {maxAge: 1000 * 60 * 60 * 24}, // platnost cookie 1 den
        resave: false,
        store: new (FileStore(sessions))({}),
    }));

// Pouzivanie flash sprav
    app.use(flash());

// nastavnie pre twig
    app.set("twig options", {
        allow_async: true,
        strict_variables: false
    });

// podpora pre pracu s cookies
    app.use(cookieParser());

// spristupnit niektore premenne z requestu vo view templates
    app.use(async function(req, res, next) {
        res.locals.user = req.session.user;
        res.locals.messages = await req.consumeFlash('success');
        res.locals.errors = await req.consumeFlash('error');
        next();
    });

// Definovanie controllerov
    app.use("/", IndexController);
    app.use("/user", UserController);
    app.use("/post", PostController);

// spustenie servera
    let server = app.listen(3000, () => console.log(`Server počúva na adrese http://localhost:${server.address().port}`));
});

server.listen(3000, function() {
    console.log('Server is running on port 3000.');
});
