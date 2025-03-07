const connection = require('../config/database')
const getFAQsPage = (req, res) => {
    try{
        res.render('FAQs',{
            
        })
    }catch(error){
        console.error(error)
        res.status(500).send("ERROR HAPPEND!")
}
}   

module.exports = {
    getFAQsPage,
}