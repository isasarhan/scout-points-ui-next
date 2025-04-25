import { IAddUser, IUser } from '@/types/user';
import httpService from '../axios';

const useAuth = () => {
    const instance = httpService.instance
    const url = `/auth`;
    const login = async (email: string, password: string) => {
        return await instance.post(`${url}/login`, { email, password }).then((res) => {
            return res.data
        })
    };
    const register = async (user: IAddUser) => {        
        return await instance.post(`${url}/register`, user).then((res) => {
            return res.data
        })
    };
    return { login, register };
}

export default useAuth;
