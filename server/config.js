export default {
  TE: {
    A: {
      sheetId: '1zefff2HDlPHp3Wb8vSLwACa38sAts_YTKWZL2zXfjUY',
      lastRoll: 79,
      theory: ['CN', 'DBMS', 'EL1', 'SPOS', 'TOC'],
      labs: ['CNSL', 'DBMSL', 'LP1'],
      disabled: [11],
      batches: {
        1: {
          start: 1,
          end: 26,
        },
        2: {
          start: 27,
          end: 52,
        },
        3: {
          start: 53,
          end: 79,
        },
      },
      hasElectives: true,
      electiveSheetName: 'EL1',
      electives: [
        {
          name: 'HCI',
          color: bgColors.purple
        },
        {
          name: 'SPM',
          color: bgColors.orange
        },
        {
          name: 'IOT',
          color: bgColors.blue
        },
        {
          name: 'DS',
          color: bgColors.green
        }
      ]
    },
  }
}

const bgColors = {
  maroon: { red: 0.8666667, green: 0.49411765, blue: 0.41960785 },
  red: { red: 0.91764706, green: 0.6, blue: 0.6 },
  orange: { red: 0.9764706, green: 0.79607844, blue: 0.6117647 },
  yellow: { red: 1, green: 0.8980392, blue: 0.6 },
  green: { red: 0.7137255, green: 0.84313726, blue: 0.65882355 },
  darkgreen: { red: 0.63529414, green: 0.76862746, blue: 0.7882353 },
  blue: { red: 0.6431373, green: 0.7607843, blue: 0.95686275 },
  cyan: { red: 0.62352943, green: 0.77254903, blue: 0.9098039 },
  purple: { red: 0.7058824, green: 0.654902, blue: 0.8392157 },
  pink: { red: 0.8352941, green: 0.6509804, blue: 0.7411765 }
}
