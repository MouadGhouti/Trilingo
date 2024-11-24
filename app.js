require("dotenv").config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
//Database models
const  Courses = require('./assests/js/course.js'); // Sequelize model
console.log('Courses from app.js', Courses);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/assets', express.static(path.join(__dirname, 'assests')));
app.use('/componentes', express.static(path.join(__dirname, 'componentes')));



app.get('/course-list', async (req, res) => {
    // try {
    //     const courses = await Course.findAll(); 
    //     res.render('course-list', { courses });
    // } catch (error) {
    //     res.status(500).send('Internal Server Error');
    // }
    res.render('course-list', { Courses });
});
// app.get('/course-list', () => { 
// //load data from db)
//     Course.findAll()
// // render template with data
//     .then((data) => {
//         response.render('template', { courses: data})
        
//     }) 
// });


app.get('/', (req, res) => {
    res.render('log-in', { title: 'Login Page' });
});
app.get('/log-in', (req, res) => {
    res.render('log-in', { title: 'Login Page' });
});
app.get('/sign-up', (req, res) => {
    res.render('sign-up', { title: 'Sign Up Page' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(path.join(__dirname, 'assests'));
});