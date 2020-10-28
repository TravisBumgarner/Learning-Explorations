import { config } from 'dotenv';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/database";
import express from 'express'
import bodyParser from 'body-parser'

config();

var firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

function writeUserData(userId, name) {
    firebase.database().ref('users/' + userId).set({
        username: name
    });
}

const app = express();

app.get('/create/:userid/:username', function (req, res) {
    writeUserData(req.params.userid, req.params.username)
    res.send('done')
})

app.get('/username/:user', function (req, res) {
    console.log(req.params.user)
    firebase.database().ref('/users/' + req.params.user).once('value').then(function (snapshot) {
        var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        console.log(username)
        res.send(username)
    });

})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 8000
app.listen(port, () => {
    console.log(`Running on port ${port}`)
})