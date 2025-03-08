import { IDepartment } from '@/types/department';
import httpService from '../axios';

const useDepartments = ({ token }: { token: string | undefined }) => {
    const instance = httpService.instance
    let url = `/departments`;
    const getAll = async () => {
        if (!token) return
        return httpService.assignToken(token) ? await instance.get(`${url}`).then((res) => {
            return res.data
        }).catch((e) => console.log(e)) : null
    };

    const getById = async (id: string) => {
        if (!token) return
        return httpService.assignToken(token) ? await instance.get(`${url}/${id}`).then((res) => {
            return res.data
        }).catch((e) => console.log(e)) : null
    };

    const add = async (department: IDepartment) => {
        if (!token) return
        return httpService.assignToken(token) ? await instance.post(`${url}/add`, department).then((res) => {
            return res.data
        }).catch((e) => console.log(e)) : null
    };

    return { getById, getAll, add };
}

export default useDepartments;
