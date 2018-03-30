// Main starting point of the app
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// DB setup
mongoose.connect('mongodb://localhost:27017/auth');

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

if (process.env.NODE_ENV !== "production") {
    console.log("NODE_ENV is development");
    console.log("Using Webpack Middleware");
    const webpackMiddleware = require("webpack-dev-middleware");
    const webpack = require("webpack");
    const webpackConfig = require("../webpack.config.js");
    app.use(webpackMiddleware(webpack(webpackConfig)));
}else{
    app.use(express.static('dist'));
    app.get('/*', (req, res)=>{
        res.sendFile(path.join(__dirname, '../dist/index.html'))
    })
}

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port, ()=>{
    console.log('Server listening port:', port);
});
