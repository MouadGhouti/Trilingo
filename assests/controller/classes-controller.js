const  CourseTable = require('../js/course.js');
const Sequelize = require('sequelize');


const getAllCourses = async (request, response, next) => {
    try {
        const courses = await CourseTable.findAll();
        request.courses = courses;
        next();
    }
    catch (error) {
        console.error('Error fetching courses:', error);
        response.status(500).json({ message: 'Internal server error', error });
    }
}
const searchCourses = async (request, response, next) => {
    try {
        // Extract search criteria from query parameters
        const q  = request.body;
        // Build the query object dynamically
        const whereClause = {};

        if (q.search) {
            whereClause.title = { [Sequelize.Op.like]: `%${q.search}%` };
        }
        if (q.Language && q.Language !== "-1") {
            whereClause.title = { [Sequelize.Op.like]: `%${q.Language}%` }; // Match language in the title
        }
        if (q.Level && q.Level !== "-1") {
            whereClause.level = q.Level; // Exact match for level
        }
        if (q.Duration && q.Duration !== "-1") {
            whereClause.duration = q.Duration; // Exact match for duration
        }
        if (q.Region && q.Region !== "-1") {
            whereClause.category = q.Region; // Match category with region
        }
        // Fetch courses matching the search criteria
        const courses = await CourseTable.findAll({ where: whereClause });

        // Send the filtered courses as the response
        request.courses = courses;
        next();
    } catch (error) {
        console.error('Error fetching courses:', error);
        response.status(500).json({ message: 'Internal server error', error });
    }
};

  
module.exports = {searchCourses, getAllCourses}