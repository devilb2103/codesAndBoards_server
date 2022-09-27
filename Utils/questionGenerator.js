const q1 = require("../Data/Category1_Questions.json");
const q2 = require("../Data/Category2_Questions.json");
const q3 = require("../Data/Category3_Questions.json");

let sources = [q1, q2, q3]

function generateQuestions(totalQuestions) {
    const rem = totalQuestions % (sources.length)
    questionCountPerCategory = (totalQuestions - rem) / (sources.length)
    let questionSet = {}

    // question randomization phase - 1
    for (let srcIndex = 0; srcIndex < sources.length; srcIndex++) {
        src = sources[srcIndex] //stores q1, q2, q3 etc
        for (let i = 0; i < questionCountPerCategory; i++) {
            generatedQuestion = getRandItem(src, questionSet)
            key = Object.keys(generatedQuestion)[0]
            value = Object.values(generatedQuestion)[0]
            questionSet[key] = value
        }
    }

    // question randomization phase - 1

    for (let i = 0; i < rem; i++) {
        src = sources[getRand(sources.length)] //stores q1, q2, q3 etc
        generatedQuestion = getRandItem(src, questionSet)
        key = Object.keys(generatedQuestion)[0]
        value = Object.values(generatedQuestion)[0]
        questionSet[key] = value

    }

    return (questionSet)

}
function getRandItem(dict, check) {
    keys = Object.keys(dict)
    a = {}

    while (true) {
        key = keys[getRand(keys.length)]
        if (!Object.keys(check).includes(key)) {
            a[key] = dict[key]
            return a
        }
    }
}

function getRand(n) {
    return Math.floor(Math.random() * n)
}
module.exports = {
    generateQuestions: generateQuestions,
    getRand: getRand
}