const pool = require('../config/database');

const getFAQsPage = async (req, res) => {
    try {
        const connection = await pool.getConnection(); 
        const [mostAskedRows] = await connection.query(
            "SELECT * FROM faqs WHERE category = 'most_asked' ORDER BY id"
        );
        
        const [troublesomeRows] = await connection.query(
            "SELECT * FROM faqs WHERE category = 'troublesome' ORDER BY id"
        );

        connection.release(); 

        res.render('FAQs', {
            mostQAs: mostAskedRows,
            hardQAs: troublesomeRows
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("ERROR HAPPENED!");
    }
};

const searchFAQs = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.redirect('/setting/FAQs');
        }

        const connection = await pool.getConnection();
        const [searchResults] = await connection.query(
            "SELECT * FROM faqs WHERE question LIKE ? OR answer LIKE ?",
            [`%${query}%`, `%${query}%`]
        );
        connection.release();

        res.render('FAQs', {
            mostQAs: [],
            hardQAs: [],
            searchResults,
            searchQuery: query
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("ERROR HAPPENED DURING SEARCH!");
    }
};

module.exports = {
    getFAQsPage,
    searchFAQs
};
