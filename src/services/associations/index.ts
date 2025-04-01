import { IDepartment } from '@/types/department';
import httpService from '../axios';
import { IAssociation } from '@/types/association';

const useAssociations = ({ token }: { token: string | undefined }) => {
    const instance = httpService.instance
    let url = `/associations`;
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

    const add = async (association: IAssociation) => {
        if (!token) return Promise.reject(new Error("No token available"));

        if (!httpService.assignToken(token))
          return Promise.reject(new Error("Failed to assign token"));
    
        try {
          const res = await instance.post(`${url}/add`, association);
          return res.data;
        } catch (e) {
          console.error(e);
          throw e;
        }
    };

    return { getById, getAll, add };
}

export default useAssociations;
