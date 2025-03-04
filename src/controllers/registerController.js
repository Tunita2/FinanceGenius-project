// const connection = require('../config/database')
// const getRegisterPage = (req, res) => {
//     try{
//         res.render('register',{
            
//         })
//     }catch(error){
//         console.error("error",error)
//         res.status(500).send("ERROR HAPPEND!")
//     }
// }

// const postCreateUser = (req, res) => {
//     let { username, email, phone, password, repassword } = req.body;
//     console.log('>>>User name:', username, '>>>Email:', email, '>>>Phone:', phone, '>>>Password:', password, '>>>Repassword:', repassword);

//     connection.query(
//         `INSERT INTO 
//         Persons (user_name, email, phone, password) 
//         VALUES (?, ?, ?, ?)`,
//         [username, email, phone, password],
//         function (err, results) {
//             if (err) {
//                 console.error("Database error:", err);
//                 return res.status(500).send("Lỗi khi tạo người dùng!");
//             }
//             console.log('>>>results = ', results);
//             // res.send('Create user success!');
//             res.redirect('/login');
//         }
//     );
// };


// module.exports = {
//     getRegisterPage, 
//     postCreateUser
// }

const connection = require('../config/database');
const bcrypt = require('bcrypt');

const getRegisterPage = (req, res) => {
    try {
        res.render('register', {});
    } catch (error) {
        console.error("Lỗi hiển thị trang đăng ký:", error);
        res.status(500).send("Lỗi hệ thống!");
    }
};

const postCreateUser = async (req, res) => {
    let { username, email, phone, password, repassword } = req.body;

    if (!username || !email || !phone || !password || !repassword) {
        return res.status(400).send("Vui lòng nhập đầy đủ thông tin!");
    }

    if (password !== repassword) {
        return res.status(400).send("Mật khẩu nhập lại không khớp!");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send("Email không hợp lệ!");
    }

    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).send("Số điện thoại không hợp lệ!");
    }

    try {
        // Kiểm tra xem email đã tồn tại chưa
        const [existingUser] = await connection.promise().query(
            "SELECT email FROM Persons WHERE email = ?", [email]
        );

        if (existingUser.length > 0) {
            return res.status(400).send("Email đã tồn tại!");
        }

        // Mã hóa mật khẩu
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await connection.promise().query(
            `INSERT INTO Persons (user_name, email, phone, password) VALUES (?, ?, ?, ?)`,
            [username, email, phone, hashedPassword]
        );

        console.log("User đăng ký thành công:", email);
        res.redirect('/login');

    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        res.status(500).send("Lỗi hệ thống!");
    }
};

module.exports = {
    getRegisterPage,
    postCreateUser
};
