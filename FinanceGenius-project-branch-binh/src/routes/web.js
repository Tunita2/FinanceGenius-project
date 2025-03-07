const express = require('express');
const { getHomePage } = require('../controllers/homeController');
const { getLoginPage, postLoginUser } = require('../controllers/loginController');
const { getRegisterPage, postCreateUser } = require('../controllers/registerController');
const { getExpenseStatisticPage } = require('../controllers/expenseStatistiController'); 
const { 
    getViewReminders, 
    getCreateReminder, 
    getUpdateReminderID, 
    postCreateReminder, 
    postDeleteReminder, 
    postUpdateReminder, 
    markReminderAsComplete 
} = require('../controllers/reminderController');

const router = express.Router();


router.get('/', getHomePage);

router.get('/login', getLoginPage);
router.post('/login-success', postLoginUser);
router.get('/register', getRegisterPage);
router.post('/create-user', postCreateUser);

router.get('/expense-statistic', getExpenseStatisticPage);

router.get('/view-reminders', getViewReminders);
router.get('/create-reminder', getCreateReminder);
router.post('/create-reminder', postCreateReminder);
router.post('/delete-reminder', postDeleteReminder);
router.get('/update-reminder/:id', getUpdateReminderID);
router.post('/update-reminder', postUpdateReminder);
router.get('/mark-complete/:id', markReminderAsComplete); 

module.exports = router;
