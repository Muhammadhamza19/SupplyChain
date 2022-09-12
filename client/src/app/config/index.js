import Axios from '../../axios';
import { errorHandler } from './errorHandler';
export const Apis = {
    signUp: 'api/User_Signup',
    signIn: 'api/User_SignIn',
    completeData:'api/fortable'
};
export const get = async (endPoint, data, token) => {
    try {
        const result = await Axios.get(endPoint);
        return result;
    } catch (e) {
        throw errorHandler(e);
    }
};
export const post = async (endPoint, data, token) => {
    try {
        const result = await Axios.post(endPoint, data);
        return result;
    } catch (e) {
        throw errorHandler(e);
    }
};
