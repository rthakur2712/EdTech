const express = require('express');
const app = express();

const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
const paymentRoutes = require('./routes/Payments');
const courseRoutes = require('./routes/Course');

const db = require('./config/database');
const cookieParser = require('cookie-parser');
const { cloudinaryConnect } = require('./config/cloudinary');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
// const morgan = require('morgan');
dotenv.config();

const PORT = process.env.PORT || 4000;

// database connection
db.connect();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: function(origin, callback){
        return callback(null, true);
    },

    credentials: true,
}));
// app.use(morgan('dev'));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));

// cloudinary connection
cloudinaryConnect();

// routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/course', courseRoutes);

// def route
app.get('/', (req,res)=>{
    return res.json({
        success: true,
        message:"You server is up and running..."
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})