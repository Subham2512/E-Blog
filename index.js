const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const BlogPost = require('./models/BlogPost.js');
const User = require('./models/User.js');
const fileUpload = require('express-fileupload')
const bcrypt = require("bcrypt")
const expressSession = require("express-session")

const newPostController = require("./controllers/newPost");
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const newUserController = require("./controllers/newUser.js");
const storeUserController = require("./controllers/storeUser.js");
const loginUserController = require("./controllers/loginUser.js");
const loginController = require("./controllers/login.js");
const logoutController = require("./controllers/logout.js");
const authMiddleware = require("./middlewares/authMiddlleware")
const redirectMiddleware = require("./middlewares/redirectIfAuthenticatedMiddleware")
const flash = require("connect-flash")

MONGO_URL = "mongodb+srv://subham2512:Math123@cluster0.idbqp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(MONGO_URL, {useNewUrlParser: true});

const app = express();

app.set('view engine','ejs');

global.loggedIn = false;

app.use(flash())
app.use(fileUpload())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
const port = process.env.PORT || 3000

global.loggedIn = null;

// app.use("*", (req, res, next) => {
// loggedIn = null || req.session.userId;
// next()
// });

app.use(expressSession({
    secret:'keyboard-cat'
}))

app.listen(port,()=>[
    console.log('hello i m listening')
])

app.get('/post/:id',getPostController);
    
app.get('/posts/new',authMiddleware,newPostController);

app.get('/',homeController);

app.post('/posts/store',authMiddleware,storePostController);

app.get('/auth/register',redirectMiddleware,newUserController);

app.get('/auth/login',redirectMiddleware,loginController);

app.get('/auth/logout',logoutController);

app.post('/users/register',redirectMiddleware,storeUserController)

app.post('/users/login',redirectMiddleware,loginUserController)
    
app.use((req, res) => res.render('notfound'));

        

    
 