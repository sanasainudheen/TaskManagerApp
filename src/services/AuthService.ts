import axios from "axios";

const API_URL = "https://localhost:5001/api/Login/authentication";


class AuthService {
  
  login(userName: string, Password: string) {
    return axios
      .post(API_URL, {
        userName,
        Password
      })
      .then(response => {
        if (response.data) {
            
          localStorage.setItem("token", JSON.stringify(response.data.message));
          localStorage.setItem("role", JSON.stringify(response.data.roleName));
        }
        
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("token");
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
}
    getCurrentUser() {
        const userStr = localStorage.getItem("token");
        if (userStr) return JSON.parse(userStr);
    
        return null;
      }
     
     
  }
 
  

export default new AuthService();