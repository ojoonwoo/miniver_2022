// import express from 'express';
const { resolvePreset } = require('@babel/core');
const express = require('express');
const router = express.Router();
const db = require('../dbconnection');

router.get('/getlist', function(req, res) {
    // press list 가져오기
    const query = `select * from press_info where 1 and press_visible = "1" order by press_date desc`;

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

// export default router;
module.exports = router;