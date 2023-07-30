// import dotenv from 'dotenv'
const dotenv = require('dotenv')
dotenv.config()
const { GoogleSpreadsheet } = require('google-spreadsheet')
const { JWT } = require('google-auth-library')

const express = require('express')

const app = express()

const serviceAccountAuth = new JWT({
  email: process.env.client_email,
  key: process.env.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

app.listen(8080, () => console.log('running'))

app.use(express.json())

// Getting student list
app.get('/api/get_students', async (req, res) => {
  // Connecting to GDoc api
  const doc = new GoogleSpreadsheet(
    '1zefff2HDlPHp3Wb8vSLwACa38sAts_YTKWZL2zXfjUY',
    serviceAccountAuth
  )
  // Loading document info
  await doc.loadInfo()
  console.log('TITLE: ', doc.title)

  // Selecting DBMS worksheet
  const sheet = doc.sheetsByTitle['DBMS']

  // Getting all rows
  const rows = await sheet.getRows()
  const date = '30/07'
  // console.log(rows)

  let students = []

  rows.forEach(async (row) => {
    // if (row.get('Name') !== undefined) console.log(row.get('Name'))
    if (row.get('Name')) {
      students.push({ name: row.get('Name'), roll: row.get('Roll No.') })
    }
  })

  res.json(students)
})

app.post('/api/mark_attendance', async (req, res) => {
  console.log('MARK')
  // console.log(req.body)
  try {
    const { present_students, date, student_count } = req.body
    const doc = new GoogleSpreadsheet(
      '1zefff2HDlPHp3Wb8vSLwACa38sAts_YTKWZL2zXfjUY',
      serviceAccountAuth
    )

    await doc.loadInfo()
    console.log(doc.title)
    const sheet = doc.sheetsByTitle['DBMS']
    // const rows = await sheet.getRows()
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

    // const date = '26/07/2023'

    // rows.forEach(async (row) => {
    //   if (present_students.includes(row.get('Roll No.'))) {
    //     console.log('MARKING PRESENT')
    //     row.set(date, '1')
    //     await row.save()
    //   } else {
    //     row.set(date, 0)
    //     await row.save()
    //   }
    // })
    res.send('udya a....')
  } catch (err) {
    console.log(err.message)
  }
})
