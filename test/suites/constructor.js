describe('HeDate Constructor', function() {
  describe('When called with a number', function() {
    it('Should initiate date to given number of ms since 1/1/1970', function() {
      var time = 1483637537090;
      assert.equal(new HeDate(time).getTime(), time, 'getTime()')
    })
  })
  describe('When called with 2-7 numbers', function() {

    it('Should be the same as setFullYear(y,m,d) + setHours(h,m,s,ms)', function() {
      var args = [5777,3,4,15,46,56,345];
      var obsv = eval('new HeDate(' + args.toString() + ')');

      var expc = new HeDate();
      expc.setFullYear.apply(expc, args.slice(0,3))
      expc.setHours.apply(expc, args.slice(3,7))

      assert.equal(obsv.getTime(), expc.getTime(), 'getTime()')
    })

    it('Should default date to 1 and all the rest to 0', function() {
      var year = 5777, month = 5;
      var date = new HeDate(year, month);
      var localTime = date.getTime() - date.getTimezoneOffset() * 60000;
      var dayLength = 24*60*60*1000;

      assert.equal(date.getDate(), 1, 'getDate()')
      assert.equal(localTime % dayLength, 0, 'time % days')
    })
  })
})