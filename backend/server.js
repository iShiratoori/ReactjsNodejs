if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bodyParser = require('body-parser')
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const User = require('./models/users');
const userRoute = require('./routes/userRouter');
const apiRoute = require('./routes/api');
const ExpressError = require('./utils/expressError');
const cors = require('cors');

const server = express()
const dbUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/dentalClinic';
mongoose.connect(dbUrl);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }));


const store = new MongoStore({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60
});
store.on("error", function (e) {
    console.log("SESSION STORE ERROR: ", e)
})
const sessionConfig = {
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
const allowedOrigins = ['http://localhost:3000'];

server.use(
    cors({
        origin: function (origin, callback) {
            // Check if the request's origin is allowed (null means allowed)
            if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
    })
);

server.use(session(sessionConfig))

server.use(passport.initialize());
server.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


server.use("/api", userRoute)
server.use("/api", apiRoute)
server.use("/guest", (req, res, next) => {
    console.log('Requested guest')
    res.status(200).json({ message: 'success' })
})

server.all('*', (req, res, next) => {
    const message = {
        title: 'Page not Found',
        text: 'Sorry about that! We can\'t find the page you\'re looking for. Please use the search bar above or one of these buttons below.'
    };
    next(new ExpressError(message, 404))
});

server.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    const { title = 'Oh No, Something Went Wrong!', text = err.message } = err.message;
    res.status(statusCode).json({ statusCode, title, text })
});

server.listen(3001, err => {
    if (err) throw err;
    console.log('server is running on port 3000')
})