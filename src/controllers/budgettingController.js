const connection = require("../config/database");
const getBudgettingPage = async (req, res) => {
  try {
    let userId = req.session.storedId;
    let [results, fields] = await connection.query(
      `SELECT * FROM budget WHERE user_id = ?`,
      [userId]
    );

    let totalBudgets = results.length;

    res.render("budgetting.ejs", { listBudget: results,totalBudgets });
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
    let userId = req.session.storedId;
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

const getBudAvaiPage = async (req, res) => {
  try {
    let userId = req.session.storedId;
    let budget_id = req.params.id;
    let [results, fields] = await connection.query(
      `SELECT * FROM budget WHERE user_id = ? AND budget_id = ?`,
      [userId, budget_id]
    );

    console.log(results);
    res.render("budget_available.ejs", { detailBudget: results });
  } catch (error) {
    console.error(error);
    res.status(500).send("ERROR HAPPEND!");
  }
};

const deleteBudget = async (req, res) => {
  try {
    let userId = req.session.storedId;
    let budgetId = req.body.budgetId;

    let [results, fields] = await connection.query(
      `DELETE FROM budget WHERE user_id = ? AND budget_id = ?`,
      [userId, budgetId]
    );

    res.json({ success: true, message: "Xóa quỹ thành công!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Lỗi khi xóa quỹ!" });
  }
};

module.exports = {
  getBudgettingPage,
  getCreateBudgetPage,
  postCreateBudget,
  getBudAvaiPage,
  deleteBudget,
};
