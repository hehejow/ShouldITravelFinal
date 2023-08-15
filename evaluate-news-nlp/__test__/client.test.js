const {listeningClient} = require('../src/client/js/app.js');
console.log(listeningClient)
test('test for status code 200' ,()=> {
  expect(listeningClient(200)).toBe(200)
})