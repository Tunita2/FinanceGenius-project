const connection = require('../config/database')
const getSettingPage = (req, res) => {
    try{
        res.render('setting',{
            
        })
    }catch(error){
        console.error(error)
        res.status(500).send("ERROR HAPPEND!")
}
}   

module.exports = {
    getSettingPage,
}