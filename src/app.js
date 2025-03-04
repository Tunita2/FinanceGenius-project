require('dotenv').config()
const express = require('express')
const app = express()
const configViewEngine = require('./config/viewEngine')
const webRouters = require('./routes/web')
const port = process.env.PORT;
const hostname = process.env.HOST;
const connection = require('./config/database')

configViewEngine(app)

app.use(express.json()); // for json
app.use(express.urlencoded((extendedd = true))); // for form data
app.use('/', webRouters)



// connection.query(
//   'SELECT * FROM Persons p',
//   function(err, results, fields) { 
//     console.log(">>>results= ",results); // results contains rows returened by server
//     // console.log(">>>fields= ",fields); // fields contains extra meta data about reusults 
//   }
// );

const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Nếu dùng HTTPS thì chỉnh thành `true`
}));


app.listen(port, hostname, () =>{
    console.log(`Server is running at http://localhost:${port}/register`);
})