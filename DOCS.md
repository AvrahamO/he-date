# HeDate API Documentation

- [Constructor](#constructor)
- [Class Methods](#class-methods)
- [Object Methods](#object-methods)
- [About Leap Years](#about-leap-years)

## Constructor

**new HeDate**
```js
new HeDate(milliseconds) // number of milliseconds since the epoch (1/1/1970)
new HeDate(year, month [, date [, hours [, minutes [, seconds [, milliseconds]]]]])
```
> **NOTE**:  
  Unlike `Date`, **HeDate** can not parse a date string, and thus, it is not possible to construct with a string argument.  
  Constructing with a string will cause `Invalid Date`.

## Class Methods

**getFullYear**: same as [Date.getFullYear](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear)

**getYear**: same as [Date.getYear](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getYear)

**getMonth**: same as [Date.getMonth](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth)

**getDate**: same as [Date.getDate](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate)

**getUTCFullYear**: same as [Date.getUTCFullYear](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear)

**getUTCMonthg**: same as [Date.getUTCMonth](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMonth)

**getUTCDate**: same as [Date.getUTCDate](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCDate)

**setFullYear**: same as [Date.setFullYear](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setFullYear)

**setYear**: same as [Date.setYear](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setYear)

**setMonth**: same as [Date.setMonth](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth)

**setDate**: same as [Date.setDate](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate)

**setUTCFullYear**: same as [Date.setUTCFullYear](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCFullYear)

**setUTCMonth**: same as [Date.setUTCMonth](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCMonth)

**setUTCDate**: same as [Date.setUTCDate](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCDate)

**toDateString**:  
This method is the same as
[Date.toLocaleDateString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)
with the following form:
```js
new Date().toLocaleDateString('en-US-u-ca-hebrew', {
  month: 'long',
  year: 'numeric',
  day: '2-digit'
})
```

**toString**:  
Returns a string containing date and time information.  
The time string is the same as [Date.toTimeString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toTimeString)

**toUTCString**: like `toString` with UTC context.

**toGMTString**: alias `toUTCString`.

> **NOTE**:  
  The following methods were not touched, and return a gregorian date string:
  - `toLocaleString`
  - `toLocaleDateString`
  - `toISOString`
  - `toJSON`

## Object Methods

**HeDate**  
Like the native Date object, calling `HeDate()` without a constructor returns a string representing the current hebrew date and time.

**HeDate.UTC**: same as [Date.UTC](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC)

> **NOTE**:  
> `HeDate.now` is not supported, because there is no reason to do that.  
> `HeDate.parse` was not yet written.

## About Leap Years

`HeDate` does not provide any function to detect weather a given year is leap or not.  
if you want to ensure setting the month to the last Adar (**Adar** when normal year, or **Adar II** when leap year), you can do that by the following command:
```js
date.setFullYear(nextYear, -7)
```
This will calculate and set the date to 7 months before `nextYear`.

By the same way you can set the date to the last day of **Heshvan** or **Kislev**:
```js
date.setMonth(3, 0)
```
