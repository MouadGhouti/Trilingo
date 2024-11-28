//Dependencies
require("dotenv").config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

// Create the Express app
const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware to parse URL-encoded form and user sessions
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
  }));
//Database models
const connectToDB = require('./assests/js/sequelize').connectToDB;
const {searchCourses, getAllCourses} = require('./assests/controller/classes-controller');// Sequelize model
const {SignUp, loginUser } = require('./assests/controller/user-controller');// Sequelize model



// Load static files
app.use('/assets', express.static(path.join(__dirname, 'assests')));
app.use('/componentes', express.static(path.join(__dirname, 'componentes')));
app.use((req, res, next) => {
    // Make session data available to EJS templates
    res.locals.session = req.session;
    if (req.session.error) {
        res.locals.error = req.session.error; // Pass error to EJS
        req.session.error = null; // Clear error for subsequent requests
    } else {
        res.locals.error = null; // No error to display
    }
    console.log(res.locals.session);
    next();
});


// PAGES
app.get('/', (req, res) => {
    res.render('log-in', { user : false, title: 'Login Page' });
});
app.get('/log-in', (req, res) => {
    res.render('log-in', { title: 'Login Page' });
});
app.get('/sign-up', (req, res) => {
    res.render('sign-up', { title: 'Sign Up Page' });
});

// REQUESTS
app.get('/course-list', getAllCourses , (req, res) => {
    res.render('course-list', {courses: req.courses, title: 'Course List' });
    
});
app.post('/course-list', searchCourses , (req, res) => {
    res.render('course-list', { courses: req.courses, title: 'Course List' });  
});

app.post('/new-user', SignUp, (req, res) => {
    res.redirect('/');
});

app.post('/log-in', loginUser, (req, res) => {
    res.redirect('/course-list');
});

app.listen(port, async () => {
    await connectToDB();
    console.log(`Server is listening at http://localhost:${port}`);
  });