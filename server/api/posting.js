// import express from 'express';
const { resolvePreset } = require('@babel/core');
const express = require('express');
const router = express.Router();
const db = require('../dbconnection');

router.get('/getdetail', function (req, res) {
    const idx = req.query.idx;
    const query = `select * from blog_info where 1 AND idx=${idx}`;
    db.query(query, (err, results, fields) => {
        if (!err) {
            // let returnData = results[0];

            res.json(results);
        } else {
            console.log(`query error : ${err}`);
            res.send(err);
        }
    });
});

// export default router;
module.exports = router;