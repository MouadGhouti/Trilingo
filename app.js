require("dotenv").config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');
// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Load static files
app.use('/assets', express.static(path.join(__dirname, 'assests')));
app.use('/componentes', express.static(path.join(__dirname, 'componentes')));

//Database models
const connectToDB = require('./assests/js/sequelize').connectToDB;
const {searchCourses, getAllCourses} = require('./assests/controller/classes-controller');// Sequelize model




app.get('/course-list', getAllCourses , (req, res) => {
    res.render('course-list', { courses: req.courses, title: 'Course List' });
    
});

app.post('/course-list', searchCourses , (req, res) => {
    res.render('course-list', { courses: req.courses, title: 'Course List' });
    
});

app.get('/', (req, res) => {
    res.render('log-in', { title: 'Login Page' });
});
app.get('/log-in', (req, res) => {
    res.render('log-in', { title: 'Login Page' });
});
app.get('/sign-up', (req, res) => {
    res.render('sign-up', { title: 'Sign Up Page' });
});

app.listen(port, async () => {
    await connectToDB();
    console.log(`Server is listening at http://localhost:${port}`);
  });