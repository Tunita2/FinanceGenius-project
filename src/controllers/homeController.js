const connection = require('../config/database')
const getHomePage = (req, res) => {
    try{
        let current_name = 'Tuấn';
        let current_money = 1000000000;
        
        res.render('home.ejs',{
            money: current_money,
            yourName : current_name,
        });
    }catch(error){
        console.error("error: ",error)
        res.status(500).send("ERROR HAPPEND!")
    }
}

module.exports = { 
    getHomePage,
}
