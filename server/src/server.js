const http = require('http');// Node.js 內建模組，提供了 HTTP 伺服器的功能

require('dotenv').config();

const app = require('./app');// 引入了 Express 應用

const { mongoConnect } = require('./services/mongo');

const { loadPlanetsData } = require('./models/planets.model');// 引入一個模組，該模組負責載入行星數據
const { loadLaunchData }= require('./models/launches.model');

// 設定 HTTP 伺服器的監聽埠，如果系統環境有設定 PORT，就用那個，否則預設為 8000
const PORT = process.env.PORT || 8000;


const server = http.createServer(app);// 建立一個 HTTP 伺服器，並且把 Express 應用掛載上去



// 一個非同步函數，該函數負責載入行星數據，然後啟動 HTTP 伺服器
async function startServer () {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();
    
    server.listen(PORT, () =>{
        console.log(`Listening on port ${PORT}...`);
    });
};

startServer();// 執行這個函數

// const http = require('http');

// const express = require('express');

// const app = express();

// const PORT = process.env.PORT || 8000;

// const server = http.createServer(app);

// server.listen(PORT, () =>{
//     console.log(`Listening on port ${PORT}...`);
// });
