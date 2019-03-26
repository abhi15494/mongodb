const assert = require('assert');
const User = require('../src/user');

describe('Virtual Types', () => {
    it('Post count returns number of posts', done => {
        const joe = new User(
            {
                name: 'Joe',
                posts: [{title: 'New Title Post'}]
            });
        joe.save()
        .then(() => User.findOne({name: 'Joe'}))
        .then(user => {
            console.log("----------------------------------"+user)
            assert(user.postCount === 1);
            done();
        });
    });
});