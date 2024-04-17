// const bodyParser = require("body-parser");
// const express = require("express");
// const app = express();
// const dotenv = require("dotenv").config();
// const PORT = process.env.PORT || 4000;
// const dbConnect = require("./configs/dbConnect");
// const authRouter = require('./routes/authRoute')
// const productRoute = require('./routes/productRoute')
// const blogRoute = require('./routes/blogRoute')
// const categoryRoute = require('./routes/prodCategoryRoute')
// const blogCatRoute = require("./routes/blogCatRoute");
// const brandRoute = require("./routes/brandRoute");
// const couponRoute = require("./routes/couponRoute");
// const colorRouter = require("./routes/colorRoute");
// const enqRouter = require("./routes/enqRoute");
// const uploadRouter = require("./routes/uploadRoute");
// const { notFound, errorHandler } = require("./middlewares/errorHandler");
// const cookieParser = require("cookie-parser");
// const morgan = require("morgan");
// const cors = require('cors');

// const corsOptions = {
//     origin: "*",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: "Content-Type,Authorization,X-Requested-With",
//     exposedHeaders: "Content-Range,X-Content-Range",
//     credentials: true,
//     optionsSuccessStatus: 200
// };

// dbConnect();
// app.use(cors(corsOptions));
// app.use(cookieParser());
// app.use(morgan("dev"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use("/api/user", authRouter);
// app.use("/api/product", productRoute);
// app.use("/api/blog", blogRoute);
// app.use("/api/category", categoryRoute);
// app.use("/api/blogcategory", blogCatRoute);
// app.use("/api/brand", brandRoute);
// app.use("/api/coupon", couponRoute);
// app.use("/api/color", colorRouter);
// app.use("/api/enquiry", enqRouter);
// app.use("/api/upload", uploadRouter);

// app.use(notFound);
// app.use(errorHandler);


// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// })

// module.exports = app;

const express = require('express');
const dotenv = require("dotenv").config();
const dbConnect = require('./configs/dbConnect');
const createAdminIfNotExists = require('./utils/defaultAdminCreation');
const { createBasicColors } = require('./utils/defaultColorCreation');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRoute');
const productRoute = require('./routes/productRoute');
const blogRoute = require('./routes/blogRoute');
const categoryRoute = require('./routes/prodCategoryRoute');
const blogCatRoute = require('./routes/blogCatRoute');
const brandRoute = require('./routes/brandRoute');
const couponRoute = require('./routes/couponRoute');
const colorRouter = require('./routes/colorRoute');
const enqRouter = require('./routes/enqRoute');
const uploadRouter = require('./routes/uploadRoute');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
dbConnect();

// Check if an admin user exists and create one if not
createAdminIfNotExists()
    .then(async () => {
        await createBasicColors();
        // Middleware
        app.use(cors());
        app.use(cookieParser());
        app.use(morgan('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));

        // Routes
        app.use('/api/user', authRouter);
        app.use('/api/product', productRoute);
        app.use('/api/blog', blogRoute);
        app.use('/api/category', categoryRoute);
        app.use('/api/blogcategory', blogCatRoute);
        app.use('/api/brand', brandRoute);
        app.use('/api/coupon', couponRoute);
        app.use('/api/color', colorRouter);
        app.use('/api/enquiry', enqRouter);
        app.use('/api/upload', uploadRouter);

        // Error handling middleware
        app.use(notFound);
        app.use(errorHandler);

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error starting server:', error);
    });
