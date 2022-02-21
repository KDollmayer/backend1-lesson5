const express = require("express")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const app = express()

const PORT = 3000

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))


let SESSIONS = {}

const USERS = {
    "karl": "karl",
    "karl1": "karl1",
    "karl2": "karl2",
    "karl3": "karl3"
}


app.get("/", (req, res) => {
    
if (req.cookie === SESSIONS.cookie ) {
    
    res.send("Du är inloggad")   
} else {
    res.render("index.ejs")
}
    
  
  // kolla om det finns en cookie och vilken användare är man
})

app.post("/submit", (req, res) => {
   const { user, password } = req.body
   if (USERS[user] == password) {
    const sessionID = require("crypto").randomBytes(64).toString('hex')
    res.cookie("cookie-monster", sessionID)
    SESSIONS = { sessionID}

    res.send("Hello")
}
return null
    //hitta på en sessionsnyckel
    //spara och lägga i 
})

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})