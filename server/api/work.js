// import express from 'express';
const express = require('express');
const router = express.Router();
// const fs = require('fs');
// const path = require('path');
const db = require('../dbconnection');

router.get('/getlist', function(req, res) {
    // recruit list 가져오기
    const cate = (req.query.cate == 'all' || !req.query.cate) ? "" : req.query.cate;
    
    const work_list = [
        {
            "idx": "1",
            "serial": "qqqqqqqq",
            "work_layout": "video",
            "work_category": "Viral film, Digital Campaign",
            "work_type": "video",
            "work_key_color": "#5a3176",
            "work_title": "타이틀입니다",
            "work_brand": "BIODERMA KOREA",
            "work_summary": "바이오더마 시카비오 포마드 C4D 영상 \'수분과 보습으로 피부 수습!\'",
            "work_background": "시카비오 포마드의 인지도 제고",
            "work_plan": "포화된 시카크림 시장에서 시카크림으로의 인지도를 확장하기 위해서는 좀 더 도발적인 메세지가 필요하다고 생각했습니다. 기존에 불만족스러운 시카크림을 바이오더마의 시카비오 포마드로 A/S해주는 포마드 A/S센터. 소비자들은 기존에 사용하던 제품의 불만족스러웠던 브랜드를 직접 기입하고 단점을 체크하여 A/S 진단서를 제출했습니다. 타 브랜드의 단점을 해결할 수 있는 개선점을 시카비오 포마드로 전달하고 참여자에게는 샘플링을 진행했습니다.",
            "cover_image": "/workdir/qqqqqqqq/cover_image/work_cover_sample.jpg",
            "main_image": "/workdir/qqqqqqqq/main_image/main_image.jpg",
            "video_source1": "",
            "video_source2": "",
            "video_source3": "",
            "scene_image": "",
            "pc_source1": "",
            "mobile_source1": "",
            "mobile_source2": "",
            "mobile_source3": "",
            "sns_images": "",
            "work_regdate": "",
            "work_update_time": "",
            "work_sample_link": "",
            "work_showYN": ""
        },
        {
            "idx": "2",
            "serial": "aaaaaaaa",
            "work_layout": "video",
            "work_category": "Viral film, Promotion",
            "work_type": "video",
            "work_key_color": "#000000",
            "work_title": "타이틀입니다",
            "work_brand": "HYUNDAI MOTOR STUDIO",
            "work_summary": "요약2요약2요약2요약2요약2요약2",
            "work_background": "캠페인 배경",
            "work_plan": "캠페인 플랜",
            "cover_image": "/workdir/aaaaaaaa/cover_image/work_cover_sample.jpg",
            "main_image": "",
            "video_source1": "",
            "video_source2": "",
            "video_source3": "",
            "scene_image": "",
            "pc_source1": "",
            "mobile_source1": "",
            "mobile_source2": "",
            "mobile_source3": "",
            "sns_images": "",
            "work_regdate": "",
            "work_update_time": "",
            "work_sample_link": "",
            "work_showYN": ""
        },
        {
            "idx": "3",
            "serial": "aaaaaaaa",
            "work_layout": "video",
            "work_category": "Viral film, Promotion",
            "work_type": "video",
            "work_key_color": "#000000",
            "work_title": "타이틀입니다",
            "work_brand": "HYUNDAI MOTOR STUDIO",
            "work_summary": "요약2요약2요약2요약2요약2요약2",
            "work_background": "캠페인 배경",
            "work_plan": "캠페인 플랜",
            "cover_image": "/workdir/aaaaaaaa/cover_image/work_cover_sample.jpg",
            "main_image": "",
            "video_source1": "",
            "video_source2": "",
            "video_source3": "",
            "scene_image": "",
            "pc_source1": "",
            "mobile_source1": "",
            "mobile_source2": "",
            "mobile_source3": "",
            "sns_images": "",
            "work_regdate": "",
            "work_update_time": "",
            "work_sample_link": "",
            "work_showYN": ""
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
        "work_layout": "video",
        "work_category": "Viral film, Digital Campaign",
        "work_type": "video",
        "work_key_color": "#5a3176",
        "work_title": "타이틀입니다",
        "work_brand": "BIODERMA KOREA",
        "work_summary": "바이오더마 시카비오 포마드 C4D 영상 \'수분과 보습으로 피부 수습!\'",
        "work_background": "시카비오 포마드의 인지도 제고",
        "work_plan": "포화된 시카크림 시장에서 시카크림으로의 인지도를 확장하기 위해서는 좀 더 도발적인 메세지가 필요하다고 생각했습니다. 기존에 불만족스러운 시카크림을 바이오더마의 시카비오 포마드로 A/S해주는 포마드 A/S센터. 소비자들은 기존에 사용하던 제품의 불만족스러웠던 브랜드를 직접 기입하고 단점을 체크하여 A/S 진단서를 제출했습니다. 타 브랜드의 단점을 해결할 수 있는 개선점을 시카비오 포마드로 전달하고 참여자에게는 샘플링을 진행했습니다.",
        "cover_image": "/workdir/qqqqqqqq/cover_image/work_cover_sample.jpg",
        "main_image": "/workdir/qqqqqqqq/main_image/main_image_sample.jpg",
        "video_source1": "",
        "video_source2": "",
        "video_source3": "",
        "scene_image": "",
        "pc_source1": "",
        "mobile_source1": "",
        "mobile_source2": "",
        "mobile_source3": "",
        "sns_images": "",
        "work_regdate": "",
        "work_update_time": "",
        "work_sample_link": "",
        "work_showYN": ""
    };

    res.json({ info: work_detail });
});

// export default router;
module.exports = router;