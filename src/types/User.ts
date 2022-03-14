export default interface IUserData {
    id?: any | null,
    name: string,
    email: string,
    userName: string,
    password:string,
    confirmPassword:string,
    isBlock?:string
  }