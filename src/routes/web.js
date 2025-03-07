const express = require('express');
const {getHomePage,} = require('../controllers/homeController')
const {getLoginPage, postLoginUser,} = require('../controllers/loginController')
const {getRegisterPage, postCreateUser} = require('../controllers/registerController')
const {getExpenseStatisticPage,} = require('../controllers/expenseStatistiController')

const {getViewReminders, getCreateReminder , getEditReminder} = require('../controllers/reminderController');
const { getSettingPage } = require('../controllers/settingCotroller');
const { getFAQsPage } = require('../controllers/fAQsController');
const { getViewGoalsPage, getAddGoalPage, postCreateGoal } = require('../controllers/goalsControllers');

const router = express.Router();

router.get('/', getHomePage);

router.get('/login', getLoginPage);

router.get('/register', getRegisterPage);

router.post('/create-user',postCreateUser);

router.post('/login-success',postLoginUser);

router.get('/expense-statistic', getExpenseStatisticPage);

router.get('/view-reminders', getViewReminders);

router.get('/view-reminders/create-reminder', getCreateReminder);

router.get('/view-reminders/edit-reminder', getEditReminder);

router.get('/setting', getSettingPage);

router.get('/setting/FAQs', getFAQsPage);

router.get('/view-goals', getViewGoalsPage);

router.get('/add-goal', getAddGoalPage);

router.post('/add-goal/create-goal', postCreateGoal);

module.exports = router;