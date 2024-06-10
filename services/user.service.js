// c:\umc_study\services\user.service.js
import { BaseError } from '../config/error.js';
import { status } from '../config/response.status.js';
import { signinResponseDTO } from '../dtos/user.dto.js';
import { addUser, getUser, getUserPreferToUserID, setPrefer } from '../models/user.dao.js';

export const joinUser = async (body) => {
    const birth = new Date(body.birthYear, body.birthMonth - 1, body.birthDay);
    const prefer = body.prefer;

    try {
        const joinUserData = await addUser({
            email: body.email,
            name: body.name,
            gender: body.gender,
            birth: birth,
            addr: body.addr,
            specAddr: body.specAddr,
            phone: body.phone
        });

        for (let i = 0; i < prefer.length; i++) {
            await setPrefer(joinUserData, prefer[i]);
        }

        const userData = await getUser(joinUserData);
        const userPreferData = await getUserPreferToUserID(joinUserData);
        console.log("joinUserData:", joinUserData); // 디버깅 로그 추가
        console.log("userData:", userData); // 디버깅 로그 추가
        console.log("userPreferData:", userPreferData); // 디버깅 로그 추가

        return signinResponseDTO(userData, userPreferData);
        
    } catch (err) {
        console.error("Unexpected Error in joinUser:", err); // 디버깅 로그 추가
        throw new BaseError({
            isSuccess: false,
            status: status.INTERNAL_SERVER_ERROR.status,
            message: err.message || 'Internal server error'
        });
    }
}
