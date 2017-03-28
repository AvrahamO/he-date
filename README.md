
# HeDate.js

A javascript Date object with Hebrew calendar context

[![Build Status][build-badge]][build-link]
[![Coverage Status][coverage-badge]][coverage-link]
[![npm Version][npm-badge]][npm-link]
[![GitHub License][license-badge]][license-link]

## Install

#### Node.js:
```bash
npm install he-date
```

#### Browser:
Download [source][source] or [minified][minified].

You can also use without downloading:
```html
<script src="https://unpkg.com/he-date"></script>`
```

## Usage

**HeDate** methods are just like the native `Date` methods, but instead of Gregorian calendar, it
uses the Hebrew calendar.

If you are familliar with the native `Date`, you can quickly get started with `HeDate`.

## Example

```js
var HeDate = require('he-date'); // for node.js

var heDate = new HeDate(5777, 5, 15);
console.log(heDate.getMonth()) // 5
console.log(heDate.toDateString()) // Mon 15 Adar 5777
```

For complete method reference, see the [Docs](DOCS.md).

## Why

#### toLocaleDateString
For only converting Gregorian date to Hebrew date, you could use the native method as follow:
```js
new Date().toLocaleDateString('en-US-u-ca-hebrew')
```
However, you couldn't convert Hebrew date to Gregorian date.  
That is why you need **HeDate**.

Further more, the native method is **not 100% correct!**  
For example, try to compare the result of the following code:
```js
new Date(2046, 9, 1).toLocaleDateString('en-US-u-ca-hebrew')
```
against [Google Calendar equivalent][google-calendar].


#### Hebcal
**[Hebcal][hebcal]** is a reach library for managing hebrew dates.

The difference between **Hebcal** and **HeDate**:
1. **HeDate** uses the native `Date` methods, while **Hebcal** provides its own
  functions.
1. **Hebcal** provides you with very much methods that you will generally don't need at all (i.e.
  `getSedra`).  
  Also, it takes your location to calculate sunrise and sunset.  
  **HeDate** doesn't provide any additional functions other than the `Date` like methods.

So, if you want to know only about hebrew dates, months and years, then prefer **HeDate**.  
But if you want also to know about hebrew holidays, Sedra's, sunrise, DafYomi and so on, you may
try **Hebcal**.

## License
[MIT](LICENSE)

  [build-badge]: https://travis-ci.org/abrahamos/he-date.svg?branch=master
  [build-link]: https://travis-ci.org/abrahamos/he-date
  [coverage-badge]: https://coveralls.io/repos/github/abrahamos/he-date/badge.svg?branch=master
  [coverage-link]: https://coveralls.io/github/abrahamos/he-date?branch=master
  [npm-badge]: https://badge.fury.io/js/he-date.svg
  [npm-link]: https://badge.fury.io/js/he-date
  [license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
  [license-link]: https://raw.githubusercontent.com/abrahamos/he-date/master/LICENSE

  [source]: https://raw.githubusercontent.com/abrahamos/he-date/master/HeDate.js
  [minified]: https://raw.githubusercontent.com/abrahamos/he-date/master/HeDate.min.js
  [google-calendar]: https://calendar.google.com/calendar/render#main_7%7Cday-1+39233+39233+39233
  [hebcal]: https://github.com/hebcal/hebcal-js
