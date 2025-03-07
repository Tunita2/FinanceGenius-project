const connection = require("../config/database");
const getBudgettingPage = async (req, res) => {
  try {
    let userId = req.session.userId;
    let [results, fields] = await connection.query(
      `SELECT * FROM budget WHERE user_id = ?`,
      [userId]
    );


    res.render("budgetting.ejs", {listBudget:results});
  } catch (error) {
    console.error(error);
    res.status(500).send("ERROR HAPPEND!");
  }
};

const getCreateBudgetPage = (req, res) => {
  try {
    res.render("create_budget.ejs", {});
  } catch (error) {
    console.error(error);
    res.status(500).send("ERROR HAPPEND!");
  }
};
const postCreateBudget = async (req, res) => {
  try {
    let userId = req.session.userId;
    let budgetName = req.body.fundName;
    let budgetAmount = req.body.fundAmount;
    let budgetDate = req.body.fundDate;
    let budgetDes = req.body.fundDes;

    let [results, fields] = await connection.query(
      `INSERT INTO budget(budget_name,budget_amount,budget_date,budget_description,user_id) VALUES(?,?,?,?,?)`,
      [budgetName, budgetAmount, budgetDate, budgetDes, userId]
    );
    res.redirect("/budgetting");
  } catch (error) {
    console.error(error);
    res.status(500).send("ERROR HAPPEND!");
  }
};
module.exports = {
  getBudgettingPage,
  getCreateBudgetPage,
  postCreateBudget,
};
