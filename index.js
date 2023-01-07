const express = require('express');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
const Template = require('./modules/Template/routes/Route.js')

dotenv.config();

const app = express();
const oneDay = 1000 * 60 * 60 * 24;

app.use(session({ 
    secret: 'keyboard cat',
    resave:false,
    saveUninitialized:false, 
    cookie: { maxAge: oneDay }
}));
app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));

app.use(Template)

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));