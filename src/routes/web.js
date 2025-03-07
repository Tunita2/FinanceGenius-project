const express = require('express');
const {getHomePage,} = require('../controllers/homeController')
const {getLoginPage, postLoginUser,} = require('../controllers/loginController')
const {getRegisterPage, postCreateUser} = require('../controllers/registerController')
const {getExpenseStatisticPage, getAddExpensePage,} = require('../controllers/expenseStatistiController')

const {getViewReminders, getCreateReminder , getEditReminder} = require('../controllers/reminderController');
const { getViewGoalsPage, getAddGoalPage, postCreateGoal } = require('../controllers/goalsControllers');

const { getSettingPage, getEditPhone, postEditPhoneNumber, getEditPassword, postEditPassword  } = require('../controllers/settingCotroller');
const { getFAQsPage } = require('../controllers/fAQsController');

const router = express.Router();

router.get('/', getHomePage);

router.get('/login', getLoginPage);

router.get('/register', getRegisterPage);

router.post('/create-user',postCreateUser);

router.post('/login-success',postLoginUser);

router.get('/expense-statistic', getExpenseStatisticPage);

router.get('/expense-statistic/add-transaction', getAddExpensePage);

router.get('/view-reminders', getViewReminders);

router.get('/view-reminders/create-reminder', getCreateReminder);

router.get('/view-reminders/edit-reminder', getEditReminder);

router.get('/setting', getSettingPage);

router.get('/setting/FAQs', getFAQsPage);

router.get('/view-goals', getViewGoalsPage);

router.get('/add-goal', getAddGoalPage);

router.post('/add-goal/create-goal', postCreateGoal);

router.get('/edit-phone-numbers', getEditPhone); 

router.post('/edit-phone-numbers', postEditPhoneNumber); 

router.get('/edit-password', getEditPassword); 

router.post('/edit-password', postEditPassword);

module.exports = router;