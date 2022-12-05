const express = require('express')
const cors = require('cors')
require('dotenv').config()


// set up constants
const port = process.env.PORT || 5000
const optionsCORS = {
    origin: "*",
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type', 'Authorization', 'Content'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'preflightContinue': false
}

const app = express()

app
    .use(cors(optionsCORS))
    .use(express.json())
    .use(express.urlencoded({ extended: true, limit: '50mb' }))
    .use('/api/match', require('./routes/matchRouter'))


app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})

