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

app.listen(8080, () => console.log('Server running'))

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
  // const date = '30/07'

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
  const { roll } = req.body
  const doc = new GoogleSpreadsheet(
    '1zefff2HDlPHp3Wb8vSLwACa38sAts_YTKWZL2zXfjUY',
    serviceAccountAuth
  )
  await doc.loadInfo()
  console.log('TITLE: ', doc.title)
  const sheet = doc.sheetsByTitle['DBMS']

  let student_info = {
    student_roll: 'TCOA02',
    student_name: 'Bade Akshay Bhagwan',
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
        lab_code: 'DBMS',
        lab_total: 12,
        lab_attended: 10,
      },
      {
        lab_code: 'LP1',
        lab_total: 12,
        lab_attended: 8,
      },
      {
        lab_code: 'CN',
        lab_total: 13,
        lab_attended: 12,
      },
    ],
  }
  res.json(student_info)
})
