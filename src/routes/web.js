const express = require('express');
const {getHomePage,} = require('../controllers/homeController')
const {getLoginPage, postLoginUser,} = require('../controllers/loginController')
const {getRegisterPage, postCreateUser} = require('../controllers/registerController')
const {getExpenseStatisticPage,} = require('../controllers/expenseStatistiController')
const {getBudgettingPage,postCreateBudget,getCreateBudgetPage} = require('../controllers/budgettingController')

const router = express.Router();

router.get('/', getHomePage);

router.get('/login', getLoginPage);

router.get('/register', getRegisterPage);

router.post('/create-user',postCreateUser);

router.post('/login-success',postLoginUser);

router.get('/expense-statistic', getExpenseStatisticPage);

router.get('/budgetting', getBudgettingPage);

router.get('/budget-create', getCreateBudgetPage)

router.post('/created-budget', postCreateBudget);

module.exports = router;