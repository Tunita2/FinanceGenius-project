const connection = require('../config/database');
const bcrypt = require('bcrypt');

const getLoginPage = (req, res) => {
    try {
        res.render('login', {});
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
            return res.send("Email không tồn tại!");
        }

        let storedPassword = results[0].password;

        if (password != storedPassword) {
            return res.send("Sai mật khẩu!");
        }

        let user = results[0];
        req.session.userId = results[0].id; 
        res.render('home.ejs', {user:user});
    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        res.send("Lỗi hệ thống!");
    }
};

module.exports = {
    getLoginPage,
    postLoginUser,
};
