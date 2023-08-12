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
  let year = config[key]
  for (let div in config[key]) {
    let ref = config[key][div]
    year[div] = { theory: ref.theory, labs: ref.labs }
    if (ref.hasElectives) {
      ref.electives.forEach(elective => {
        year[div].theory.push(`${ref.electiveSheetName}: ${elective.name}`)
      })
    }
  }
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

  try {
    console.log("MARK")
    const { year, div, subject, batch, present_students, reqDate, overwrite } = req.body
    const currentClass = config[year][div]

    const doc = new GoogleSpreadsheet(currentClass.sheetId, serviceAccountAuth)

    await doc.loadInfo()
    console.log(doc.title)

    const sheet = doc.sheetsByTitle[subject]

    // Checking if requested date matches with current date
    const date = DateTime.now().toFormat("dd'/'MM")
    if (reqDate !== date) {
      return res.status(400).send("Invalid request")
    }

    await sheet.loadHeaderRow()
    const columnIndex = sheet.headerValues.indexOf(date)

    // const columnIndex = sheet.headerValues.indexOf("10/08")
    await sheet.loadCells()

    if (currentClass.theory.includes(subject) || currentClass.labs.includes(subject)) {
      // Sheet present


      for (let i = 1; i <= currentClass.lastRoll; i++) {
        // for (let i = 1; i <= 10; i++) {
        let currentRoll = sheet.getCell(i, 0).value
        let currentValue = sheet.getCell(i, columnIndex).value
        // console.log(currentRoll, currentValue)
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
      res.send("UPDATED")

    } else {
      return res.status(400).send("Invalid request")
    }
  } catch (err) { console.log(err.message) }
})

// app.post("/api/mark_attendance2", async (req, res) => {

//   console.log("hello")

//   const { year, div, subject, batch } = req.body.formValues
//   const { reqDate, overwrite } = req.body
//   const present_students = req.body.presentStudents


//   console.log(year, div, subject, batch, present_students, reqDate, overwrite)
//   try {
//     console.log("MARK")


//     const currentClass = config[year][div]

//     const doc = new GoogleSpreadsheet(currentClass.sheetId, serviceAccountAuth)

//     await doc.loadInfo()
//     console.log(doc.title)

//     const sheet = doc.sheetsByTitle[subject]

//     // Checking if requested date matches with current date
//     const date = DateTime.now().toFormat("dd'/'MM")
//     if (reqDate !== date) {
//       return res.status(400).send("Invalid request")
//     }

//     await sheet.loadHeaderRow()
//     const columnIndex = sheet.headerValues.indexOf(date)

//     // const columnIndex = sheet.headerValues.indexOf("10/08")
//     await sheet.loadCells()

//     if (currentClass.theory.includes(subject) || currentClass.labs.includes(subject)) {
//       // Sheet present


//       for (let i = 1; i <= currentClass.lastRoll; i++) {
//         // for (let i = 1; i <= 10; i++) {
//         let currentRoll = sheet.getCell(i, 0).value
//         let currentValue = sheet.getCell(i, columnIndex).value
//         // console.log(currentRoll, currentValue)
//         if (overwrite) {
//           // Setting values directly
//           if (present_students.includes(currentRoll)) {
//             // Present
//             sheet.getCell(i, columnIndex).value = 1
//           } else {
//             // Absent
//             sheet.getCell(i, columnIndex).value = 0
//           }
//         } else {
//           // Increment if present
//           if (present_students.includes(currentRoll)) {
//             // Present
//             if (currentValue === null) {
//               sheet.getCell(i, columnIndex).value = 1
//             } else {
//               sheet.getCell(i, columnIndex).value = currentValue + 1
//             }
//           } else {
//             // Absent
//             if (currentValue === null) {
//               sheet.getCell(i, columnIndex).value = 0
//             }
//           }
//         }
//       }

//       await sheet.saveUpdatedCells()
//       res.send("UPDATED")

//     } else {
//       return res.status(400).send("Invalid request")
//     }
//   } catch (err) { console.log(err.message) }
// })