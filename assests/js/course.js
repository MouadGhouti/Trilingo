/* Returns Course Table, and if the table is empty adds default 10 courses */
const { DataTypes } = require('sequelize');
const db = require('./sequelize');


const CourseTable = db.sequelize.define('Course', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    instructorName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    instructorImage: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const Courses_list = [
    // Asia Courses
    {
        id: 1,
        title: "Introduction to Korean Language",
        description: "Start your journey in learning the Korean language with basic grammar and vocabulary.",
        category: "Asia",
        duration: "3 Months",
        price: 80,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg",
        instructorName: "Lee",
        instructorImage: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/8d/T1_Faker_2024_Split_2.png",
        level: "Beginner",
    },
    {
        id: 11,
        title: "Intermediate Korean Conversations",
        description: "Improve your Korean conversational skills with real-world scenarios.",
        category: "Asia",
        duration: "5 Months",
        price: 100,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg",
        instructorName: "Lee",
        instructorImage: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/8d/T1_Faker_2024_Split_2.png",
        level: "Intermediate",
    },
    {
        id: 12,
        title: "Advanced Korean Writing",
        description: "Master Korean writing and elevate your skills for academic and professional use.",
        category: "Asia",
        duration: "7 Months",
        price: 150,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg",
        instructorName: "Lee",
        instructorImage: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/8d/T1_Faker_2024_Split_2.png",
        level: "Advanced",
    },
    {
        id: 2,
        title: "Basics of Japanese Language",
        description: "Learn the fundamentals of Japanese grammar and phrases.",
        category: "Asia",
        duration: "2 Months",
        price: 70,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg",
        instructorName: "Aiko",
        instructorImage: "https://cdn.pixabay.com/photo/2022/07/29/12/22/asian-man-7351683_1280.jpg",
        level: "Beginner",
    },
    {
        id: 13,
        title: "Intermediate Japanese Grammar and Vocabulary",
        description: "Expand your knowledge of Japanese grammar for intermediate-level proficiency.",
        category: "Asia",
        duration: "4 Months",
        price: 120,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg",
        instructorName: "Aiko",
        instructorImage: "https://cdn.pixabay.com/photo/2022/07/29/12/22/asian-man-7351683_1280.jpg",
        level: "Intermediate",
    },
    {
        id: 3,
        title: "Basics of Mandarin Chinese",
        description: "Learn Mandarin essentials, perfect for beginners looking to grasp basic speaking and writing.",
        category: "Asia",
        duration: "2 Months",
        price: 70,
        imageUrl: "https://cdn.pixabay.com/photo/2017/05/12/09/07/china-2306580_1280.png",
        instructorName: "Li Wei",
        instructorImage: "https://cdn.pixabay.com/photo/2016/09/07/16/38/portrait-1652023_1280.jpg",
        level: "Beginner",
    },
    {
        id: 14,
        title: "Intermediate Mandarin for Business",
        description: "Learn essential Mandarin for professional business communication.",
        category: "Asia",
        duration: "6 Months",
        price: 140,
        imageUrl: "https://cdn.pixabay.com/photo/2017/05/12/09/07/china-2306580_1280.png",
        instructorName: "Li Wei",
        instructorImage: "https://cdn.pixabay.com/photo/2016/09/07/16/38/portrait-1652023_1280.jpg",
        level: "Intermediate",
    },
    {
        id: 15,
        title: "Advanced Mandarin Reading and Writing",
        description: "Refine your Mandarin reading and writing skills for academic purposes.",
        category: "Asia",
        duration: "8 Months",
        price: 180,
        imageUrl: "https://cdn.pixabay.com/photo/2017/05/12/09/07/china-2306580_1280.png",
        instructorName: "Li Wei",
        instructorImage: "https://cdn.pixabay.com/photo/2016/09/07/16/38/portrait-1652023_1280.jpg",
        level: "Advanced",
    },
];


CourseTable.count()
    .then(async function (count) {
        if (!count) {
            db.sequelize.sync({ alter: true })
                .then(async () => {
                    await CourseTable.bulkCreate(Courses_list, {ignoreDuplicates: true});
                })
        }
        else{
            console.log('table is populated');
        }
    });
module.exports = CourseTable;