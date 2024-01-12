const express = require("express");
const fileUpload = require('express-fileupload');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const cloudinary = require('cloudinary').v2;

const route = require("./routes");
const connectDb = require("./config/database");

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDb()
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };

const port = process.env.PORT || 4000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

route(app);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});