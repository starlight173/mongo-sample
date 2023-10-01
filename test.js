const mongoose = require('mongoose');
const BlogPost = require('./models/blogpost');
const { ObjectId } = require('bson');


// mongoose.connect('mongodb://localhost/test_my_database', { useNewUrlParser: true });

// Test 1
// Test 2
// Test 3
// Test 4

// BlogPost.create({
//     title: 'MƯA THÁNG SÁU',
//     body: 'MƯA THÁNG SÁU | VĂN MAI HƯƠNG (feat. GREY D, TRUNG QUÂN) (prod. by HỨA KIM TUYỀN)'
// }).then(blogpost => {
//     console.log(blogpost);
// }).catch(error => {
//     console.log(error);
// });

// BlogPost.find().then(blogposts => {
//     console.log(blogposts);
// }).catch(error => {
//     console.log(error);
// });

// BlogPost.find({title: 'MƯA THÁNG SÁU'}).then(blogposts => {
//     console.log(blogposts);
// }).catch(error => {
//     console.log(error);
// });

// BlogPost.find({ "title": { $regex: "MƯA" } }).then(blogposts => {
//     console.log(blogposts);
// }).catch(error => {
//     console.log(error);
// });

// Update
// BlogPost.findByIdAndUpdate({ _id: "64e330d3e3878778621f7050"}, { title: 'MƯA THÁNG SÁU 12' }).then(blogpost => {
//     console.log(blogpost);
// }).catch(error => {
//     console.log(error);
// });

