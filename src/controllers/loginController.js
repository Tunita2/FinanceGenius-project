// 


const connection = require('../config/database');
const bcrypt = require('bcrypt'); // Để mã hóa và kiểm tra mật khẩu

const getLoginPage = (req, res) => {
    try {
        res.render('login', {});
    } catch (error) {
        console.error("error: ", error);
        res.status(500).send("ERROR HAPPENED!");
    }
};

const postLoginUser = (req, res) => {
    let { email, password } = req.body;
    
    // Kiểm tra xem người dùng có tồn tại không
    connection.query(
        "SELECT * FROM Persons WHERE email = ?", [email],
        async (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).send("Lỗi khi kiểm tra người dùng!");
            }
            
            if (results.length === 0) {
                return res.status(401).send("Email không tồn tại!");
            }
            
            let user = results[0];
            
            // Kiểm tra mật khẩu (nếu dùng bcrypt, thay thế so sánh bằng bcrypt.compare)
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).send("Sai mật khẩu!");
            }
            
            // Nếu thành công, tạo session hoặc JWT token
            req.session.user = {
                id: user.id,
                user_name: user.user_name,
                email: user.email
            };
            
            res.redirect('/');
        }
    );
};

module.exports = {
    getLoginPage,
    postLoginUser,
};
