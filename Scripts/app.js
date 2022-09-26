const express = require('express')
const { generateQuestions } = require('./questionGenerator')
const { generateTeam, teams } = require('./teamGenerator')
const app = express()
app.use(express.json())

const port = process.env.PORT || 6969

app.get("/", (req, res) => {
    res.send("Server is up")
})

app.get("/teams", (req, res) => {
    res.send(teams)
})

app.post("/teams/new", (req, res) => {
    const names = Object.values(req.body) //refer to structure in Data/TeamDataFormat.json file
    const generatedTeam = generateTeam(names)
    teams.push(generatedTeam)
    res.send(generatedTeam)
})

app.listen(port, () => console.log(`port ${port}`))