const connection = require('../config/database')
const getHomePage = (req, res) => {
    try{
        res.render('home.ejs',{});
    }catch(error){
        console.error("error: ",error)
        res.send("ERROR HAPPEND!")
    }
}

module.exports = { 
    getHomePage,
}
