const connection = require('../config/database')

const getExpenseStatisticPage = async(req, res) => {
    try{
        const id = req.session.storedId;
        let[results] = await connection.query(`SELECT money_in, money_out FROM statistic WHERE user_id = ?`, [id]);
        let[catalogs] = await connection.query(`SELECT title, money, money_status, date_now FROM total_list WHERE user_id = ?`, [id]);
        
        let money = results[0]
        let infoList = catalogs;

        let infoListExpense = catalogs.filter(item => item.money_status === 'expense');
        let infoListIncome = catalogs.filter(item => item.money_status === 'income');

        res.render('expenseStatistic',{
            money : money,
            infoList : infoList,
            infoListExpense: infoListExpense ,
            infoListIncome: infoListIncome
        })
    }catch(error){
        console.error(error)
        res.status(500).send("ERROR HAPPEND!")
}
}   

module.exports = {
    getExpenseStatisticPage,
}