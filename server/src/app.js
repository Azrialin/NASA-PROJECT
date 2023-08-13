const path = require('path');// Node.js 內建模組，提供了操作檔案和目錄的功能
const express = require('express');// 引入 express 庫
const cors = require('cors');// 引入跨域資源共享(CORS) 中間件
const morgan = require('morgan');// 引入 morgan 中間件，用於紀錄 HTTP 請求日誌

const api = require('./routes/api');

const app = express();// 創建一個 express 應用

app.use(cors({// 使用 CORS 中間件，並限制來源只能為 'http://localhost:3000'
    origin:'http://localhost:3000'
}));
app.use(morgan('combined'));// 使用 morgan 中間件，並設定為 'combined' 模式，這會生成較為詳盡的日誌(log)

app.use(express.json());// 設定該應用對於來自客戶端的資料，使用 JSON 解析

// 使用 express.static() 中間件，這讓 Express 應用可以提供靜態檔案的服務
// __dirname 為當前模組的目錄，'..' 代表上一級目錄，'public' 為存放靜態檔案的目錄
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/v1', api);

app.get('/*', (req, res) => {// 處理根路徑 '/' 的 GET 請求，回傳 index.html 檔案
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;// 將應用導出，供其他模組使用