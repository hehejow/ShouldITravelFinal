const {listening} = require('../src/server/index.js');
console.log(listening)
test('test for status code 200' ,()=> {
  expect(listening(200)).toBe(200)
})