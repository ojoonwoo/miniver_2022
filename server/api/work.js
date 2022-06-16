// import express from 'express';
const express = require('express');
const router = express.Router();
// const fs = require('fs');
// const path = require('path');
const db = require('../dbconnection');

router.get('/getlist', function(req, res) {
    // recruit list 가져오기
    const cate = (req.query.cate == 'all' || !req.query.cate) ? "" : req.query.cate;

    // table로
    const categoryInfo = [
        {name: "Viral Video"},
        {name: "Campaign Site"},
        {name: "Social media"},
        {name: "Short Video"},
        {name: "Goods"},
        {name: "Photography"},
    ];

    
    const work_list = [
        {
            "idx": "1",
            "serial": "qqqqqqqq",
            "work_categories": "Viral Video, Campaign Site",
            "work_title": "Sol 4",
            "client_name": "Royal Canin",
            "client_name_kor": "로얄캐닌",
            "work_overview": "캠페인 간략내용 \'테스트\'",
            "logo_img": "qqqqqqqq/logo.png",
            "hero_source": "qqqqqqqq/main_image.jpg",
            "thumb_rectangle": "qqqqqqqq/thumb_rect.jpg",
            "thumb_square": "qqqqqqqq/thumb_square.jpg",
            "detail_sources1": "qqqqqqqq/source1_1.jpg, qqqqqqqq/source1_2.jpg, qqqqqqqq/source1_3.jpg",
            "detail_sources2": "qqqqqqqq/source2_1.jpg, qqqqqqqq/source2_2.jpg, qqqqqqqq/source2_3.jpg",
            "work_register_date": "",
            "work_update_date": "",
            "work_visible": 1
        },
        {
            "idx": "2",
            "serial": "bbbbbbbb",
            "work_categories": "Viral Video, Campaign Site",
            "work_title": "Blah Blah",
            "client_name": "Nescafe DolceGusto",
            "client_name_kor": "네스카페 돌체구스토",
            "work_overview": "캠페인 간략내용 \'테스트\'",
            "logo_img": "bbbbbbbb/logo.png",
            "hero_source": "bbbbbbbb/main_image.jpg",
            "thumb_rectangle": "bbbbbbbb/thumb_rect.jpg",
            "thumb_square": "bbbbbbbb/thumb_square.jpg",
            "detail_sources1": "bbbbbbbb/source1_1.jpg, bbbbbbbb/source1_2.jpg, bbbbbbbb/source1_3.jpg",
            "detail_sources2": "bbbbbbbb/source2_1.jpg, bbbbbbbb/source2_2.jpg, bbbbbbbb/source2_3.jpg",
            "work_register_date": "",
            "work_update_date": "",
            "work_visible": 1
        },
        {
            "idx": "3",
            "serial": "cccccccc",
            "work_categories": "Viral Video, Campaign Site",
            "work_title": "Blah Blah",
            "client_name": "Starbucks at home",
            "client_name_kor": "스타벅스 앳 홈",
            "work_overview": "캠페인 간략내용 \'테스트\'",
            "logo_img": "cccccccc/logo.png",
            "hero_source": "cccccccc/main_image.jpg",
            "thumb_rectangle": "cccccccc/thumb_rect.jpg",
            "thumb_square": "cccccccc/thumb_square.jpg",
            "detail_sources1": "cccccccc/source1_1.jpg, cccccccc/source1_2.jpg, cccccccc/source1_3.jpg",
            "detail_sources2": "cccccccc/source2_1.jpg, cccccccc/source2_2.jpg, cccccccc/source2_3.jpg",
            "work_register_date": "",
            "work_update_date": "",
            "work_visible": 1
        },
        
    ];
    res.json({ list: work_list });
});
router.get('/getdetail', function(req, res) {
    // recruit list 가져오기
    const idx = req.query.idx;
    
    console.log(idx);
    var work_detail = {
        "idx": "1",
        "serial": "qqqqqqqq",
        "work_categories": "Viral Video, Campaign Site",
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