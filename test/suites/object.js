
describe('HeDate Object', function() {
  describe('When called itself', function() {
    it('Should return a string same as `new HeDate().toString()`', function() {
      assert.equal(HeDate(), new HeDate().toString())
    })
  })
  describe('#UTC', function() {
    it('Should parse given 2-7 date arguments as UTC and return ms since 1/1/1970', function() {
      var year = 5777,
        month = 7,
        day = 13,
        hours = 3,
        minutes = 23,
        seconds = 45,
        milliseconds = 345;

      var time = HeDate.UTC(year, month, day, hours, minutes, seconds, milliseconds)
      var date = new HeDate(time)
      assert.equal(date.getUTCFullYear(), year, 'getUTCFullYear()')
      assert.equal(date.getUTCMonth(), month, 'getUTCMonth()')
      assert.equal(date.getUTCDate(), day, 'getUTCDate()')
      assert.equal(date.getUTCHours(), hours, 'getUTCHours()')
      assert.equal(date.getUTCMinutes(), minutes, 'getUTCMinutes()')
      assert.equal(date.getUTCSeconds(), seconds, 'getUTCSeconds()')
      assert.equal(date.getUTCMilliseconds(), milliseconds, 'getUTCMilliseconds()')
    })
  })
})
