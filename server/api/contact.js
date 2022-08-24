// import express from 'express';
const { resolvePreset } = require('@babel/core');
const express = require('express');
const router = express.Router();
const db = require('../dbconnection');
const mailer = require('./mail');

router.post('/insert', function (req, res) {
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
        // console.log(fields);
        if (!err) {
            // console.log('result', results);
            res.send('insert 성공');
            const toEmail = 'hs.ra@minivertising.kr';

            let emailParam = {
                toEmail: toEmail,

                subject: '[CONTACT US] 새로운 CONTACT US 글이 등록 되었습니다.',

                html: ' 의뢰유형 : ' + categories + '<br>   브랜드 또는 회사명 : ' + company + '<br> 담당자 성함 : ' + name + '<br> 연락처 : ' + phone + '<br> 이메일 : ' + email + '<br> 예산 : ' + budget + '만원<br> 일정 : ' + startDate + ' ~ ' + endDate + '<br> 내용 : ' + description,
            };

            mailer.sendGmail(emailParam);
        } else {
            console.log(`query error : ${err}`);
            res.send(err);
        }
    });
});

module.exports = router;
