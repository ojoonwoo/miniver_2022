// import express from 'express';
const express = require('express');
// import work from './work';
const work = require('./work');

const router = express.Router();
router.use('/work', work);

// export default router;
module.exports = router;