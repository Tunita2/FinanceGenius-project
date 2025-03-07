const express = require('express');
const {getExpenseStatisticPage, getAddExpensePage, postAddExpensePage} = require('../controllers/expenseStatistiController')

const { getViewGoalsPage, getAddGoalPage, postCreateGoal } = require('../controllers/goalsControllers');

const { getHomePage } = require('../controllers/homeController');
const { getLoginPage, postLoginUser } = require('../controllers/loginController');
const { getRegisterPage, postCreateUser } = require('../controllers/registerController');
const { 
    getViewReminders, 
    getCreateReminder, 
    getUpdateReminderID, 
    postCreateReminder, 
    postDeleteReminder, 
    postUpdateReminder, 
    markReminderAsComplete 
} = require('../controllers/reminderController');
const { 
    getSettingPage, 
    getEditPhone, 
    postEditPhoneNumber, 
    getEditPassword, 
    postEditPassword, 
} = require('../controllers/settingCotroller');
const { getFAQsPage, searchFAQs } = require('../controllers/fAQsController');


const router = express.Router();

router.get('/', getHomePage);

// Router Authen
router.get('/login', getLoginPage);
router.get('/register', getRegisterPage);
router.post('/create-user',postCreateUser);
router.post('/login-success',postLoginUser);

//Router expense 
router.get('/expense-statistic', getExpenseStatisticPage);
router.get('/add-transaction', getAddExpensePage);
router.post('/add-transaction', postAddExpensePage);


// Router Reminder
router.get('/view-reminders', getViewReminders);
router.get('/create-reminder', getCreateReminder);
router.post('/create-reminder', postCreateReminder);
router.post('/delete-reminder', postDeleteReminder);
router.get('/update-reminder/:id', getUpdateReminderID);
router.post('/update-reminder', postUpdateReminder);
router.get('/mark-complete/:id', markReminderAsComplete); 

// Router Setting 
router.get('/setting', getSettingPage);
router.get('/edit-phone-numbers', getEditPhone); 
router.post('/edit-phone-numbers', postEditPhoneNumber); 
router.get('/edit-password', getEditPassword); 
router.post('/edit-password', postEditPassword);
router.get('/setting/FAQs', getFAQsPage);
router.get('/setting/FAQs/search', searchFAQs);

// Router Goal
router.get('/view-goals', getViewGoalsPage);
router.get('/add-goal', getAddGoalPage);
router.post('/add-goal/create-goal', postCreateGoal);



module.exports = router;
