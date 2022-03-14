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
            
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
}
    getCurrentUser() {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);
    
        return null;
      }
     
     
  }
 
  

export default new AuthService();