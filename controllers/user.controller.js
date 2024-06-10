// c:\umc_study\controllers\user.controller.js
import { response } from "../config/response.js";
import { status } from "../config/response.status.js";

import { joinUser } from "../services/user.service.js";
import { BaseError } from '../config/error.js';

export const userSignin = async (req, res, next) => {
    console.log("회원가입을 요청하였습니다!");
    console.log("body:", req.body); // 로그 추가

    try {
        if (!req.body) {
            throw new BaseError({
                isSuccess: false,
                status: 400,
                message: "Request body is missing"
            });
        }

        const result = await joinUser(req.body);
        console.log("joinUser result:", result); // 디버깅 로그 추가
        console.log("Status SUCCESS:", status.SUCCESS); // 디버깅 로그 추가
        res.status(status.SUCCESS.status).json(response(status.SUCCESS, result));
    } catch (err) {
        console.log("Caught error:", err); // 디버깅 로그 추가
        if (err instanceof BaseError) {
            console.log("Error BaseError:", err.data); // 디버깅 로그 추가
            res.status(err.data.status).send(response(err.data, null));
        } else {
            console.log("Status INTERNAL_SERVER_ERROR:", status.INTERNAL_SERVER_ERROR); // 디버깅 로그 추가
            res.status(status.INTERNAL_SERVER_ERROR.status).send(response(status.INTERNAL_SERVER_ERROR, null));
        }
    }
}
