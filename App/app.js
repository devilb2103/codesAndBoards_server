const express = require('express')
const { connectDB, initializeTables, addMember, selectMember, removeMember } = require('../Database/databaseFunctions')
const { sequelize } = require('../Database/setup')
const { generateQuestions } = require('../Utils/questionGenerator')
const { generateTeam, teams } = require('../Utils/teamGenerator')
const app = express()
app.use(express.json())

const port = process.env.PORT || 6969

connectDB()
initializeTables()
addMember(1)
selectMember()
addMember(2)
removeMember(1)
selectMember()

app.get("/", (req, res) => {
    res.send("Server is up")
})

app.get("/teams", (req, res) => {
    res.send(teams)
})

app.post("/teams/new", (req, res) => {
    // const names = Object.values(req.body) //refer to structure in Data/TeamDataFormat.json file
    // const generatedTeam = generateTeam(names)
    // teams.push(generatedTeam)
    // res.send(generatedTeam)
})

app.listen(port, () => console.log(`port ${port}`))