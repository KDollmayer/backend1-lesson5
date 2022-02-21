const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
const passport = require("passport")
const app = express()
const PORT = 3000

const { User } = require("./models/user")

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: "avsd1234",
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.authenticate("session"))



app.get("/", (req, res) => {

    if (req.user) {
        res.render("index.ejs", {username: req.user.username})
    } else {
        res.redirect("/login")
    }
    
})

app.get("/login", (req, res) => {
    res.render("login.ejs")
})
 app.post("/login", passport.authenticate("local", {
     successRedirect: "/"
 }))


app.get("/signup", (req, res) => {
    res.render("signup.ejs")
})

app.post("/signup", async (req, res) => {
    const {username, password} = req.body

    const user = new User({username})
    await user.setPassword(password)
    await user.save()

    res.redirect("/login")
})

mongoose.connect("mongodb://localhost/backend1")

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})