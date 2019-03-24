const assert = require('assert');
const User = require('../src/user');

describe('Reading users form the database', () => {
    let joe, maria, alex, jack;
    
    beforeEach(done => {
        maria = new User({ name: 'Maria' })
        alex = new User({ name: 'Alex' })
        jack = new User({ name: 'Jack' })
        joe = new User({ name: 'Joe' })

        Promise.all([
            jack.save(),
            maria.save(),
            alex.save(),
            joe.save()
        ])
        .then(() => done());
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

    it.only('skip and limit the result set', done => {
        User.find()
        .sort({ name: 1 }) // Sort the user by ascending(1) or descending(-1) 
        .skip(1)
        .limit(2)
        .then(user => {
            // assert(user.length == 2);
            // assert(user[0].name = 'Alex');
            // assert(user[1].name = 'Jack');
            console.log(user);
            done();
        })
    });
})