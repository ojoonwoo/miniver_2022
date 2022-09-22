const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 4000;

// import api from './api';
const api = require('./api');


app.use(bodyParser.json());




// app.use('/works', express.static(path.join(__dirname, './../uploads/work')));
app.use(express.static(path.join(__dirname, '..', '/build')));
// app.use(express.static(path.join(__dirname, '..', '/public')));

app.use('/works', express.static(path.join(__dirname, './../uploads/work')));
app.use('/journalists', express.static(path.join(__dirname, './../uploads/press')));

// cors 옵션 설정 필요
app.use('/api', api);

/* handle error */
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

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