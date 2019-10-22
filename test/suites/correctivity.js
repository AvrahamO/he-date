
var testCases = [

  // each row contains details as follow:
  // [<year>, <month-zero-based>, <date>, <date-string>, <Greg-date-string>]

  // month length:
  // test for every first day of month
  [5777, 0,  1, 'Mon 01 Tishri 5777',  'Oct 03 2016'],
  [5777, 1,  1, 'Wed 01 Heshvan 5777', 'Nov 02 2016'],
  [5777, 2,  1, 'Thu 01 Kislev 5777',  'Dec 01 2016'],
  [5777, 3,  1, 'Fri 01 Tevet 5777',   'Dec 30 2016'],
  [5777, 4,  1, 'Sat 01 Shevat 5777',  'Jan 28 2017'],
  [5777, 5,  1, 'Mon 01 Adar 5777',    'Feb 27 2017'],
  [5777, 6,  1, 'Tue 01 Nisan 5777',   'Mar 28 2017'],
  [5777, 7,  1, 'Thu 01 Iyar 5777',    'Apr 27 2017'],
  [5777, 8,  1, 'Fri 01 Sivan 5777',   'May 26 2017'],
  [5777, 9,  1, 'Sun 01 Tamuz 5777',   'Jun 25 2017'],
  [5777, 10, 1, 'Mon 01 Av 5777',      'Jul 24 2017'],
  [5777, 11, 1, 'Wed 01 Elul 5777',    'Aug 23 2017'],
  [5778, 0,  1, 'Thu 01 Tishri 5778',  'Sep 21 2017'],

  // year mode - full months or normal or lack:
  // test from Tishri till Adar
  // lack months was tested above (5777 has lack months)
  // normal months
  [5778, 0,  1, 'Thu 01 Tishri 5778',  'Sep 21 2017'],
  [5778, 1,  1, 'Sat 01 Heshvan 5778', 'Oct 21 2017'],
  [5778, 2,  1, 'Sun 01 Kislev 5778',  'Nov 19 2017'],
  [5778, 3,  1, 'Tue 01 Tevet 5778',   'Dec 19 2017'],
  [5778, 4,  1, 'Wed 01 Shevat 5778',  'Jan 17 2018'],
  [5778, 5,  1, 'Fri 01 Adar 5778',    'Feb 16 2018'],
  // full months
  [5779, 0,  1, 'Mon 01 Tishri 5779',  'Sep 10 2018'],
  [5779, 1,  1, 'Wed 01 Heshvan 5779', 'Oct 10 2018'],
  [5779, 2,  1, 'Fri 01 Kislev 5779',  'Nov 09 2018'],
  [5779, 3,  1, 'Sun 01 Tevet 5779',   'Dec 09 2018'],
  [5779, 4,  1, 'Mon 01 Shevat 5779',  'Jan 07 2019'],
  [5779, 5,  1, 'Wed 01 Adar I 5779',  'Feb 06 2019'],

  // leap year's months:
  // test for months since 'Adar I' in a leap year
  [5779, 5,  1, 'Wed 01 Adar I 5779',  'Feb 06 2019'],
  [5779, 6,  1, 'Fri 01 Adar II 5779', 'Mar 08 2019'],
  [5779, 7,  1, 'Sat 01 Nisan 5779',   'Apr 06 2019'],
  [5779, 8,  1, 'Mon 01 Iyar 5779',    'May 06 2019'],
  [5779, 9,  1, 'Tue 01 Sivan 5779',   'Jun 04 2019'],
  [5779, 10, 1, 'Thu 01 Tamuz 5779',   'Jul 04 2019'],
  [5779, 11, 1, 'Fri 01 Av 5779',      'Aug 02 2019'],
  [5779, 12, 1, 'Sun 01 Elul 5779',    'Sep 01 2019'],

  // year determining:
  // LO ADU ROSH
  [5780, 0, 1,  'Mon 01 Tishri 5780',  'Sep 30 2019'],
  // MOLAD ZAKEN && LO ADU ROSH
  [5781, 0, 1,  'Sat 01 Tishri 5781',  'Sep 19 2020'],
  // MOLAD ZAKEN
  [5786, 0, 1,  'Tue 01 Tishri 5786',  'Sep 23 2025'],
  // GETRED
  [5789, 0, 1,  'Thu 01 Tishri 5789',  'Sep 21 2028'],
  // BETUTAKPAT
  [5766, 0, 1,  'Tue 01 Tishri 5766',  'Oct 04 2005'],

  // leap years:
  // test for leap years (Adar II), along a cycle of 19 year.
  [5777, 6, 1,  'Tue 01 Nisan 5777',   'Mar 28 2017'],
  [5778, 6, 1,  'Sat 01 Nisan 5778',   'Mar 17 2018'],
  [5779, 6, 1,  'Fri 01 Adar II 5779', 'Mar 08 2019'],
  [5780, 6, 1,  'Thu 01 Nisan 5780',   'Mar 26 2020'],
  [5781, 6, 1,  'Sun 01 Nisan 5781',   'Mar 14 2021'],
  [5782, 6, 1,  'Fri 01 Adar II 5782', 'Mar 04 2022'],
  [5783, 6, 1,  'Thu 01 Nisan 5783',   'Mar 23 2023'],
  [5784, 6, 1,  'Mon 01 Adar II 5784', 'Mar 11 2024'],
  [5785, 6, 1,  'Sun 01 Nisan 5785',   'Mar 30 2025'],
  [5786, 6, 1,  'Thu 01 Nisan 5786',   'Mar 19 2026'],
  [5787, 6, 1,  'Wed 01 Adar II 5787', 'Mar 10 2027'],
  [5788, 6, 1,  'Tue 01 Nisan 5788',   'Mar 28 2028'],
  [5789, 6, 1,  'Sat 01 Nisan 5789',   'Mar 17 2029'],
  [5790, 6, 1,  'Wed 01 Adar II 5790', 'Mar 06 2030'],
  [5791, 6, 1,  'Tue 01 Nisan 5791',   'Mar 25 2031'],
  [5792, 6, 1,  'Sat 01 Nisan 5792',   'Mar 13 2032'],
  [5793, 6, 1,  'Wed 01 Adar II 5793', 'Mar 02 2033'],
  [5794, 6, 1,  'Tue 01 Nisan 5794',   'Mar 21 2034'],
  [5795, 6, 1,  'Mon 01 Adar II 5795', 'Mar 12 2035'],
  [5796, 6, 1,  'Sat 01 Nisan 5796',   'Mar 29 2036']
]

var monthContext = [

  // each row contains details as follow:
  // [<initial-year>, <initial-month>, <changed-year>, <expected-month>]

  // normal year to normal year
  [5777, 5, 5778, 5],

  // normal year to leap year
  [5777, 5, 5779, 6],
  [5777, 4, 5779, 4],

  // leap year to leap year
  [5776, 6, 5779, 6],
  [5776, 5, 5779, 5],

  // leap year to normal year
  [5779, 6, 5777, 5],
  [5779, 5, 5777, 5],
]

describe('HeDate Correctivity', function() {
  it('Should set date info correctly with respect to the Gregorian calendar', function() {
    testCases.forEach(function(t) {
      var hdate = new HeDate(0,0,1,0,0,0,0);
      var testNums = t.slice(0,3);
      hdate.setFullYear.apply(hdate, testNums)
      assert.equal(hdate.getFullYear(), t[0], 'getFullYear ' + testNums);
      assert.equal(hdate.getMonth(), t[1], 'getMonth ' + testNums);
      assert.equal(hdate.getDate(), t[2], 'getDate ' + testNums);
      assert.equal(hdate.toDateString(), t[3], 'toDateString ' + testNums);
      assert.equal(hdate.getTime(), new Date(t[4]).getTime(), 'getTime ' + testNums);
    })
  })

  it('Should keep month context when year is changed by setFullYear', function() {
    monthContext.forEach(function(t) {
      var date = new HeDate(t[0], t[1]);
      date.setFullYear(t[2])
      assert.equal(date.getMonth(), t[3], 'setFullYear ' + t)
      var date = new HeDate(HeDate.UTC(t[0], t[1]));
      date.setUTCFullYear(t[2])
      assert.equal(date.getUTCMonth(), t[3], 'setUTCFullYear ' + t)
    })
  })
})
