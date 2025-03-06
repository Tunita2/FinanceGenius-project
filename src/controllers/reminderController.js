const connection = require('../config/database')
const getViewReminders = async (req, res) => {
    try {
        let [results, fields] = await connection.query('SELECT * FROM Reminders');
        return res.render('viewReminders.ejs', {listReminder: results});
    } catch (error) {
        console.error(error)
        res.send("ERROR HAPPEND!")
    }
}   
const getCreateReminder = (req, res) => {
    try{
        res.render('createReminder.ejs',{
            
        })
    }catch(error){
        console.error(error)
        res.send("ERROR HAPPEND!")
}
}   
const getEditReminder = (req, res) => {
    try{
        res.render('editReminder.ejs',{
            
        })
    }catch(error){
        console.error(error)
        res.send("ERROR HAPPEND!")
}
}
 
const postCreateReminder = async (req, res) => {
    try{
        let name = req.body.reminderName;
        let amount = req.body.amount;
        let dueDate = req.body.dueDate;
        let frequency = req.body.frequency;
        let reminderMethod = req.body.reminderMethod;
        let reminderNotification = req.body.reminderNotification;

        let [results, fields] = await connection.query(`INSERT INTO Reminders (payment_account_name, amount, due_date, frequency, payment_method, notification_time) VALUES (?,?,?,?,?,?)`, [name, amount, dueDate, frequency, reminderMethod, reminderNotification]);
        res.redirect('/view-reminders');
    }catch(error){
        console.error(error)
        res.send("ERROR HAPPEND!")
}
}

const getUpdateReminderPage = async (req, res) => {
    try{
        const reminderId = req.params.id;
        let [results, fields] = await connection.query(`SELECT * FROM Reminders WHERE id =?`, [reminderId]);
        let reminder = results && results.length > 0 ? results[0] : {};
        res.render('editReminder.ejs', {reminderEdit: reminder});
    }catch(error){
        console.error(error)
        res.send("ERROR HAPPEND!")
}
}

const postUpdateReminder = async (req, res) => {
    try{
        let reminderId = req.body.id;
        let name = req.body.reminderName;
        let amount = req.body.amount;
        let dueDate = req.body.dueDate;
        let frequency = req.body.frequency;
        let reminderMethod = req.body.reminderMethod;
        let reminderNotification = req.body.reminderNotification;
        console.log(reminderId, name, amount, dueDate, frequency, reminderMethod, reminderNotification);
        let [results, fields] = await connection.query(`UPDATE Reminders 
                                                        SET payment_account_name =?, 
                                                            amount =?, 
                                                            due_date =?, 
                                                            frequency =?, 
                                                            payment_method =?, 
                                                            notification_time =?
                                                        WHERE id = ?;`, 
                                                        [name, amount, dueDate, frequency, reminderMethod, reminderNotification, reminderId]);
        res.redirect('/view-reminders');
    }catch(error){
        console.error(error)
        res.send("ERROR HAPPEND!")
}
}

const postDeleteReminder = async (req, res) => {
    try {
        const reminderId = req.body.reminderId;
        await connection.query("DELETE FROM Reminders WHERE id = ?", [reminderId]);
        res.redirect("/view-reminders"); 
    } catch (error) {
        console.error("Lỗi:", error);
        res.send("Lỗi khi xóa reminder");
    }
}

module.exports = {
    getViewReminders,
    getCreateReminder, 
    getEditReminder,
    postCreateReminder,
    postUpdateReminder,
    getUpdateReminderPage,
    postDeleteReminder,
    postDeleteReminder
}