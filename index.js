import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { userRouter} from './routes/user.route.js';
import { specs } from './swagger/swagger.config.js';
import SwaggerUi from 'swagger-ui-express';
import { response } from './config/response.js'; // response 함수 import 추가
import { status } from './config/response.status.js'; // status import 추가
import { reviewRouter } from './routes/review.rotues.js';
import { missionRouter } from './routes/mission.routes.js';
import { completeMissionStore } from './controllers/mission.controller.js';


dotenv.config();    // .env 파일 사용 (환경 변수 관리)

const app = express();

// server setting - view, static, body-parser etc..
app.set('port', process.env.PORT || 3000);   // 서버 포트 지정
app.use(cors());                             // cors 방식 허용
app.use(express.json());                     // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

// swagger
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs));

app.use('/user', userRouter);

app.use('/store', reviewRouter);

app.use('/missions', missionRouter); // mission routes 추가


app.post('/store/review', (req, res) => {
    res.send('리뷰가 성공적으로 추가되었습니다.');
  });
  
app.post('/store/mission/add', (req, res) => {
    res.send('미션을 성공적으로 추가하였습니다.');
});


app.post('/store/mission/complete', async (req, res) => {
    const missionId = req.body.mission_id;
    try {
        const result = await completeMissionStore(req, res);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.use((err, req, res, next) => {
    res.locals.message = err.message;   
});

app.listen(app.get('port'), () => {
    console.log(`Example app listening on port ${app.get('port')}`);
});
