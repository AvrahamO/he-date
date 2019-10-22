
/**
 * (c) 2017 Avraham Ostreicher
 * HeDate.js is released under the MIT license
 */


(function() {

  /* ================ Helpers ================ */

  var MONTH_LENGTH = 765433; // in parts TODO: portions?
  var DAY_LENGTH = 25920; // in parts
  var CYCLE_MONTHS = 235; // moon's cycle in months
  var CYCLE_YEARS = 19; // moon's cycle in sun years
  var DISTANCE = 2092591; // days between Hebrew base (29/5/0) to Gregorian 1/1/1970
  var INVALID = 'Invalid Date';
  var WEEKDAYS = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ];
  var MONTHS = [
    'Tishri',
    'Heshvan',
    'Kislev',
    'Tevet',
    'Shevat',
    'Adar I',
    'Adar II',
    'Nisan',
    'Iyar',
    'Sivan',
    'Tamuz',
    'Av',
    'Elul',

    'Adar'
  ];

  /**
   * src - Array || Argument object
   * dest - Array
   */
  var defaults = function(src, dest) {
    var i = 0;
    var len = Math.min(src.length, dest.length);
    while(i < len) {
      dest[i] = src[i];
      i++;
    }
    return dest;
  }

  /* like `x % y` even for negative numbers */
  var modulo = function(x, y) {
    return x - y * Math.floor(x / y);
  }

  var getMonthName = function(monthNum, leap) {
    if(!leap) {
      if(monthNum == 5) {
        return MONTHS[13];
      } else if(monthNum > 5) {
        monthNum++;
      }
    }
    return MONTHS[monthNum];
  }

  var ms2days = function(ms) {
    return Math.floor(ms / 86400000);
  }

  var getDaysSinceEpoch = function(date) {
    return ms2days(date.getTime() - date.getTimezoneOffset() * 60000);
  }

  var getUTCDaysSinceEpoch = function(date) {
    return ms2days(date.getTime());
  }

  var setNewDate = function(newDateInfo) {
    var newDateDays = hebrew2days.apply(null, newDateInfo);
    return Date.prototype.setFullYear.call(this, 1970, 0, newDateDays + 1);
  }

  var setUTCNewDate = function(newDateInfo) {
    var newDateDays = hebrew2days.apply(null, newDateInfo);
    return Date.prototype.setUTCFullYear.call(this, 1970, 0, newDateDays + 1);
  }

  var stringify = function(daysSinceEpoch) {
    var dateInfo = days2hebrew(daysSinceEpoch);
    var weekday = (daysSinceEpoch + 4) % 7;
    weekday = WEEKDAYS[weekday];
    var month = getMonthName(dateInfo.month, isLeap(dateInfo.year - 1));
    var date = ('0' + dateInfo.date).slice(-2);
    return weekday + ' ' + date + ' ' + month + ' ' + dateInfo.year;
  }

  /**
   * months - till the beginnig of current year
   * leap - Boolean
   */
  var getNextYearInDays = function(months, leap) {
    var yearLength = 12 + leap;
    return getNewYearInDays(months + yearLength);
  }

  /**
   * length of Heshvan and Kislev varies from year to year with 3 possible
   * states:
   *   (1)  both have 30 days
   *   (0)  Heshvan has 29 days, Kislev has 30 days
   *   (-1) both have 29 days
   */
  var getYearMode = function(daysSinceEpoch, nextYearInDays) {
    var yearLength = nextYearInDays - daysSinceEpoch;
    return yearLength % 10 - 4;
  }

  var isLeap = function(year) {
    var reminder = modulo(year, CYCLE_YEARS);
    return Boolean([2,5,7,10,13,16,18].indexOf(reminder) + 1);
  }

  /**
    TODO: improve
   * The following 2 converters are based on an idea introduced by Rabby
   * Avraham Bar Hiyya in his Sefer Ha`Ibur, in second article, chapter 5
   *	 link: http://www.daat.ac.il/daat/vl/haibur2/haibur201.pdf
   * The main idea is as follow:
   *   Moon's cycle (of 19 sun years) begins 3 year before, (at -2 or at 17),
   *   then, sum of moon years must be greater than or equal to sun years' sum.
   *   This rule leads to the following order of leap years: [1,3,6,9,11,14,17]
   *   which is identical to the traditional order: [3,6,8,11,14,17,19] if
   *   starting 3 years later.
   */

  /**
   * months - zero-based
   * returns year - zero-based
   */
  var months2year = function(months) {
    return Math.floor((months + 38) * CYCLE_YEARS / CYCLE_MONTHS) - 3;
  }

  /**
   * year - zero-based
   * returns months - zero-based
   */
  var year2months = function(year) {
    return Math.ceil((year + 3) * CYCLE_MONTHS / CYCLE_YEARS) - 38;
  }

  /**
   * days - since Hebrew base (29/5/0) zero-based
   * returns months - zero-based
   */
  var days2yearsInMonths = function(daysSinceHebrewBase) {
    var parts, months, year;
    parts = daysSinceHebrewBase * DAY_LENGTH;
    months = parts / MONTH_LENGTH;
    months = Math.floor(months);
    year = months2year(months);
    months = year2months(year);
    return months;
  }

  /**
   * months - till the beginnig of year
   * returns days till the beginnig of year
   */
  // TODO: improve this function - structure and line length
  var getNewYearInDays = function(months) {

    var parts, days, result;

    // year's birth (Molad) distance than the sunday before first Rosh Hashana
    parts = months * MONTH_LENGTH + 31524;
    result = days = Math.floor(modulo(parts, 181440) / DAY_LENGTH);
    parts = modulo(parts, DAY_LENGTH);

    // 'MOLAD ZAKEN'
    if(parts >= 19440) {
      result++;
    }

    // 'LO ADU ROSH'
    if([0,3,5,7].indexOf(result) + 1) {
      result++;
    }

    if(result == days) {
      
      // 'GETRED'
      if(result == 2 && parts >= 9924 && !isLeap(months2year(months))) {
        result += 2;
      }

      // 'BETUTAKPAT'
      else if (result == 1 && parts >= 16789 && isLeap(months2year(months) - 1)) {
        result++;
      }

    }

    return Math.floor((months * MONTH_LENGTH + 31524) / DAY_LENGTH) + result - days;

  }

  // returns 0, 1 or -1
  var getMonthContext = function(month, year1, year2) {
    var leap1 = isLeap(year1 - 1);
    var leap2 = isLeap(year2 - 1);

    if(month < 5 + leap1) return 0;
    return leap2 - leap1;
  }



  /* ================ Conversion ================ */

  /* days since 1/1/1970 zero-based */
  var days2hebrew = function(days) {

    days += DISTANCE;

    var months = days2yearsInMonths(days);
    var currentYear = getNewYearInDays(months);
    var nextYear;

    if(currentYear > days) {
      nextYear = currentYear;
      months = days2yearsInMonths(days - 7);
      currentYear = getNewYearInDays(months);
    }
    days -= currentYear;
    var year = months2year(months);
    var leap = isLeap(year);
    nextYear = nextYear || getNextYearInDays(months, leap);
    var mode = getYearMode(currentYear, nextYear, leap);

    if(days > 87) {
      days -= mode;
    } else if(days > 58 && mode == 1) {
      days -= 0.5;
    }

    if(days > 176) days -= leap * 0.5;

    var month = Math.floor(days / 29.5);
    var date = Math.floor(days % 29.5);

    // change value back from zero-based
    year++;
    date++;

    return {
      year: year,
      month: month,
      date: date
    }
  }

  /* month - zero-based */
  var hebrew2days = function(year, month, date) {

    // change value from to zero-based
    date--;
    year--;

    // combine year and month to get the actual year and month
    // this allows user to set a negative month number
    var months = year2months(year) + month;
    year = months2year(months);
    month = months - year2months(year);
    months -= month;

    var days = getNewYearInDays(months);

    var leap = isLeap(year);
    var nextYear = getNextYearInDays(months, leap);
    var mode = getYearMode(days, nextYear, leap);

    days += month * 29.5;
    if(month > 1 && mode == 1 || month > 2) days += mode;
    if(month > 5) days += leap * 0.5;
    days = Math.ceil(days);

    days += date;

    return days - DISTANCE;
  }



  /* ================ Main ================ */

  function HeDate() {
    if(!(this instanceof HeDate)) {
      return new HeDate().toString();
    }

    var date = new Date();
    date.__proto__ = this.__proto__;

    if(arguments.length == 1) {
      date.setTime(arguments[0]);
    } else if(arguments.length > 1) {
      var args = defaults(arguments, [0, 0, 1, 0, 0, 0, 0]);
      var dateArgs = args.slice(0, 3);
      var timeArgs = args.slice(3);
      date.setFullYear.apply(date, dateArgs);
      date.setHours.apply(date, timeArgs);
    }

    return date;
  }

  // inherit Date.prototype
  HeDate.prototype.__proto__ = Date.prototype;

  Object.defineProperties(HeDate, {
    UTC: {
      value: function UTC() {
        var args = defaults(arguments, [NaN, NaN, 1, 0, 0, 0, 0]);
        var days = hebrew2days.apply(null, args.slice(0, 3))
        args.splice(0,3,1970,0,days+1);
        return Date.UTC.apply(null, args);
      }
    }
  })

  Object.defineProperties(HeDate.prototype, {
    getFullYear: {
      value: function getFullYear() {
        var days = getDaysSinceEpoch(this);
        return days2hebrew(days).year;
      }
    },
    getYear: {
      value: function getYear() {
        return this.getFullYear();
      }
    },
    getMonth: {
      value: function getMonth() {
        var days = getDaysSinceEpoch(this);
        return days2hebrew(days).month;
      }
    },
    getDate: {
      value: function getDate() {
        var days = getDaysSinceEpoch(this);
        return days2hebrew(days).date;
      }
    },
    getUTCFullYear: {
      value: function getUTCFullYear() {
        var days = getUTCDaysSinceEpoch(this);
        return days2hebrew(days).year;
      }
    },
    getUTCMonth: {
      value: function getUTCMonth() {
        var days = getUTCDaysSinceEpoch(this);
        return days2hebrew(days).month;
      }
    },
    getUTCDate: {
      value: function getUTCDate() {
        var days = getUTCDaysSinceEpoch(this);
        return days2hebrew(days).date;
      }
    },
    setFullYear: {
      value: function setFullYear() {
        var days = getDaysSinceEpoch(this);
        var oldDate = days2hebrew(days);
        oldDate.month += getMonthContext(oldDate.month, oldDate.year, arguments[0])
        var newDate = defaults(arguments, [NaN, oldDate.month, oldDate.date]);
        return setNewDate.call(this, newDate);
      }
    },
    setYear: {
      value: function setYear() {
        return this.setFullYear(arguments[0]);
      }
    },
    setMonth: {
      value: function setMonth() {
        var days = getDaysSinceEpoch(this);
        var oldDate = days2hebrew(days);
        var newDate = defaults(arguments, [NaN, oldDate.date]);
        newDate.splice(0, 0, oldDate.year);
        return setNewDate.call(this, newDate);
      }
    },
    setDate: {
      value: function setDate() {
        var days = getDaysSinceEpoch(this);
        var oldDate = days2hebrew(days);
        var newDate = [oldDate.year, oldDate.month, arguments[0]];
        return setNewDate.call(this, newDate);
      }
    },
    setUTCFullYear: {
      value: function setUTCFullYear() {
        var days = getUTCDaysSinceEpoch(this);
        var oldDate = days2hebrew(days);
        oldDate.month += getMonthContext(oldDate.month, oldDate.year, arguments[0])
        var newDate = defaults(arguments, [NaN, oldDate.month, oldDate.date]);
        return setUTCNewDate.call(this, newDate);
      }
    },
    setUTCMonth: {
      value: function setUTCMonth() {
        var days = getUTCDaysSinceEpoch(this);
        var oldDate = days2hebrew(days);
        var newDate = defaults(arguments, [NaN, oldDate.date]);
        newDate.splice(0, 0, oldDate.year);
        return setUTCNewDate.call(this, newDate);
      }
    },
    setUTCDate: {
      value: function setUTCDate() {
        var days = getUTCDaysSinceEpoch(this);
        var oldDate = days2hebrew(days);
        var newDate = [oldDate.year, oldDate.month, arguments[0]];
        return setUTCNewDate.call(this, newDate);
      }
    },
    toDateString: {
      value: function toDateString() {
        if(isNaN(this)) return INVALID;
        var daysSinceEpoch = getDaysSinceEpoch(this);
        return stringify(daysSinceEpoch)
      }
    },
    toString: {
      value: function toString() {
        if(isNaN(this)) return INVALID;
        return this.toDateString() + ' ' + this.toTimeString();
      }
    },
    toUTCString: {
      value: function toUTCString() {
        if(isNaN(this)) return INVALID;
        var daysSinceEpoch = getUTCDaysSinceEpoch(this);
        return stringify(daysSinceEpoch)
      }
    },
    toGMTString: {
      value: function toGMTString() {
        return this.toUTCString();
      }
    }
  })

  /* ================ Export ================ */

  if(typeof window !== 'undefined') {
    window.HeDate = HeDate;
  } else if(typeof module !== 'undefined' && module.exports) {
    module.exports = HeDate;
  }

})()
