const initializeApp = require('firebase/app').initializeApp
const express = require('express')
const signOut = require('firebase/auth').signOut
const getFirestore = require('firebase/firestore').getFirestore
const getAuth = require('firebase/auth').getAuth
const addDoc = require('firebase/firestore').addDoc
const collection = require('firebase/firestore').collection
const getDocs = require('firebase/firestore').getDocs
const onSnapshot = require('firebase/firestore').onSnapshot
require('dotenv').config()

const app = express()
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.listen(3000)
console.log("listening on port 3000")

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};
const fireApp = initializeApp(firebaseConfig)
const db = getFirestore(fireApp)
const auth = getAuth(fireApp)

auth.signOut()
app.get("/", (req, res) => {
    if (auth.currentUser != null) {
        res.redirect("/home")
    } else  {
        res.redirect("/login")
    }
})

app.get("/login", (req, res) => {
    res.render("./login.ejs")
})

app.get("/home", async (req, res) => {
    var msgs = await getDocs(collection(db, "messages"))
    var docs = []
    msgs.forEach((doc) => {
        var data = JSON.stringify(doc.data()).replace("{\"message\":\"", "").replace("\"}", "")
        docs.push(data)
    })

    const diff = onSnapshot(collection(db, "messages"), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type == "added") {
                var data = JSON.stringify(change.doc.data()).replace("{\"message\":\"", "").replace("\"}", "")
                docs.push(data)
            }
        })
        
    })


    res.render("./index.ejs", {
        docs: docs
    })
})
