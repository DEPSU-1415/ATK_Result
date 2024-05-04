//server.js
require('dotenv').config();
const express = require('express')
const app = express()
const fs = require('fs');
const path = require('path');
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')
const multer = require('multer');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'public/uploads');
console.log(`Uploads directory path: ${uploadsDir}`);
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Uploads directory created');
} else {
    console.log('Uploads directory already exists');
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, 'public/uploads'));  // Ensure this directory exists and is correct
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// MongoDB Connection
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true
})

global.loggedIn = null

// Controllers
const indexController = require('./controllers/indexController')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController')
const storeUserController = require('./controllers/storeUserController')
const loginUserController = require('./controllers/loginUserController')
const logoutController = require('./controllers/logoutController')
const homeController = require('./controllers/homeController')
const atkReportController = require('./controllers/atkReportController')
const adminController = require('./controllers/adminController');
const editReportController = require('./controllers/editReportController'); 
const deleteReportController = require('./controllers/deleteReportController'); 

// Middleware
const redirectIfAuth = require('./middleware/redirectIfAuth')
const authMiddleware = require('./middleware/authMiddleware')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.use(expressSession({
    secret: "node secret",
    saveUninitialized: true,
    resave: true
}))
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})
app.set('view engine', 'ejs')

app.get('/', indexController)
app.get('/home', authMiddleware, homeController)
app.get('/login', redirectIfAuth, loginController)
app.get('/register', redirectIfAuth, registerController)
app.post('/user/register', redirectIfAuth, storeUserController)
app.post('/user/login', redirectIfAuth, loginUserController)
app.get('/logout', logoutController)
app.post('/user/atk-report', authMiddleware, upload.single('image'), atkReportController);
app.get('/admin', authMiddleware, adminController);
app.get('/edit/:id', authMiddleware, editReportController.get);
app.post('/edit/:id', authMiddleware, editReportController.post);
app.get('/delete/:id', authMiddleware, deleteReportController);

app.listen(4000, () => {
    console.log("App listening on port 4000")
})