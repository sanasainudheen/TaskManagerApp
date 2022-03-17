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
const uploadDoc = (formData:any) => {
  return http.post("/FileUploadApi", formData);
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
const GetGroupTasksByUser = (id:string) => { 
  return http.get( `/Task/GetGroupTasksByUser/${id}`);  
};
const AssignedTasksByUser = (id:string,statusId:string) => { 
  return http.get( `/Task/AssignedTasksByUser/${id}/${statusId}`);  
};

const AssignedTaskDetails = (userGroupTaskId:string,userId:string) => { 
  return http.get( `/Task/ViewTaskDetails/${userGroupTaskId}/${userId}`);  
};

const AssignTaskToUser = (data:IAssignUserData) => {
  return http.post<IAssignUserData>("/Task/AssignTaskToUser", data);
};
const updateUserStatus = (data:any) => {
  return http.post("/Task/UpdateUserStatus", data);
};



const TaskService = {
    getAllGroups,
    getAllUserGroups,
    getAllTasks,
   create,
   createTask,
   createUserGroup,
   createUserGroupTask,
   getAllUserGroupTasks,
   AssignTaskToUser,
   uploadDoc,
   GetGroupTasksByUser,
   AssignedTasksByUser,
   AssignedTaskDetails,
   updateUserStatus
};

export default TaskService;