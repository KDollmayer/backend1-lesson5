const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()
const PORT = 3000

app.use(cookieParser())



app.get("/", (req, res) => {
    console.log(req.cookies)
    res.cookie("testcookie","i am a cookie")
    res.cookie("testcookie2","i am a cookie 2")

    res.send("Hello cookie World")
})

app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`)
})