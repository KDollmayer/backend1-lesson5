const express = require("express")

const app = express()
const PORT = 3000 

const USERS = {
    "karl": "hemligt"
}

const authenticate = (basicAuth) => {
    const login = basicAuth.split(" ")[1]
    const credentials = Buffer.from(login, "base64").toString("ascii")
    const [username, password] = credentials.split(":")
    if (USERS[username] == password) {
        return username
    }
    return null
    
}


app.get("/", (req, res) => {

    const authHeader = req.header("Authorization")
    console.log(authHeader)
    console.log(authenticate(authHeader))
    if (authHeader  && authenticate(authHeader)) {
        const user = authenticate(authHeader)

        res.send(`Hello ${user}!`)
    } else {
        res.header("WWW-Authenticate", `Basic realm="My domain"`)
        res.sendStatus(401)
        
    }
    
})


app.listen(PORT, () => {
console.log(`server started at port ${PORT}`)
})