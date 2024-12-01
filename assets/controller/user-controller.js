const UserTable = require('../../views/js/user.js');
const bcrypt = require('bcryptjs');

//SignUp middleware
const SignUp = async (request, response, next) => {
    const { name, email, password } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await UserTable.create({
            name,
            email,
            password: hashedPassword,
        });
        request.session.username = user.name;
        request.session.isAuth = true;
        next();
    }
    catch {
        request.session.error = 'Error signing up';
        response.redirect('/signup');
    }
}

//login middleware
const loginUser = async (request, response) => {
    const { email, password } = request.body;

    try {
        const user = await UserTable.findOne({ where: { email } });
        if (!user) {
            console.log('User not found');
            request.session.error = 'User not found';
            response.redirect("/log-in");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            request.session.error = 'Invalid password';
            response.redirect("/log-in");
        }
        request.session.username = user.name;
        request.session.isAuth = true;
        response.redirect("/");
    } catch (error) {
        request.session.error =  'Error logging in';
    }};

module.exports = {SignUp, loginUser};