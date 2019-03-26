const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogpost');

describe('Middleware', () => {
    let joe, blogPost, comment;
    beforeEach(done => {
        joe = new User({name: 'joe'});
        blogPost = new BlogPost({
            title: 'JS is great',
            content: 'Yeah it really great'
        });
        // comment = new Comment({content: 'Congrats on great post'});

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        // comment.user = joe;

        Promise.all([
            joe.save(),
            blogPost.save(),
            // comment.save()
        ])
        .then(() => done());
    });

    it.only('Cleanup blogpost on delete user automatically', (done) => {
        //count(): a operation that touch the database and a async operation
        joe.remove()
        .then(() => blogPost.count())
        .then(count => assert(count == 0));
        done();
    });
});