// import dotenv from 'dotenv'
const dotenv = require('dotenv')
dotenv.config()
const { GoogleSpreadsheet } = require('google-spreadsheet')
const { JWT } = require('google-auth-library')
const { DateTime, Settings } = require("luxon");

const { config } = require('./config')

const express = require('express')

const app = express()

const serviceAccountAuth = new JWT({
  email: process.env.client_email,
  key: process.env.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

app.listen(8080, () => console.log('Server running'))

app.use(express.json())

// Setting default timezone for luxon
Settings.defaultZone = "Asia/Kolkata"

app.get('/api/get_students', async (req, res) => {

  const { year, div, subject, batch } = req.body
  const currentClass = config[year][div]

  // Connecting to GDoc api
  const doc = new GoogleSpreadsheet(
    currentClass.sheetId,
    serviceAccountAuth
  )

  // Loading document info
  await doc.loadInfo()
  console.log('TITLE: ', doc.title)

  const sheet = doc.sheetsByTitle[subject]

  const date = DateTime.now().toFormat("dd'/'MM")
  await sheet.loadHeaderRow() // Load header row to get column names
  const columnIndex = sheet.headerValues.indexOf(date)

  // Getting all cells
  await sheet.loadCells()

  let students = []
  let entryExists = false

  // Setting value of entryExists based on student count of that day
  // console.log(columnIndex)
  if (sheet.getCell(currentClass.lastRoll + 1, columnIndex).value !== 0) {
    entryExists = true
  }

  if (currentClass.theory.includes(subject)) {
    // Subject is theory
    for (let i = 1; i <= currentClass.lastRoll; i++) {
      let student = {}
      // students.push({ roll: sheet.getCell(i, 0).value, name: sheet.getCell(i, 1).value })
      student.roll = sheet.getCell(i, 0).value
      student.name = sheet.getCell(i, 1).value
      if (entryExists) {
        student.status = sheet.getCell(i, columnIndex).value > 0 ? true : false
      }
      students.push(student)
    }

  } else if (currentClass.labs.includes(subject)) {
    // Subject is a lab
    if (currentClass.batches.hasOwnProperty(batch)) {
      // Valid batch provided
      for (let i = currentClass.batches[batch].start; i <= currentClass.batches[batch].end; i++) {
        students.push({ roll: sheet.getCell(i, 0).value, name: sheet.getCell(i, 1).value })
      }

    } else {
      // Invalid batch
      return res.status(401).send("Invalid request")
    }
  } else {
    // Invalid subject
    return res.status(401).send("Invalid request")
  }



  res.json({ entryExists, students })

})