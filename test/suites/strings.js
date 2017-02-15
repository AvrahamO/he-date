var timezoneOffset = new HeDate(5777,0,1).getTimezoneOffset()
timezoneOffset = timezoneOffset / Math.abs(timezoneOffset) | 0;

var testInvalidDate = function(method) {
  var date = new HeDate(NaN);
  assert.equal(date[method](), 'Invalid Date');
}

describe('HeDate Strings', function() {
  describe('#toString', function() {
    it('Should return a date-time string', function() {
      var date = new HeDate();

      var str = date.toString().split(/\s(?=\d+:)/);
      var dateString = str[0];
      var timeString = str[1];

      assert.equal(dateString, date.toDateString(), 'toDateString()')
      assert.equal(timeString, date.toTimeString(), 'toTimeString()')
    })
    it('Should return \'Invalid Date\' when time is NaN', function() {
      testInvalidDate('toString')
    })
  })
  describe('#toDateString', function() {
    it('Should return a date string', function() {
      var year = 5777,
        month = 4,
        day = 2,
        monthName = 'Shevat',
        weekDay = 'Sun';
      var date = new HeDate(year, month, day).toDateString().split(/[^\w\d]+/)
      assert.equal(date[0], weekDay, 'weekDay')
      assert.equal(parseInt(date[1]), day, 'date')
      assert.equal(date[2], monthName, 'month')
      assert.equal(parseInt(date[3]), year, 'year')
    })
    it('Should return \'Invalid Date\' when time is NaN', function() {
      testInvalidDate('toDateString')
    })
  })
  describe('#toUTCString', function() {
    var date = new HeDate(5777, 0, 1, 0, -timezoneOffset);
    it('Should return UTC date/time string', function() {
      var year = date.getUTCFullYear(),
        month = date.getUTCMonth(),
        day = date.getUTCDate(),
        monthName = month == 0 ? 'Tishri' : 'Elul',
        weekDay = day == 29 ? 'Sun': 'Mon';
      var str = date.toUTCString().split(/[^\w\d]+/);
      assert.equal(str[0], weekDay, 'weekDay')
      assert.equal(parseInt(str[1]), day, 'date')
      assert.equal(str[2], monthName, 'month')
      assert.equal(parseInt(str[3]), year, 'year')
    })
    it('Should return \'Invalid Date\' when time is NaN', function() {
      testInvalidDate('toUTCString')
    })
    it('Alias toGMTString', function() {
      assert.equal(date.toGMTString(), date.toUTCString(), 'toGMTString()')
    })
  })
})
