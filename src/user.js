const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

// Create schema
const UserSchema = new Schema({
    // name: String, APPLY VALIDATIONS HERE
    name: {
        type: String, // USER DATA TYPE
        validate: { // Async validators 
            validator: (name) => name.length > 2,
            message: 'Name must be more than 2 characters.'
        },
        required: [true, 'Name is required'], // Make sure that name is required and the error message
    },
    // Virtual property not defined schema
    // post: Number,
    active: Boolean,
    likes: Number,
    posts: [PostSchema],
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogpost'
    }] 
});

// Declare virtual field in the collection and use get(function() {}) what its going to do
UserSchema.virtual('postCount').get(function() {
    return this.posts.length;
});


// Middleware for pre and post events of a particular event
UserSchema.pre('remove', function(next) {
    // To import blogpost data into user we need to 
    const BlogPost = mongoose.model('blogpost');

    // So we needuser for that
    // this === joe 
    // So, the problem is that we have to remove a array of id's data and we should not iterate
    // we need a mongo operator

    // So, $in is a operator and check
    // check all blogposts, see their id, if id is in($in) then, go and remove it
    BlogPost.remove({_id: { $in: this.blogPosts }}).then(() => next());
});

// mongoose.model(COLLECTION_NAME, Schematype)
const User = mongoose.model('user', UserSchema);

// To export User model
module.exports = User; 