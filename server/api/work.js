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
                        let newArr = [];
                        return new Promise((resolve, reject) => 
                            db.query(`select * from work_info where 1 and work_categories in (${value.idx})`, (err, results, fields) => {
                                if(!err) {
                                    console.log('result push');
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

    // console.log(req.query.cate);
    // table로
    let where = '';
    if(cate !== '') {
        where = `and work_categories in('${cate}')`;
    } else {
        where  = '';
    }
    const query = `select * from work_info where 1 ${where}`;
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
    // const work_list = [
    //     {
    //         "idx": "1",
    //         "serial": "qqqqqqqq",
    //         "work_categories": "2",
    //         "work_title": "Sol 4",
    //         "client_name": "Royal Canin",
    //         "client_name_kor": "로얄캐닌",
    //         "work_overview": "캠페인 간략내용 \'테스트\'",
    //         "logo_img": "logo.png",
    //         "hero_source": "main_image.jpg",
    //         "thumb_rectangle": "thumb_rect.jpg",
    //         "thumb_square": "thumb_square.jpg",
    //         "detail_sources1": "source1_1.jpg, source1_2.jpg, source1_3.jpg",
    //         "detail_sources2": "source2_1.jpg, source2_2.jpg, source2_3.jpg",
    //         "work_register_date": "",
    //         "work_update_date": "",
    //         "work_visible": 1
    //     },
    //     {
    //         "idx": "2",
    //         "serial": "bbbbbbbb",
    //         "work_categories": "1,3",
    //         "work_title": "Blah Blah",
    //         "client_name": "Nescafe DolceGusto",
    //         "client_name_kor": "네스카페 돌체구스토",
    //         "work_overview": "캠페인 간략내용 \'테스트\'",
    //         "logo_img": "logo.png",
    //         "hero_source": "main_image.jpg",
    //         "thumb_rectangle": "thumb_rect.jpg",
    //         "thumb_square": "thumb_square.jpg",
    //         "detail_sources1": "source1_1.jpg, source1_2.jpg, source1_3.jpg",
    //         "detail_sources2": "source2_1.jpg, source2_2.jpg, source2_3.jpg",
    //         "work_register_date": "",
    //         "work_update_date": "",
    //         "work_visible": 1
    //     },
    //     {
    //         "idx": "3",
    //         "serial": "cccccccc",
    //         "work_categories": "Viral Video, Campaign Site",
    //         "work_title": "Blah Blah",
    //         "client_name": "Starbucks at home",
    //         "client_name_kor": "스타벅스 앳 홈",
    //         "work_overview": "캠페인 간략내용 \'테스트\'",
    //         "logo_img": "logo.png",
    //         "hero_source": "main_image.jpg",
    //         "thumb_rectangle": "thumb_rect.jpg",
    //         "thumb_square": "thumb_square.jpg",
    //         "detail_sources1": "source1_1.jpg, source1_2.jpg, source1_3.jpg",
    //         "detail_sources2": "source2_1.jpg, source2_2.jpg, source2_3.jpg",
    //         "work_register_date": "",
    //         "work_update_date": "",
    //         "work_visible": 1
    //     },
        
    // ];
    
});
router.get('/getdetail', function(req, res) {
    // recruit list 가져오기
    const idx = req.query.idx;
    
    console.log(idx);
    var work_detail = {
        "idx": "1",
        "serial": "qqqqqqqq",
        "work_categories": "2",
        "work_title": "Sol 4",
        "client_name": "Royal Canin",
        "client_name_kor": "로얄캐닌",
        "work_overview": "캠페인 간략내용 \'테스트\'",
        "logo_img": "/works/qqqqqqqq/logo.png",
        "hero_source": "/works/qqqqqqqq/main_image.jpg",
        "thumb_rectangle": "/works/qqqqqqqq/thumb_rect.jpg",
        "thumb_square": "/works/qqqqqqqq/thumb_square.jpg",
        "detail_sources1": "/works/qqqqqqqq/source1_1.jpg, /works/qqqqqqqq/source1_2.jpg, /works/qqqqqqqq/source1_3.jpg",
        "detail_sources2": "/works/qqqqqqqq/source2_1.jpg, /works/qqqqqqqq/source2_2.jpg, /works/qqqqqqqq/source2_3.jpg",
        "work_register_date": "",
        "work_update_date": "",
        "work_visible": 1
    };

    res.json({ info: work_detail });
});

// export default router;
module.exports = router;