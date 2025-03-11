const connection = require("../config/database");
const getAllUsers = (req,res) =>{
    return res.status(200).json({
        'name': 'hieu',
    })
}

module.exports = {
    getAllUsers,
}