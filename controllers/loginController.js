// loginController.js
module.exports = (req, res) => {
    res.render('login', { username: '' }); // Ensure username is defined even if empty
}
