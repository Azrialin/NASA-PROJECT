const express = require('express');

const planetsRouter = require('./planets/planets.router');// 引入行星路由器模組
const launchesRouter = require('./launches/launches.router');// 引入 launchesRouter

const api = express.Router();

api.use('/planets', planetsRouter);// 使用行星路由器來處理 '/planets' 路徑的請求
api.use('/launches', launchesRouter);// 使用 launchesRouter 處理相關路徑的請求

module.exports = api;