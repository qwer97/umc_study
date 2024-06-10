import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { userRouter } from './routes/user.route.js';
import { specs } from './swagger/swagger.config.js';
import SwaggerUi from 'swagger-ui-express';
import { response } from './config/response.js'; // response 함수 import 추가
import { status } from './config/response.status.js'; // status import 추가

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

app.use((err, req, res, next) => {
    res.locals.message = err.message;   


});

app.listen(app.get('port'), () => {
    console.log(`Example app listening on port ${app.get('port')}`);
});
