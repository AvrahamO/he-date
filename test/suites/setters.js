var timezoneOffset = new HeDate(0,6,1).getTimezoneOffset()
timezoneOffset = timezoneOffset / Math.abs(timezoneOffset) | 0;

describe('HeDate setters', function() {

  var year = 5777,
    month = 4,
    day = 12,
    date;

  beforeEach(function() {
    date = new HeDate(year, month, day);
  })

  describe('#setFullYear', function() {
    it('When called with 1 arg, should set year, while keeping date and month', function() {
      date.setFullYear(year + 1)
      assert.equal(date.getFullYear(), year + 1, 'year')
      assert.equal(date.getMonth(), month, 'month')
      assert.equal(date.getDate(), day, 'date')
    })
    it('When called with 2 args, should set year and month, while date is keeping', function() {
      date.setFullYear(year + 1, month + 1)
      assert.equal(date.getFullYear(), year + 1, 'year')
      assert.equal(date.getMonth(), month + 1, 'month')
      assert.equal(date.getDate(), day, 'date')
    })
    it('When called with 3 args, should set year, month and date', function() {
      date.setFullYear(year + 1, month + 1, day + 1)
      assert.equal(date.getFullYear(), year + 1, 'year')
      assert.equal(date.getMonth(), month + 1, 'month')
      assert.equal(date.getDate(), day + 1, 'date')
    })
  })
  describe('#setYear', function() {
    it('Should set year', function() {
      date.setYear(year + 1);
      assert.equal(date.getFullYear(), year + 1, 'year')
    })
  })
  describe('#setMonth', function() {
    it('When called with 1 arg, should set month', function() {
      date.setMonth(month + 1)
      assert.equal(date.getFullYear(), year, 'year')
      assert.equal(date.getMonth(), month + 1, 'month')
      assert.equal(date.getDate(), day, 'date')
    })
    it('When called with 2 args, should set month and date', function() {
      date.setMonth(month + 1, day + 1)
      assert.equal(date.getFullYear(), year, 'year')
      assert.equal(date.getMonth(), month + 1, 'month')
      assert.equal(date.getDate(), day + 1, 'date')
    })
  })
  describe('#setDate', function() {
    it('Should set date', function() {
      date.setDate(day + 1);
      assert.equal(date.getFullYear(), year, 'year')
      assert.equal(date.getMonth(), month, 'month')
      assert.equal(date.getDate(), day + 1, 'date')
    })
  })
  describe('#setUTCFullYear', function() {
    it('When called with 1 arg, should set UTC year', function() {
      var year = 5777;
      var date = new HeDate(year, 6, 1, 0, -timezoneOffset);
      var month = date.getUTCMonth(), day = date.getUTCDate();
      date.setUTCFullYear(year);
      assert.equal(date.getUTCFullYear(), year);
      assert.equal(date.getUTCMonth(), month);
      assert.equal(date.getUTCDate(), day);
    })
    it('When called with 2 args, Should set UTC year and month', function() {
      var year = 5777, month = 10;
      var date = new HeDate(year, 6, 1, 0, -timezoneOffset);
      var day = date.getUTCDate();
      date.setUTCFullYear(year, month);
      assert.equal(date.getUTCFullYear(), year);
      assert.equal(date.getUTCMonth(), month);
      assert.equal(date.getUTCDate(), day);
    })
    it('When called with 3 args, Should set UTC year, month and date', function() {
      var year = 5777, month = 10, day = 10;
      var date = new HeDate(year, 6, 1, 0, -timezoneOffset);
      date.setUTCFullYear(year, month, day);
      assert.equal(date.getUTCFullYear(), year);
      assert.equal(date.getUTCMonth(), month);
      assert.equal(date.getUTCDate(), day);
    })
  })
  describe('#setUTCMonth', function() {
    it('When called with 1 arg, should set month', function() {
      var month = 10;
      var date = new HeDate(5778, 6, 1, 0, -timezoneOffset);
      var year = date.getUTCFullYear(), day = date.getUTCDate();
      date.setUTCMonth(month);
      assert.equal(date.getUTCFullYear(), year);
      assert.equal(date.getUTCMonth(), month);
      assert.equal(date.getUTCDate(), day);
    })
    it('When called with 2 args, should set month and date', function() {
      var month = 10, day = 23;
      var date = new HeDate(5778, 6, 1, 0, -timezoneOffset);
      var year = date.getUTCFullYear();
      date.setUTCMonth(month, day);
      assert.equal(date.getUTCFullYear(), year);
      assert.equal(date.getUTCMonth(), month);
      assert.equal(date.getUTCDate(), day);
    })
  })
  describe('#setUTCDate', function() {
    it('Should set UTC date', function() {
      var day = 23;
      var date = new HeDate(5778, 6, 1, 0, -timezoneOffset);
      var year = date.getUTCFullYear(), month = date.getUTCMonth();
      date.setUTCDate(day);
      assert.equal(date.getUTCFullYear(), year);
      assert.equal(date.getUTCMonth(), month);
      assert.equal(date.getUTCDate(), day);
    })
  })
})