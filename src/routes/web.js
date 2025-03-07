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
const { 
    getSettingPage, 
    getEditPhone, 
    postEditPhoneNumber, 
    getEditPassword, 
    postEditPassword  
} = require('../controllers/settingCotroller');
const { getFAQsPage } = require('../controllers/fAQsController');

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

router.get('/setting', getSettingPage);
router.get('/setting/FAQs', getFAQsPage); 
router.get('/edit-phone-numbers', getEditPhone); 
router.post('/edit-phone-numbers', postEditPhoneNumber); 
router.get('/edit-password', getEditPassword); 
router.post('/edit-password', postEditPassword);

module.exports = router;
