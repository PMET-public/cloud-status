const assert = require('chai').assert
const {yargs} = require('../src/yargs-cli')

// testing yargs 
// https://github.com/yargs/yargs/issues/603
// https://github.com/yargs/yargs/issues/442
describe('test asdf', ()  => {
  describe('test 2', () => {
    it('should return hello', () =>{
      assert.equal(yargs('eu -h').parse(), 'hi')
    })
  })
})

// yargs.parse('--version')
//yargs.parse('--version')
//yargs.parse('--version')
// yargs('eu -a dasdf')
// console.log(yargs.argv)
// yargs('eu -v dasdf')
// console.log(yargs.argv)