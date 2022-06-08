const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 4000;

// import api from './api';
const api = require('./api');


app.use(bodyParser.json());

// cors 옵션 설정 필요

app.use('/api', api);

app.use(express.static(path.join(__dirname, '..', '/build')));
// app.use(express.static(path.join(__dirname, '..', '/public')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', '/build/index.html'));
//     res.sendFile(path.join(__dirname, '..', '/public/index.html'));
// });

// 클라이언트 사이드에 라우팅 위임
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/build/index.html'));
    // res.sendFile(path.join(__dirname, '..', '/public/index.html'));
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});