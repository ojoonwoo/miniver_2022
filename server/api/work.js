// import express from 'express';
const { resolvePreset } = require('@babel/core');
const express = require('express');
const router = express.Router();
// const fs = require('fs');
// const path = require('path');
const db = require('../dbconnection');



router.get('/getcategories', function(req, res) {
    let categoryData = [];
    
    db.query(`select * from category_info where 1`, (err, results, fields) => {
        if(!err) {
            // todo: 코드 이해 필요
            (async() => {
                console.log('promise all start');
                const result = await Promise.all(
                    results.map(async(value, index) => {
                        const cateQuery = `select * from work_info where 1 and work_categories LIKE '%${value.idx}%'`;
                        let newArr = [];
                        return new Promise((resolve, reject) => 
                            // db.query(`select * from work_info where 1 and work_categories in (${value.idx})`, (err, results, fields) => {
                            db.query(cateQuery, (err, results, fields) => {
                                if(!err) {
                                    // console.log('result push');
                                    value['count'] = results.length;
                                    newArr.push(value);
                                    return resolve(value);
                                    // return resolve();
                                } else {
                                    return reject(err);
                                }
                            })
                        )
                        console.log('return map');
                    })
                );
                console.log('promise all end');
                console.log('result', result);
                res.json({ list: result });
            })();
            
        } else {
            console.log(`query error : ${err}`);
            res.send(err);
        }
    });
});
router.get('/getlist', function(req, res) {
    // recruit list 가져오기
    const cate = (req.query.cate == 'all' || !req.query.cate) ? "" : req.query.cate;
    const count = (req.query.limit) && req.query.limit;
    const excludeIdx = (req.query.exclude) && req.query.exclude;

    // console.log(req.query.cate);
    // table로
    let where = '';
    if(cate !== '') {
        // where = `and work_categories in(${cate})`;
        where = `and work_categories LIKE '%${cate}%'`;
    } else {
        where  = '';
    }
    if(excludeIdx) {
        where += ` and idx <> '${excludeIdx}'`;
    }

    where += `order by work_order asc, work_register_date desc`;

    if(count) {
        where += ` limit ${count}`;
    }

    const query = `select * from work_info where 1 ${where}`;

    console.log(query);

    db.query(query, (err, results, fields) => {
        if(!err) {
            // res.json({ list: results });
            // res.send();
            // res.json({msg: 'Y'});
            res.json({ list: results });
        } else {
            console.log(`query error : ${err}`);
            res.send(err);
        }
    });
});
router.get('/getdetail', function(req, res) {
    // recruit list 가져오기
    const idx = req.query.idx;
    
    const query = `select * from work_info where 1 AND idx=${idx}`;
    db.query(query, (err, results, fields) => {
        if(!err) {
            let returnData = results[0];
            returnData['category_names'] = [];
            returnData['detail_sources1_arr'] = returnData['detail_sources1'].includes(', ') ? returnData['detail_sources1'].split(', ') : [returnData['detail_sources1']];
            returnData['detail_sources2_arr'] = returnData['detail_sources2'].includes(', ') ? returnData['detail_sources2'].split(', ') : [returnData['detail_sources2']];
            returnData['overview_arr'] =  returnData['work_overview'].split('\r\n\r\n');

            const cateQuery = `select category_name from category_info where 1 AND idx IN (${results[0].work_categories})`;
            db.query(cateQuery, (err, results, fields) => {
                results.forEach(function(val, idx) {
                    returnData['category_names'].push(val.category_name);
                });
                res.json(returnData);
            });
        } else {
            console.log(`query error : ${err}`);
            res.send(err);
        }
    });
});

// export default router;
module.exports = router;