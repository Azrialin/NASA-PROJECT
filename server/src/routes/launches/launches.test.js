const request = require('supertest');// 引入 supertest 庫，用於模擬 HTTP 請求和檢查 HTTP 回應
const app = require('../../app');// 引入你的應用程式，supertest 將對其發出測試請求
const { 
    mongoConnect, 
    mongoDisconnect
} = require('../../services/mongo');

describe('Launches API', ()=>{

    beforeAll(async() => {
        await mongoConnect();
    });

    afterAll(async() => {
        await mongoDisconnect();
    });

    // 使用 Jest 的 describe 函數定義一組相關的測試，描述這些測試的目的是測試 "GET /launches" 路由
    describe('Test GET /launches', ()=> {
        // 定義一個單獨的測試，描述這個測試的目的是檢查是否可以成功回應
        test('It should respond with 200 success', async () => {
            // 使用 supertest 對你的應用程式發出 GET 請求，然後檢查回應的內容類型和狀態碼
            const response = await request(app)
            .get('/v1/launches')// 發出 GET 請求到 '/launches' 路徑
            .expect('Content-Type', /json/)// 檢查回應的內容類型是否為 JSON
            .expect(200);// 檢查 HTTP 回應狀態碼是否為 200
        });
    });
    // 定義另一組相關的測試，描述這些測試的目的是測試 "POST /launches" 路由
    describe('Test POST /launch', () => {
        // 定義完整的啟動數據
        const completeLaunchData = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-62 f',
            launchDate: 'January 4, 2028',
        };
        // 定義缺少日期的啟動數據
        const launchDataWithoutDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-62 f',
        };
        // 定義包含無效日期的啟動數據
        const launchDataWithInvalidDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-62 f',
            launchDate: 'zoot',
        };
        // 測試是否能成功創建新的啟動
        test('It should respond with 201 created', async () => {
            const response = await request(app)
            .post('/v1/launches')// 測試是否能成功創建新的啟動
            .send(completeLaunchData)// 將完整的啟動數據作為請求體發送
            .expect('Content-Type', /json/)// 將完整的啟動數據作為請求體發送
            .expect(201); // 檢查 HTTP 回應狀態碼是否為 201
    
             // 檢查 HTTP 回應狀態碼是否為 201
            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(requestDate).toBe(responseDate);
    
            // 檢查回應體是否包含除日期外的所有啟動數據
            expect(response.body).toMatchObject(launchDataWithoutDate);
        });
    
        // 測試是否能捕捉到缺少必需屬性的情況
        test('It should catch missing required properties', async () => {
            const response = await request(app)
            .post('/v1/launches')// 發出 POST 請求到 '/launches' 路徑
            .send(launchDataWithoutDate)// 將缺少日期的啟動數據作為請求體發送
            .expect('Content-Type', /json/)// 檢查回應的內容類型是否為 JSON
            .expect(400);// 檢查回應的內容類型是否為 JSON
    
            // 檢查回應體是否包含正確的錯誤訊息
            expect(response.body).toStrictEqual({
                error: 'Missing required launch property',
            });
        });
    
        // 測試是否能捕捉到日期無效的情況
        test('It should catch invalid dates', async () => {
            const response = await request(app)
            .post('/v1/launches')// 發出 POST 請求到 '/launches' 路徑
            .send(launchDataWithInvalidDate)// 發出 POST 請求到 '/launches' 路徑
            .expect('Content-Type', /json/)// 發出 POST 請求到 '/launches' 路徑
            .expect(400);// 檢查 HTTP 回應狀態碼是否為 400
    
            // 檢查回應體是否包含正確的錯誤訊息
            expect(response.body).toStrictEqual({
                error: 'Invalid launch date',
            });
        });
    });
});

