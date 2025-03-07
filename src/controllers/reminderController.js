const { render } = require('ejs');
const connection = require('../config/database');

const getViewReminders = async (req, res) => {
    try {
        const userId = (req.user && req.user.userId) || 
                       (req.user && req.user.id) || 
                       (req.session && req.session.userId);
        if (!userId) {
            return res.redirect('/login');
        }
        //console.log('User ID:', userId); 
        const filter = req.query.filter || 'upcoming';
        const today = new Date().toISOString().split('T')[0];

        let sql = 'SELECT * FROM reminders WHERE user_id = ?';
        let params = [userId];

        if (filter === 'upcoming') {
            sql += ' AND due_date >= ? AND status = "sắp đến"';
            params.push(today);
        } else if (filter === 'overdue') {
            sql += ' AND due_date < ? AND status = "sắp đến"';
            params.push(today);
        } else if (filter === 'completed') {
            sql += ' AND status = "hoàn thành"';
        }
        
        let [results] = await connection.query(sql, params);
        
        return res.render('viewReminders.ejs', {
            listReminder: results,
            activeFilter: filter
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi khi tải danh sách lời nhắc!");
    }
};

const getCreateReminder = (req, res) => {
    try {
        res.render('createReminder.ejs');
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi khi tải trang tạo lời nhắc!");
    }
};

const postCreateReminder = async (req, res) => {
    try {
        let { reminderName, amount, dueDate, frequency, reminderMethod, reminderNotification } = req.body;
        
        const userId = (req.user && req.user.userId) || 
                       (req.user && req.user.id) || 
                       (req.session && req.session.userId);
        
        if (!userId) {
            return res.redirect('/login');
        }

        await connection.query(`
            INSERT INTO reminders (payment_account_name, amount, due_date, frequency, payment_method, notification_time, status, user_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
            [reminderName, amount, dueDate, frequency, reminderMethod, reminderNotification, 'sắp đến', userId]
        );

        res.redirect('/view-reminders');
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi khi tạo lời nhắc!");
    }
};

const postDeleteReminder = async (req, res) => {
    try {
        const reminderId = req.body.reminderId;

        const userId = (req.user && req.user.userId) || 
                       (req.user && req.user.id) || 
                       (req.session && req.session.userId);
        
        if (!userId) {
            return res.redirect('/login'); 
        }
        
        await connection.query("DELETE FROM reminders WHERE id = ? AND user_id = ? ", [reminderId, userId]);
        res.redirect("/view-reminders"); 
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).send("Lỗi khi xóa lời nhắc!");
    }
};

const getUpdateReminderID = async (req, res) => {
    try {
        let reminderId = req.params.id; 
        
        const userId = (req.user && req.user.userId) || 
                       (req.user && req.user.id) || 
                       (req.session && req.session.userId);
        
        if (!userId) {
            return res.redirect('/login'); 
        }
        let [results] = await connection.query("SELECT * FROM reminders WHERE id = ? AND user_id = ?", [reminderId, userId]); 
        
        if (results.length === 0) {
            return res.send("Lời nhắc không tồn tại!");
        }

        res.render('editReminder.ejs', { updateReminder: results[0] });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).send("Lỗi khi tải trang cập nhật lời nhắc!");
    }
};

const postUpdateReminder = async (req, res) => {
    try {
        let { reminderID, reminderName, reminderAmount, reminderDate, reminderFrequency, reminderPayment, reminderNotification } = req.body;
        
        const userId = (req.user && req.user.userId) || 
                       (req.user && req.user.id) || 
                       (req.session && req.session.userId);
        
        if (!userId) {
            return res.redirect('/login'); 
        }
        
        await connection.query(`
            UPDATE reminders 
            SET payment_account_name = ?, 
                amount = ?, 
                due_date = ?, 
                frequency = ?, 
                payment_method = ?, 
                notification_time = ?
            WHERE id = ? AND user_id = ?`, 
            [reminderName, reminderAmount, reminderDate, reminderFrequency, reminderPayment, reminderNotification, reminderID, userId]
        );

        res.redirect("/view-reminders");
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).send("Lỗi khi cập nhật lời nhắc!");
    }
};

const markReminderAsComplete = async (req, res) => {
    try {
        const userId = (req.user && req.user.userId) || 
                       (req.user && req.user.id) || 
                       (req.session && req.session.userId);
        
        if (!userId) {
            return res.redirect('/login'); 
        }
        
        const reminderId = req.params.id;
        await connection.query(
            'UPDATE reminders SET status = "hoàn thành" WHERE id = ? AND user_id = ?', 
            [reminderId, userId]
        );
        
        const filter = req.query.filter || 'upcoming';
        res.redirect(`/view-reminders?filter=${filter}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi khi đánh dấu lời nhắc là hoàn thành!");
    }
};

module.exports = {
    getViewReminders,
    getCreateReminder, 
    postCreateReminder,
    postDeleteReminder,
    getUpdateReminderID, 
    postUpdateReminder,
    markReminderAsComplete
};