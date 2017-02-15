
global.HeDate = require('..');
global.assert = require('chai').assert;

const Mocha = require('mocha');
const mocha = new Mocha();

mocha.files = Mocha.utils.files(__dirname + '/suites');
mocha.run();
