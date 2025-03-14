const connection = require('../config/database')

const getExpenseStatisticPage = async(req, res) => {
    try{
        const id = req.session.storedId;
        let[results] = await connection.query(`SELECT money_in, money_out FROM statistic WHERE user_id = ?`, [id]);
        let[catalogs] = await connection.query(`SELECT title, money, money_status, date_now FROM total_list WHERE user_id = ?`, [id]);
        
        let money = results[0]
        let infoList = catalogs;

        // Lọc tiền thu nhập và chi tiêu
        let infoListExpense = catalogs.filter(item => item.money_status === 'expense');
        let infoListIncome = catalogs.filter(item => item.money_status === 'income');
        
        // Lặp qua mảng đã lọc và cộng dồn giá trị
        let totalExpense = infoListExpense.reduce((sum, item) => sum + item.money, 0); 
        let totalIncome = infoListIncome.reduce((sum, item) => sum + item.money, 0);

        //Lưu dữ liệu tạm thời
        req.session.ExpenseMoney = totalExpense
        req.session.IncomeMoney = totalIncome

        res.render('expenseStatistic',{
            money : money,
            infoList : infoList,
            infoListExpense: infoListExpense ,
            infoListIncome: infoListIncome,
            totalExpense: totalExpense, 
            totalIncome: totalIncome,
        })
    }catch(error){
        console.error(error)
        res.status(500).send("ERROR HAPPEND!")
}
}   
const getAddExpensePage = async(req,res) => {
    try{
        res.render('addExpense',{})
    }catch(error){
        console.error(error)
        res.status(500).send("ERROR HAPPEND!")
    }
}

const postAddExpensePage = async(req, res) => {
    try {
        let {money, totalStatus, note, date} = req.body; 
        const userId = req.session.storedId ;
        if (!userId) {
            return res.redirect('/login');
        }
        await connection.query(`
           INSERT INTO total_list(title, money, money_status, date_now, user_id) 
           VALUES (?, ?, ?, ?, ?)`,[note, money, totalStatus, date, userId ]
        );
        res.redirect('/expense-statistic')
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi khi tạo giao dịch!");
    }
}
module.exports = {
    getExpenseStatisticPage,
    getAddExpensePage,
    postAddExpensePage

}