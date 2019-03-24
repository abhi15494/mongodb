const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
    let joe;
    // beforeEach(()=>{
    // })
    it('Requires a user name', () => {
        joe = new User({name: undefined});
        const valresult = joe.validateSync();
        const { message } = valresult.errors.name;
        // joe.validate(valresult => {
        //     console.log(valresult)
        // });
        assert(message === 'Name is required');
    })

    it('requires a user\'s name longer than 2 characters', () => {
        const user = new User({name: 'Al'});
        const valres = user.validateSync();
        const {message} = valres.errors.name;

        assert(message === 'Name must be more than 2 characters.');
    })

    it('Disallow invalid records from being saved', done => {
        const user = new User({name: 'Al'})
        user.save()
        .then()
        .catch((valres) => {
            console.log(valres);
            const {message} = valres.errors.name;
            assert(message === 'Name must be more than 2 characters.');
            done();
        })
    })
})