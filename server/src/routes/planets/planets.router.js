const express = require('express');

const {
    httpGetAllPlanets,
} =  require('./planets.controller');// 從行星控制器模組引入 'getAllPlanets' 函式

const planetsRouter = express.Router();// 創建一個 express 路由器

planetsRouter.get('/', httpGetAllPlanets);// 設定一個路由來處理 GET 請求並導向 'getAllPlanets' 函式

module.exports = planetsRouter;// 導出路由器，供其他模組使用s