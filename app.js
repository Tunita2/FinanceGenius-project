const express = require('express')
const app = express()
const mysql = require('mysql2')
const path = require('path')

app.set('view engine','ejs')

app.use(express.static('public'))

app.get('/',async(req,res) =>{
    try{
        let current_name = 'Tuấn';
        let current_money = 1000000000;
        
        res.render('home',{
            money: current_money,
            yourName : current_name,
        });
    }catch(error){
        console.error("error: ",error)
        res.status(500).send("ERROR HAPPEND!")
    }
})

app.get('/login-user',async(req,res) =>{
    try{
        res.render('login',{

        })
    }catch(error){
        console.error("error: ",error)
        res.status(500).send("ERROR HAPPEND!")
    }
})

app.get('/register-user', async(req,res) =>{
    try{
        res.render('register',{
            
        })
    }catch(error){
        console.error("error",error)
        res.status(500).send("ERROR HAPPEND!")
    }
})

app.get('/expense-and-income-statistic', async(req,res) =>{
    try{
        res.render('expenseStatistic',{

        })
    }catch(error){
        console.error(error)
        res.status(500).send("ERROR HAPPEND!")
    }
})

const port = 3000;
app.listen(port,() =>{
    console.log(`Server is running at http://localhost:${port}/expense-and-income-statistic`);
})