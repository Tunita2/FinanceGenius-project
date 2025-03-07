const connection = require('../config/database');

const getSettingPage = async (req, res) => {
    try {
        const userId = (req.user && req.user.userId) || 
                       (req.user && req.user.id) || 
                       (req.session && req.session.userId);

        console.log("UserID:", userId);

        if (!userId) {
            return res.send("Người dùng không được xác thực.");
        }

        const [results] = await connection.query(`SELECT * FROM persons WHERE id = ?`, [userId]);

        console.log("Query Results:", results);

        if (results.length === 0) {
            return res.send("Không tìm thấy người dùng");
        }

        res.render('setting', { info: results[0] });

    } catch (error) {
        console.error("Lỗi database:", error);
        res.send("Lỗi.");
    }
};

const getEditPhone = async (req, res) => {
    try {
       const userId = (req.user && req.user.userId) || 
                       (req.user && req.user.id) || 
                       (req.session && req.session.userId);

        console.log("UserID:", userId);

        if (!userId) {
            return res.send("Người dùng không được xác thực.");
        }
        let [results] = await connection.query("SELECT * FROM persons WHERE id = ?", [userId]);
        res.render("editPhoneNumber.ejs", {update: results[0]});
    } catch (error) {
        console.error("Lỗi không tải được trang: ", error);
        res.send("Lỗi.");
    }
};

const postEditPhoneNumber = async (req, res) => {
    try {
        const userId = (req.user && req.user.userId) || 
                       (req.user && req.user.id) || 
                       (req.session && req.session.userId);

        //console.log("UserID:", userId);

        if (!userId) {
            return res.send("Người dùng không được xác thực.");
        }

        const newPhoneNumber = req.body.newPhone;
        if(!newPhoneNumber || newPhoneNumber.length < 10){
            return res.send("Số điện thoại không hợp lệ.");
        }

        await connection.query(`UPDATE persons SET phone = ? WHERE id = ?`, [newPhoneNumber, userId]);
        if (!newPhoneNumber) {
            return res.send("Số điện thoại mới là bắt buộc.");
        }

        await connection.query(`UPDATE persons SET phone = ? WHERE id = ?`, [newPhoneNumber, userId]);

        res.redirect('/setting');
    } catch (error) {
        console.error("Lỗi database.", error);
        res.status(500).send("Lỗi.");
    }
};
const getEditPassword = async (req, res) => {
    try {
        const userId = (req.user && req.user.userId) || 
                       (req.user && req.user.id) || 
                       (req.session && req.session.userId);

        if (!userId) {
            return res.send("Người dùng không được xác thực.");
        }

        res.render("editPassword.ejs");
    } catch (error) {
        console.error("Không thể tải được trang:", error);
        res.send("Lỗi");
    }
};

const postEditPassword = async (req, res) => {
    try {
        const userId = (req.user && req.user.userId) || 
                       (req.user && req.user.id) || 
                       (req.session && req.session.userId);

        if (!userId) {
            return res.send("Người dùng không được xác thực.");
        }

        let [results] = await connection.query("SELECT * FROM persons WHERE id = ?", [userId]); 
        let oldPassword = req.body.oldPass;

        if (!results[0] || oldPassword !== results[0].password) {
            return res.send("Mật khẩu cũ không chính xác.");
        }

        let newPassword = req.body.newPass; 
        let confirmPassword = req.body.comfirmPass;

        if (newPassword.length < 10) {
            return res.send("Mật khẩu phải nhiều hơn 10 ký tự.");
        }

        if (newPassword != confirmPassword) {
            return res.send("Mật khẩu không khớp");
        }

        await connection.query(`UPDATE persons SET password = ? WHERE id = ?`, [newPassword, userId]);

        res.redirect('/setting');
    } catch (error) {
        console.error("Lỗi cập nhật mật khẩu:", error);
        res.status(500).send("Lỗi.");
    }
};

module.exports = {
    getSettingPage,
    getEditPhone,
    postEditPhoneNumber,
    postEditPassword, 
    getEditPassword,
};