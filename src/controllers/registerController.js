const connection = require('../config/database');

const getRegisterPage = (req, res) => {
    try {
        res.render('register.ejs', {});
    } catch (error) {
        console.error("Lỗi hiển thị trang đăng ký:", error);
    }
};

const postCreateUser = async (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let phone = req.body.phone;
    let password = req.body.password;
    let repassword = req.body.repassword;
    
    if (!username || !email || !phone || !password || !repassword) {
        return res.send("Vui lòng nhập đầy đủ thông tin!");
    }

    if (password !== repassword) {
        return res.send("Mật khẩu nhập lại không khớp!");
    }

    try {
        let[results, field] = await connection.query(`SELECT email FROM Persons WHERE email = ?`, [email]);

        if (results.length > 0) {
            return res.send("Email đã tồn tại!");
        }

        await connection.query(
            `INSERT INTO Persons (user_name, email, phone, password) VALUES (?, ?, ?, ?)`,
            [username, email, phone, password]
        );

        res.redirect('/login');
    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        res.send("Lỗi hệ thống!");
    }
}

module.exports = {
    getRegisterPage,
    postCreateUser
};
