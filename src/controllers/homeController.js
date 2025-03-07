const connection = require('../config/database')
const getHomePage = async (req, res) => {
    try{
        const userId = (req.user && req.user.userId) || 
                       (req.user && req.user.id) || 
                       (req.session && req.session.userId);
        
        let [results] = await connection.query("SELECT * FROM persons WHERE id = ? ", [userId]); 
        let user = results[0]; 
        res.render('home.ejs',{user: user});
    }catch(error){
        console.error("error: ",error)
        res.send("ERROR HAPPEND!")
    }
}

module.exports = { 
    getHomePage,
}
