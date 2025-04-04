import httpService from '../axios';
import { IAssociation } from '@/types/association';
import axios from "axios";

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
    if (!token) return;

    if (!httpService.assignToken(token)) return null;

    try {
      const res = await instance.post(`${url}/add`, association);
      return res.data;
    } catch (error) {
      console.error("Error adding association:", error);

      let errorMessage = "An unexpected error occurred";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  };

  return { getById, getAll, add };
}

export default useAssociations;
