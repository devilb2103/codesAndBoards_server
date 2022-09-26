const express = require('express')
const questionGenerator = require('./questionGenerator')
const { generateQuestions } = require('./questionGenerator')
const app = express()
app.use(express.json())

const port = process.env.PORT || 6969

let teams = [] //temp storage
quizTime = (15 * 60) //in seconds

app.get("/", (req, res) => {
    res.send("Server is up")
})

app.get("/teams", (req, res) => {
    res.send(teams)
})

app.get("/startQuiz", (req, res) => {
    questions = generateQuestions()
    res.send([quizTime, questions])
})

app.post("/teams/new", (req, res) => {
    const dat = req.body //refer to structure in Data/TeamDataFormat.json file
    teams.push(dat)
    res.send(dat)
})

app.listen(port, () => console.log(`port ${port}`))