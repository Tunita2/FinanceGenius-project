const connection = require('../config/database')
const getViewReminders = (req, res) => {
    try{
        res.render('viewReminders.ejs',{
            
        })
    }catch(error){
        console.error(error)
        res.status(500).send("ERROR HAPPEND!")
}
}   
const getCreateReminder = (req, res) => {
    try{
        res.render('createReminder.ejs',{
            
        })
    }catch(error){
        console.error(error)
        res.status(500).send("ERROR HAPPEND!")
}
}   
const getEditReminder = (req, res) => {
    try{
        res.render('editReminder.ejs',{
            
        })
    }catch(error){
        console.error(error)
        res.status(500).send("ERROR HAPPEND!")
}
} 


module.exports = {
    getViewReminders,
    getCreateReminder, 
    getEditReminder,
}