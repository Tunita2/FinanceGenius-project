const express = require('express');
const {getHomePage,} = require('../controllers/homeController')
const {getLoginPage, postLoginUser,} = require('../controllers/loginController')
const {getRegisterPage, postCreateUser} = require('../controllers/registerController')
const {getExpenseStatisticPage,} = require('../controllers/expenseStatistiController')
const {getViewReminders, getCreateReminder , getEditReminder, postCreateReminder, postUpdateReminder, getUpdateReminderPage, postDeleteReminder} = require('../controllers/reminderController')

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

router.post('/create-reminder', postCreateReminder);

router.post('/update-reminder', postUpdateReminder);

router.get('/update-reminder/:id', getUpdateReminderPage);

router.post('/delete-reminder', postDeleteReminder);

module.exports = router;