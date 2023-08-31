const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

require('dotenv').config();
require('./config/database').connect();
const auth = require('./middlewares/auth');
const routes = require('./routes');

// app
const app = express();
const port = process.env.NODE_LOCAL_PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // http://localhost:8081/images/img1.jpeg
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);

// const BlogPost = require('./models/blogpost');

// Test validate for `welcome` path
app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

app.get('/', function (req, res) {
    res.send('Hello World');
})

// app.get('/posts', function (req, res) {
//     BlogPost.find().then(result => {
//         console.log(result);
//         res.end(JSON.stringify(result));
//     }).catch(error => {
//         console.log(error);
//     });
// })

// app.get('/posts/:id', function (req, res) {
//     BlogPost.find({ _id: req.params.id }).then(result => {
//         console.log(result);
//         res.end(JSON.stringify(result));
//     }).catch(error => {
//         console.log(error);
//     });
// })

// app.post('/posts/add', async function (req, res) {
//     if (!req.files || Object.keys(req.files).length === 0) {
//         try {
//             const result = await BlogPost.create(req.body);
//             console.log(result);
//             res.end(JSON.stringify({ "id": result._id }));
//         } catch (error) {
//             console.log(error);
//             res.status(500).send(error);
//         }
//         return;
//     }

//     let image = req.files.image;

//     try {
//         await image.mv(__dirname + '/public/upload/' + image.name);
//         const result = await BlogPost.create({ ...req.body, image: '/upload/' + image.name });
//         console.log(result);
//         res.end(JSON.stringify({ "id": result._id }));
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error);
//     }
// });

app.listen(port, () => {
    console.log("Server is running at on port %s", port)
})

module.exports = app;