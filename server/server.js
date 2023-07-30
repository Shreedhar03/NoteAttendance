// import dotenv from 'dotenv'
const dotenv = require('dotenv')
dotenv.config()
const { GoogleSpreadsheet } = require('google-spreadsheet')
const { JWT } = require('google-auth-library')

const express = require('express')

const app = express()

app.listen(3000)

app.get('/', (req, res) => {
  res.send('Hello world')
})
