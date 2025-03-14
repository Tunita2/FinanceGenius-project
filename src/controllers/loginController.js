const connection = require('../config/database');
const bcrypt = require('bcrypt');

const getLoginPage = (req, res) => {
    try {
        res.render('login', {

        });
    } catch (error) {
        console.error("error: ", error);
        res.send("ERROR HAPPENED!");
    }
};

const postLoginUser = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    
    try {
        let[results, field] = await connection.query(`SELECT id, user_name, email, password FROM Persons WHERE email = ?`, [email]);

        if (results.length === 0) {
            return res.render('login', { error: "Email không tồn tại!" });
        }

        let storedPassword = results[0].password;

        
        if (password != storedPassword) {
            return res.render('login', { error: "Sai mật khẩu!" });
        }
        
        req.session.storedId = results[0].id;

        // let user = results[0];
        // res.render('home.ejs', {
        //     user:user,
        // });
        res.redirect('/');
    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        res.status(500).render('error', { message: "Lỗi hệ thống!" });
    }
};

module.exports = {
    getLoginPage,
    postLoginUser,
};
