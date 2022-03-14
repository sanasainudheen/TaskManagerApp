import http from "./http-common";
import IUserData from "../types/User";

const getAll = () => { 
  return http.get<Array<IUserData>>("/user/list");
};

const getTheUsers = () => { 
  return http.get<Array<IUserData>>("/User/getTheUsers");
};

const getUserById = (id: any) => {
  console.log(id);
  return http.get<IUserData>(`/user/get/${id}`);
};
const getUsersByGroupId = (id: any) => {  
  return http.get<IUserData>(`/user/getUsersByGroupId/${id}`);
};

const create = (data: IUserData) => {
  return http.post<IUserData>("/user", data);
};
const update = (id: any, data: IUserData) => {
  return http.put<any>(`/user/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/user/${id}`);
};

const block = (id: any) => {
  return http.put<any>(`/user/blockuser/${id}`);
};
const UserService = {
  getAll,
  getUserById,
  create,
  update,
  remove,
  block,
  getTheUsers,
  getUsersByGroupId
};

export default UserService;