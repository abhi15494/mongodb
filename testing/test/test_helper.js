// This is how we do code sharing b/w node environment. Before using any package in any js file we have to require it.
const mongoose = require('mongoose');

// To make sure that mongoose use es6 promise beside of global promise
mongoose.Promise = global.Promise;

// To initialize connection to mongodb 
// MONGOSERVER  ://PATH i.e ip:port /DB_NAME
mongoose.connect('mongodb://localhost/users_test');

// ONCE and ON are events 
// ONCE means watch mongoose to emit an event once which is open
// ON means watch mongoose to emit an event error to handle it  
// before: run once in the starting of test like beforeEach()
before((done)=>{
    mongoose.connection
    .once('open', () => done())
    .on('error', error => console.warn('warning', error));
})

// MOCHA: Run before every test condition
beforeEach((done) => {
    // console.log(mongoose.connection.collections)
    const { users, comments, blogposts } = mongoose.connection.collections;

    // Directly connect to db collection and delete
    // Callback function i.e. task
    // Ready to run the next test!
    users.drop(()=> comments.drop(() => blogposts.drop(()=> done())));  
})