const assert = require('assert');
const User = require('../src/user');

describe('Reading users form the database', () => {
    let joe;
    
    beforeEach(done => {
        joe = new User({ name: 'Joe' })
        console.log('JOE', joe);
        joe.save().then(() => done());
    })
    it('finds all users with a name of joe', done => {
        User.find({
            name: 'Joe'
        }).then(users => {
            console.log(users);
            assert(users[0]._id.toString() === joe._id.toString());
            done();
        })
    })
})