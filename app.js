// Dependencies
require("dotenv").config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const MemoryStore = require('memorystore')(session);


// Create the Express app
const app = express();
const port = process.env.PORT || 3001;

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'defaultsecret',
        saveUninitialized: false,
        resave: false,
    })
);

// Database models
const connectToDB = require('./assets/js/sequelize').connectToDB;

// Controllers
const { searchCourses, getAllCourses } = require('./assets/controller/classes-controller');
const { SignUp, loginUser } = require('./assets/controller/user-controller');

// Static file paths
app.use('/assets', express.static(path.join(__dirname, 'assets'))); // CSS and JS files
app.use('/componentes', express.static(path.join(__dirname, 'componentes'))); // Header and Footer
// app.use('/home', express.static(path.join(__dirname, 'views/home'))); // Images and Videos in the home folder



// Session Middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'defaultsecret',
        saveUninitialized: false,
        resave: false,
        store: new MemoryStore({
            checkPeriod: 86400000, // Prune expired entries every 24 hours
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    })
);

app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.error = req.session.error || null;
    req.session.error = null; // Clear error for the next request
    next();
});

// Authentication Middleware
const isAuthenticated = (req, res, next) => {
    if (res.locals.session.isAuth) {
        next();
    } else {
        res.redirect('/log-in');
    }
};

// Routes
// Home Page
app.get('/', (req, res) => {
    res.render('home');
});
app.get("/test", (req, res) => {
    console.log(req.session);
    res.send("Check console for session data.");
});
// Log In Page
app.get('/log-in', (req, res) => {
    res.render('log-in', { title: 'Log In Page' });
});

// Sign Up Page
app.get('/sign-up', (req, res) => {
    res.render('sign-up', { title: 'Sign Up Page' });
});
// Course List Page
app.get('/course-list', getAllCourses,(req, res) => {
    res.render('course-list', { title: 'course-list Page', courses: req.courses });
});

// Individual Course Page
app.get('/course-page', (req, res) => {
    // Example data; replace this with data fetched from your database
    const courses = [
        {
            id: 1,
            title: 'Spanish I',
            duration: '8 Weeks',
            level: 'Beginner',
            instructor: 'John Smith',
            image: '/views/home/images/SPAIN.png',
        },
        {
            id: 2,
            title: 'Spanish II',
            duration: '10 Weeks',
            level: 'Intermediate',
            instructor: 'Emily Johnson',
            image: '/views/home/images/SPAIN.png',
        },
        {
            id: 3,
            title: 'French I',
            duration: '8 Weeks',
            level: 'Intermediate',
            instructor: 'David Brown',
            image: '/views/home/images/FRENCH.jpeg',
        },
        {
            id: 4,
            title: 'French II',
            duration: '10 Weeks',
            level: 'Beginner',
            instructor: 'Sarah Thompson',
            image: '/views/home/images/FRENCH.jpeg',
        },
        {
            id: 5,
            title: 'Chinese I',
            duration: '8 Weeks',
            level: 'Intermediate',
            instructor: 'Michael Adams',
            image: '/views/home/images/China.png',
        },
    ];

    const testimonials = [
        { content: 'The web design course provided a solid foundation for me.', author: 'Sarah L' },
        { content: 'The UI/UX design course exceeded my expectations.', author: 'Jason M' },
        { content: 'The mobile app development course was fantastic!', author: 'Emily R' },
        { content: 'The graphic design course was the perfect starting point.', author: 'Michael K' },
    ];

    const faqs = [
        { question: 'Can I enroll in multiple courses at once?', answer: 'Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience.' },
        { question: 'What kind of support can I expect from instructors?', answer: 'Our instructors offer timely and comprehensive support through live sessions and forums.' },
    ];

    res.render('course-page', { courses, testimonials, faqs });
});

// Chapter Page
app.get('/chapter-page', (req, res) => {
    res.render('chapter-page/chapter-page', {
        chapter: {
            title: 'Learn about Adobe XD & Prototyping',
            subtitle: 'Introduction about XD',
            duration: '1 hour',
            image: 'https://example.com/image.jpg',
            altText: 'Person working on Adobe XD on a computer',
            notes: 'Lorem ipsum...',
            lessons: [
                { name: 'Lesson 01: Introduction about XD', time: '30 mins', color: 'baby-blue' },
                { name: 'Lesson 02: Basics of XD', time: '45 mins', color: 'orange' },
            ],
            quizzes: [
                { name: 'Quiz 01: Introduction about XD', time: '20 mins', color: 'light-red' },
            ],
        },
    });
});


// Quiz Page
app.get('/quiz-page', (req, res) => {
    const quiz = {
        title: 'Quiz 1: Introduction about XD',
        number: 'Quiz 1',
        duration: '1 hour',
        introduction: 'This quiz will test your knowledge on the basics of Adobe XD.',
        questions: [
            {
                type: 'radio',
                points: 5,
                content: 'Adobe XD is a tool used for designing:',
                options: [
                    { value: 'a', label: 'Websites' },
                    { value: 'b', label: 'Mobile Apps' },
                    { value: 'c', label: 'Both Websites and Mobile Apps' },
                    { value: 'd', label: 'None of the above' }
                ]
            },
            {
                type: 'checkbox',
                points: 5,
                content: 'Which features are part of Adobe XD?',
                options: [
                    { value: 'a', label: 'Prototyping' },
                    { value: 'b', label: 'Animation' },
                    { value: 'c', label: 'Coding' },
                    { value: 'd', label: 'Collaboration' }
                ]
            }
        ]
    };

    res.render('quiz-page/quiz-page', { quiz });
});




// Post routes for form submissions
app.post('/log-in', loginUser, (req, res) => {
    res.redirect('/');
});

app.post('/sign-up', SignUp, (req, res) => {
    console.log('We shouldnt be here');
    res.redirect('/');
});

// Search functionality on Course List page
app.post('/course-list', isAuthenticated, searchCourses, (req, res) => {
    res.render('course-list', { courses: req.courses, title: 'Course List' });
});
app.post('/api/sign-up/v1', SignUp, (req, res) => {
    console.log('User signed up successfully');
    res.redirect('/');
});

app.post('/log-in', loginUser, (req, res) => {
    res.redirect('/');
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { title: 'Error', error: err });
});

// Start the server
app.listen(port, async () => {
    try {
        await connectToDB();
        console.log(`Database connected successfully`);
        console.log(`Server is listening at http://localhost:${port}`);
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
});
