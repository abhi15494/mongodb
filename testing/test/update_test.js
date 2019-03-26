const assert = require('assert');
const User = require('../src/user');

describe('updating records', () => {
    let joe;

    beforeEach(done => {
        joe = new User({ 
            name: 'joe',
            likes: 21,
            active: true 
        });
        joe.save().then(() => done());
    })

    function assertName(operation, done){
        operation
        .then(() => User.find({}))
        .then(users => {
            assert(users.length === 1);
            assert(users[0].name === 'Alex')
            done();
        });
    }

    it('Instance type using set and save', done => {
        joe.set({name: 'Alex'});
        assertName(joe.save(), done);
    })

    it('Instance type using update', done => {
        assertName(joe.update({name: 'Alex'}), done);
    })

    it('Class type using update', done => {
        assertName(User.update({name: 'joe'}, { name: 'Alex' }), done);
    });

    it('Class type using findOneAndUpdate', done => {
        joe.update({name: 'Alex 123'});
        assertName(
            User.findOneAndUpdate({name: 'joe'}, {name: 'Alex'}),
            done
        )
    });
    
    it('Class type using findByIdAndUpdate', done => {
        assertName(
            User.findByIdAndUpdate(joe._id, {name: 'Alex'}),
            done
        );
    });

    // Not Execute this test if we user xit
    it('Increment the likes count by 1', done => {
        User.update({name: 'joe'}, { $inc: { likes: 1 } })
        .then(() => User.findOne({name: 'joe'}))
        .then(user => {
            assert(user.likes === 22)
            done();
        })
    })
});