const connection = require('../config/database')
const getExpenseStatisticPage = (req, res) => {
    try{
        res.render('expenseStatistic',{
            
        })
    }catch(error){
        console.error(error)
        res.status(500).send("ERROR HAPPEND!")
}
}   

module.exports = {
    getExpenseStatisticPage,
}