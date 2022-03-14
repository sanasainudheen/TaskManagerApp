import http from "./http-common";
import IGroupData from "../types/Group";
import ITaskData from "../types/Task";
import IUserGroupData from "../types/UserGroup";
import IUserGroupTaskData from "../types/UserGroupTask";
import IAssignUserData from "../types/AssignUser";


 const getAllGroups = () => { 
      return http.get<Array<IGroupData>>("/Task/GetAllGroups");
 };

// const getUserById = (id: any) => {
//   console.log(id);
//   return http.get<IGroupData>(`/user/get/${id}`);
// };

 const create = (data: IGroupData) => {
   return http.post<IGroupData>("/Task/CreateGroup", data);
 };
 const createTask = (data: ITaskData) => {
  return http.post<ITaskData>("/Task/CreateTask", data);
};
const createUserGroup = (data: IUserGroupData) => {
  return http.post<IUserGroupData>("/Task/CreateUserGroup", data);
};
const createUserGroupTask = (data: IUserGroupTaskData) => {
  return http.post<IUserGroupTaskData>("/Task/CreateUserGroupTask", data);
};
const getAllUserGroups = () => { 
  return http.get("/Task/GetAllUserGroups");
};
const getAllUserGroupTasks = () => { 
  return http.get("/Task/GetAllUserGroupTasks");
};
const getAllTasks = () => { 
  return http.get("/Task/getAllTasks");
};
const AssignTaskToUser = (data:IAssignUserData) => {
  return http.post<IAssignUserData>("/Task/AssignTaskToUser", data);
};
// const update = (id: any, data: IGroupData) => {
//   return http.put<any>(`/user/${id}`, data);
// };

// const removeGroup = (groupId: any) => {

//   return http.delete<any>(`/Task/${groupId}`);
// };


const TaskService = {
    getAllGroups,
    getAllUserGroups,
    getAllTasks,
   create,
   createTask,
   createUserGroup,
   createUserGroupTask,
   getAllUserGroupTasks,
   AssignTaskToUser
  // update,
  // removeGroup
};

export default TaskService;