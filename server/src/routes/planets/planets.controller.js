const { getAllPlanets } = require('../../models/planets.model');// 引入行星模型模組

async function httpGetAllPlanets(req, res) {// 定義一個函式來處理行星的 GET 請求
    return res.status(200).json(await getAllPlanets());// 返回 HTTP 200 狀態碼以及行星資料
}

module.exports = {
    httpGetAllPlanets
};