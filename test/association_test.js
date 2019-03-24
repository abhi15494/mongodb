const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogpost');
const assert = require('assert');

describe('Association test with key ref', () => {
    let joe, blogPost, comment;
    beforeEach(done => {
        joe = new User({name: 'joe'});
        blogPost = new BlogPost({
            title: 'JS is great',
            content: 'Yeah it really great'
        });
        comment = new Comment({content: 'Congrats on great post'});
    
        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([ joe.save(), blogPost.save(), comment.save() ])
        .then(() => done());
    });

    // Give priority to only one test
    it('saves a relationship b/w user and blogpost', done => {
        User.findOne({name: 'joe'})
        .populate('blogPosts')
        .then(user => {
            assert(user.blogPosts[0].title == 'JS is great');
            done();
        })
    });

    it('Saves a full relation tree', done => {
        User.findOne({name: 'joe'})
        .populate({
            path: 'blogPosts',
            populate: {
                path: 'comments',
                model: 'comment',
                populate: {
                    path: 'user',
                    model: 'user'
                }
            }
        }).then(user => {
            // console.log(user.blogPosts[0].comments[0]);
            assert(user.name === 'joe');
            assert(user.blogPosts[0].title == 'JS is great');
            assert(user.blogPosts[0].content == 'Yeah it really great');
            assert(user.blogPosts[0].comments[0].content == 'Congrats on great post');
            assert(user.blogPosts[0].comments[0].user.name == 'joe');

            done();
        })
    })
});