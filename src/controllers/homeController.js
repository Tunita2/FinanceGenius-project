const connection = require('../config/database')
const getHomePage = async (req, res) => {
    try{
        const userId = req.session.storedId ;
        const totalExpense = req.session.ExpenseMoney;
        const totalIncome = req.session.IncomeMoney;  
        
        let [results] = await connection.query("SELECT * FROM persons WHERE id = ? ", [userId]); 
        let [statistics] = await connection.query(`SELECT * FROM statistic WHERE user_id = ?`, [userId]); 
        
        let user = results[0]; 
        let money = statistics[0];
        
        res.render('home.ejs',{
            user: user,
            money: money,
            totalExpense: totalExpense,
            totalIncome: totalIncome,
        });
    }catch(error){
        console.error("error: ",error)
        res.status(500).send("Lỗi hệ thống!");
    }
}

module.exports = { 
    getHomePage,
}
