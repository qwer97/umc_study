import { BaseError } from '../config/error.js';
import { status } from '../config/response.status.js';
import { signinResponseDTO } from '../dtos/user.dto.js';
import { addUser, getUser, getUserPreferToUserID, setPrefer } from '../models/user.dao.js';

export const joinUser = async (body) => {
    if (!body || !body.email || !body.name || !body.gender || !body.birthYear || !body.birthMonth || !body.birthDay) {
        throw new BaseError({
            isSuccess: false,
            status: 400,
            message: "Invalid input data"
        });
    }

    const birth = new Date(body.birthYear, body.birthMonth - 1, body.birthDay);
    const prefer = body.prefer || [];

    const genderMap = {
        'M': 'Male',
        'F': 'Female',
        'O': 'Other'
    };
    const gender = genderMap[body.gender];

    try {
        const userData = await addUser({
            email: body.email,
            name: body.name,
            gender: gender,
            birth: birth,
            addr: body.addr || null,
            specAddr: body.specAddr || null,
            phone: body.phone || null
        });

        console.log("joinUserData:", userData);

        for (let i = 0; i < prefer.length; i++) {
            console.log("Setting prefer for category:", prefer[i]);
            try {
                await setPrefer(userData, prefer[i]);
            } catch (err) {
                if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                    console.error("Foreign Key Constraint Error in setPrefer:", err);
                    throw new BaseError({
                        isSuccess: false,
                        status: 400,
                        message: `Invalid category ID: ${prefer[i]}`
                    });
                }
                throw err;
            }
        }

        const userPreferData = await getUserPreferToUserID(userData);
        console.log("userPreferData:", userPreferData);

        return signinResponseDTO(userData, userPreferData);

    } catch (err) {
        console.error("Unexpected Error in joinUser:", err);
        throw new BaseError({
            isSuccess: false,
            status: err.status || 500,
            message: err.message || 'Internal server error'
        });
    }
}