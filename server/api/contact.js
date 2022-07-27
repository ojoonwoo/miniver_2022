// import express from 'express';
const { resolvePreset } = require('@babel/core');
const express = require('express');
const router = express.Router();
const db = require('../dbconnection');



router.post('/insert', function(req, res) {
    console.log(req.body);

    let categories = req.body.category;
    let description = req.body.description;
    let startDate = req.body.schedule.startDate;
    let endDate = req.body.schedule.endDate;
    let budget = req.body.budget;
    let company = req.body.company;
    let name = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;


    const query = `insert into contact_info (project_categories, project_description, project_start_date, project_end_date, project_budget, company_name, manager_name, manager_phone, manager_email) values ('${categories}', '${description}', '${startDate}', '${endDate}', '${budget}', '${company}', '${name}', '${phone}', '${email}')`;

    db.query(query, (err, results, fields) => {
        console.log(fields);
        if(!err) {
            console.log('result', results);
            res.send('insert 성공');
            
        } else {
            console.log(`query error : ${err}`);
            res.send(err);
        }
    });
});

module.exports = router;