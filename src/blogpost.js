const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    comments: [{ 
        type: Schema.Types.ObjectId,
        // ref will be match up to the model and find Comment collection for the reference id.
        ref: 'comment'
     }]
});

const BlogPost = mongoose.model('blogpost', BlogPostSchema);

module.exports = BlogPost;