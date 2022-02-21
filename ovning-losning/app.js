const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const crypto = require("crypto")
const app = express()

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))

const USERS = {
    "karl": "karl"
}
const SESSIONS = {}

const PORT = 3000

app.get("/", (req, res) => {
    const sessionsKey = req.cookies.session
    const user = SESSIONS[sessionsKey]
    if (user ) {
        res.render("index.ejs", {username: user})
    } else {
        res.redirect("/login")
    }
    
})

app.get("/login", (req, res) => {
    res.render("login.ejs", {errors: []})
})

app.post("/login", (req, res) => {
    const {username, password} = req.body

    if (USERS[username] === password) {
        const sessionId = crypto.randomBytes(64).toString('hex')
        SESSIONS[sessionId] = username
        res.cookie("session", sessionId, { maxAge: 30 * 1000})
        res.redirect("/")
    } else {
        res.render("login.ejs", {errors: ["Wrong password or usename"]})
    }

})

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})