// import dotenv from 'dotenv'
const dotenv = require('dotenv')
dotenv.config()
const { GoogleSpreadsheet } = require('google-spreadsheet')
const { JWT } = require('google-auth-library')
const { DateTime, Settings } = require("luxon");
const cors = require('cors')

const { config } = require('./config')

const express = require('express')

const app = express()
app.use(cors())
const serviceAccountAuth = new JWT({
  email: process.env.client_email,
  key: process.env.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

app.listen(8080, () => console.log('Server running on 8080'))

app.use(express.json())

// Setting default timezone for luxon
Settings.defaultZone = "Asia/Kolkata"

// Preparing structure from config
const structure = {}
for (let key in config) {
  let ref = config[key]['A']
  let year = { theory: ref.theory, labs: ref.labs }
  if (ref.hasElectives) {
    ref.electives.forEach(elective => {
      year.theory.push(`${ref.electiveSheetName}: ${elective.name}`)
    })
  }
  year.batches = Object.keys(ref.batches)
  structure[key] = year
}

// console.log(structure)

app.get('/api/get_structure', (req, res) => {
  res.json(structure)
})

app.get('/api/get_students', async (req, res) => {

  try {

    const { year, div, subject, batch } = req.query
    // const { year, div, subject, batch } = req.body // For debugging
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
    // const date = "14/08" // For debugging
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
        student.status = sheet.getCell(i, columnIndex).value > 0 ? true : false
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
        return res.status(400).send("Invalid request")
      }
    } else {
      // Invalid subject
      return res.status(400).send("Invalid request")
    }

    res.json({ entryExists, students })
  } catch (err) {
    console.log(err.message)
    return res.status(400).send("Invalid request")
  }
})

app.post("/api/mark_attendance", async (req, res) => {
  console.log("MARKING ATTENDANCE")
  try {
    // Getting data from request
    const { year, div, subject, batch, present_students, req_date, overwrite = false } = req.body

    // Preliminary checks
    // Uses structure declared above to compare requested subject string
    if (!config.hasOwnProperty(year)) {
      console.log("Invalid year provided", year)
      return res.status(400).send("Invalid request")
    }
    if (!config[year].hasOwnProperty(div)) {
      console.log("Invalid division provided: ", div)
      return res.status(400).send("Invalid request")
    }
    if (!structure[year].theory.includes(subject) && !structure[year].labs.includes(subject)) {
      console.log("Invalid subject provided: ", subject)
      return res.status(400).send("Invalid request")
    }
    if (!structure[year].batches.includes(batch)) {
      console.log("Invalid batch provided: ", batch)
      return res.status(400).send("Invalid request")
    }
    const date = DateTime.now().toFormat("dd'/'MM")
    if (req_date !== date) {
      console.log("Provided date not the current one: ", req_date, " Expected: ", date)
      return res.status(400).send("Invalid request")
    }

    const currentClass = config[year][div]
    let electiveFlag = false
    let currentElective = ""
    let currentElectiveColor = {}
    if (currentClass.hasElectives && subject.includes(currentClass.electiveSheetName)) {
      electiveFlag = true
    }
    if (electiveFlag) {
      currentClass.electives.forEach(el => {
        if (subject.includes(el.name)) {
          currentElective = el.name
          currentElectiveColor = el.color
        }
      })
    }

    console.log(currentElective)

    const doc = new GoogleSpreadsheet(currentClass.sheetId, serviceAccountAuth)
    await doc.loadInfo()
    const sheet = electiveFlag ? doc.sheetsByTitle[currentClass.electiveSheetName] : doc.sheetsByTitle[subject]

    console.log(currentClass.electiveSheetName, subject)

    await sheet.loadHeaderRow()
    const columnIndex = sheet.headerValues.indexOf(date)
    if (columnIndex === -1) {
      console.log("Date not found in sheet: ", date, subject)
      res.status(400).send("Invalid request")
    }

    await sheet.loadCells()

    let startLimit = 1
    let endLimit = currentClass.lastRoll

    if (currentClass.labs.includes(subject)) {
      startLimit = currentClass.batches[batch].start
      endLimit = currentClass.batches[batch].end
    }

    for (let i = startLimit; i <= endLimit; i++) {
      let currentRoll = sheet.getCell(i, 0).value
      let currentValue = sheet.getCell(i, columnIndex).value

      // Skipping disabled roll nos.
      if (currentClass.disabled.includes(currentRoll)) {
        continue
      }

      // If elective, skip non-relevant students
      if (electiveFlag) {
        if (JSON.stringify(sheet.getCell(i, 1).backgroundColor) !== JSON.stringify(currentElectiveColor)) {
          console.log("PASSED")
          continue
        }
      }

      if (overwrite) {
        // Setting values directly
        if (present_students.includes(currentRoll)) {
          // Present
          sheet.getCell(i, columnIndex).value = 1
        } else {
          // Absent
          sheet.getCell(i, columnIndex).value = 0
        }
      } else {
        // Increment if present
        if (present_students.includes(currentRoll)) {
          // Present
          if (currentValue === null) {
            sheet.getCell(i, columnIndex).value = 1
          } else {
            sheet.getCell(i, columnIndex).value = currentValue + 1
          }
        } else {
          // Absent
          if (currentValue === null) {
            sheet.getCell(i, columnIndex).value = 0
          }
        }
      }
    }

    await sheet.saveUpdatedCells()
    res.send("SUCCESS")

  } catch (err) {
    console.log(err.message)
    res.send("ERR")
  }
})


app.get('/api/search_students', async (req, res) => {
  const { year, div } = req.query
  // Preliminary checks
  // Uses structure declared above to compare requested subject string
  if (!config.hasOwnProperty(year)) {
    console.log("Invalid year provided", year)
    return res.status(400).send("Invalid request")
  }
  if (!config[year].hasOwnProperty(div)) {
    console.log("Invalid division provided: ", div)
    return res.status(400).send("Invalid request")
  }

  const currentClass = config[year][div]
  const doc = new GoogleSpreadsheet(currentClass.sheetId, serviceAccountAuth)
  await doc.loadInfo()

  const sheet = doc.sheetsByTitle[currentClass.theory[0]]
  await sheet.loadCells()

  let students = []

  // Add student object to array if name not null
  for (let i = 1; i <= currentClass.lastRoll; i++) {
    if (sheet.getCell(i, 1).value !== null) {
      students.push({roll: sheet.getCell(i, 0).value, name: sheet.getCell(i, 1).value})
    }
  }

  res.json(students)
})