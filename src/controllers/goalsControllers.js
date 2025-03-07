const connection = require('../config/database')
const getViewGoalsPage = async (req, res) => {
    try {
        const userId = req.session.storedId;

        // Lấy danh sách mục tiêu
        let [results] = await connection.query(`SELECT * FROM Goal WHERE user_id=?`, [userId]);

        // Lấy tổng tiền còn lại và đảm bảo giá trị mặc định là 0 nếu không có dữ liệu
        let [totalReminders] = await connection.query(`
            SELECT IFNULL(SUM(remaining_amount), 0) AS totalReminders 
            FROM Goal WHERE user_id=?`, [userId]);

        let [sumRemindersHouses] = await connection.query(`
            SELECT IFNULL(SUM(remaining_amount), 0) AS sumRemindersHouses 
            FROM Goal WHERE user_id=? AND goal_name = 'Mua nhà'`, [userId]);

        let [sumRemindersCars] = await connection.query(`
            SELECT IFNULL(SUM(remaining_amount), 0) AS sumRemindersCars 
            FROM Goal WHERE user_id=? AND goal_name = 'Xe'`, [userId]);

        let [sumRemindersStudies] = await connection.query(`
            SELECT IFNULL(SUM(remaining_amount), 0) AS sumRemindersStudies 
            FROM Goal WHERE user_id=? AND goal_name = 'Học'`, [userId]);

        let [sumRemindersHolidays] = await connection.query(`
            SELECT IFNULL(SUM(remaining_amount), 0) AS sumRemindersHolidays 
            FROM Goal WHERE user_id=? AND goal_name = 'Kỳ nghỉ'`, [userId]);

        let [sumRemindersFurnitures] = await connection.query(`
            SELECT IFNULL(SUM(remaining_amount), 0) AS sumRemindersFurnitures 
            FROM Goal WHERE user_id=? AND goal_name = 'Nội thất'`, [userId]);

        res.render('viewGoals.ejs', {
            listGoal: results,
            totalReminders: totalReminders[0].totalReminders, 
            sumRemindersHouses: sumRemindersHouses[0].sumRemindersHouses, 
            sumRemindersCars: sumRemindersCars[0].sumRemindersCars,
            sumRemindersStudies: sumRemindersStudies[0].sumRemindersStudies,
            sumRemindersHolidays: sumRemindersHolidays[0].sumRemindersHolidays,
            sumRemindersFurnitures: sumRemindersFurnitures[0].sumRemindersFurnitures
        });
    } catch (error) {
        console.error(error);
        res.send("ERROR HAPPENED!");
    }
};
  

const getAddGoalPage = (req, res) => {
    try{
        res.render('addGoal.ejs');
    }catch(error){
        console.error(error)
        res.send("ERROR HAPPEND!")
    }
} 

const postCreateGoal = async (req, res) => {
    try {
        let userId = req.session.storedId;
        let goalName = req.body.goalName;
        let amount = parseFloat(req.body.amount); 
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;
        let paymentMethod = req.body.paymentMethod;

        let savedAmount = 0;

        let [results, fields] = await connection.query(
            `INSERT INTO Goal (goal_name, goal_amount, start_date, end_date, payment_method, user_id, saved_amount) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [goalName, amount, startDate, endDate, paymentMethod, userId, savedAmount]
        );

        res.redirect('/view-goals');
    } catch (error) {
        console.error(error);
        res.send("ERROR HAPPENED!");
    }
};



module.exports = {
    getViewGoalsPage,
    getAddGoalPage,
    postCreateGoal
}