// import dotenv from 'dotenv'
const dotenv = require('dotenv')
dotenv.config()
const { GoogleSpreadsheet } = require('google-spreadsheet')
const { JWT } = require('google-auth-library')

const { config } = require('./config')

console.log(config.TE.A.lastRoll)

const express = require('express')

const app = express()

const serviceAccountAuth = new JWT({
  email: process.env.client_email,
  key: process.env.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

app.listen(8080, () => console.log('Server running'))

app.use(express.json())

app.get('/api/get_students2', async (req, res) => {

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

  // Selecting DBMS worksheet
  const sheet = doc.sheetsByTitle[subject]

  // Getting all cells
  await sheet.loadCells()

  let students = []

  if (currentClass.theory.includes(subject)) {
    // Subject is theory
    for (let i = 0; i <= currentClass.lastRoll; i++) {
      students.push({ roll: sheet.getCell(i, 0).value, name: sheet.getCell(i, 1).value })
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

  res.json(students)

})

app.post('/api/mark_attendance', async (req, res) => {
  console.log('MARK')
  try {
    const { present_students, date, student_count } = req.body
    const doc = new GoogleSpreadsheet(
      '1zefff2HDlPHp3Wb8vSLwACa38sAts_YTKWZL2zXfjUY',
      serviceAccountAuth
    )

    await doc.loadInfo()
    console.log(doc.title)
    const sheet = doc.sheetsByTitle['DBMS']
    await sheet.loadHeaderRow() // Load header row to get column names

    const columnIndex = sheet.headerValues.indexOf(date)

    await sheet.loadCells()

    console.log(present_students)

    console.log(columnIndex)
    for (let i = 1; i < student_count + 1; i++) {
      // console.log(sheet.getCell(i, columnIndex).value)
      if (present_students.includes(i)) {
        sheet.getCell(i, columnIndex).value = 1
      } else {
        sheet.getCell(i, columnIndex).value = 0
      }
    }
    await sheet.saveUpdatedCells()
    res.send('udya a....')
  } catch (err) {
    console.log(err.message)
  }
})

app.post('/api/get_studentinfo', async (req, res) => {
  console.log('Student request')
  const { roll_string } = req.body
  console.log('ROLL: ', roll_string)
  let roll = parseInt(roll_string.substring(4))
  let year = roll_string.charAt(0)
  let div = roll_string.charAt(3)
  console.log('Details: ', year, div, roll)
  const doc = new GoogleSpreadsheet(
    '1zefff2HDlPHp3Wb8vSLwACa38sAts_YTKWZL2zXfjUY',
    serviceAccountAuth
  )
  await doc.loadInfo()
  console.log('TITLE: ', doc.title)
  const sheet = doc.sheetsByTitle['DBMS']
  await sheet.loadCells()

  console.log(
    sheet.getCell(83, 4).value,
    sheet.getCell(83, 4).effectiveFormat.backgroundColorStyle.rgbColor
  )
  for (let i = 4; i <= 13; i++) {
    console.log(sheet.getCell(83, i).value)
    console.log(sheet.getCell(83, i).effectiveFormat.backgroundColorStyle.rgbColor)
  }
  // console.log(sheet.getCell(70, 4).effectiveFormat)

  let student_info = {
    student_roll: sheet.getCell(roll, 0).value,
    student_name: sheet.getCell(roll, 1).value,
    total_lectures: 45,
    attended_lectures: 32,
    total_labs: 12,
    attended_labs: 8,
    theory_distributon: [
      {
        sub_code: 'DBMS',
        sub_total: 52,
        sub_attended: 38,
      },
      {
        sub_code: 'SPOS',
        sub_total: 38,
        sub_attended: 29,
      },
      {
        sub_code: 'CN',
        sub_total: 49,
        sub_attended: 41,
      },
      {
        sub_code: 'EL1',
        sub_total: 42,
        sub_attended: 22,
      },
      {
        sub_code: 'TOC',
        sub_total: 42,
        sub_attended: 40,
      },
    ],
    lab_distribution: [
      {
        lab_code: 'DBMSL',
        lab_total: 12,
        lab_attended: 10,
      },
      {
        lab_code: 'LP1',
        lab_total: 12,
        lab_attended: 8,
      },
      {
        lab_code: 'CNSL',
        lab_total: 13,
        lab_attended: 12,
      },
    ],
  }
  res.json(student_info)
})


app.post('/api/mark_attendance2', async (req, res) => {
  console.log('MARK2')
  try {
    // Getting parameters from request
    const { year, div, subject, present_students, date } = req.body
    const currentClass = config[year][div]

    // Opening appropriate sheet
    const doc = new GoogleSpreadsheet(
      currentClass.sheetId,
      serviceAccountAuth
    )

    await doc.loadInfo()
    console.log(doc.title)

    // Mark appropriate attendance
    // Check if sheet provided is correct
    //Select appropriate sheet
    const sheet = doc.sheetsByTitle[subject]

  } catch (err) {
    console.log(err.message)
  }
})

app.post('/api/get_studentinfo2', async (req, res) => {
  console.log('Student request')
  const { year, div, roll } = req.body
  const doc = new GoogleSpreadsheet(
    config[year][div],
    serviceAccountAuth
  )
  await doc.loadInfo()
  console.log('TITLE: ', doc.title)
  const sheet = doc.sheetsByTitle['REPORT']
  await sheet.loadCells()

  // console.log(sheet.getCell(70, 4).effectiveFormat)

  let student_info = {
    student_roll: sheet.getCell(roll, 0).value,
    student_name: sheet.getCell(roll, 1).value,
    total_lectures: 45,
    attended_lectures: 32,
    total_labs: 12,
    attended_labs: 8,
    theory_distributon: [
      {
        sub_code: 'DBMS',
        sub_total: 52,
        sub_attended: 38,
      },
      {
        sub_code: 'SPOS',
        sub_total: 38,
        sub_attended: 29,
      },
      {
        sub_code: 'CN',
        sub_total: 49,
        sub_attended: 41,
      },
      {
        sub_code: 'EL1',
        sub_total: 42,
        sub_attended: 22,
      },
      {
        sub_code: 'TOC',
        sub_total: 42,
        sub_attended: 40,
      },
    ],
    lab_distribution: [
      {
        lab_code: 'DBMSL',
        lab_total: 12,
        lab_attended: 10,
      },
      {
        lab_code: 'LP1',
        lab_total: 12,
        lab_attended: 8,
      },
      {
        lab_code: 'CNSL',
        lab_total: 13,
        lab_attended: 12,
      },
    ],
  }
  res.json(student_info)
})