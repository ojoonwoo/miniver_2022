// import express from 'express';
const { resolvePreset } = require('@babel/core');
const express = require('express');
const router = express.Router();
const db = require('../dbconnection');
const mailer = require('./mail');

router.post('/insert', function (req, res) {
    console.log(req.body);
    // let category = contactState.category.toString().replace(/,/g, ', ');
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
            // * 콘솔 로그는 서버 터미널 창에 표시됨
            // console.log('result', results);
            // console.log('result', categories);
            // res.send('성공');
            // res.send('insert 성공');
            // res.send(returnData);
            let categoryNameArr = [];

            const cateQuery = `select category_name from category_info where 1 AND idx IN (${categories})`;
            db.query(cateQuery, (err, results, fields) => {
                console.log('result', results);
                results.forEach(function (val, idx) {
                    categoryNameArr.push(val.category_name);
                });
                res.json(categoryNameArr);

                // * 자사 문의내용 알림 메일 발송용 메일 코드
                // const toEmail = 'hs.ra@minivertising.kr, jw.o@minivertising.kr';
                const toEmail = 'hs.ra@minivertising.kr';

                let emailParam = {
                    toEmail: toEmail,
    
                    subject: '[CONTACT US] 새로운 CONTACT US 글이 등록 되었습니다.',
    
                    html: ' 의뢰유형 : ' + categoryNameArr.join(', ') + '<br>   브랜드 또는 회사명 : ' + company + '<br> 담당자 성함 : ' + name + '<br> 연락처 : ' + phone + '<br> 이메일 : ' + email + '<br> 예산 : ' + budget + '만원<br> 일정 : ' + startDate + ' ~ ' + endDate + '<br> 내용 : ' + description,
                };
    
                mailer.sendGmail(emailParam);

                // * 클라이언트 발송용 메일 코드
                // const toClient = email;
                
                // let clientEmailParam = {
                //     toEmail: toClient,
    
                //     subject: '[미니버타이징] 작성하신 CONTACT US 글이 등록 되었습니다.',
    
                //     // html: ' 의뢰유형 : ' + categoryNameArr.join(', ') + '<br>   브랜드 또는 회사명 : ' + company + '<br> 담당자 성함 : ' + name + '<br> 연락처 : ' + phone + '<br> 이메일 : ' + email + '<br> 예산 : ' + budget + '만원<br> 일정 : ' + startDate + ' ~ ' + endDate + '<br> 내용 : ' + description,
                //     html: '클라이언트에게 발송될 메일 테스트 내용입니다.',
                // };
    
                // mailer.sendGmail(clientEmailParam);
            });
        } else {
            console.log(`query error : ${err}`);
            res.send(err);
        }
    });
});

module.exports = router;
