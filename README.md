
# HeDate.js

A javascript Date object with Hebrew calendar context

[![Build Status](https://travis-ci.org/abrahamos/he-date.svg?branch=development)](https://travis-ci.org/abrahamos/he-date)
## Install

#### Node.js:
```bash
npm install git://github.com/abrahamos/he-date.git#development
```

#### Browser:
Download ([source](HeDate.js) | [minified](HeDate.min.js)).

You can also try without downloading:
```html
<script src="http://www.unpkg.com/he-date@1.0.0/HeDate.min.js"></script>`
```

## Usage

**HeDate** methods are just like the native `Date` methods, but instead of Gregorian calendar, it
uses the Hebrew calendar.

If you are familliar with the native `Date`, you can quickly get started with `HeDate`.

## Example

```js
/*for node.js*/
var HeDate = require('he-date');
```

```js
var heDate = new HeDate(5777, 5, 15);
console.log(heDate.getMonth()) // 5
console.log(heDate.toDateString()) // Mon 15 Adar 5777
```

For a full reference, see the [Docs](DOCS.md).

## Why

#### toLocaleDateString
For only converting a Gregorian date to an Hebrew date, you could pass hebrew calendar to the
native `toLocaleDateString` method of `Date`:
```js
new Date().toLocaleDateString('en-US-u-ca-hebrew')
```
However, you couldn't convert from Hebrew to Gregorian, and further more, this method is **not
100% correct**.  
<!-- TODO: improve the following lines -->
For example, compare the result of the following code:
```js
new Date(2045, 9, 1).toLocaleDateString('en-US-u-ca-hebrew')
```
against your Google Calendar equivalent.

HeDate allows you to easily set and get hebrew date.


#### Hebcal
**[Hebcal](https://github.com/hebcal/hebcal-js)** is a reach library for managing hebrew dates.

The difference between **Hebcal** and **HeDate**:
1. **HeDate** uses method names like the native Date object, while **Hebcal** provides its own
  functions.
1. **Hebcal** provides you very much methods that you will generally don't need at all (like
  `getSedra`).  
  Also, it takes your location to calculate sunrise and sunset.  
  **HeDate** doesn't provide any functions other the Date like methods.

So, if you want to know only about hebrew dates, months and years, then prefer **HeDate**.  
But if you want also to know about hebrew holidays, Sedra's, sunrise, DafYomi and so on, you may
try **Hebcal**.

## License
[MIT](LICENSE)
