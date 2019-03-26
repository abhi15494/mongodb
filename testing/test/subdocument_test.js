const assert = require('assert');
const User = require('../src/user');

describe('Subdocument', () => {
    it('Can create a subdocument', done => {
        const joe = new User({
            name: 'Joe',
            active: false,
            posts: [
                { title: 'Broly power is increasing as he fights' }
            ]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then(user => {
                console.log(user);
                assert(user.posts[0].title === 'Broly power is increasing as he fights');
                // done();
                // assert(user.posts.length > 0);
                done();
            });
    });

    it('Can add subdocuments to an existing record', done => {
        const joe = new User({
            name: 'Joe', posts: []
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then(user => {
                console.log(user);
                user.posts.push({ title: 'New Post' });
                return user.save();
                console.log(user);
            })
            .then(() => User.findOne({ name: 'Joe' }))
            .then(user => {
                console.log(user);
                assert(user.posts[0].title === 'New Post');
                done();
            });
    });

    it('Can remove an existing subdocument', done => {
        const joe = new User({
            name: 'Joe', posts: [{title: 'New Title'}]
        });

        joe.save()
        .then(() => User.findOne({name: 'Joe'}))
        .then(user => {
            const post = user.posts[0];
            post.remove();
            // In case of joe.remove() mongo automatically remove the element from the 
            // array list. But in case of Subdocument, that is not same. It's only remove
            // the post element but we have to manually save the changes i.e. user.save();
            return user.save();
        })
        .then(() => User.findOne({name: 'Joe'}))
        .then(user => {
            assert(user.postCount === 0);
            done();
        })
        
    })
});