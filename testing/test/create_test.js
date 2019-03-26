const assert = require('assert');
const User = require('../src/user');
const mongoose = require('mongoose');

// Testing file for mocha to run
// describe is a block
// it is the function in the describe block
describe('Creating records', () => {
    it('saves a user', (done) => {
        const joe = new User({ name: 'Joe Khan' });
        // A save call will return a promise
        joe.save().then(() => {
            // Has joe saved successfully?
            // isNew: flag true when data is not saved in the mongo db else false
            assert(!joe.isNew);
            done();
        });
    });
});