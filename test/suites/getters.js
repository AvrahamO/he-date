var timezoneOffset = new HeDate(5777,0,1).getTimezoneOffset()
timezoneOffset = timezoneOffset / Math.abs(timezoneOffset) | 0;

describe('HeDate getters', function() {
  describe('#getFullYear', function() {
    var year = 5777;
    var date = new HeDate(year, 0, 1);
    it('Should return number of year', function() {
      assert.equal(date.getFullYear(), year, 'getFullYear()')
    })
    it('Alias getYear', function() {
      assert.equal(date.getYear(), date.getFullYear(), 'getYear()')
    })
  })
  describe('#getMonth', function() {
    it('Should return number of month', function() {
      var month = 3;
      var date = new HeDate(5777, month, 1);
      assert.equal(date.getMonth(), month, 'getMonth()')
    })
  })
  describe('#getDate', function() {
    it('Should return number of day in month', function() {
      var day = 15;
      var date = new HeDate(5777, 5, day);
      assert.equal(date.getDate(), day, 'getDate()')
    })
  })
  describe('#getUTCFullYear', function() {
    it('Should return number of UTC year', function() {
      var date = new HeDate(5777, 0, 1, 0, 0, -timezoneOffset);
      var UTCYear = date.getFullYear() + timezoneOffset;
      assert.equal(date.getUTCFullYear(), UTCYear, 'getUTCFullYear()');
    })
  })
  describe('#getUTCMonth', function() {
    it('Should return number of UTC month', function() {
      var date = new HeDate(5777, 1, 1, 0, 0, -timezoneOffset);
      var UTCMonth = date.getMonth() + timezoneOffset;
      assert.equal(date.getUTCMonth(), UTCMonth, 'getUTCMonth()');
    })
  })
  describe('#getUTCDate', function() {
    it('Should return number of UTC day in month', function() {
      var date = new HeDate(5777, 0, 2, 0, 0, -timezoneOffset);
      var UTCDay = date.getDate() + timezoneOffset;
      assert.equal(date.getUTCDate(), UTCDay, 'getUTCDate()');
    })
  })
})
