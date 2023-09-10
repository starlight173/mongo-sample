const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOption = require('./swagger');

require('dotenv').config();
require('./config/database').connect();
const productsRouter = require('./routes/products');

// app
const app = express();
const port = process.env.NODE_LOCAL_PORT || 3000;

app.use(cors());
app.use(express.json()); // parse requests of content-type - application/json

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// http://localhost:8081/images/img1.jpeg
app.use(express.static('public'));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/products', productsRouter);

app.get('/', function (req, res) {
    res.send('Hello World 🙌');
})

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

// Swagger
const specs = swaggerJsdoc(swaggerOption);
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);

app.listen(port, () => {
    console.log("Server is running at on port %s", port)
})

module.exports = app;