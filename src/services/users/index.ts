import { IUser } from '@/types/user';
import httpService from '../axios';

const useUsers = ({ token }: { token: string | undefined }) => {
    const instance = httpService.instance
    let url = `/users`;
    const getAll = async () => {
        if(!token) return
        return httpService.assignToken(token) ? await instance.get(`${url}`).then((res) => {
            return res.data
        }).catch((e) => console.log(e)) : null
    };
    
    const getById = async (id:string) => {
        if(!token) return
        return httpService.assignToken(token) ? await instance.get(`${url}/${id}`).then((res) => {
            return res.data
        }).catch((e) => console.log(e)) : null
    };
    const add = async (user: IUser) => {
        if (!token) return
        return httpService.assignToken(token) ? await instance.post(`${url}/add`, user).then((res) => {
            return res.data
        }).catch((e) => console.log(e)) : null
    };
    return { getById, getAll, add };
}

export default useUsers;
